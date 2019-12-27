$(document).ready(function(){

  // $('#bios').hide();
  // $('#add-bio').hide();
  // $('#add-bio-button').hide();
  $('#signout').click(function(event) {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  });
  $('#get_started').click(function(event) {
    login();
  });

  $('#submit').click(function(event) {
    event.preventDefault();
    var eventTitle = $('#event').val();
    var date = $('#date').val();
    var bio = $('#bio').val();
    console.log('bio: ' + bio);
    writeUserData(eventTitle, date, bio);
  });

  $('#add-bio-button').click(function(event) {
    $('#add-bio').show();
  });
});

function writeUserData(eventName, eventDate, eventBio) {
  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
    var userId = user.uid;
    var ref = firebase.database().ref();
    var key = ref.child('users').child(userId).push().key;
    firebase.database().ref('users/' + userId + '/' + key).set({
      event: eventName,
      date: eventDate,
      bio : eventBio
    });
    $('#add-bio').hide();
    $('#event').val('');
    $('#date').val('');
    $('#bio').val('');
    fetchBiosForUser();
  } else {
    console.log('not signed in');
  }
}
function fetchBiosForUser() {
  var userId = firebase.auth().currentUser.uid;
  $('#bios').show();
  $('#bios').empty();
  $('#bios').append('<p id="placeholder-text">You have not added any bios yet. To add a bio, click the button above.</p>');
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        $('#placeholder-text').hide();
        var data = childSnapshot.val();
        var eventName = data.event;
        var date = data.date;
        var bio = data.bio;
        console.log('event ' + eventName + ", date: " + date + ", bio: " + bio);
        $('#bios').append('<h2>' + eventName + '</h2><p class="date">' + date + '</p><p class="bio">' + bio + '</p><hr/>');
      });
  });
}

function login() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    console.log('token: ' + token);

    // The signed-in user info.
    var user = result.user;
    var name = user.displayName;
    var email = user.email;
    var photoUrl = user.photoURL;
    var emailVerified = user.emailVerified;
    var uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.

    console.log('Successful login! User info: ' +  name);


    firebase.auth().onAuthStateChanged(function(user) {
    if (firebase.auth().currentUser) {
      $('#get_started').hide();
      $('#add-bio-button').show();
      fetchBiosForUser();
    } else {
      // No user is signed in.
    }
  });

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('errorCode: ' + errorCode);
    console.log('errorMessage: ' + errorMessage);
    // The email of the user's account used.
    var email = error.email;
    console.log('email: ' + email);

    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log('credential: ' + credential);

  });

 }
