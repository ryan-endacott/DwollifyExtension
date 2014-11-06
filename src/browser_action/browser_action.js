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
    var url = clicked_element[0].href;
    if (!url) {
      var url = clicked_element.parent('a')[0].href;
    }
    if (url) {
      chrome.tabs.create({url: url});
    }
  })
}

function show_login_form() {
  $('body').height(100);
  $('#login_form').show();
}

function hook_send_payment_button_up() {

  $('body').height(300);
  $('#payment_form_container').show();

  $('#payment_form').submit(function() {
    console.log('here');

    var spinner = new Spinner().spin();
    $('#payment_form_container').append(spinner.el);
    $('#dimmer').show();

    // Validate inputs
    var email = $('#email').val();
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      show_alert_message('Please enter a valid email.', false);
      spinner.stop();
      $('#dimmer').hide();
      return false;
    }

    var amount = $('#amount').val();
    if (!/^\d*\.?\d+$/.test(amount)) {
      show_alert_message('Please enter a valid amount.', false);
      spinner.stop();
      $('#dimmer').hide();
      return false;
    }

    var pin = $('#pin').val();
    if (pin.length != 4) {
      show_alert_message('Please enter a valid pin.', false);
      spinner.stop();
      $('#dimmer').hide();
      return false;
    }

    chrome.runtime.sendMessage({
      route: 'send_payment',
      email: email,
      amount: amount,
      pin: pin
    }, function(response) {

      show_alert_message(response.message, response.success);

      spinner.stop();
      $('#dimmer').hide();

    });

    // Don't actually submit form.
    return false;
  });
}

// Shows message in green if success is true, red if false.
function show_alert_message(message, success) {
  var output_alert = $('#alert_message');

  output_alert.removeClass('alert-danger');
  output_alert.removeClass('alert-success');

  if (success) {
    output_alert.addClass('alert-success');
  } else {
    output_alert.addClass('alert-danger');
  }
  output_alert.text(message);
  output_alert.show();
}


