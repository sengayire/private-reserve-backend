'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AdsDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hairColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      eyeColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ethnicity: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      affiliation: {
        type: Sequelize.ENUM('Independent', 'Agency'),
        allowNull: true,
      },
      specialtyCategories: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      measurement: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      location: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      locationCategories: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      SocialMedias: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AdsDetails');
  },
};
