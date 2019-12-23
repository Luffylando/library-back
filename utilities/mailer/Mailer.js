const nodemailer = require('nodemailer');
const mailConfig = require('./config/auth');
const transporter = nodemailer.createTransport(mailConfig);
const verificationTemplate = require('./templates/verificationTemplate');
const resetTemplate = require('./templates/resetTemplate');
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

class Mailer {
  sendVerificationEmail(id, email, verificationToken) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(
        verificationTemplate(
          mailConfig.auth.user,
          email,
          clientUrl,
          id,
          verificationToken
        ),
        (err, info) => {
          err
            ? reject(err)
            : resolve({
                message: 'Verification email sent.',
                messageId: info.messageId
              });
        }
      );
    });
  }
  sendResetEmail(id, email, resetToken) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(
        resetTemplate(mailConfig.auth.user, email, clientUrl, id, resetToken),
        (err, info) => {
          err
            ? reject(err)
            : resolve({
                message: 'Reset email sent.',
                messageId: info.messageId
              });
        }
      );
    });
  }
}

module.exports = new Mailer();
