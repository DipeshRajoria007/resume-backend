import express from "express";
import {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/handlerFactory.js";
import AppError from "../utils/AppError.js";
// import all the models
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Product from "../models/productModel.js";

const router = express.Router();

// creating a model object which will contain all the models and then we will pass this object to the param middleware so that we can use the models in the param middleware to check if the model passed in the url params is valid or not and if it is valid then add the model to the request object and also add the controller methods to the request object so that we can use it in the route handlers to perform the CRUD operations on the model passed in the url params.
const models = {
  user: User,
  post: Post,
  product: Product,
};

// creating a controller methods object which will contain all the controller methods for a particular model and then we will pass this object to the route handlers so that we can use the controller methods in the route handlers to perform the CRUD operations on the model passed in the url params.
const getControllerMethods = (Model) => ({
  deleteOne: deleteOne(Model),
  updateOne: updateOne(Model),
  createOne: createOne(Model),
  getOne: getOne(Model),
  getAll: getAll(Model),
});

// creating a param middleware to check if the model is valid or not and if it is valid then add the model to the request object and also add the controller methods to the request object so that we can use it in the route handlers to perform the CRUD operations on the model passed in the url params and if the model is not valid then return an error message to the user saying that the model is invalid and the user should pass a valid model in the url params to perform the CRUD operations on that model and if the model is valid then call the next middleware function in the middleware stack.
router.param("model", (req, res, next, model) => {
  const Model = models[model.toLowerCase()];
  if (!Model) return next(new AppError(`Invalid model: ${model}`, 400));
  req.Model = Model;
  req.controllerMethods = getControllerMethods(Model);
  next();
});

// creating a route handler to perform the CRUD operations on the model passed in the url params.
router
  .route("/:appType/:model")
  .get((req, res, next) => req.controllerMethods.getAll(req, res, next))
  .post((req, res, next) => req.controllerMethods.createOne(req, res, next));

router
  .route("/:appType/:model/:id")
  .get((req, res, next) => req.controllerMethods.getOne(req, res, next))
  .patch((req, res, next) => req.controllerMethods.updateOne(req, res, next))
  .delete((req, res, next) => req.controllerMethods.deleteOne(req, res, next));

export default router;
