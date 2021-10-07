import React from 'react'

const ProjectsEditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input type="text" name="project_name" required="required" placeholder="Enter a name." value={editFormData.project_name} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="date" name="start_date" required="required" placeholder="Enter a date of start." value={editFormData.start_date} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="date" name="planned_end_date" required="required" placeholder="Enter a date of end." value={editFormData.planned_end_date} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="description" required="required" placeholder="Enter a description." value={editFormData.description} onChange={handleEditFormChange} />
            </td>
            <td>
                <input type="text" name="project_code" required="required" placeholder="Enter the code." value={editFormData.project_code} onChange={handleEditFormChange} />
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default ProjectsEditableRow
