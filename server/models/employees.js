const Sequelize = require("sequelize");

const model = {
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
    },
    project_id: {
        type: Sequelize.DataTypes.INTEGER,
        notNull: true
    }
};

const table = (sequelize) => {
    const Employees = sequelize.define("employee", model, {
      freezeTableName: true,
      timestamps: false,
    });

    return Employees;
}

module.exports = {table, model};