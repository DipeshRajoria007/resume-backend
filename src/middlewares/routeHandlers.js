import express from "express";
import { getOne } from "../controllers/handlerFactory";
const router = express.Router();

const routeHandlers = (req, res) => {
  const { appType, model } = req.params;
  console.log(req.params);
  const data = { appType, model };
  req.body.data = data;
};

export default router;
