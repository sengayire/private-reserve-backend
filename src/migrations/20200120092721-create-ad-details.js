'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('adDetails',  {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      hairColor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      eyeColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ethnicity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      affiliation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      availableTo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      specialty: {
        type: Sequelize.STRING,
        allowNull: true
      },
      travel: {
        type: Sequelize.ENUM('incall', 'outcall'),
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      measurement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('adDetails');
  }
};