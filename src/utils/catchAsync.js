// catchAsync is a function that wraps another function and catches any errors that might occur when it is run.
// It then passes the error to the next function.
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
