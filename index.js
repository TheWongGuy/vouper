var signIn = document.getElementById('sign-in');
var signOut = document.getElementById('sign-out');
var createSession = document.getElementById('create-session');
var joinSession = document.getElementById('join-session');
var continueCreateSession = document.getElementById('continue-create-session');
var continueJoinSession = document.getElementById('continue-join-session');
var startSession = document.getElementById('start-session');
var database = firebase.database();
var answer1 = document.getElementById('answer1');
var answer2 = document.getElementById('answer2');
var answer3 = document.getElementById('answer3');
var answer4 = document.getElementById('answer4');
var sum;

//ON PAGE LOAD
$(document).ready(function(){
	console.log(Cookies.get("lastRoomID"));
	if($("#create-session").is(":visible")){
		$("#create-session-div").hide();
		$("#guest-lobby-div").hide();
		$("#head-lobby-div").hide();
		$("#question-div").hide();
		$("#results-div").hide();
		$("#sign-out").show();
	}
	if($("#join-session").is(":visible")){
		$("#join-session-div").hide();
		$("#guest-lobby-div").hide();
		$("#head-lobby-div").hide();
		$("#question-div").hide();
		$("#results-div").hide();
		$("#sign-out").show();
	}
	if(Cookies.get("lastRoomID") != null){
		leaveGuestLobby(Cookies.get("lastRoomID"));
	}

	sum = 1;
	
});

answer1.addEventListener("click", function(){

	database.ref('/rooms/' + Cookies.get("lastRoomID")).child('options').once('value', function(snapshot){
		mySnapshot = snapshot.val();

		var arr = $.map(mySnapshot, function(el) { return el });
		arr[0] = arr[0] + 1;

		var roption1 = $("#answer1").text();
		var roption2 = $("#answer2").text();
		var roption3 = $("#answer3").text();
		var roption4 = $("#answer4").text();

		

		var obj = {

				[roption1]: arr[0],
				[roption2]: arr[1],
				[roption3]: arr[2],
				[roption4]: arr[3]
		
		}
		var result = JSON.parse(JSON.stringify(obj));
		database.ref('/rooms/' + Cookies.get("lastRoomID")).child('options').set(result);
	});

	results();

	answer1.disabled = true;
	answer2.disabled = true;
	answer3.disabled = true;
	answer4.disabled = true;
	listenForStateChange(Cookies.get("lastRoomID"));
});

