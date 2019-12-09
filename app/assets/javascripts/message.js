$(function(){

function buildHTML(message){

  image = message.image ? `</div><img src=${message.image} ></div>`: "";
  
    var html =
     `<div class="message__feed" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          ${image}
        </div>`

    return html;
  }


  $('#new_message').on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);  
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
      $('.form__submit').prop('disabled', false);
    });
    return false;
  })

  var reloadMessages =function() {
    last_message_id = $('.message__feed:last').data("message-id");
      
    
      $.ajax({
        url:"api/messages",
        type: 'get',
        datatype: 'json',
        data: {id: last_message_id}
      })
  
      .done(function(messages) {
        messages.forEach(function(message){
        var html = buildHTML(message);
        $('.messages').append(html);  
      })
      })
      .fail(function() {
        alert('error')
      });
  
      }
  setInterval(reloadMessages, 7000);
});

