function errorHandling(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
}

export default errorHandling;
