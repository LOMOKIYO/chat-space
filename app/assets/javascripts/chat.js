$(document).on('turbolinks:load',function(){
   
    function buildPost(message){
      var content =  message.text ? `${ message.text }` : "";
      var img = message.image ? `<img src= ${ message.image }>` : "";
        var html = `<div class="box" data-message-id=${message.id}>
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                          ${message.date}
                        </div>
                      </div>
                      <div class="lower-message" >
                        <div class="lower-message__content">
                          ${content}
                        </div>
                      </div>
                    </div>
                    <div class="lower-message">
                      ${img}
                    </div>
                    </div>`
                  return html;
    };
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        var html = buildPost(message);
        $('.group-chat').append(html)
        $('.group-chat').animate({scrollTop: $('.group-chat')[0].scrollHeight}, 'fast');   
        $('form')[0].reset();
      })
      .fail(function(){
        alert('error');
      });
      return false;
    })
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.box:last').data("message-id");

        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = ''
          messages.forEach(function (message) {
            insertHTML = buildPost(message);
            $('.group-chat').append(insertHTML);
            $('.group-chat').animate({scrollTop: $('.group-chat')[0].scrollHeight}, 'fast');
          })
        })
        .fail(function(){
          alert('error');
        });
      }
    };
    setInterval(reloadMessages, 5000);
});