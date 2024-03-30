const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize( process.env.DATABASEDB, process.env.ROOTDB, process.env.PASSWORDDB,{
        host: process.env.HOSTDB,
        dialect: process.env.SQLDB,
        define:{
            timestamps: false
        }

    }
)


// Establishes a connection to a database using Sequelize.
const connectDb = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
}
  
  
  module.exports = {
      sequelize, 
      connectDb
  } 
