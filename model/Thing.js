const { sequelize } = require('../db/DbConnect')
const { DataTypes} = require('sequelize')

const Thing = sequelize.define('things', {
    thing: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
})




module.exports =  Thing