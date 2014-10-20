$(document).ready(hook_send_payment_button_up)

function hook_send_payment_button_up() {

  var output_alert = $('#alert_message');

  $('#send_payment').click(function() {
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
    });
  });
}


