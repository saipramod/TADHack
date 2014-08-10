var express = require('express');
var router = express.Router();
var messagelist = null;
var database = require('../database');

/* GET home page. */
var user;

router.get('/', function(req, res) {

  user = req.query.user || 'none';
  
  res.render('blog2', { title: 'facebook' , description : 'Group Discussion Blog !!!' , usernameis : user});
});


module.exports = router;