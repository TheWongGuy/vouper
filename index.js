var signIn = document.getElementById('sign-in');
var signOut = document.getElementById('sign-out');
var createSession = document.getElementById('create-session');
var joinSession = document.getElementById('join-session');
var continueCreateSession = document.getElementById('continue-create-session');
var continueJoinSession = document.getElementById('continue-join-session');
var start = document.getElementById('start');
var database = firebase.database();



//ON PAGE LOAD
$(document).ready(function(){
	console.log(Cookies.get("lastRoomID"));
	if($("#create-session").is(":visible")){
		$("#create-session-div").hide();
		$("#guest-lobby-div").hide();
		$("#head-lobby-div").hide();
		$("#question-div").hide();
	}
	if($("#join-session").is(":visible")){
		$("#join-session-div").hide();
		$("#guest-lobby-div").hide();
		$("#head-lobby-div").hide();
		$("#question-div").hide();
	}
	if(Cookies.get("lastRoomID") != null){
		leaveGuestLobby(Cookies.get("lastRoomID"));
	}
	
});


signIn.addEventListener("click", function(){
	firebase.auth().signInAnonymously();
});

signOut.addEventListener("click", function(){
	if(Cookies.get("lastRoomID") != null){
		leaveGuestLobby(Cookies.get("lastRoomID"));
	}
	
	firebase.auth().signOut();
	firebase.auth().currentUser.delete().then(function(){
	}, function(error){
		console.log(error);
	});
});

start.addEventListener("click", function(){
	//changes state, 
	$("#head-lobby-div").hide();
	$("#question-div").show();
})

createSession.addEventListener("click", function(){
	$("#create-session").hide();
	$("#join-session").hide();
	$("#create-session-div").show();
	$("#pageHeader").text("Create Session");
});

joinSession.addEventListener("click", function(){
	$("#create-session").hide();
	$("#join-session").hide();
	$("#join-session-div").show();
	$("#pageHeader").text("Join Session");
	$("#join-session-warning-label").text("");
});


function randomString(length){
	var chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}

continueCreateSession.addEventListener("click", function(){
	var question = document.getElementById('session-question').value;
	var option1 = document.getElementById('session-option-1').value;
	var option2 = document.getElementById('session-option-2').value;
	var option3 = document.getElementById('session-option-3').value;
	var option4 = document.getElementById('session-option-4').value;

	if(option1 == ""){
		option1 = "NOQUESTION"
	}
	if(option2 == ""){
		option2 = "NOQUESTION"
	}
	if(option3 == ""){
		option3 = "NOQUESTION"
	}
	if(option4 == ""){
		option4 = "NOQUESTION"
	}


	var roomID = randomString(4);
	
	createRoom(roomID, option1, option2, option3, option4, question, 0, 1);
	
	$("#head-lobby-div").show();
	$("#create-session-div").hide();
	
});

continueJoinSession.addEventListener("click", function(){
	var sessionCode = document.getElementById('session-code').value;
	joinGuestLobby(sessionCode);
});


function createRoom(roomID, option1, option2, option3, option4, question, state, users) {
	var mySnapshot;
  	database.ref('/rooms/').child(roomID).once('value', function(snapshot) {
    	mySnapshot = snapshot.val();
  	}).then(function(){
  		if(mySnapshot == null){
  			writeRoomData(roomID, option1, option2, option3, option4, question, 0, 1);	
  			joinHeadLobby(roomID);
  		}else{
  			var myRoomID = randomString(4);
  			createRoom(myRoomID, option1, option2, option3, option4, question, 0, 1);
  			return true;
  		}
  	});
}

function joinGuestLobby(roomID){
	console.log(roomID);
	Cookies.set("lastRoomID", roomID);
	var mySnapshot;
	database.ref('/rooms/').child(roomID).once('value', function(snapshot){
		mySnapshot = snapshot.val();
	}).then(function(){
		if(mySnapshot == null){
			$("#join-session-warning-label").text("Invalid Session Code");
		}else{
			$("#guest-lobby-div").show();
			$("#join-session-div").hide();
			$("#session-code-label").text(roomID);
			mySnapshot.users = mySnapshot.users + 1;
			database.ref('/rooms/' + roomID).update(mySnapshot);
			$("#guest-user-count-label").text(mySnapshot.users);
			updateUserCountGuest(roomID);
		}
	});
}


function joinHeadLobby(roomID){
	Cookies.set("lastRoomID", roomID);
	var mySnapshot;
	database.ref('/rooms/').child(roomID).once('value', function(snapshot){
		mySnapshot = snapshot.val();
	}).then(function(){
		if(mySnapshot == null){
			$("#join-session-warning-label").text("Invalid Session Code");
		}else{
			$("#head-lobby-div").show();
			$("#create-session-div").hide();
			$("#head-session-code-label").text(roomID);
			mySnapshot.users = 1;
			database.ref('/rooms/' + roomID).update(mySnapshot);
			$("#head-user-count-label").text(mySnapshot.users);
			updateUserCountHead(roomID);
		}
	});
}





function updateUserCountGuest(roomID, dbSnapshot){
	var guestUserCount = database.ref('/rooms/' + roomID + '/users');
	if($("#guest-lobby-div").is(":visible")){
		
		guestUserCount.on('value', function(snapshot){
			$("#guest-user-count-label").text(snapshot.val());
		});

	}else{

		guestUserCount.off('value', function(snapshot){
			$("#guest-user-count-label").text(snapshot.val());
		});
	}
	
}

function updateUserCountHead(roomID, dbSnapshot){
	var guestUserCount = database.ref('/rooms/' + roomID + '/users');
	if($("#head-lobby-div").is(":visible")){
		
		guestUserCount.on('value', function(snapshot){
			$("#head-user-count-label").text(snapshot.val());
		});

	}else{

		guestUserCount.off('value', function(snapshot){
			$("#head-user-count-label").text(snapshot.val());
		});
	}
	
}

function leaveGuestLobby(roomID){
	var mySnapshot;
	database.ref('/rooms/').child(roomID).once('value', function(snapshot){
		mySnapshot = snapshot.val();
	}).then(function(){
		mySnapshot.users = mySnapshot.users - 1;
		database.ref('/rooms/' + roomID).update(mySnapshot);
		$("#guest-lobby-div").hide();			
		Cookies.set("lastRoomID", null);
	});
}


function writeRoomData(roomID, option1, option2, option3, option4, question, state, users){
	
	var obj = {
		[roomID]: {
			"options": {
				[option1]: 0,
				[option2]: 0,
				[option3]: 0,
				[option4]: 0
			},
			"question": question,
			"state": state,
			"users": users
		}
	}
	database.ref('/rooms').update(obj)
}


firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		$("#sign-in").hide();
		$("#sign-out").show();
		$("#create-session").show();
		$("#join-session").show();
		$("#pageHeader").text("Welcome");
	}else{
		$("#sign-in").show();
		$("#sign-out").hide();
		$("#create-session").hide();
		$("#join-session").hide();
		$("#pageHeader").text("Vouper");
		$("#create-session-div").hide();
		$("#join-session-div").hide();
		$("#guest-lobby-div").hide();
		$("#head-lobby-div").hide();

		$("#question-div").hide();
	}
});