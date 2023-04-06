import React from 'react'
import { Outlet } from 'react-router-dom'
import { Nav, Ul, Li, A } from './Menu.styles'

const Menu = () => (
		<>
			<Nav>
				<Ul>
					<Li>
						<A to='/'>
							Home
						</A>
					</Li>
					<Li>
						<A to='/presenters'>
							Presenters
						</A>
					</Li>
					<Li>
						<A to='/tables'>
							Tables
						</A>
					</Li>
					<Li>
						<A to='/schedule'>
							Schedule
						</A>
					</Li>
				</Ul>
			</Nav>

			<Outlet />
		</>
	)

export default Menu
