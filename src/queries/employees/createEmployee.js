import db from '../../models';

/**
 * @param {object} employee
 * @returns {object} an object containing the information of the employee or null
 */
export default async (employee = {}) => {
  try {
    const newEmployee = await db.Employee.create(employee, { logging: false });

    return newEmployee.dataValues;
  } catch (error) {
    return {
      errors: error
    };
  }
};