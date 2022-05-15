const Sequelize = require('sequelize');

module.exports = new Sequelize('group-chat', 'root','Optimusprime',{
    dialect:"mysql",
    host:'localhost'
});