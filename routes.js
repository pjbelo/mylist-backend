const router = require("express").Router();

router.get("/", (req, res) =>
  res.send("myList Project Backend, by Paulo Belo")
);

module.exports = router;
