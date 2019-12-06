$(function() {
  function appendUser(user) {
    var user = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(user);
  }

  function addNoUser() {
    var user = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(user);
  }

  function listUser(userId,userName) {
    var user =`
      <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
        <input name='group[user_ids][]' type='hidden' value='${userId}'>
        <p class='chat-group-user__name'>${userName}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>
    `;
    $("#chat-group-users").append(user)
  }


  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
      } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  
  });

  $(document).on("click", ".user-search-remove", function () {
    $(this).parent().remove();
  });

  $("#user-search-result").on("click", ".user-search-add",function(){
      var userId = $(this).data('user-id');
      var userName = $(this).data('user-name');
      listUser(userId,userName);
      $(this).parent().remove();
      
    });
});
