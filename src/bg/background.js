

var handlers = {

  save_credentials: function(request, sender, sendResponse) {
    chrome.storage.sync.set({
      uid: request.uid,
      api_token: request.api_token
    });
  },

  send_payment: function(request, sender, sendResponse) {

    chrome.storage.sync.get(['uid', 'api_token'], function(data) {
      $.post('https://dwollify.herokuapp.com/send_payment', {
        uid: data.uid,
        api_token: data.api_token,
        email: request.email,
        amount: request.amount,
        pin: request.pin
      }).done(function() {
        sendResponse({message: 'Successfully sent!', success: true});
      }).fail(function(data) {
        sendResponse({message: data.responseJSON.error, success: false});
      });

    });

  }

};



chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    handlers[request.route](request, sender, sendResponse);
  });


