import express from "express";
import * as controller from "./controller.js"; // replace with your actual controller path

const router = express.Router();

router
  .route("/:appType/:model")
  .get(controller.getAll)
  .post(controller.createOne);

router
  .route("/:appType/:model/:id")
  .get(controller.getOne)
  .patch(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
