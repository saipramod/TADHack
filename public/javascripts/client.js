//(function(ts,$,undefined){
	var messagetopass;		
	var express = require('socket.io');
    var socket = io.connect('ws://localhost:7080');

			$(document).keypress( function (event) {
				if(event.which == 13) {
					console.log("enter pressed");
					event.preventDefault();
					messagetopass = $('#outgoingChatMessage').val();

					socket.emit('message',$('#outgoingChatMessage').val());

					$('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));


					console.log("you are logged in")
        FB.login(function(response) {
           if (response.authResponse) 
           {
              console.log("message to be posted" + messagetopass);
                FB.api('/me/feed', 'post', {message: messagetopass});
                console.log("message posted" + messagetopass);

                //getUserInfo();
            } else 
            {
             console.log('User cancelled login or did not fully authorize.');
            }
         },{scope: 'publish_actions'});

					$('#outgoingChatMessage').val('');
				}
			});
			socket.on('message', function (data){
				$("#incomingChatMessages").append("</br>"+data);
			});
//})

 window.fbAsyncInit = function() {
    FB.init({
      appId      : '452800381522113', // App ID
      channelUrl: '//localhost/channel.html', // Channel File,
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    }; 
      (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));





//})(window.ts = window.ts || {} , jQuery)
