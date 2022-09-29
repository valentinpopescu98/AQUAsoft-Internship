import React from 'react'

const ProjectsEditableRow = ({ contact, editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>{contact.id}</td>
            <td>
                <input type="text" name="project_name" placeholder="Enter a name." value={editFormData.project_name} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <input type="date" name="start_date" placeholder="Enter a date of start." value={editFormData.start_date} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <input type="date" name="planned_end_date" placeholder="Enter a date of end." value={editFormData.planned_end_date} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <input type="text" name="description" placeholder="Enter a description." value={editFormData.description} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <input type="text" name="project_code" placeholder="Enter the code." value={editFormData.project_code} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default ProjectsEditableRow
