import React from 'react'

const EmployeesReadableRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{contact.name}</td>
            <td>{contact.address}</td>
            <td>{contact.email}</td>
            <td>{contact.hire_date}</td>
            <td>{contact.salary}</td>
            <td>{contact.job_title}</td>
            <td>{contact.projects_id}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, contact)}>Edit</button>
                <button type="button" onClick={() => handleDeleteClick(contact.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default EmployeesReadableRow
