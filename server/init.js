const dbConfig = require("./config/config");
const accounts = require("./models/accounts");
const projects = require("./models/projects");
const employees = require("./models/employees");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorsAliases: false,
    POOL: {
      max: dbConfig.POOL.MAX,
      min: dbConfig.POOL.MIN,
      acquire: dbConfig.POOL.ACQUIRE,
      idle: dbConfig.POOL.IDLE
    }
});

const queryInterface = sequelize.getQueryInterface();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.accounts = accounts.table(sequelize);
db.employees = employees.table(sequelize);
db.projects = projects.table(sequelize);

db.employees.belongsTo(db.projects, {
  targetKey: "id",
  foreignKey: "project_id"
});

queryInterface.createTable('account', accounts.model);
queryInterface.createTable('employee', employees.model);
queryInterface.createTable('project', projects.model);

module.exports = db;