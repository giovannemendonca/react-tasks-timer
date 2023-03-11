import * as S from './styles'
import { useFormContext } from 'react-hook-form'
import { useContext } from 'react'
import { CycleContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)

  const { register } = useFormContext()

  return (
    <S.FormContainer>
      <label htmlFor='task'>Vou trabalhar em</label>
      <S.TaskInput
        type='text'
        placeholder='Dê um nome para seu projeto'
        list={'task-suggestions'}
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id='task-suggestions'>
        <option value='Projeto 01' />
        <option value='Projeto 02' />
        <option value='Projeto 03' />
      </datalist>

      <label htmlFor='minutesAmount'>durante</label>
      <S.MinutesAmountInput
        type='number'
        placeholder='00'
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', {
          valueAsNumber: true
        })}
      />
      <span>minutos.</span>
    </S.FormContainer>
  )
}
