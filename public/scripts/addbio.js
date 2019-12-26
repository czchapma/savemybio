$(document).ready(function(){
  $('#submit').click(function(event) {
    var eventTitle = $('#event').val();
    var date = $('#date').val();
    var bio = $('#bio').val();

    event.preventDefault();
  });
});
