$(function() {
    $.post('/users?' + $.param({fName:fName, lName:lName}), function() {
      $('<li></li>').text(fName + " " + lName).appendTo('ul#users');
    });
  });
});
