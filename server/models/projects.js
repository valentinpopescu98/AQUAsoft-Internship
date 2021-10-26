module.exports = (sequelize, Sequelize) => {
    const Projects = sequelize.define("projects", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
            autoIncrement: true
        },
        project_name: {
             type: Sequelize.DataTypes.STRING(45),
            notNull: true
        },
        start_date: {
            type: Sequelize.DataTypes.DATE,
            notNull: true
        },
        planned_end_date: {
            type: Sequelize.DataTypes.DATE,
            notNull: true
        },
        description: {
            type: Sequelize.DataTypes.STRING(255),
            notNull: true
        },
        project_code: {
            type: Sequelize.DataTypes.STRING(255),
            notNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
  
    return Projects;
  }