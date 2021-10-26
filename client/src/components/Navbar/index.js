import React from 'react'
import { Nav, NavLink, NavMenu } from './NavbarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/employees" activeStyle>
                        Employees
                    </NavLink>
                    <NavLink to="/projects" activeStyle>
                        Projects
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar
