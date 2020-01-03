const nodemailer = require('nodemailer');
const mailConfig = require('./config/auth');
const transporter = nodemailer.createTransport(mailConfig);
const verificationTemplate = require('./templates/verificationTemplate');
const resetTemplate = require('./templates/resetTemplate');
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

class Mailer {


  async sendContactUsMessage(){

    var smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
          user: "antonije25.01.1994@gmail.com",
          pass: "ItachiUsui38"
      }
  });
  
    var mailOptions = {
      from: "antonije25.01.1994@gmail.com",
      to: "ogistdipen@outlook.com",
      subject: 'What i ssubject?',
      text: 'We really need that money boy...'
  }
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          res.redirect('/');
      }
  });
}




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
