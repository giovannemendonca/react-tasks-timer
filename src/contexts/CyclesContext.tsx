import { differenceInSeconds } from 'date-fns'
import React, { createContext, useState, useReducer, useEffect } from 'react'
import {
  addNewCycleAction,
  interruptCurrentCycleAction
} from '../reducers/cycles/actions'
import cyclesReduce, { Cycle } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCyclesAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurretCycle: () => void
}

interface CycleContextProviderProps {
  children: React.ReactNode
}

export const CycleContext = createContext({} as CyclesContextType)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReduce,
    {
      cycles: [],
      activeCycleId: null
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@react-tasks-timer:cycles-state-1.0.0'
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return initialState
    }
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@react-tasks-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  const [amountSecondsPassed, setamountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle?.startDate))
    }
    return 0
  })

  function setSecondsPassed(seconds: number) {
    setamountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const { minutesAmount, task } = data
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))
    setamountSecondsPassed(0)
  }

  function interruptCurretCycle() {
    dispatch(interruptCurrentCycleAction())
  }
  function markCurrentCyclesAsFinished() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCyclesAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurretCycle
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
