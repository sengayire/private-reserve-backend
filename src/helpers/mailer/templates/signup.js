import 'dotenv/config';
import { generate as generateToken } from '../../tokens';

export default ({ email, firstName, lastName }) => {
  const message = {};
  // const token = generateToken({ email }, { expiresIn: '1h' });
  const appUrl = process.env.APP_URL_FRONTEND;
  const singUpLink = `${appUrl}/login`;

  message.subject = 'Activate your account - Private Reserve';
  message.html = `Hello ${firstName} ${lastName} </br>,
  <p>
    You are receiving this because you requested to create an account on Private reserve,
    <br>
    Please, click on the link bellow to activate your account!!!
    <br><br><br>
    <a
      href='${singUpLink}'
      style="margin:35px 0;padding:15px 35px;background: #313030;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
      Activate your account Now
    </a>
  </p>`;

  return message;
};
