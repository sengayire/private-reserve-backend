import db from '../../models';

/**
 * @param {object} profile
 * @returns {object} an object containing the information of the user profile or null
 */
export default async (profile = {}) => {
  try {
    const newProfile = await db.Profile.create(profile, { logging: false });
    return newProfile.dataValues;
  } catch (error) {
    return {
      errors: error
    };
  }
};