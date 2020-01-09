import 'dotenv/config';
import { Employee } from '../queries';
import * as helper from '../helpers';
import status from '../config/status';
import * as validate from '../helpers/validation';

export default class UsersController {
static async create(req, res) {
    const { 
        firstName, 
        lastName,
        email 
        } = req.body;
    const newEmployee = await Employee.create(req.body);
    if (newEmployee.errors) {
      const errors = helper.checkCreateOrUpdateEmployee(newEmployee.errors);
      const { code } = errors;
      delete errors.code;
      return res.status(code).json(errors);
    }
    if (newEmployee) {
      await helper.sendMail(email, 'newEmployee', { email, firstName, lastName });
      return res.status(status.CREATED).json({
        message: `Information message sent to ${req.body.email}`
      });
    }
  }

  static async activate(req, res) {
    const { params:{id}, user: {email}} = req;
    const condition = id || email;
    const updated = await Employee.update({ status: 'active' }, {email }||{id});
    return updated ? res.status(status.OK).json({
      message: `Account activated successfully`
    })
    : res.status(status.SERVER_ERROR).json({
      error: 'Employee account has not updated'
    })

  }
  static async suspend(req, res) {
    const {id} = req.params;
    const updated = await Employee.update({ status: 'inactive' }, { id });
    return updated ? res.status(status.OK).json({
      message: `Employee's account ${id} has been suspended`
    })
    : res.status(status.SERVER_ERROR).json({
      error: 'Employee account has not updated'
    })

  }
  static async update(req, res) {
    const {id} = req.params;
    const updatedEmployee = await Employee.update(req.body, { id });

    if (updatedEmployee.errors) {
      const errors = checkCreateOrUpdateEmployee(updatedEmployee.errors);
      return res.status(errors.code).json({ errors: errors.errors });
    }

    delete updatedEmployee.password;

    return res.status(status.OK).json({
      message: `Employee information successfully updated.`,
      user: updatedEmployee
    });
  }

  static async deleteEmployeeAccount(req, res) {
    const { ids } = req.params;
    const deleteEmployee = await Employee.deleteEmployee({id});
    return deleteEmployee
      ? res.status(status.OK).json({ message: `Employee ${id} account has deleted successfully `})
      : res.status(status.UNAUTHORIZED).json({ errors: 'Employee account not deleted' });
  }

  static async searchEmployee(req, res) {
    const searchEmployee = await Employee.findOne(req.body);
    return !searchEmployee.errors && Object.keys(searchEmployee).length 
      ? res.status(status.OK).json({ employee: searchEmployee })
      : res.status(status.UNAUTHORIZED).json({ errors: 'Employee not found' });
  }

  static async signup(req, res) {
    const { email, firstName, lastName } = req.body;
    req.body.password = helper.password.hash(req.body.password);
    const newUser = await Employee.create(req.body);
    const errors = newUser.errors ? helper.checkCreateOrUpdateEmployee(newUser.errors) : null;
     delete newUser.password;
    return errors
      ? res.status(errors.code).json({ errors: errors.errors })
      : (await helper.sendMail(email, 'signup', { email, firstName, lastName }))
          && res.status(status.CREATED).json({
            message: 'check your email to activate your account',
            user: newUser
          });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const checkUser = await Employee.findOne({ email });
    if (Object.keys(checkUser).length > 0) {
      const comparePassword = helper.password.compare(password, checkUser.password || '');
      if (!comparePassword) {
        return res.status(status.UNAUTHORIZED).json({
          errors: { credentials: 'The credentials you provided are incorrect' }
        });
      }
      const payload = {
        id: checkUser.id,
        role: checkUser.role,
        permissions: checkUser.permissions
      };
      const token = helper.token.generate(payload);
      delete checkUser.password;
      return res.status(status.OK).json({
        message: 'signIn successfully',
        user: checkUser,
        token
      });
    }
  }

  static async updatePassword(req, res) {
    const token = req.body.token || req.params.token;
    const { passwordOne, passwordTwo } = req.body;

    if (passwordOne !== passwordTwo) {
      return res.status(status.BAD_REQUEST).json({ errors: 'Passwords are not matching' });
    }

    if (!req.body.passwordOne || !req.body.passwordTwo) {
      return res.status(status.BAD_REQUEST).json({ errors: 'the password can not be empty' });
    }

    const isPasswordValid = validate.password(passwordOne, 'required');
    const isPasswordValidTwo = validate.password(passwordTwo, 'required');

    if (isPasswordValid.length || isPasswordValidTwo.length) {
      return res.status(status.BAD_REQUEST).json({ message: isPasswordValid[0] });
    }
    const { email } = helper.token.decode(token);
    const isUpdated = await Employee.update({ password: helper.password.hash(passwordOne) }, { email });
    delete isUpdated.password;
    return isUpdated
      ? res
        .status(status.OK)
        .json({ isUpdated, message: 'Success!!! your password has been changed.' })
      : res.status(status.NOT_MODIFIED).json({ errors: 'Password not updated' });
  }

  static async sendEmail(req, res) {
    const { email } = req.body;
    const result = await Employee.findOne({ email }); 
    if (Object.keys(result).length <= 0) {
      return res.status(status.NOT_FOUND).json({
        errors: 'email not found..'
      });
    }

    await helper.sendMail(email, 'resetPassword', {
      email,
      names: `${result.firstName} ${result.lastName}`
    }); 

    return res.status(status.OK).json({
      message: 'Email sent, please check your email to reset the password'
    });
  }
}


