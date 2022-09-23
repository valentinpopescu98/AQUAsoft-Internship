const Sequelize = require("sequelize");

const model = {
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
};

const table = (sequelize) => {
  const Accounts = sequelize.define("account", model, {
    freezeTableName: true,
    timestamps: false,
  });

  return Accounts;
}

module.exports = {table, model};