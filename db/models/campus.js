const Sequelize = require('sequelize');
const db = require('../');

const defaultPic = '/doge-logo.png';

const Campus = db.define('campus', {
  name: Sequelize.STRING,
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false
    // defaultValue: "/doge-logo.png" // This isn't working...
  }
},
  {
    hooks: {
      beforeValidate: (campus) => {
        if (!campus.imageURL) campus.imageURL = defaultPic;
      }
    }
  })

module.exports = Campus;
