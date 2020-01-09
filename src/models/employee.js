'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      allowNull: false,
      autoIncrement: true,
			primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
		},
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'inactive'
    },
    nationalID: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    position: {
      type: DataTypes.ENUM('manager', 'developer', 'designer'),
      allowNull: false,
      defaultValue: 'developer'
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
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};