import React from 'react'
// import Projects from '../../pages/projects'

const EmployeesEditableRow = ({ contact, editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>{contact.id}</td>
            <td>
                <input type="text" name="name" placeholder="Enter a name." value={editFormData.name} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <input type="text" name="address" placeholder="Enter an address." value={editFormData.address} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <input type="email" name="email" placeholder="Enter an email." value={editFormData.email} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <input type="date" name="hire_date" placeholder="Enter a date of hire." value={editFormData.hire_date} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <input type="number" name="salary" placeholder="Enter a salary." value={editFormData.salary} onChange={handleEditFormChange} required/>
            </td>
            <td>
                <input type="text" name="job_title" placeholder="Enter a job title." value={editFormData.job_title} onChange={handleEditFormChange} required/>
            </td>
            {
            /* <select name="project_id">
                {Projects.contacts.map(project => <option value={project.id}>{project.id}</option>)}
            </select> */
            }
            <td>
                <input type="number" name="project_id" placeholder="Enter id of the project you're working on." value={editFormData.project_id} onChange={handleEditFormChange}/>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default EmployeesEditableRow
