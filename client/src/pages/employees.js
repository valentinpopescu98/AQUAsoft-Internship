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
        project_id: null
    });

    const [editFormData, setEditFormData] = useState({
        name: '',
        address: '',
        email: '',
        hire_date: '',
        salary: 0,
        job_title: '',
        project_id: null
    });

    const [editContactId, setEditContactId] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'false') {
            history.push("/");
        }

        Axios.get("http://localhost:8080/api/employees").then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].hire_date = res.data[i].hire_date.slice(0, 10);
                res.data[i].project_id = parseInt(res.data[i].project_id).toString();
            }

            setContacts(res.data);
        })
        .catch(err => {
            if (err.response.status === 403) {
                localStorage.setItem('loggedIn', false);
                history.push("/");
            }

            alert(err.response.data);
        });
    }, [history]);

    const addContact = (contact) => {
        Axios.post("http://localhost:8080/api/employees", contact).then((res) => {
            const newContact = res.data;
            newContact.hire_date = newContact.hire_date.slice(0, 10);
            
            // setContacts will not work here before reloading the DOM because adding an element will have an `undefined` ID,
            // thus we are forced to refresh the DOM to trigger the getAll and retrieve the ID.
            // This is a problem when adding an element and immediately trying to delete it. It won't work, only after realoding
            // the DOM.
            // history.push will also not work because React is smart and will detect the same state, thus not reloading the DOM.
            // We need to force react to refresh the page. The state will be updated when the database will be queried.
            // Axios.get("http://localhost:8080/api/projects");
            window.location.reload(false);

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
            project_id: parseInt(addFormData.project_id).toString()
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
            project_id: parseInt(editFormData.project_id).toString()
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
            project_id: contact.project_id
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
                            <th>Project Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => 
                            <Fragment>
                                { editContactId === contact.id ? 
                                <EmployeesEditableRow contact={contact} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} key={contact.id}/> : 
                                <EmployeesReadableRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} key={contact.id}/>
                                }
                            </Fragment>
                        )}
                    </tbody>
                </table>
            </form>

            <h2>Add a row</h2>
            <form onSubmit={handleAddFormSubmit} className="table-form">
                <input type="text" name="name" placeholder="Name" onChange={handleAddFormChange} required/>
                <input type="text" name="address" placeholder="Address" onChange={handleAddFormChange} required/>
                <input type="email" name="email" placeholder="Email" onChange={handleAddFormChange} required/>
                <input type="date" name="hire_date" placeholder="Hiring Date" onChange={handleAddFormChange} required/>
                <input type="number" name="salary" placeholder="Salary" onChange={handleAddFormChange} required/>
                <input type="text" name="job_title" placeholder="Job Title" onChange={handleAddFormChange} required/>
                <input type="number" name="project_id" placeholder="Project Id" onChange={handleAddFormChange}/>
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
