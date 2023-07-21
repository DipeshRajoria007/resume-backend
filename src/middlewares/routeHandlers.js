import express from "express";
const router = express.Router();

const routeHandlers = (req, res) => {
  const { appType, model } = req.params;
  console.log(req.params);
  res.json({ appType, model });
};

router.route("/:appType/:model").get(routeHandlers);
export default router;
