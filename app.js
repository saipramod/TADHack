var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./database');
var socket = require('socket.io');
var routes = require('./routes/index');
var users = require('./routes/users');
var blog = require('./routes/blog');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();

var server = app.listen(7080);
var io = require('socket.io').listen(server);

var connections = [];
transmitMessage = function(socketToAvoid,data)
{
  var blogEntry = {user:"sai",message:data,time:new Date().getTime()};
  //save to the database
  database.blogEntries.insert(blogEntry, function(err,datum) {
    if (err)
      //res.send(err);
      console.log(err);
  });
    for (var c = 0; c < connections.length; c++)
        {
            if (connections[c] != socketToAvoid){
               connections[c].emit('message', data);
           }
        }
}

clientDisconnected = function(socket){
    //console.log('client disconnected');
    var index = connections.indexOf(socket);
        connections.splice(index, 1); //remove element when disconnect
};

broadCastMessage = function(data){
  //call the phone message api;
  var key = 'b7fffd74';
  var secret = '9dba189e';
  var senderID = '12135455010';
  var destination_number = '13127148774';
  var messagebody = data.replace(" " , "+");
  var url = "http://rest.nexmo.com/sms/xml?api_key="+key+"&api_secret="+secret+"&from="+senderID+"&to="+destination_number+"&text="+messagebody;
  console.log(url);
  var client = new XMLHttpRequest();
  client.open("POST", url, true);
  //client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //client.setRequestHeader("Connection", "close");
  client.send("data=" + encodeURIComponent(data));  
};
var nodemailer = require('nodemailer');
smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "saipramod43@gmail.com",
        pass: "Ashwini#31"
    }
});




sendmail = function (message){

  //fromwho  = fromwho   || 'none';
  //  email  = email || 'none';
    header = "onemange@gmail.com";
    message = message || 'none';
  var mailOptions = {
                from: header,
                to: "saipramod34@gmail.com",
                subject: "Distress Call from " + name,
                text: message
            };
            smtpTransport.sendMail(mailOptions, function(err, response) {
                if (err) {
                    console.log(JSON.stringify(err));
                    //emailMsg.errorMsg = JSON.stringify(err);
                    //logger.error("error sending email: " + util.format(emailMsg));
                } else {
                    console.log("message sent");
                    //emailMsg.sent = true;
                    //logger.info("message sent: " + util.format(emailMsg));
                }
                
            });
}
  




var name;
clientConnected = function(socket){
    
    var datatobeposted;
    connections.push(socket);
    socket.on('username',function(data){
      name = data;
    });
    socket.on('message',function(data){
        transmitMessage(socket,name + " says:" + data);
        datatobeposted = data;
        
  //      postToFB();
    });
    socket.on('emergency',function(data){
 //     var location = "\nlast known location is" + data;
      broadCastMessage(datatobeposted);
      sendmail(datatobeposted);
    });
    socket.on('broadcast',function(data){
      broadCastMessage(datatobeposted);
      sendmail(datatobeposted);

    });

    socket.on('disconnect',clientDisconnected);

};
io.sockets.on('connection',clientConnected);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(io);
app.use('/', routes);
app.use('/users', users);
app.use('/blog', blog);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
