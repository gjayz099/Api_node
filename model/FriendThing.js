const { sequelize } = require('../db/DbConnect')
const { DataTypes} = require('sequelize');
const Friend = require('./Friend');
const Thing = require('./Thing');


const FriendThing = sequelize.define('friendthings', {
    friend_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Friend, // 'Movies' would also work
        key: 'id'
      }
    },
    thing_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Thing, // 'Actors' would also work
        key: 'id'
      }
    }
  });
Friend.belongsToMany(Thing, { through: FriendThing,  onDelete: 'CASCADE', onUpdate: 'CASCADE'  });
Thing.belongsToMany(Friend, { through: FriendThing,  onDelete: 'CASCADE', onUpdate: 'CASCADE'  });

module.exports = FriendThing