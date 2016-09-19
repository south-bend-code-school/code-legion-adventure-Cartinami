(function(){
  $(document).ready(init);

  var username = "Unknown User";
  var gameState = "newgame";

  function init(){
    /*The following snippet of code will give the basic version of the Facebook SDK
    where the options are set to their most common defaults.
    You should insert it directly after the opening <body> tag
    on each page you want to load it:*/
    //login to facebook
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1467251056622138',
        xfbml      : true,
        version    : 'v2.7'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
    //END Facebook

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDEMt0LpJ-vhQlB9RaOBMGtLY3o66jqqCI",
      authDomain: "adventure-d2493.firebaseapp.com",
      databaseURL: "https://adventure-d2493.firebaseio.com",
      storageBucket: "adventure-d2493.appspot.com",
    };
    firebase.initializeApp(config);

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      username = user.displayName;

      setGameState("welcome");

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

    });


  }

  function setInputControls() {

  }

  function setGameState(state){
    switch(state)
    {
        case "welcome":
          $("#game").load( "screens/intro.html", function() {
            $("#playername").append(username);
            $("#btn1").unbind();
            $("#btn2").unbind();
            $("#btn3").unbind();
            $("#btn1").click(function() {setGameState("house")});
            $("#btn1").html("Break into the house");
            $("#btn2").click(function() {setGameState("dead")});
            $("#btn2").html("Look under the mat");
            $("#btn3").click(function() {setGameState("dead")});
            $("#btn3").html("Check the mail");
          } );
          break;

        case "house":
          $("#game").load( "screens/house.html", function() {
            $("#btn1").unbind();
            $("#btn2").unbind();
            $("#btn3").unbind();
            $("#btn1").click(function() {setGameState("dead")});
            $("#btn1").html("Go upstairs");
            $("#btn2").click(function() {setGameState("dead")});
            $("#btn2").html("Go into kitchen");
            $("#btn3").click(function() {setGameState("welcome")});
            $("#btn3").html("Go outside");
          } );
          break;
        case "dead":
          $("#game").load( "screens/dead.html", function() {
            $("#playername").append(username);
            $("#btn1").unbind();
            $("#btn2").unbind();
            $("#btn3").unbind();
            $("#btn1").click(function() {setGameState("welcome")});
            $("#btn1").html("Restart");
            $("#btn2").click(function() {setGameState("welcome")});
            $("#btn2").html("Restart");
            $("#btn3").click(function() {setGameState("welcome")});
            $("#btn3").html("Restart");
          } );
          break;

    }
  }

})();
