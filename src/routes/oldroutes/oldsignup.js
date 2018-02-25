const Models = require('../../../models');
const BaseJoi = require('joi');
const generateHash = require('../../helpers/generateHash');
const Extension = require('joi-date-extensions');

const Joi = BaseJoi.extend(Extension);

module.exports = [
  {
    method: 'POST',
    path: '/oldusers',
    config: {
      handler: (request, response) => {
        const createUserObject = {};
        createUserObject.userName = request.payload.username;
        createUserObject.firstName = request.payload.firstName;
        createUserObject.lastName = request.payload.lastName;
        createUserObject.fatherName = request.payload.fatherName;
        createUserObject.email = request.payload.email;
        createUserObject.address = request.payload.address;
        createUserObject.dob = request.payload.dob;
        createUserObject.phoneNumber = request.payload.contact;
        createUserObject.gender = request.payload.gender;
        createUserObject.panCardNumber = request.payload.panCard;
        createUserObject.aadharNumber = request.payload.aadhar;
        if (request.payload.password === request.payload.cpassword) {
          generateHash(request.payload.password, 10).then((hashPassword) => {
            createUserObject.password = hashPassword;
            Models.bankusers.create(createUserObject)
              .then(() => {
                const userTokenEntry = {};
                userTokenEntry.userid = createUserObject.userName;
                userTokenEntry.password = createUserObject.password;
                userTokenEntry.token = null;
                return Models.user_authentication.create(userTokenEntry).then(() => response({ statusCode: 200, message: 'Login and enjoy' }))
                  .catch(err => response({ statusCode: 500, message: 'Server error', error: err.message }));
              })
              .catch((err) => {
                if (err.message === 'Validation error') { return response({ statusCode: 401, message: 'Username is taken' }); }
                return response({ statusCode: 500, message: 'Server error', error: err.message });
              });
          });
        } else {
          response({ statusCode: 401, message: 'Passwords don\'t match' });
        }
      },
      validate: {
        payload: Joi.object({
          username: Joi.string().min(5).max(15).regex(/^[a-z][a-zA-Z0-9_]*$/i),
          password: Joi.string().min(6).max(20).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
          firstName: Joi.string().regex(/^[a-zA-Z][a-zA-Z]*$/).required(),
          lastName: Joi.string().regex(/^[a-zA-Z][a-zA-Z]*$/).required(),
          fatherName: Joi.string().regex(/^[a-zA-Z][a-zA-Z ]*$/).required(),
          email: Joi.string().email().required(),
          address: Joi.string().required(),
          aadhar: Joi.string().regex(/^[1-9]{1}[0-9]{11}$/).required(),
          dob: Joi.date().format('DD-MM-YYYY').required(),
          contact: Joi.string().min(10).regex(/^[1-9]{1}[0-9]{9}$/).required(),
          gender: Joi.string().regex(/^(male|female|others)$/i).required(),
          cpassword: Joi.string().min(6).max(20).regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
          panCard: Joi.string().min(10).max(10).regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
            .required(),
        }),
      },
    },
  }];
