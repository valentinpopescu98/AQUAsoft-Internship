import { useHistory } from "react-router-dom";
import React, { useState, useEffect, Fragment } from 'react';
import Axios from "axios";
import './table.css';
import ProjectsReadableRow from '../components/Projects/ProjectsReadableRow';
import ProjectsEditableRow from '../components/Projects/ProjectsEditableRow';
import Navbar from "../components/Navbar";

const Projects = () => {
    let history = useHistory();

    const [contacts, setContacts] = useState([]);
    const [addFormData, setAddFormData] = useState({
        project_name: '',
        start_date: '',
        planned_end_date: '',
        description: '',
        project_code: ''
    });

    const [editFormData, setEditFormData] = useState({
        project_name: '',
        start_date: '',
        planned_end_date: '',
        description: '',
        project_code: ''
    });

    const [editContactId, setEditContactId] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'false') {
            history.push("/");
        }

        Axios.get("http://localhost:8080/api/projects").then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].start_date = res.data[i].start_date.slice(0, 10);
                res.data[i].planned_end_date = res.data[i].planned_end_date.slice(0, 10);
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
        Axios.post("http://localhost:8080/api/projects", contact).then((res) => {
            const newContact = res.data;

            newContact.start_date = newContact.start_date.slice(0, 10);
            newContact.planned_end_date = newContact.planned_end_date.slice(0, 10);

            const newContacts = [...contacts, newContact];
            setContacts(newContacts);

            alert("Succesful insert!");
        });
    }

    const editContact = (id, newContact) => {
        Axios.put(`http://localhost:8080/api/projects/${id}`, newContact).then(() => {
            alert("Succesful edit!");
        });
    }

    const deleteContact = (id) => {
        Axios.delete(`http://localhost:8080/api/projects/${id}`).then(() => {
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
            project_name: addFormData.project_name,
            start_date: addFormData.start_date,
            planned_end_date: addFormData.planned_end_date,
            description: addFormData.description,
            project_code: addFormData.project_code
        }

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);

        addContact(newContact);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: editContactId,
            project_name: editFormData.project_name,
            start_date: editFormData.start_date,
            planned_end_date: editFormData.planned_end_date,
            description: editFormData.description,
            project_code: editFormData.project_code
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

        const startDateConverted = contact.start_date.slice(0, 10);
        const endDateConverted = contact.planned_end_date.slice(0, 10);

        const formValues = {
            id: contact.id,
            project_name: contact.project_name,
            start_date: startDateConverted,
            planned_end_date: endDateConverted,
            description: contact.description,
            project_code: contact.project_code
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

    return (
        <div>
            <Navbar />
            <div className="center-horizontally">
                <form onSubmit={handleEditFormSubmit} className="table-form">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Project Name</th>
                                <th>Start Date</th>
                                <th>Planned End Date</th>
                                <th>Description</th>
                                <th>Project Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => 
                                <Fragment>
                                    { editContactId === contact.id ? 
                                    <ProjectsEditableRow contact={contact} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} /> : 
                                    <ProjectsReadableRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />}
                                </Fragment>
                            )}
                        </tbody>
                    </table>
                </form>

                <div className="add-form">
                    <h2>Add a row</h2>
                    <form onSubmit={handleAddFormSubmit}>
                        <input type="text" name="project_name" placeholder="Enter a name." onChange={handleAddFormChange} required/>
                        <input type="date" name="start_date" placeholder="Enter a date of start." onChange={handleAddFormChange} required/>
                        <input type="date" name="planned_end_date" placeholder="Enter a date of end." onChange={handleAddFormChange} required/>
                        <input type="text" name="description" placeholder="Enter a description." onChange={handleAddFormChange} required/>
                        <input type="text" name="project_code" placeholder="Enter the code." onChange={handleAddFormChange} required/>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Projects
