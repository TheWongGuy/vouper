$( document ).ready(function() {
  firebase.auth().onAuthStateChanged(authChanged);
});

var authChanged = function(){
  var user = firebase.auth().currentUser;
  if(user){
    checkAuth(user);
  }else{
    checkAuth(user);
  }
}

var checkAuth = function(user){
  if(window.location.pathname == "/app"){
    if(authenticated(user) == false){
      window.location.replace('/');
    }
  }else if(window.location.pathname == "/"){
    if(authenticated(user) == true){
      window.location.replace('/app');
    }
  }
}

var authenticated = function(user){

  if(user == null){
    return false;
  }else if(user != null){
    return true;
  }
}
