import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// Accepts a Model and returns a function that accepts a req, res, next and performs the delete operation on the Model and sends the response to the client.
export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

// Accepts a Model and returns a function that accepts a req, res, next and performs the update operation on the Model and sends the response to the client.
export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// Accepts a Model and returns a function that accepts a req, res, next and performs the create operation on the Model and sends the response to the client.
export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// Accepts a Model and returns a function that accepts a req, res, next and performs the get operation using model._id and sends the response to the client.
export const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id, appType } = req.params;
    const query = Model.findOne({ _id: id, appType });
    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// Accepts a Model and returns a function that accepts a req, res, next which returns the list of that model with relevenant appType as a response to the client.
export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const { appType } = req.params;
    const query = Model.find({ appType });
    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

// export const addOne = (Model) => async (req, res, next) => {
//   try {
//     const doc = await Model.create(req.body);
//     res.status(201).json({
//       status: "success",
//       data: {
//         data: doc,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export default {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
