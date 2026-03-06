function GoLogin() {
  location.href = 'html/joinForm.html';
}

function onWriteSubmit() {
  if ($('#creator_id').val().trim() == '') {
    var message = '아이디를 입력해 주세요.';
    $('#creator_id').val('');
    $('#creator_id').focus();
    alert(message);
    return false;
  }
  if ($('#title').val().trim() == '') {
    var message = '제목을 입력해 주세요.';
    $('#title').val('');
    $('#title').focus();
    alert(message);
    return false;
  }
  if ($('#content').val().trim() == '') {
    var message = '본문 내용을 입력해 주세요.';
    $('#content').val('');
    $('#content').focus();
    alert(message);
    return false;
  }
  if ($('#passwd').val().trim() == '') {
    var message = '비밀번호를 입력해 주세요.';
    $('#passwd').val('');
    $('#passwd').focus();
    alert(message);
    return false;
  }
}

function test() {
  alert('hello word');
}
