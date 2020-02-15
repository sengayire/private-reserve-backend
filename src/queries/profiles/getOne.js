import db from '../../models';
export default async (condition = {}) => {
  try {
    const user = Object.keys(condition).length
      ? await db.Profile.findOne({
          where: condition,
          logging: false,
        })
      : null;

    return user ? user.dataValues : {};
  } catch (error) {
    return {
      errors: error,
    };
  }
};
