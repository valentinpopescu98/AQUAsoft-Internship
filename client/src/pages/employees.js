import { useHistory } from "react-router-dom";
import React, { useState, useEffect, Fragment } from 'react'
import Axios from "axios";
import "./table.css";
import EmployeesReadableRow from '../components/Employees/EmployeesReadableRow';
import EmployeesEditableRow from '../components/Employees/EmployeesEditableRow';
import Navbar from "../components/Navbar";

const Employees = () => {
    let history = useHistory();

    const [contacts, setContacts] = useState([]);
    const [addFormData, setAddFormData] = useState({
        name: '',
        address: '',
        email: '',
        hire_date: '',
        salary: 0,
        job_title: '',
        projects_id: 1
    });

    const [editFormData, setEditFormData] = useState({
        name: '',
        address: '',
        email: '',
        hire_date: '',
        salary: 0,
        job_title: '',
        projects_id: 1
    });

    const [editContactId, setEditContactId] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'false') {
            history.push("/");
        }

        Axios.get("http://localhost:8080/api/employees").then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].hire_date = res.data[i].hire_date.slice(0, 10);
            }

            setContacts(res.data);
        });
    }, [history]);

    const addContact = (contact) => {
        Axios.post("http://localhost:8080/api/employees", contact).then((res) => {
            const newContact = res.data;

            newContact.hire_date = newContact.hire_date.slice(0, 10);

            const newContacts = [...contacts, newContact];
            setContacts(newContacts);

            alert("Succesful insert!");
        });
    }

    const editContact = (id, newContact) => {
        Axios.put(`http://localhost:8080/api/employees/${id}`, newContact).then(() => {
            alert("Succesful edit!");
        });
    }

    const deleteContact = (id) => {
        Axios.delete(`http://localhost:8080/api/employees/${id}`).then(() => {
            alert("Succesful delete!");
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

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            name: addFormData.name,
            address: addFormData.address,
            email: addFormData.email,
            hire_date: addFormData.hire_date,
            salary: addFormData.salary,
            job_title: addFormData.job_title,
            projects_id: addFormData.projects_id
        }

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);

        addContact(newContact);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: editContactId,
            name: editFormData.name,
            address: editFormData.address,
            email: editFormData.email,
            hire_date: editFormData.hire_date,
            salary: editFormData.salary,
            job_title: editFormData.job_title,
            projects_id: editFormData.projects_id
        }

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === editContactId);

        newContacts[index] = editedContact;

        setContacts(newContacts);
        setEditContactId(null);

        editContact(editContactId, editedContact);
    }

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);

        const hireDateConverted = contact.hire_date.slice(0, 10);

        const formValues = {
            name: contact.name,
            address: contact.address,
            email: contact.email,
            hire_date: hireDateConverted,
            salary: contact.salary,
            job_title: contact.job_title,
            projects_id: contact.projects_id
        }

        setEditFormData(formValues);
    }

    const handleCancelClick = () => {
        setEditContactId(null);
    }

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);

        deleteContact(contactId);
    }

    const handleLogoutSubmit = (event) => {
        event.preventDefault();

        localStorage.setItem('loggedIn', false);
        history.push("/");
    }

    return (
        <div>
            <Navbar />
            <form onSubmit={handleEditFormSubmit} className="table-form">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Hire Date</th>
                            <th>Salary</th>
                            <th>Job Title</th>
                            <th>Project ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <Fragment>
                                { editContactId === contact.id ? 
                                <EmployeesEditableRow contact={contact} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} /> : 
                                <EmployeesReadableRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>

            <h2>Add a row</h2>
            <form onSubmit={handleAddFormSubmit} className="table-form">
                <input type="text" name="name" required="required" placeholder="Enter a name." onChange={handleAddFormChange} />
                <input type="text" name="address" required="required" placeholder="Enter an address." onChange={handleAddFormChange} />
                <input type="email" name="email" required="required" placeholder="Enter an email." onChange={handleAddFormChange} />
                <input type="date" name="hire_date" required="required" placeholder="Enter a date of hire." onChange={handleAddFormChange} />
                <input type="number" name="salary" required="required" placeholder="Enter a salary." onChange={handleAddFormChange} />
                <input type="text" name="job_title" required="required" placeholder="Enter a job title." onChange={handleAddFormChange} />
                <input type="number" name="projects_id" required="required" placeholder="Enter id of the project you're working on." onChange={handleAddFormChange} />
                <button type="submit">Add</button>
            </form>
            
            <form onSubmit={handleLogoutSubmit}>
                <div>
                    <button type="submit">Log Out</button>
                </div>
            </form>
        </div>
    )
}

export default Employees
