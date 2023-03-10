const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Match extends Model {}



//SELECT * FROM match WHERE id ='john' AND match_id='jen';

// When userid and match_id
// When John likes Jen, userid = 1, match_id = 2
// When Jen likes John, userid = 2, match_id = 1

// If John likes Jen, and Jen likes John, then they are a match

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: { //john
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
