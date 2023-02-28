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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    image_filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //bit size
    image_size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //in pixel
    image_width: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //in pixel
    image_height: {
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
