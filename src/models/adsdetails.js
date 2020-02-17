'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdsDetails = sequelize.define(
    'AdsDetails',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hairColor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      eyeColor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ethnicity: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      affiliation: {
        type: DataTypes.ENUM('Independent', 'Agency'),
        defaultValue: 'Agency',
        allowNull: true,
      },
      specialtyCategories: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      measurement: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      specialtyCategories: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      location: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      locationCategories: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      SocialMedias: {
        type: DataTypes.JSON,
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
  AdsDetails.associate = models => {
    AdsDetails.belongsTo(models.Profile, {
      foreignKey: 'profileId',
    });
  };
  return AdsDetails;
};
