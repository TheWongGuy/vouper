$( document ).ready(function() {
	updateVoupCount();
});

function updateVoupCount(){
	firebase.database().ref().child('/voupcount').once('value').then(function(snapshot){
		var count = snapshot.val();
		var options = {
		  useEasing : true,
		  useGrouping : true,
		  separator : ',',
		  decimal : '.',
		  prefix : '',
		  suffix : ''
		};
		var voupCount = new CountUp("voup-count", 0, count, 0, 5, options);
		voupCount.start();
	});
}
