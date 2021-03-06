import React from 'react'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from 'store/actions'
import { RootState, AppDispatch } from 'store/types'

type Props = { authenticated: boolean; dispatch: AppDispatch }

const NavBar = (props: Props) =>
  props.authenticated ? (
    <nav>
      <NavLink to="/todos">ToDos</NavLink>
      <button onClick={() => props.dispatch(logout())}>Log Out</button>
    </nav>
  ) : (
    <nav>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  )

const mapStateToProps = (state: RootState): Pick<Props, 'authenticated'> => {
  const { authenticated } = state
  return { authenticated }
}

export default connect(mapStateToProps)(NavBar)
