//This variable tracks the local view on the computer.
/*
	0 - Landing

*/

$( document ).ready(function() {
  fadeView('slow');
});
function fadeView(speed){
	//Literally fades view
	$('#app-wrapper').hide();
	$('#app-wrapper').fadeIn(speed);
}
