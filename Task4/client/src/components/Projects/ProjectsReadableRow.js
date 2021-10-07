import React from 'react'

const ProjectsReadableRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{contact.project_name}</td>
            <td>{contact.start_date}</td>
            <td>{contact.planned_end_date}</td>
            <td>{contact.description}</td>
            <td>{contact.project_code}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, contact)}>Edit</button>
                <button type="button" onClick={() => handleDeleteClick(contact.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default ProjectsReadableRow
