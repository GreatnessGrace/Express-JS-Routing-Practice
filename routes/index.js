const router = require("express").Router();

// Making  a router : -
router.get("/home", (req, res) => {
  res.render("home", {
    title: "Our Home Page",
  });
});

router.get("/secondary", (req, res) => {
  res.render("secondary");
});

module.exports = router;
