import db from '../../models';

/**
 * @param {object} adDetails
 * @returns {object} an object containing the information of the user profile or null
 */
export default async (details = {}) => {
  try {
    const adDetails = await db.AdsDetails.create(details, { logging: false });
    return adDetails.dataValues;
  } catch (error) {
    return {
      errors: error,
    };
  }
};
