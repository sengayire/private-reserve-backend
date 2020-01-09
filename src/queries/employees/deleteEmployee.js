import db from '../../models';

/**
 * @param {object} employee
 * @returns {object} an object containing the information of the deleted employee or null
 */

export default async (condition) => {
    try {
        const deleted = db.Employee.destroy({
            where: condition,
            logging: false
          });
        return deleted
    } catch (error) {
        return {
            errors: error
        }
    }
}
