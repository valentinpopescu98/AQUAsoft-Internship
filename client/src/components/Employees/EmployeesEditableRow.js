import React from 'react'

const EmployeesEditableRow = ({ contact, editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>{contact.id}</td>
            <td>
                <input type="text" name="name" required="required" placeholder="Enter a name." value={editFormData.name} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="address" required="required" placeholder="Enter an address." value={editFormData.address} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="email" name="email" required="required" placeholder="Enter an email." value={editFormData.email} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="date" name="hire_date" required="required" placeholder="Enter a date of hire." value={editFormData.hire_date} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="number" name="salary" required="required" placeholder="Enter a salary." value={editFormData.salary} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="job_title" required="required" placeholder="Enter a job title." value={editFormData.job_title} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="number" name="projects_id" required="required" placeholder="Enter id of the project you're working on." value={editFormData.projects_id} onChange={handleEditFormChange} />
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default EmployeesEditableRow
