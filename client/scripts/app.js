var app = {

  fetch : function() { 
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: {
        order: "-createdAt"   
      },
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
    setInterval(this.fetch, 1000);
  },

  postToDOM : function(obj){
    $('.chat').remove();
    var array = obj.results;
    for( var i = 0; i < array.length; i++ ){
      var username = $("<div>").addClass("username").text(_.escape(array[i].username));
      var message = $("<div>").addClass("message").text(_.escape(array[i].message));
      var chat = $("<div>").addClass("chat").append(username).append(message);
      $("#main").append(chat);
    }
  },

  send : function(){
    var message = $('#newMessage').val();
    console.log(message);
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
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