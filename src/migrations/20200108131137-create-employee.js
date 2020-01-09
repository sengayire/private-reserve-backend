
export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'inactive'
      },
      nationalID: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      position: {
        type: Sequelize.ENUM('manager', 'developer', 'designer'),
        allowNull: false,
        defaultValue: 'developer'
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
    return queryInterface.dropTable('Employees');
  }
};