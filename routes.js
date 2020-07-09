const router = require("express").Router();
const controllerCategory = require("./controllers/category.controller.js");
const controllerState = require("./controllers/state.controller.js");
const controllerList = require("./controllers/list.controller.js");
const controllerProduct = require("./controllers/product.controller.js");

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

// ----------------------------  Products ----------------------------
router.get("/products", controllerProduct.read);
router.get("/products2", controllerProduct.read2);
router.get("/products/:id", controllerProduct.readID);
router.post("/products", controllerProduct.create);
router.put("/products/:id", controllerProduct.update);
router.delete("/products/:id", controllerProduct.deleteF);

// ----------------------------  List ----------------------------
router.get("/list", controllerList.read);
router.get("/list2", controllerList.read2);
router.get("/list/:id", controllerList.readID);
router.post("/list", controllerList.create);
router.put("/list/:id", controllerList.update);
router.delete("/list/:id", controllerList.deleteF);

module.exports = router;
