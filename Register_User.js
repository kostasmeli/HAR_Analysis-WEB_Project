$(function () {

  $('#registration').on('submit', function (e) {
    e.preventDefault();
    
    $.ajax({
      type: 'POST',
      url: 'process.php',
      data: $('#registration').serialize(),
      success: function (data) {
        console.log(data)
      }
    });

  });

});