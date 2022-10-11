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
    start_date: {
        type: Sequelize.DataTypes.DATE,
        notNull: true
    },
    end_date: {
        type: Sequelize.DataTypes.DATE,
        notNull: true
    },
    description: {
        type: Sequelize.DataTypes.STRING(255),
        notNull: true
    },
    code: {
        type: Sequelize.DataTypes.STRING(255),
        notNull: true
    }
};

const table = (sequelize) => {
    const Projects = sequelize.define("project", model, {
        freezeTableName: true,
        timestamps: false
    });
    
    return Projects;
}

module.exports = {table, model};