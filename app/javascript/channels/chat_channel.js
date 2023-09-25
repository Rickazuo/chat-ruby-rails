import consumer from "channels/consumer";

const ChatChannel = consumer.subscriptions.create("ChatChannel", {
  connected() {
    console.log("Connected to the chat room!");
  },

  disconnected() {
    console.log("Disconnected from the chat room!")
  },

  received(data) {
    $('#messages').append(`<p>${data.sender}: ${data.message}</p>`);
    $('html, body').animate({scrollTop: $(document).height()}, 0);
    console.log("received from the chat room!")
  },

  speak: function(data) {
    console.log("spoke from the chat room!")
    return this.perform('speak', data);
  }
});


// Change turbolinks to DOMContentLoaded
$(document).on('DOMContentLoaded', function () { 
  $("#message_form").on('submit', function(e){
    e.preventDefault();
    let data = {
      message: $('#message_to_sent').val(),
      sender: $('#sender').val()
    }
    if (data.message.length > 0 && data.sender.length > 0) {
      ChatChannel.speak(data);
      $('#message_to_sent').val('')
    }
  });
})
