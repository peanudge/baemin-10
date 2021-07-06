var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('auth/login', { title: 'Login' });
});

/* GET registerTerms page. */
router.get('/registerTerms', function(req, res, next) {
    res.render('auth/registerTerms', { title: 'Register Terms' });
});

/* GET registerPhone page. */
router.get('/registerPhone', function(req, res, next) {
    res.render('auth/registerPhone', { title: 'Register Phone' });
});

/* GET registerDetail page. */
router.get('/registerDetail', function(req, res, next) {
    res.render('auth/registerDetail', { title: 'Register Detail' });
});
  
module.exports = router;