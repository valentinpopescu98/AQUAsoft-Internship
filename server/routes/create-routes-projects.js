const db = require("../init");
const Projects = db.projects;
const Employees = db.employees;

// Retrieve all Projects from the database
exports.findAll = (req, res) => { 
  Projects.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving projects."
        });
    });
};

// Insert a new Project
exports.create = (req, res) => {
  const name = req.body.name;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const description = req.body.description;
  const code = req.body.code;

  // Check if name is empty
  if (!name) {
    console.log(req.body);

    res.status(409).send({
        message: "Name can not be empty!"
    });

    return;
  };

  // Check if start date is valid
  if (!isValidDate(start_date)) {
    res.status(409).send({
        message: "Start date is invalid!"
    });

    return;
  };

  // Check if end date is valid
  if (!isValidDate(end_date)) {
    res.status(409).send({
        message: "Planned end date is invalid!"
    });

    return;
  };

  if (!datesInOrder(start_date, end_date)) {
    res.status(409).send({
      message: "Start date is later than end date!"
    });

    return;
  }

  // Check if description is empty
  if (!description) {
    console.log(req.body);

    res.status(409).send({
        message: "Description can not be empty!"
    });

    return;
  };

  // Check if code is empty
  if (!code) {
    console.log(req.body);

    res.status(409).send({
        message: "Code can not be empty!"
    });

    return;
  };

  // Create an Project
  const project = {
    name: name,
    start_date: start_date,
    end_date: end_date,
    description: description,
    code: code
  };

  // Save Project in the database
  Projects.create(project)
  .then(data => {
      res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Project."
          });
      });
};

// Update an Project by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Check if name is empty
  if (!req.body.name) {
    console.log(req.body);

    res.status(409).send({
        message: "Name can not be empty!"
    });

    return;
  };

  // Check if start date is valid
  if (!isValidDate(req.body.start_date)) {
    res.status(409).send({
        message: "Start date is invalid!"
    });

    return;
  };

  // Check if end date is valid
  if (!isValidDate(req.body.end_date)) {
    res.status(409).send({
        message: "Planned end date is invalid!"
    });

    return;
  };

  if (!datesInOrder(req.body.start_date, req.body.end_date)) {
    res.status(409).send({
      message: "Start date is later than end date!"
    });

    return;
  }

  // Check if description is empty
  if (!req.body.description) {
    console.log(req.body);

    res.status(409).send({
        message: "Description can not be empty!"
    });

    return;
  };

  // Check if code is empty
  if (!req.body.code) {
    console.log(req.body);

    res.status(409).send({
        message: "Code can not be empty!"
    });

    return;
  };

  Projects.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Projects.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
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

function datesInOrder(date1, date2) {
  return new Date(date1) <= new Date(date2);
}