import React from 'react'
import * as S from './styles'

import logoIgnite from '../../assets/Logo.svg'
import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <S.HeaderContainer>
      <img
        src={logoIgnite}
        alt=''
      />
      <nav>
        <NavLink to='/' title='Time'>
          <Timer size={24}  />
        </NavLink>
        <NavLink to='/history' title='/histórico'>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </S.HeaderContainer>
  )
}
