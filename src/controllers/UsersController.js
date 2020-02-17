import 'dotenv/config';
import { User, Profile } from '../queries';
import * as helper from '../helpers';
import status from '../config/status';
import * as validate from '../helpers/validation';

export default class UsersController {
  static async create(req, res) {
    const newProfile = await Profile.create(req.body);
    return !newProfile.errors
      ? res.status(status.CREATED).json({
          message: `Information saved successfully`,
          profile: newProfile,
        })
      : res.status(status.BAD_REQUEST).json({
          error: 'Information have not saved ',
        });
  }

  static async getAllProfile(req, res) {
    const getProfiles = await Profile.findAll();
    const allProfiles = getProfiles.map(profile => profile);
    return !allProfiles.errors
      ? res.status(status.OK).json({
          message: 'All profiles',
          profiles: allProfiles,
        })
      : res.status(status.BAD_REQUEST).json({
          error: 'Unable to retrieve all profiles',
        });
  }
  static async getOneProfile(req, res) {
    const { id } = req.params;
    const getProfile = await Profile.findOne({ id });
    console.log('profile', getProfile);
    return !getProfile.errors
      ? res.status(status.OK).json({
          message: 'user profile',
          profile: getProfile,
        })
      : res.status(status.BAD_REQUEST).json({
          error: 'Unable to retrieve profile',
        });
  }
  static async createAdDetails(req, res) {
    const adDetails = await Profile.adDetails(req.body);
    console.log('profile here', adDetails);
    return !adDetails.errors
      ? res.status(status.CREATED).json({
          message: `Information saved successfully`,
          info: adDetails,
        })
      : res.status(status.BAD_REQUEST).json({
          error: 'Information have not saved ',
        });
  }

  static async activate(req, res) {
    const {
      params: { id },
      user: { email },
    } = req;
    const updated = await Employee.update(
      { status: 'active' },
      { email } || { id },
    );
    return updated
      ? res.status(status.OK).json({
          message: `Account activated successfully`,
        })
      : res.status(status.SERVER_ERROR).json({
          error: 'Employee account has not updated',
        });
  }
  static async suspend(req, res) {
    const { id } = req.params;
    const updated = await Employee.update({ status: 'inactive' }, { id });
    return updated
      ? res.status(status.OK).json({
          message: `Employee's account ${id} has been suspended`,
        })
      : res.status(status.SERVER_ERROR).json({
          error: 'Employee account has not updated',
        });
  }

  static async signup(req, res) {
    const { email, firstName, lastName } = req.body;
    req.body.password = helper.password.hash(req.body.password);
    const newUser = await User.create(req.body);
    const errors = newUser.errors
      ? helper.checkCreateOrUpdateEmployee(newUser.errors)
      : null;
    delete newUser.password;
    return errors
      ? res.status(errors.code).json({ errors: errors.errors })
      : (await helper.sendMail(email, 'signup', {
          email,
          firstName,
          lastName,
        })) &&
          res.status(status.CREATED).json({
            message: 'check your email to activate your account',
            user: newUser,
          });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (Object.keys(checkUser).length) {
      const comparePassword = helper.password.compare(
        password,
        checkUser.password || '',
      );
      if (!comparePassword) {
        return res.status(status.UNAUTHORIZED).json({
          errors: { credentials: 'The credentials you provided are incorrect' },
        });
      }
      const payload = {
        id: checkUser.id,
        role: checkUser.role,
        permissions: checkUser.permissions,
      };
      const token = helper.token.generate(payload);
      delete checkUser.password;
      return res.status(status.OK).json({
        message: 'signIn successfully',
        user: checkUser,
        token,
      });
    }
    return res.status(status.UNAUTHORIZED).json({
      errors: { credentials: 'The credentials you provided are incorrect' },
    });
  }

  static async updatePassword(req, res) {
    const token = req.body.token || req.params.token;
    const { passwordOne, passwordTwo } = req.body;

    if (passwordOne !== passwordTwo) {
      return res
        .status(status.BAD_REQUEST)
        .json({ errors: 'Passwords are not matching' });
    }

    if (!req.body.passwordOne || !req.body.passwordTwo) {
      return res
        .status(status.BAD_REQUEST)
        .json({ errors: 'the password can not be empty' });
    }

    const isPasswordValid = validate.password(passwordOne, 'required');
    const isPasswordValidTwo = validate.password(passwordTwo, 'required');

    if (isPasswordValid.length || isPasswordValidTwo.length) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: isPasswordValid[0] });
    }
    const { email } = helper.token.decode(token);
    const isUpdated = await Employee.update(
      { password: helper.password.hash(passwordOne) },
      { email },
    );
    delete isUpdated.password;
    return isUpdated
      ? res.status(status.OK).json({
          isUpdated,
          message: 'Success!!! your password has been changed.',
        })
      : res
          .status(status.NOT_MODIFIED)
          .json({ errors: 'Password not updated' });
  }

  static async sendEmail(req, res) {
    const { email } = req.body;
    const result = await User.findOne({ email });
    if (!Object.keys(result).length) {
      return res.status(status.NOT_FOUND).json({
        errors: 'email not found..',
      });
    }

    await helper.sendMail(email, 'resetPassword', {
      email,
      names: `${result.firstName} ${result.lastName}`,
    });
    return res.status(status.OK).json({
      message: 'Email sent, please check your email to reset the password',
    });
  }
}
