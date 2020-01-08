
export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
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
        allowNull: false
      },
      nationalID: {
        type: Sequelize.DATE,
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Employees');
  }
};