const { sequelize } = require('../db/DbConnect')
const { DataTypes} = require('sequelize')
const Work = require('./Work')
const Car = require('./Car')

const Friend = sequelize.define('friends', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
})


Friend.hasOne(Work, { foreignKey: 'friend_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Work.belongsTo(Friend)



Friend.hasMany(Car, { foreignKey: 'friend_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Car.belongsTo(Friend)

module.exports =  Friend