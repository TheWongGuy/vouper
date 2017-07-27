$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$( document ).ready(function() {
  $('#signoutbutton').click(signOut);
	loadview('slow');
});