answer2.addEventListener("click", function(){

	database.ref('/rooms/' + Cookies.get("lastRoomID")).child('options').once('value', function(snapshot){
		mySnapshot = snapshot.val();

		var arr = $.map(mySnapshot, function(el) { return el });
		arr[1] = arr[1] + 1;
		var roption1 = $("#answer1").text();
		var roption2 = $("#answer2").text();
		var roption3 = $("#answer3").text();
		var roption4 = $("#answer4").text();

		


		var obj = {
	
				[roption1]: arr[0],
				[roption2]: arr[1],
				[roption3]: arr[2],
				[roption4]: arr[3]
		
		}
		var result = JSON.parse(JSON.stringify(obj));
		database.ref('/rooms/' + Cookies.get("lastRoomID")).child('options').set(result);
	});

	results();
	answer1.disabled = true;
	answer2.disabled = true;
	answer3.disabled = true;
	answer4.disabled = true;
	listenForStateChange(Cookies.get("lastRoomID"));
});
answer3.addEventListener("click", function(){

	database.ref('/rooms/' + Cookies.get("lastRoomID")).child('options').once('value', function(snapshot){
		mySnapshot = snapshot.val();

		var arr = $.map(mySnapshot, function(el) { return el });
		arr[2] = arr[2] + 1;
		var roption1 = $("#answer1").text();
		var roption2 = $("#answer2").text();
		var roption3 = $("#answer3").text();
		var roption4 = $("#answer4").text();

		


		var obj = {
			
				[roption1]: arr[0],
				[roption2]: arr[1],
				[roption3]: arr[2],
				[roption4]: arr[3]
		
		}
		var result = JSON.parse(JSON.stringify(obj));
		database.ref('/rooms/' + Cookies.get("lastRoomID")).child('options').set(result);
	});

	results();
	answer1.disabled = true;
	answer2.disabled = true;
	answer3.disabled = true;
	answer4.disabled = true;
	listenForStateChange(Cookies.get("lastRoomID"));
});
answer4.addEventListener("click", function(){

	database.ref('/rooms/' + Cookies.get("lastRoomID")).child('options').once('value', function(snapshot){
		mySnapshot = snapshot.val();

		var arr = $.map(mySnapshot, function(el) { return el });
		arr[3] = arr[3] + 1;
		var roption1 = $("#answer1").text();
		var roption2 = $("#answer2").text();
		var roption3 = $("#answer3").text();
		var roption4 = $("#answer4").text();

		


		var obj = {
			
				[roption1]: arr[0],
				[roption2]: arr[1],
				[roption3]: arr[2],
				[roption4]: arr[3]
		
		}
		var result = JSON.parse(JSON.stringify(obj));
		database.ref('/rooms/' + Cookies.get("lastRoomID")).child('options').set(result);
	});
	results();
	answer1.disabled = true;
	answer2.disabled = true;
	answer3.disabled = true;
	answer4.disabled = true;
	listenForStateChange(Cookies.get("lastRoomID"));
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

function startVoting(roomID){
	var mySnapshot;
  	database.ref('/rooms/').child(roomID).once('value', function(snapshot) {
    	mySnapshot = snapshot.val();
  	}).then(function(){
  		mySnapshot.state = 1;
  		database.ref('/rooms/' + roomID).update(mySnapshot);
  	});
}



function results(){

	database.ref('/rooms/'+Cookies.get("lastRoomID")).child('options').once('value', function(snapshot){
		mySnapshot = snapshot.val();
		var keys = [];
		for(var i in mySnapshot){
			var val = mySnapshot[i];

			sum = sum + val;


		}
		
		database.ref('/rooms/'+Cookies.get("lastRoomID") + '/users').once('value', function(snapshot){
			superSnap = snapshot.val();
			if(sum >= superSnap){
				var mySnapshot;
			  	database.ref('/rooms/').child(Cookies.get("lastRoomID")).once('value', function(snapshot) {
			    	mySnapshot = snapshot.val();
			  	}).then(function(){

			  		mySnapshot.state = 2;

			  		database.ref('/rooms/' + Cookies.get("lastRoomID")).update(mySnapshot);
			  	});
			}
		});
		

	});
	
}

function listenForStateChange(roomID){
	var state = database.ref('/rooms/' + roomID + '/state');

	state.on('value', function(snapshot){
		var currentState = snapshot.val();
		if(currentState == 1){
			$("#question-div").show();
			$("#guest-lobby-div").hide();
			database.ref('/rooms/' + roomID).child('question').once('value', function(snapshot){
				mySnapshot = snapshot.val();
				$("#pageHeader").text(mySnapshot);
			});
			$("#question-label").text("");
			if(Cookies.get("lastRoomID") != null){
				getChoices(Cookies.get("lastRoomID"));
			}
		}else if(currentState == 2){
			$("#pageHeader").text("Results");
			$("#question-div").hide();
			$("#results-div").show();
			$("#guest-lobby-div").hide();
			var question = database.ref('/rooms/' + roomID + '/question');
			question.once('value', function(snapshot){
				var thisQuestion = snapshot.val();
				$("#results-question-label").text(thisQuestion)
			});
			
			var answers = database.ref('/rooms/' + roomID + '/options');
			answers.once('value', function(snapshot){
				answers = snapshot.val();
				ans = [];
				var i = 0;
				for(g in answers){
					ans[i] = g;
					i++;
				}
				
		


			});
			

			$("#question-1").text(ans[0]);
			$("#question-2").text(ans[1]);
			$("#question-3").text(ans[2]);
			$("#question-4").text(ans[3]);

		
			database.ref('/rooms/'+roomID).child('options').once('value', function(snapshot){
				mySnapshot = snapshot.val();
				var keys = [];
				var vals = [];
				for(var i in mySnapshot){
					var val = mySnapshot[i];
					vals.push(val);
				}

				$("#result1").text(vals[0]);
				$("#result2").text(vals[1]);
				$("#result3").text(vals[2]);
				$("#result4").text(vals[3]);


			});
		}

	});

}

startSession.addEventListener("click", function(){
	//changes state, 
	startVoting(Cookies.get("lastRoomID"));
	$("#head-lobby-div").hide();
	$("#question-div").show();
	if(Cookies.get("lastRoomID") != null){
		getChoices(Cookies.get("lastRoomID"));
	}
	database.ref('/rooms/' + Cookies.get("lastRoomID")).child('question').once('value', function(snapshot){
		mySnapshot = snapshot.val();
		$("#pageHeader").text(mySnapshot);
	});
	$("#question-label").text("")

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
			listenForStateChange(roomID);
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


function getChoices(roomID){
	database.ref('/rooms/'+roomID).child('options').once('value', function(snapshot){
		mySnapshot = snapshot.val();
		var keys = [];
		var vals = [];
		for(var i in mySnapshot){
			var key = i;
			keys.push(key);
		}

		$("#answer1").text(keys[0]);
		$("#answer2").text(keys[1]);
		$("#answer3").text(keys[2]);
		$("#answer4").text(keys[3]);


		
		if(keys[0] == "NOQUESTION"){
			$("#answer1").text("");

		}
		if(keys[1] == "NOQUESTION"){
			$("#answer2").text("");

		}
		if(keys[2] == "NOQUESTION"){
			$("#answer3").text("");

		}
		if(keys[3] == "NOQUESTION"){
			$("#answer4").text("");
	
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
		$("#results-div").hide();
	}
});