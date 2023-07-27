// i want to make a middleware which checks that there is a header as a valid projectId which we have in our database and if there is no header as a valid projectId then we will return an error message to the user saying that the projectId is invalid and the user should pass a valid projectId in the header to perform the CRUD operations on that project and if there is a header as a valid projectId then we will add the project to the request object and also add the controller methods to the request object so that we can use it in the route handlers to perform the CRUD operations on the project passed in the header and if the projectId is valid then call the next middleware function in the middleware stack.

import AppError from "../utils/AppError.js";

const checkProjectId = (req, res, next) => {
  const projectId = req.headers.projectid;
  if (!projectId) {
    return next(new AppError(`Invalid project id`, 400));
  }
  req.body.projectId = projectId;
  next();
};

export default checkProjectId;
