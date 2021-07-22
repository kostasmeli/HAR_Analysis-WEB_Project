$(function () {
  /*$.ajax({
    type:'GET',
    url:'SessionCheck.php',
    success:function(){
      
    }
  }); */
  $('#login').on('submit', function (e) {
    e.preventDefault();
    
    $.ajax({
      type: 'POST',
      url: 'Login.php',
      data: $('#login').serialize(),
      success: function (data) {
        console.log(data)
        if(data.match("logged in successfully")){
          window.location.href="/UploadFile.html";
        }
      }
    });

  });

});