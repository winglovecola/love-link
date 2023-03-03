const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Photo extends Model {}

Photo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    img_filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //bit size
    img_size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //in pixel
    img_width: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //in pixel
    img_height: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'photo',
  }
);

module.exports = Photo;
