const unverifiedError = () => {
  const error = new Error();
  error.name = 'AccountNotVerified';
  error.type = 'ForbiddenError';

  throw error;
};

module.exports = unverifiedError;
