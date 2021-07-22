$(function () {

  $('#registration').on('submit', function (e) {
    e.preventDefault();
    
    $.ajax({
      type: 'POST',
      url: 'Register.php',
      data: $('#registration').serialize(),
      success: function (data) {
        console.log(data)
      }
    });

  });

});