module.exports = (sequelize, Sequelize) => {
    const Accounts = sequelize.define("accounts", {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          notNull: true,
          autoIncrement: true
      },
      username: {
          type: Sequelize.DataTypes.STRING(45),
          notNull: true
      },
      password: {
          type: Sequelize.DataTypes.STRING(255),
          notNull: true
      },
      email: {
          type: Sequelize.DataTypes.STRING(45),
          notNull: true
      }
    }, {
      freezeTableName: true,
      timestamps: false,
    });
  
    return Accounts;
  }