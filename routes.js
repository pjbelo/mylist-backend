const router = require("express").Router();
const controllerCategory = require("./controllers/category.controller.js");

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

module.exports = router;
