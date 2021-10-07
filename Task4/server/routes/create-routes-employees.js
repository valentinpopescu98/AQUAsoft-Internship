const db = require("../init");
const Employees = db.employees;

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
  exports.create = (req, res) => {
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
      projects_id: req.body.projects_id
    };
  
    // Save Employee in the database
    Employees.create(employee)
    .then(data => {
        res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee."
            });
        });
  };
  
  // Update an Employee by the id in the request
  exports.update = (req, res) => {
  const id = req.params.id;
  
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
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
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