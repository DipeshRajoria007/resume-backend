import express from "express";
const router = express.Router();

const routeHandlers = (req, res) => {
  const { appType, model } = req.params;
  console.log(req.params);
  const data = { appType, model };
  req.body.data = data;
  const controller = getController(appType, model);
  if (controller) {
    switch (req.method) {
      case "GET":
        console.log("GET");
        break;
      case "POST":
        console.log("POST");
        break;
      case "PATCH":
        console.log("PATCH");
        break;
      case "DELETE":
        console.log("DELETE");
        break;
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } else {
    return res.status(404).json({ error: "Not found" });
  }
  const getController = (appType, model) => {
  };

};

router.route("/:appType/:model").get(routeHandlers);
router.route("/:appType/:model/user/signup").post(routeHandlers);
export default router;
