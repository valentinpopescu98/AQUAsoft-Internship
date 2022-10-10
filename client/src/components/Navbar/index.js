import React from 'react';
import { useHistory } from "react-router-dom";
import { Nav } from './Nav';
import { NavMenu } from './NavMenu';
import { NavLink } from './NavLink';

const Navbar = () => {
    let history = useHistory();

    const handleLogoutSubmit = (event) => {
        event.preventDefault();

        localStorage.setItem('loggedIn', false);
        history.push("/");

        alert("Succesful logout!");
    }

    return (
        <Nav>
            <NavMenu>
                <NavLink to="/employees">Employees</NavLink>
                <NavLink to="/projects">Projects</NavLink>
            </NavMenu>
            <form onSubmit={handleLogoutSubmit} className="log-out">
                    <button type="submit">Log Out</button>
            </form>
        </Nav>
    );
}

export default Navbar
