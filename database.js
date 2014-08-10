// Require the nedb module
var Datastore = require('nedb'),
    fs = require('fs');

var blogDirectory = '/data/blog/articles/';
// Initialize a nedb database
var blogEntries = new Datastore({ filename: __dirname + '/data/blog.db', autoload: true });

// Create a "unique" index for the blog title
// without an index - every add operation would add a new row
// and we couldnt query on anything other than _id
blogEntries.ensureIndex({fieldName: 'time', unique: true});

// Load all text files from the blog folder in the database
var articles = fs.readdirSync(__dirname + blogDirectory);

// Insert the blogs in the database - it will read thse files every
// time your node app starts, but because we will check the title
// only unique records will be added

articles.forEach(function(article){

	fs.readFile(__dirname + blogDirectory + article, 'utf8', function(err,contents){ 
		blogEntries.insert({
			name: article,
			message: contents

		}, function(err,datum) {
		
		if (datum) {
			console.log("Saved: " + article + " as record " + datum._id);
		  }
		  else
		  {
			console.log("Skipped: " + article);
		  }
		  
		})
	});
	
	
});

// Make the blog available to the outside code
module.exports = {
    blogEntries: blogEntries
};