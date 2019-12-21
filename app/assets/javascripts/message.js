$(function(){

  function buildHTML(message){
    if　(message.image.url != null ) {
      var html = `<div class="chat--main__message--list__content" data-message-id=`  + message.id + `>` +
                    `<div class="chat--main__message--list__content__top">` +
                      `<div class="user--name">` +
                        message.user_name +
                      `</div>` +
                      `<div class="time--stamp">` +
                        message.created_at +
                      `</div>` +
                    `</div>` +
                    `<p class="chat--main__message--list__content__lower">` +
                      message.body +
                    `</p>` +
                    `<img class="lower-message__image" src=${message.image.url} >` +
                  `</div>`
    } else {
      var html = `<div class="chat--main__message--list__content" data-message-id=`  + message.id + `>` +
                    `<div class="chat--main__message--list__content__top">` +
                      `<div class="user--name">` +
                        message.user_name +
                      `</div>` +
                      `<div class="time--stamp">` +
                        message.created_at +
                      `</div>` +
                    `</div>` +
                  `<p class="chat--main__message--list__content__lower">` +
                    message.body +
                  `</p>` +
                `</div>`
    }
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat--main__message--list').append(html);
      $('.chat--main__message--list').animate({ scrollTop: $('.chat--main__message--list')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.send__btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    last_message_id = $('.chat--main__message--list__content:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
        });
        $('.chat--main__message--list').append(insertHTML);
        $('.chat--main__message--list').animate({ scrollTop: $('.chat--main__message--list')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('.send__btn').prop('disabled', false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
