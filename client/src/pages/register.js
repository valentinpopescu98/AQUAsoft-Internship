import { Link } from "react-router-dom";
import React, { useState } from 'react'
import Axios from "axios";

const Register = () => {
    const [contacts, setContacts] = useState([]);
    const [addFormData, setAddFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const addContact = (contact) => {
        Axios.post("http://localhost:8080/api/register", contact).then((res) => {
            const newContact = res.data;

            const newContacts = [...contacts, newContact];
            setContacts(newContacts);

            alert("Account created!");
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
                    <input type="text" name="username" required="required" placeholder="Username" onChange={handleAddFormChange}/>
                </div>
                <div>
                    <input type="text" name="password" required="required" placeholder="Password" onChange={handleAddFormChange}/>
                </div>
                <div>
                    <input type="email" name="email" required="required" placeholder="Email" onChange={handleAddFormChange}/>
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