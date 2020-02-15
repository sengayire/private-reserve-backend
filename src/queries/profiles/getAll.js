import db from '../../models';

export default async () => {
  let response = [];
  response = await db.Profile.findAll();
  console.log('res', response);
  return response;
};
