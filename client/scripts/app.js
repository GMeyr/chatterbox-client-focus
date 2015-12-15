var app = {

  username : decodeURI(window.location.search.slice(window.location.search.indexOf("=") + 1)) ,

  roomname : "lobby",

  fetch : function() { 
    $.ajax({
      url: 'http://127.0.0.1:3000/classes/lobby',
      type: 'GET',
      // data: {
      //   order: "-createdAt"   
      // },
      success: function (data) {
        app.postToDOM(data);
        console.log('chatterbox: Message recieved. Data: ', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send request. Error: ', data);
      }
    });
  },

  init : function() {
    this.fetch();
    setInterval(this.fetch, 10000);
  },

  postToDOM : function(obj){
    $('.chat').remove();
    _.each(obj.results, function(value) {
      var username = $("<div>").addClass("username").text(value.username);
      var message = $("<div>").addClass("message").text(value.text);
      var chat = $("<div>").addClass("chat").append(username).append(message);
      $("#main").append(chat);
    });
  },

  send : function(){
    var message = $('#newMessage').val();
    console.log(message);
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://127.0.0.1:3000/classes/lobby',
      type: 'POST',
      data: JSON.stringify({ text: message, username: app.username, roomname: app.roomname }),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent. Data: ', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  },
  
  updateUsername : function() {
    window.location.search = $('#user-name').value;
    //use jquery to grab text in the textarea
  }

};


app.init();


// var app = new App()
//app.prototype.getData = ...
// App = {};
// App = Object.create({});