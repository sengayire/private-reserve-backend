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
    const { id} = req.params;
    const updated = await Employee.update({ status: 'active' }, { id });
    return updated ? res.status(status.OK).json({
      message: `Employee's account ${id} has been activated`
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
    const { id } = req.params;
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

    return errors
      ? res.status(errors.code).json({ errors: errors.errors })
      : (await helper.sendMail(email, 'signup', { email, firstName, lastName }))
          && res.status(status.CREATED).json({
            message: 'check your email to activate your account',
            user: newUser
          });
  }

}

