import { HandPalm, Play } from 'phosphor-react'
import * as S from './styles'
import { useContext } from 'react'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
import { FormProvider, useForm } from 'react-hook-form'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CycleContext } from '../../contexts/CyclesContext'

const newCyclFormValidateSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCyclFormValidateSchema>

export default function Home() {
  const { activeCycle, createNewCycle, interruptCurretCycle } =
    useContext(CycleContext)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCyclFormValidateSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task as boolean

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <S.StopCountDownButton
            type='button'
            onClick={interruptCurretCycle}
          >
            <HandPalm size={24} />
            Interromper
          </S.StopCountDownButton>
        ) : (
          <S.StartCountDownButton
            disabled={isSubmitDisabled}
            type='submit'
          >
            <Play size={24} />
            Começar
          </S.StartCountDownButton>
        )}
      </form>
    </S.HomeContainer>
  )
}
