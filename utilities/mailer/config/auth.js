require("dotenv").config();

// module.exports = {
//   host: "smtp.yandex.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "no-reply@uon.rs",
//     type: "OAuth2",
//     clientId: process.env.MAILER_CLIENT_ID,
//     clientSecret: process.env.MAILER_CLIENT_SECRET,
//     accessToken: process.env.MAILER_ACCESS_TOKEN,
//     refreshToken: process.env.MAILER_REFRESH_TOKEN,
//     expires: process.env.MAILER_EXPIRES,
//     accessUrl: "https://oauth.yandex.com/token"
//   }
// };

module.exports = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "antonije25.01.1994@gmail.com",
    pass: "ItachiUsui38"
  }
};
