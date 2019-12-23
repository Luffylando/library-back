const validator = require('email-validator');

const emailValidator = email => {
  if (!validator.validate(email)) {
    const error = new Error();
    error.name = 'ValidationError';
    error.type = 'InputValidation';
    error.data = {
      email: {
        message: 'Email is invalid!',
        code: 'EMAIL_VALIDATION_ERR'
      }
    };
    error.statusCode = 400;

    throw error;
  }
  return true;
};

const emailNotUnique = () => {
  const error = new Error();
  error.name = 'ValidationError';
  error.type = 'DuplicateField';
  error.data = {
    email: {
      message: 'Email must be unique!',
      code: 'DUPLICATE_FIELD_ERR'
    }
  };
  error.statusCode = 400;

  throw error;
};

module.exports = { emailValidator, emailNotUnique };
