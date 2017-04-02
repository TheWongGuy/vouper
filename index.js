var signIn = document.getElementById('sign-in');
var signOut = document.getElementById('sign-out');
var createSession = document.getElementById('create-session');
var joinSession = document.getElementById('join-session');
var continueCreateSession = document.getElementById('continue-create-session');
var database = firebase.database();


//ON PAGE LOAD
$(document).ready(function(){
	if($("#create-session").is(":visible")){
		$("#create-session-div").hide();
	}
});


signIn.addEventListener("click", function(){
	firebase.auth().signInAnonymously();
});

signOut.addEventListener("click", function(){
	firebase.auth().signOut();
	firebase.auth().currentUser.delete().then(function(){
		console.log("deleted");
	}, function(error){
		console.log(error);
	});
});

createSession.addEventListener("click", function(){
	$("#create-session").hide();
	$("#join-session").hide();
	$("#create-session-div").show();
	$("#pageHeader").text("Create Session");
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
	var roomID = randomString(4);
	writeRoomData(roomID, 0, question, option1, option2, option3, option4, 1);

});

function writeRoomData(roomID, option1, option2, option3, option4, question, state, users){
	var obj = {
			[roomID]: {
			"options": {
				"option1": option1,
				"option2": option2,
				"option3": option3,
				"option4": option4
			},
			"question": question,
			"state": state,
			"users": users
		}
	}
	database.ref('/rooms').set(obj)
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
	}
});