const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('form', {title:'Registration Form'});
});

module.exports = router;