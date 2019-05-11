const Sequelize = require('sequelize') // Import Sequelize.

// Object to Export.
var db_conf = {};

const sequelize = new Sequelize({
  database: 'vacations',
  username: 'root',
  password: '123',
  dialect: 'mysql',
  host: 'localhost',
  operatorAliases: false,

  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  }

});

db_conf.sequelize = sequelize;
db_conf.Sequelize = Sequelize;

db_conf.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to localhost sucssesfuly');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db_conf;