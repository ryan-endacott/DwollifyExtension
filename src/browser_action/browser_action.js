$(document).ready(function() {
  chrome.storage.sync.get('uid', function(data) {
    if (data.uid) {
      hook_send_payment_button_up();
    } else {
      show_login_form();
    }
  });

  hook_up_links();
});

function hook_up_links() {
  $('a').click(function(event) {
    var clicked_element = $(event.target);
    var url = clicked_element.parent('a')[0].href;
    chrome.tabs.create({url: url});
  })
}

function show_login_form() {
  $('body').height(100);
  $('#login_form').show();
}

function hook_send_payment_button_up() {

  $('body').height(300);
  $('#payment_form').show();

  var output_alert = $('#alert_message');

  $('#send_payment').click(function() {

    var spinner = new Spinner().spin();
    $('#payment_form').append(spinner.el);
    $('#dimmer').show();

    chrome.runtime.sendMessage({
      route: 'send_payment',
      email: $('#email').val(),
      amount: $('#amount').val(),
      pin: $('#pin').val()
    }, function(response) {

      output_alert.removeClass('alert-danger');
      output_alert.removeClass('alert-success');

      if (response.success) {
        output_alert.addClass('alert-success');
      } else {
        output_alert.addClass('alert-danger');
      }
      output_alert.text(response.message);
      output_alert.show();
      spinner.stop();
      $('#dimmer').hide();

    });
  });
}


