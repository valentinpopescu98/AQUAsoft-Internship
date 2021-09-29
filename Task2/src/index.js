const Sequelize = require('sequelize');
const sequelize = new Sequelize('database1', 'vali', '123456', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

const Employees = sequelize.define("employees", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        notNull: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING(45),
        notNull: true
    },
    address: {
        type: Sequelize.DataTypes.STRING(45),
        notNull: true
    },
    email: {
        type: Sequelize.DataTypes.STRING(45),
        notNull: true
    },
    hire_date: {
        type: Sequelize.DataTypes.DATE,
        notNull: true
    },
    salary: {
        type: Sequelize.DataTypes.INTEGER,
        notNull: true
    },
    job_title: {
        type: Sequelize.DataTypes.STRING(45),
        notNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch(error) {
        console.error('Unable to connect to the database:', error);
    }
}

async function getAll() {
    try {
        const employees = await Employees.findAll();
        console.log("All employees:", JSON.stringify(employees, null, 2));
    }
    catch(error) {
        console.log("Error retrieving data from the database.");
        console.log(error);
    }
}

async function getOne(nameArg) {
    try {
        const employees = await Employees.findAll({ where: { name: nameArg } });
        console.log(nameArg, " employee:", JSON.stringify(employees, null, 2));
    }
    catch(error) {
        console.log("Error retrieving data from the database.");
        console.log(error);
    }
}

async function addOne(objectArg) {
    try {
        await Employees.sync({ alter: true });
        const newEmployee = Employees.create(objectArg);
        console.log("Employee added.");
        console.log(nameArg + " employee:", JSON.stringify(employees, null, 2));
        await newEmployee.save();
    }
    catch(error) {
        console.log("Error adding data to the database.");
        console.log(error);
    }
}

async function updateOne(idArg, objectArg) {
    try {
        await Employees.sync({ alter: true });
        console.log({where: {id: idArg} });
        const newEmployee = await Employees.update(objectArg, {where: {id: idArg} });
        console.log("Employee updated.");
        console.log("Employee:", JSON.stringify(employees, null, 2));
    }
    catch(error) {
        console.log("Error updating data to the database.");
        console.log(error);
    }
}

async function deleteOne(idArg) {
    try {
        Employees.sync({ alter: true });
        const newEmployee = Employees.destroy({where: {id: idArg}});
        console.log("Employee deleted.");
    }
    catch(error) {
        console.log("Error deleting data from the database.");
        console.log(error);
    }
}

// authenticate();
// getAll();
// getOne('Mihai Ionescu');
// addOne({
//     id: 6,
//     name: 'Cristian Manea',
//     address: 'Bucuresti, Bd-ul Iuliu Maniu, Nr 1',
//     email: 'cristianmanea@gmail.com',
//     hire_date: '2015-01-01',
//     salary: 6000,
//     job_title: 'Python Developer'
// });
// updateOne(3, {
//     id: 25,
//     name: 'Marian Giurea',
//     address: 'Bucuresti, Bd-ul Iuliu Maniu, Nr 1',
//     email: 'mariangiurea@yahoo.com',
//     hire_date: '2018-05-01',
//     salary: 4500,
//     job_title: 'Frontend Developer'
// });
// deleteOne(1);