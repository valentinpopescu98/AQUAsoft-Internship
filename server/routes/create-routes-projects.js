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

// Retrieve an Employee by id with its respective Project
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employees.findOne({
    where: {id: id},
    include: {model: Projects}
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id
      });
    });
};

// Insert a new Project
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        console.log(req.body);
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    };

    // Create an Project
    const project = {
      id: req.body.id,
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      description: req.body.description,
      code: req.body.code
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