import React, { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR"
import * as S from './styles'

export default function History() {
  const { cycles } = useContext(CycleContext)

  return (
    <S.HistoryContainer>
      <h1>Meu historico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Ducação</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(
              ({
                id,
                task,
                minutesAmount,
                startDate,
                finishedDate,
                interruptedDate
              }) => {
                return (
                  <tr key={id}>
                    <td>{task}</td>
                    <td>{minutesAmount} minutos</td>
                    <td>{formatDistanceToNow(startDate, {
                      addSuffix: true,
                      locale:ptBR 
                    })}</td>
                    <td>
                      {finishedDate && (
                        <S.Status statusColor='green'>Concluido</S.Status>
                      )}
                      {interruptedDate && (
                        <S.Status statusColor='red'>Interrompido</S.Status>
                      )}
                      {!finishedDate && !interruptedDate && (
                        <S.Status statusColor='yellow'>Em andamento</S.Status>
                      )}
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}
