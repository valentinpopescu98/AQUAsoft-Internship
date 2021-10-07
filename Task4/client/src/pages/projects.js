import React, { useState, useEffect, Fragment } from 'react'
import { nanoid } from 'nanoid'
import Axios from "axios";
import './table.css';
import ProjectsReadableRow from '../components/Projects/ProjectsReadableRow';
import ProjectsEditableRow from '../components/Projects/ProjectsEditableRow';

const Projects = () => {
    const [contacts, setContacts] = useState([]);
    const [addFormData, setAddFormData] = useState({
        id: 1,
        project_name: '',
        start_date: '',
        planned_end_date: '',
        description: '',
        project_code: ''
    });

    const [editFormData, setEditFormData] = useState({
        id: 1,
        project_name: '',
        start_date: '',
        planned_end_date: '',
        description: '',
        project_code: ''
    });

    const [editContactId, setEditContactId] = useState(null);

    useEffect(() => {
        Axios.get("http://localhost:8080/api/projects").then((res) => {
            setContacts(res.data);
        });
    }, []);

    const addContact = (contact) => {
        Axios.post("http://localhost:8080/api/projects", contact).then(() => {
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
            id: nanoid(),
            project_name: addFormData.project_name,
            start_date: addFormData.start_date,
            planned_end_date: addFormData.planned_end_date,
            description: addFormData.description,
            project_code: addFormData.project_code
        }

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);

        console.log(newContact);
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

        const formValues = {
            project_name: contact.project_name,
            start_date: contact.start_date,
            planned_end_date: contact.planned_end_date,
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
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Start Date</th>
                            <th>Planned End Date</th>
                            <th>Description</th>
                            <th>Project Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <Fragment>
                                { editContactId === contact.id ? 
                                <ProjectsEditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} /> : 
                                <ProjectsReadableRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>

            <h2>Add a row</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="project_name" required="required" placeholder="Enter a name." onChange={handleAddFormChange} />
                <input type="date" name="start_date" required="required" placeholder="Enter a date of start." onChange={handleAddFormChange} />
                <input type="date" name="planned_end_date" required="required" placeholder="Enter a date of end." onChange={handleAddFormChange} />
                <input type="text" name="description" required="required" placeholder="Enter a description." onChange={handleAddFormChange} />
                <input type="text" name="project_code" required="required" placeholder="Enter the code." onChange={handleAddFormChange} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default Projects
