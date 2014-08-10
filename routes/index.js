var express = require('express');
var router = express.Router();
var messagelist = null;
var database = require('../database');


/* GET home page. */
router.get('/', function(req, res) {
	//getMessageList();

	database.blogEntries.find({}).sort({time : -1}).skip(0).limit(5).exec(function(err, datum) {
    if (err)
    {
      console.log(err);
      next(); //next will pop out to the rest of the chain, probably giving
      //a 404 error
    }
    //did we find something in the database?
    if (datum && datum[0] ) { 
    	console.log(datum);
      messagelist = datum;
    }
    else
    {
      //next(); //404
    }
    if (messagelist)
  	{
  		
    	res.render('index', { title: 'facebook', list : messagelist});
  	}	
  	else
  	{
  		
   		res.render('index', { title: 'facebook', list : "You are the first to post"});  
  	}

  });
//    setTimeout('', 4000);

    
});



getMessageList = function(){

  database.blogEntries.find({}).sort({time : -1}).skip(0).limit(5).exec(function(err, datum) {
    if (err)
    {
      console.log(err);
      next(); //next will pop out to the rest of the chain, probably giving
      //a 404 error
    }
    //did we find something in the database?
    if (datum && datum[0] ) { 
    	console.log(datum);
      messagelist = datum;
    }
    else
    {
      //next(); //404
    }

  });



};
module.exports = router;
