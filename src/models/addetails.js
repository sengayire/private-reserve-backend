'use strict';
module.exports = (sequelize, DataTypes) => {
  const adDetails = sequelize.define('adDetails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hairColor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eyeColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ethnicity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    availableTo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: true
    },
    travel: {
      type: DataTypes.ENUM('incall', 'outcall'),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    measurement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
}, {});
  adDetails.associate = function(models) {
    // associations can be defined here
  };
  return adDetails;
};