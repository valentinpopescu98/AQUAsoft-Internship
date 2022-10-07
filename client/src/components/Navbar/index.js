import React from 'react'
import { Nav } from './Nav';
import { NavMenu } from './NavMenu';
import { NavLink } from './NavLink';

const Navbar = () => {
    return (
        <Nav>
            <NavMenu>
                <NavLink to="/employees">Employees</NavLink>
                <NavLink to="/projects">Projects</NavLink>
            </NavMenu>
        </Nav>
    );
}

export default Navbar
