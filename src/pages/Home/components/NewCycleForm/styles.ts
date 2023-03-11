import styled from "styled-components"

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  color: ${({ theme }) => theme['gray-100']};

  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`
const baseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  font-weight: inherit;
  font-size: inherit;
  padding: 0 0.5rem;

  color: ${({ theme }) => theme['gray-100']};

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }

  &:hover {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }
`

export const TaskInput = styled(baseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(baseInput)`
  width: 4rem;
`