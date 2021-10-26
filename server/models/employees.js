module.exports = (sequelize, Sequelize) => {
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
      },
      projects_id: {
          type: Sequelize.DataTypes.INTEGER,
          notNull: true
      }
    }, {
      freezeTableName: true,
      timestamps: false,
    });
  
    return Employees;
  }