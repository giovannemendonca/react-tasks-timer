import React, { createContext, useState, useReducer } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {    
    if(action.type === 'ADD_NEW_CYCLE'){
      return [...state, action.payload.newCycle]
    }
    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setamountSecondsPassed] = useState<number>(0)

  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setamountSecondsPassed(seconds)
  }

  function markCurrentCyclesAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHRD',
      payload: {
        activeCycleId
      }
    })

    /*  setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          setActiveCycleId(null)
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    ) */
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

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })
    // setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setamountSecondsPassed(0)
  }

  function interruptCurretCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        data: activeCycleId
      }
    })
    /*   setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    ) */

    setActiveCycleId(null)
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
