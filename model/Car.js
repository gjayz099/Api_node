const { sequelize } = require('../db/DbConnect')
const { DataTypes} = require('sequelize')

const Car = sequelize.define('cars', {

    carname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    friend_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
})




module.exports =  Car