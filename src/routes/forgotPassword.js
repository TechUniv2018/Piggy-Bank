
const mailer = require('nodemailer');
const uuid = require('uuid/v1');
const Models = require('../../models');
const Boom = require('boom');

const forgotPassword = (request, response) => {
  const userName = request.payload.username;
  Models.bankusers.findOne({
    where: {
      userName,
    },
  }).then((result) => {
    console.log(result.userName, request.payload.username);
    const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'digiBank12345@gmail.com',
        pass: 'piggybankMckinsey',
      },
    });
    const token = uuid();
    const url = `http://localhost:3000/#/resetPassword/${token}`;
    const mailOptions = {
      from: 'digiBank@gmail.com',
      to: 'paridhi815@gmail.com',
      subject: 'Paridhi, heres the link to reset your password',
      text: 'Reset Your PassWord!',
      html: `<b>Hello ${userName}, </b><br> To change your DigiBank password, click here or paste the following link into your browser:<br> ${url} <br> This link will expire in 1 hour, so be sure to use it right away.<br>Thank you for using DigiBank!<br>The DigiBank Team :)`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      console.log(userName, token);
      Models.bankusers.update({
        resetCode: token,
      }, {
        where: {
          userName,
        },
      });
      if (error) {
        response(Boom.badRequest(error.message));
      } else {
        response(`Email sent: ${info.response}`);
      }
    });
  }).catch(() => response(Boom.badRequest('Please enter correct UserName as no such User Exists!')));
};

module.exports = [
  {
    method: 'POST',
    path: '/forgot/password',
    config: {
      auth: false,
      tags: ['api'],
      description: 'forgot password api',
      notes: 'forgot password api',
    },
    handler: forgotPassword,
  }];

