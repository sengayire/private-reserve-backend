import dotenv from 'dotenv';
import mailer from '@sendgrid/mail';
import * as template from './templates';

dotenv.config();

export default async (to, action, data) => {
  const { SENDGRID_API_KEY, EMAIL_SENDER, NODE_ENV } = process.env;

  mailer.setApiKey(SENDGRID_API_KEY);

  const notifier = template[action](data);

  const message = {
    to,
    from: EMAIL_SENDER,
    subject: notifier.subject,
    text: 'Private Reserve',
    html: `<div style="background:#e5eeff;width:100%;padding:20px 0;">
          <div style="max-width:760px;margin:0 auto;background: #eebd22">
          <div style="background: #313030;padding:10px;color:#ffffff;text-align:center;font-size:34px">
           Private Reserve- Developers
          </div>
          <div style="padding:20px;text-align:left;">
          ${notifier.html}
          </div>
          <br>
          <div style="padding:20px;text-align:left;">
          <b> Private Reserve, @Developers team</b>
          </div>
          </div>
          <div style="padding:35px 10px;text-align:center;">
          Copyright, 2019<br>
           Private Reserve, Canada
          </div>
          </div>`
  };
  return NODE_ENV === 'test' ? true : mailer.send(message);
};