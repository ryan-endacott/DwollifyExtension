

var handlers = {

  save_credentials: function(request, sender, sendResponse) {
    chrome.storage.sync.set({
      uid: request.uid,
      api_token: request.api_token
    });
  }

};



chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    handlers[request.route](request, sender, sendResponse);
  });


