const { sequelize } = require('../db/DbConnect')
const { DataTypes} = require('sequelize')

const Work = sequelize.define('works', {
    workname: {
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




module.exports =  Work