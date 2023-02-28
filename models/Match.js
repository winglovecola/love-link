const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Match extends Model {}



//SELECT * FROM match WHERE id ='john' AND match_id='jen';

Match.init(
  {
    id: { //jen
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { //john
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    match_id: { //jen
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    created_time: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    updated_time: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'match',
  }
);

module.exports = Match;
