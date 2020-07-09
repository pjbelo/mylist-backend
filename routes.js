const router = require("express").Router();
const controllerCategory = require("./controllers/category.controller.js");
const controllerState = require("./controllers/state.controller.js");

// ----------------------------  Home ----------------------------
router.get("/", (req, res) =>
  res.send("myList Project Backend, by Paulo Belo")
);

// ----------------------------  Categories ----------------------------
router.get("/categories", controllerCategory.read);
router.get("/categories/:id", controllerCategory.readID);
router.post("/categories", controllerCategory.create);
router.put("/categories/:id", controllerCategory.update);
router.delete("/categories/:id", controllerCategory.deleteF);

// ----------------------------  States ----------------------------
router.get("/states", controllerState.read);
router.get("/states/:id", controllerState.readID);
router.post("/states", controllerState.create);
router.put("/states/:id", controllerState.update);
router.delete("/states/:id", controllerState.deleteF);

module.exports = router;
