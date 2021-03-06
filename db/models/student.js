const Sequelize = require('sequelize');
const db = require('../');

const Student = db.define( 'student', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
})

module.exports = Student;
