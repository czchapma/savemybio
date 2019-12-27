$(document).ready(function(){
  $('#submit').click(function(event) {
    event.preventDefault();
    var eventTitle = $('#event').val();
    var date = $('#date').val();
    var bio = $('#bio').val();
    console.log('bio: ' + bio);
    writeUserData(eventTitle, date, bio);
  });
});
