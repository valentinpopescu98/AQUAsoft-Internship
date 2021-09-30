module.exports = {
    HOST: "127.0.0.1",
    USER: "vali",
    PASSWORD: "123456",
    DB: "database1",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  