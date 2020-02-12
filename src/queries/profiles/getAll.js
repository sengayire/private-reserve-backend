import db from '../../models';

/**
 * Get specific article
 * @param {object} limit limit for query
 * @param {object} offset offset for query
 * @param {object} userId User to identify the gallery
 * @returns {object} Object representing the response returned
 */
export default async () => {
  let response = [];
  response = await db.Profile.findAll();
  return response;
};
