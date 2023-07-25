import Post from "../models/postModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { filterObj } from "../utils/filterObj.js";
import { getAll, getOne } from "./handlerFactory.js";

const getOnePost = getOne(Post);
const getAllPosts = getAll(Post);
export default {
  getOnePost,
  getAllPosts,
};
