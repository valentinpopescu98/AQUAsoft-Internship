import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Axios from "axios";

const Register = () => {
    let history = useHistory();

    const [contacts, setContacts] = useState([]);
    const [addFormData, setAddFormData] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
    });

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'true') {
            history.push("/employees");
        }
    }, [history]);

    const addContact = (contact) => {
        Axios.post("http://localhost:8080/api/register", contact).then((res) => {
            const newContact = res.data;

            const newContacts = [...contacts, newContact];
            setContacts(newContacts);

            alert("Account created!");

            history.push("/");
        })
        .catch(err => {
            alert(err.response.data.message);
        });
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            username: addFormData.username,
            password: addFormData.password,
            repeatPassword: addFormData.repeatPassword,
            email: addFormData.email
        }

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);

        addContact(newContact);
    }

    return (
        <div className="center-screen">
            <form onSubmit={handleAddFormSubmit}>
                <div>
                    <input type="text" name="username" placeholder="Username" onChange={handleAddFormChange} required/>
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" onChange={handleAddFormChange} required/>
                </div>
                <div>
                    <input type="password" name="repeatPassword" placeholder="Repeat Password" onChange={handleAddFormChange} required/>
                </div>
                <div>
                    <input type="email" name="email" placeholder="Email" onChange={handleAddFormChange} required/>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>

            <div>
                <Link to="/">Log In</Link>
            </div>
        </div>
    )
}

export default Register