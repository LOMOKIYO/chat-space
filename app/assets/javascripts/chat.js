$(function(){
  function buildPost(message){
    var content =  message.text ? `${ message.text }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="message" data-message-id=${message.id}>
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
});

// $(function(){
//   function buildPost(message){
//     var content =  message.text ? `${ message.text }` : "";
//     var img = message.image ? `<img src= ${ message.image }>` : "";
//       var html = `<div class="message" data-message-id=${message.id}>
//                     <div class="upper-message">
//                       <div class="upper-message__user-name">
//                         ${message.user_name}
//                       </div>
//                       <div class="upper-message__date">
//                         ${message.date}
//                       </div>
//                     </div>
//                     <div class="lower-message" >
//                       <div class="lower-message__content">
//                         ${content}
//                       </div>
//                     </div>
                
//                   </div>
//                   <div class="lower-message">
//                     <img class="lower-message__image" src="${img}" >
//                   </div>
//                   </div>`
//                 return html;
//   };

 
//   $('#new_message').on('submit', function(e){
//     e.preventDefault();
//     var formData = new FormData(this);
//     var url = $(this).attr('action');
//     $.ajax({
//       url: url,
//       type: "POST",
//       data: formData,
//       dataType: 'json',
//       processData: false,
//       contentType: false
//     })
//     .done(function(message){
//       var html = buildPost(message);
//       $('.group-chat').append(html)
//       $('.group-chat').animate({scrollTop: $('.group-chat')[0].scrollHeight}, 'fast');   
//       $('form')[0].reset();
//     })
//     .fail(function(){
//       alert('error');
//     });
//     return false;
//   })
// };
