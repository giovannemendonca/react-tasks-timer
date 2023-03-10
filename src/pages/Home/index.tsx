import { Play } from 'phosphor-react'
import * as S from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

const newCyclFormValidateSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

type  NewCicleFormData = zod.infer<typeof newCyclFormValidateSchema>


export default function Home() {



  const { register, handleSubmit, watch, formState, reset } = useForm<NewCicleFormData>({
    resolver: zodResolver(newCyclFormValidateSchema),
    defaultValues: {
      task:'',
      minutesAmount:0
    }
  })



  function handleCreateNewCycle(data: NewCicleFormData) {
    console.log(data)
    reset()
  }

  const task: string = watch('task')

  const isSubmitDisabled = !task as boolean

  console.log(formState.errors)

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <S.FormContainer>
          <label htmlFor='task'>Vou trabalhar em</label>
          <S.TaskInput
            type='text'
            placeholder='Dê um nome para seu projeto'
            list={'task-suggestions'}
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
            {...register('minutesAmount', {
              valueAsNumber: true
            })}
          />
          <span>minutos.</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separation>:</S.Separation>
          <span>0</span>
          <span>0</span>
        </S.CountdownContainer>

        <S.StartCountDownButton
          disabled={isSubmitDisabled}
          type='submit'
        >
          <Play size={24} />
          Começar
        </S.StartCountDownButton>
      </form>
    </S.HomeContainer>
  )
}
