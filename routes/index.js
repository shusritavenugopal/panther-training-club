// Route handlers
const express = require('express');
const router = express.Router()

router.get("/", function(req, res) {
  res.render("index.ejs");
});


module.exports = router;