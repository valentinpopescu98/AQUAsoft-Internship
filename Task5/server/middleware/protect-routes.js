module.exports = app => {
    const employeesRoutes = require('../routes/create-routes-employees');
    const projectsRoutes = require('../routes/create-routes-projects');
    const auth = require('./auth');
  
    var router = require("express").Router();

    router.get('/', auth, employeesRoutes.findAll);
    router.get('/:name', auth, employeesRoutes.findOne);
    router.post('/', auth, employeesRoutes.create);
    router.put('/:id', auth, employeesRoutes.update);
    router.delete('/:id', auth, employeesRoutes.delete);
    app.use('/api/employees', router);

    router.get('/', auth, projectsRoutes.findAll);
    router.get('/:id', auth, projectsRoutes.findOne);
    router.post('/', auth, projectsRoutes.create);
    router.put('/:id', auth, projectsRoutes.update);
    router.delete('/:id', auth, projectsRoutes.delete);
    app.use('/api/projects', router);    
  };