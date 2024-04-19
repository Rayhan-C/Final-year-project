const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.session.user;
  res.render('index', { user, title: 'CustomFit', pageTitle: 'Home' });
});

module.exports = router;
