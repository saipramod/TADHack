$(document).ready(function(){
    
    function Login()
    {
        console.log("you are logged in")
        FB.login(function(response) {
           if (response.authResponse) 
           {
            var message;
            message = $('#outgoingChatMessage').val();
            if (attachlocation){
              console.log("I have entered,gathering gps");


             if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
              } 
              else { 
                  console.log("Geolocation is not supported by this browser.");
              }

              function showPosition(position) {
             //   console.log("\n last known latitute:" + position.coords.latitude);
               // console.log("\n last known longitude:" + position.coords.longitude);
                  message =  message + ",last known latitute:" + position.coords.latitude;
                  message = message + ",last known longitude:" + position.coords.longitude;
                  console.log(message);
                 //     console.log("message to be posted" + message);
                FB.api('/me/feed', 'post', {message: message});
                //console.log("message posted" + $('#outgoingChatMessage').val());
              $('#outgoingChatMessage').val('');              
              }

              attachlocation = false;
            }
            else{

              //console.log("message to be posted" + message);
                FB.api('/me/feed', 'post', {message: message});
               // console.log("message posted" + $('#outgoingChatMessage').val());
              $('#outgoingChatMessage').val('');
            }  
              
                //getUserInfo();
            } 
            else 
            {
             console.log('User cancelled login or did not fully authorize.');
            }
         },{scope: 'publish_actions'});
 
   }


  var attachlocation = false;
    $(document).keypress( function (event) {
        if(event.which == 13) {
          console.log("enter pressed");
          event.preventDefault();
          
          if($('#emergency').prop('checked')){
            Login();
            attachlocation = true;
          }
          else{
            if($('#broadcast').prop('checked')){
              
            Login();
            }
          }
          
        }
      });

});

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

  