import 'dotenv/config';

export default ({ email, firstName, lastName }) => {
  const message = {};
  const appUrl = process.env.APP_URL_BACKEND;
  const loginLink = `${appUrl}/api/v1/auth/login`;

  message.subject = 'Employment - Awesomity';
  message.html = `Hello ${firstName} ${lastName} </br>,
  <p>
   We are excited to inform you that you have joined Awesomity as new employee,
    <br>
    <br><br><br>
    <a
      href='${loginLink}'
      style="margin:35px 0;padding:15px 35px;background:#266cef;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
      Login to Awesomity
    </a>
  </p>`;

  return message;
};
