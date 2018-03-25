

const mailer = require('nodemailer');
const crypto = require('crypto');
// const html = require('../views/html/forgotPassword.html');
const generateToken = () => {
  // create the random token
  crypto.randomBytes(20, (err, buffer) => {
    const token = buffer.toString('hex');
    return (token);
  });
};

const forgotPassword = (request, response) => {
  const userName = request.payload.username;
  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pari815@gmail.com',
      pass: 'paramparapari',
    },
  });
  const token = generateToken();
  const mailOptions = {
    from: 'pari815@gmail.com',
    to: 'paridhi815@gmail.com',
    subject: 'Paridhi, heres the link to reset your password',
    text: 'That was easy!',
    // html,
    html: `<b>Hello ${userName}, </b><br> To change your DigiBank password, click here or paste the following link into your browser:<br> url <br> This link will expire in 24 hours, so be sure to use it right away.<br>Thank you for using DigiBank!<br>The DigiBank Team :)`,
    context: {
      url: `http://localhost:3000/auth/reset_password?token=${token}`,
      //   name: user.fullName.split(' ')[0],
      name: 'paridhi',
    },
    resetUrl: 'http;//localhost:3000/password_rest/000000000001|afdaevdae353',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      response(error);
    } else {
      response(`Email sent: ${info.response}`);
    }
  });
};

const headerValidation = require('../validations/header');

module.exports = [
  {
    method: 'POST',
    path: '/resetPassword',
    config: {
      auth: 'jwt',
      tags: ['api'],
      description: 'password reset api',
      notes: 'password reset api',
      validate: {
        headers: headerValidation,
      },
    },
    handler: forgotPassword,
  }];


//   function(done) {
//     User.findOne({
//       email: req.body.email
//     }).exec(function(err, user) {
//       if (user) {
//         done(err, user);
//       } else {
//         done('User not found.');
//       }
//     });
//   },
