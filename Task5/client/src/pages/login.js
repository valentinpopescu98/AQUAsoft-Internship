import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Axios from "axios";

const Login = () => {
    let history = useHistory();

    const [addFormData, setAddFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if(localStorage.getItem('loggedIn') === 'true') {
            history.push("/home");
        }
    });

    const getContact = (username, password) => {
        Axios.get(`http://localhost:8080/api/accounts/${username}&${password}`).then((res) => {
            if(res.data) {
                alert("Succesful login!");
                localStorage.setItem('loggedIn', true);
                history.push("/home");
            }
            else {
                alert("Wrong username or password!");
            }
        })
    }

    const handleLoginChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const loggedContact = {
            username: addFormData.username,
            password: addFormData.password
        }

        getContact(loggedContact.username, loggedContact.password);
    }

    return (
        <div className="center-screen">
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <input type="text" name="username" required="required" placeholder="Username" onChange={handleLoginChange}/>
                </div>
                <div>
                    <input type="password" name="password" required="required" placeholder="Password" onChange={handleLoginChange}/>
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>

            <div>
                <Link to="/register">Sign Up</Link>
            </div>
        </div>
    )
}

export default Login
