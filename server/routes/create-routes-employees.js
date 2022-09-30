const db = require("../init");
const Employees = db.employees;
const Projects = db.projects;

// Retrieve all Employees from the database
exports.findAll = (req, res) => { 
    Employees.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving employees."
        });
    });
  };
  
  // Find a single Employee by name
  exports.findOne = (req, res) => {
    const name = req.params.name;
  
    Employees.findOne({
        where: {name: name}
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Employee with name=" + name
        });
    });
  };
  
  // Insert a new Employee
  exports.create = async(req, res) => {
    const projectId = parseInt(req.body.project_id) || null;

    // Validate request
    if (!req.body.name) {
        console.log(req.body);
        res.status(400).send({
            message: "Content can not be empty!"
        });

        return;
    };
  
    // Create an Employee
    const employee = {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      hire_date: req.body.hire_date,
      salary: req.body.salary,
      job_title: req.body.job_title,
      project_id: projectId
    };

    // Check if the project ID the employee will be linked to exists
    const foundOne = await Projects.findOne({
      where: {id: projectId}
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving projects."
        });
    });

    // Throw exception if the project ID doesn't exist and if it is not null (employee can have no project)
    if (!foundOne && projectId) {
      res.status(409).send({
        message: `Project with id ${projectId} does not exist!`
      });
  
      return;
    }
    // Save Employee in the database
    else {
      Employees.create(employee)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Employee."
        });
      });
    }  
  };
  
  // Update an Employee by the id in the request
  exports.update = async(req, res) => {
    const id = req.params.id;
    const projectId = parseInt(req.body.project_id) || null;

    // Check if the project ID the employee will be linked to exists
    const foundOne = await Projects.findOne({
      where: {id: projectId}
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving projects."
        });
    });

    // Throw exception if the project ID doesn't exist and if it is not null (employee can have no project)
    if (!foundOne && projectId) {
      res.status(409).send({
        message: `Project with id ${projectId} does not exist!`
      });
  
      return;
    }
    // Update Employee
    else {
      Employees.update(req.body, {
        where: { id: id }
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Employee with id ${id}. Maybe Employee was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error updating Employee with id ${id}`
        });
      });
    }
  };
  
  // Delete an Employee with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Employees.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Employee was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Employee with id=" + id
        });
      });
  };