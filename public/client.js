(function(ts,$,undefined){
    var socket = io.connect('ws://localhost:7080');
    		var usernamegiven;
			$(document).keypress( function (event) {
				usernamegiven = username;
				if(event.which == 13) {
					event.preventDefault();
					socket.emit('username',usernamegiven);
					console.log("I am in client.js");					
					if($('#emergency').prop( "checked" )){
						var message = $('#outgoingChatMessage').val();
						console.log("emergency triggered for email and web");
						if (navigator.geolocation) {
				                navigator.geolocation.getCurrentPosition(showPosition);
				              } 
				              else { 
				                  console.log("Geolocation is not supported by this browser.");
				              }

				              function showPosition(position) {
				                console.log("\n last known latitute:" + position.coords.latitude);
				                console.log("\n last known longitude:" + position.coords.longitude);
				                  message =  message + ",last known latitute:" + position.coords.latitude;
				                  message = message + ",last known longitude:" + position.coords.longitude;
				              socket.emit('message',message);
							socket.emit('emergency',1);	
							
				              }


						
					}
					else{
						if($('#broadcast').prop( "checked" )){
						console.log("broadcast triggered");
						socket.emit('message',$('#outgoingChatMessage').val());
						socket.emit('broadcast',1);	
						}
						else
							socket.emit('message',$('#outgoingChatMessage').val());
					}
					$('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));
					//else{
					//	if($('#broadcast').attr('checked')){
					//	socket.emit('broadcast',1);
					//}
					//}
					//$('#outgoingChatMessage').val('');
				}
			});
			socket.on('message', function (data){
				$("#incomingChatMessages").append("</br>"+data);
			});
})(window.ts = window.ts || {} , jQuery)
