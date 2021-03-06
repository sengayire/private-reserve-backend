'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      adProfile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      advertName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tagline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {},
  );
  Profile.associate = models => {
    Profile.hasOne(models.AdsDetails, {
      foreignKey: 'id',
      as: 'profileInfo',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };
  return Profile;
};
