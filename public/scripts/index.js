$(document).ready(function(){
  $('#get_started').click(function(event) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log('token: ' + token);

      // The signed-in user info.
      var user = result.user;
      console.log('Successful login! User info: ' +  user);
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

    //window.location.href = 'addbio.html';
  });
});
