import db from '../../models';

/**
 * @param {object} condition
 * @returns {object} an object containing the information of the user or null
 */
export default async (condition = {}) => {
  try {
      console.log('errors', condition);
    const user = Object.keys(condition).length
    ? await db.Employee.findOne({
        where: condition,
        logging: false
    })
    : null;
    
    return user ? user.dataValues : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
