const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('form', {title:'Registration Form'});
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.render('form', { title: 'Registration form' });
});

module.exports = router;