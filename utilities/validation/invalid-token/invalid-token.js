const invalidTokenError = () => {
  const error = new Error();
  error.name = 'InvalidToken';
  error.type = 'ForbiddenError';

  throw error;
};

module.exports = invalidTokenError;
