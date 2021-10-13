import { useHistory } from "react-router-dom";
import React from 'react'

const Home = () => {
    let history = useHistory();

    const handleLogoutSubmit = (event) => {
        event.preventDefault();

        localStorage.setItem('loggedIn', false);
        history.push("/");
    }

    return (
        <div className="center-screen">
            <div>
                HOME
            </div>
            <form onSubmit={handleLogoutSubmit}>
                <div>
                    <button type="submit">Log Out</button>
                </div>
            </form>
        </div>
    )
}

export default Home
