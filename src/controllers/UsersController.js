import 'dotenv/config';
// import { User } from '../queries';
// import * as helper from '../helpers';
// import * as validate from '../helpers/validation';
// import status from '../config/status';

export default class UsersController {
static async create(req, res) {
    const { email, firstName, lastName } = req.body;
    console.log('here we go')
//     req.body.password = helper.password.hash(req.body.password);
//     const newUser = await User.create(req.body);
//     if (newUser.errors) {
//       const errors = helper.checkCreateUpdateUserErrors(newUser.errors);
//       const { code } = errors;
//       delete errors.code;
//       return res.status(code).json(errors);
//     }
//     if (newUser) {
//       await helper.sendMail(email, 'signup', { email, firstName, lastName });
//       return res.status(status.CREATED).json({
//         message: `activation message sent to ${req.body.email}`
//       });
//     }
  }
}