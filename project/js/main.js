// function showPicture(){
//   // use jQuery ($ is shorthand) to find the div on the page and then change the html
//   // 'rounded-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
//   $("#image").append('<img class="rounded-circle" src="images/high-five.gif"/>');
//   $("p").html("High five! You're building your first web app!");

//   // jQuery can do a lot of crazy stuff, so make sure to Google around to find out more
  
// }

// $(document).ready(function(){
//   getWeather();
// })

$(document).ready(function(){
  getPosts();
})

function getWeather(searchQuery){
  let url = 'https://api.openweathermap.org/data/2.5/weather?q='+searchQuery+'&units=imperial&APPID='+apiKey;
  $.ajax(url,{success: function(data){
    $(".city").text(data.name);
    $(".temp").text(data.main.temp);
    $(".error-message").text("");
  }, error: function(error){
    $(".city").text("");
    $(".temp").text("");
    $('.error-message').text("An error occured");
  }})
}

function searchWeather(){
  let searchQuery = $(".search").val();
  getWeather(searchQuery);
}


//This is for the message app
function handleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.email)
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
}
function addMessage(postTitle, postBody){
  let postData = {
    title: postTitle,
    body: postBody
  }
  var database = firebase.database().ref('posts');
  var newPostRef = database.push();
  newPostRef.set(postData, function(error) {
    if (error) {
      console.log('it did not work')
    } else {
      window.location.reload(true);
    }
  });
}

function handleMessageFormSubmit(){
  let postTitle = $("#post-title").val();
  let postBody = $("#post-body").val();
  console.log(postTitle)
  addMessage(postTitle,postBody);
}

function getPosts(){
  return firebase.database().ref('posts').once('value').then(function(snapshot) {
    var posts = snapshot.val();
    for(var postKey in posts){
      var post = posts[postKey];
      $("#post-listing").append("<div>"+ post.title + " - "+ post.body + "</div>");
    }
  });
  
}