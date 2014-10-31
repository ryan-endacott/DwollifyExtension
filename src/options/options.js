$(document).ready(function() {
  chrome.storage.sync.get('uid', function(data) {
    if (data.uid) {
      $('#logout_form').show();
    } else {
      $('#login_form').show();
    }
  });

  $('#logout_button').click(function() {
    chrome.storage.sync.clear();
    window.location.href = "https://dwollify.herokuapp.com";
  });
});

