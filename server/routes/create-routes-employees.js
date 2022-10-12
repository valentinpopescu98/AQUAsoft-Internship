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
  
  // Insert a new Employee
  exports.create = async(req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const hire_date = req.body.hire_date;
    const salary = req.body.salary;
    const job_title = req.body.job_title;
    const projectId = parseInt(req.body.project_id) || null;

    // Check if name is empty
    if (!name) {
      console.log(req.body);

      res.status(409).send({
          message: "Name can not be empty!"
      });

      return;
    };

    // Check if address is empty
    if (!address) {
      console.log(req.body);

      res.status(409).send({
          message: "Address can not be empty!"
      });

      return;
    };

    // Check if email is valid
    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      res.status(409).send({
        message: "Email is invalid!"
      });

      return;
    }

    // Check if hire date is valid
    if (!isValidDate(hire_date)) {
      res.status(409).send({
          message: "Hire date is invalid!"
      });

      return;
    };

    if (!dateEarlierThanOrToday(hire_date)) {
      res.status(409).send({
        message: "Hire date is later than today!"
      });
  
      return;
    }

    // Check if salary is empty
    if (!salary) {
      console.log(req.body);

      res.status(409).send({
          message: "Salary can not be empty!"
      });

      return;
    };

    // Check if job title is empty
    if (!job_title) {
      console.log(req.body);

      res.status(409).send({
          message: "Job title can not be empty!"
      });

      return;
    };
  
    // Create an Employee
    const employee = {
      name: name,
      address: address,
      email: email,
      hire_date: hire_date,
      salary: salary,
      job_title: job_title,
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
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const hire_date = req.body.hire_date;
    const salary = req.body.salary;
    const job_title = req.body.job_title;
    const projectId = parseInt(req.body.project_id) || null;

    // Check if name is empty
    if (!name) {
      console.log(req.body);

      res.status(409).send({
          message: "Name can not be empty!"
      });

      return;
    };

    // Check if address is empty
    if (!address) {
      console.log(req.body);

      res.status(409).send({
          message: "Address can not be empty!"
      });

      return;
    };

    // Check if email is valid
    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      res.status(409).send({
        message: "Email is invalid!"
      });

      return;
    }

    // Check if hire date is valid
    if (!isValidDate(hire_date)) {
      res.status(409).send({
          message: "Hire date is invalid!"
      });

      return;
    };

    if (!dateEarlierThanOrToday(hire_date)) {
      res.status(409).send({
        message: "Hire date is later than today!"
      });
  
      return;
    }

    // Check if salary is empty
    if (!salary) {
      console.log(req.body);

      res.status(409).send({
          message: "Salary can not be empty!"
      });

      return;
    };

    // Check if job title is empty
    if (!job_title) {
      console.log(req.body);

      res.status(409).send({
          message: "Job title can not be empty!"
      });

      return;
    };

    // Create an Employee
    const employee = {
      name: name,
      address: address,
      email: email,
      hire_date: hire_date,
      salary: salary,
      job_title: job_title,
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
    // Update Employee
    else {
      Employees.update(employee, {
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

function isValidDate(dateString) {
  // Check date pattern
  if (!dateString.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
    return false;
  }

  const parts = dateString.split("-");
  const day = parseInt(parts[2]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[0]);

  // Check the ranges of the month
  if (month < 1 || month > 12) {
    return false;
  }

  let months = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    months[1] = 29;
  }

  // Check the ranges of the day
  return day > 0 && day <= months[month - 1];
}

function dateEarlierThanOrToday(date) {
  date = new Date(date);
  date.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date <= today;
}