$(function() {

  var search_list = $("#user-search-result");

  function appendUser(user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`;
    search_list.append(html);
  }

  function appendNoUser() {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`;
    search_list.append(html);
  }

  var group_list = $("#chat-group-users");

  function  addGroupUser(name, id) {
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value=${id}>  
              <p class='chat-group-user__name'>${name}</p>
              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
            </div>
            `
    group_list.append(html)
  }

  $('#user-search-field').on("keyup", function() {
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      search_list.empty();
      if (users.length != 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        appendNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  });
  $(document).on('click', '.chat-group-user__btn--add', function(){
    var id =  $(this).attr('data-user-id');
    var name =  $(this).attr('data-user-name');
    $(this).parent().remove();
    addGroupUser(name, id)
  });
  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });
});
