

var handlers = {

  save_credentials: function(request, sender, sendResponse) {
    chrome.storage.sync.set({
      uid: request.uid,
      api_token: request.api_token
    });
  },

  send_payment: function(request, sender, sendResponse) {
    sendResponse({message: 'no', success: true});
  }

};



chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    handlers[request.route](request, sender, sendResponse);
  });


