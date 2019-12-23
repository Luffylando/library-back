const unauthorizedError = () => {
  const error = new Error();
  error.name = 'Unauthorized';
  error.type = 'UnauthoirizedError';

  throw error;
};

module.exports = unauthorizedError;
