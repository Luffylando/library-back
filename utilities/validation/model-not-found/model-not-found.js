const modelNotFoundError = () => {
  const error = new Error();
  error.name = 'ModelNotFound';
  error.type = 'NotFoundError';

  throw error;
};

module.exports = modelNotFoundError;
