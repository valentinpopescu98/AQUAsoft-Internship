import React from 'react'
import { Nav, NavLink, NavMenu } from './NavbarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/employees">Employees</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar
