const Sequelize = require('sequelize');
const db = require('../');

const Campus = db.define( 'campus', {
  name: Sequelize.STRING,
  imageURL: Sequelize.STRING
})

module.exports = Campus;
