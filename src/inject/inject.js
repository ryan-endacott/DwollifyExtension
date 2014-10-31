$(document).ready(grab_credentials);
$(document).on('page:load', grab_credentials);

function grab_credentials() {
  if (get_page() == 'credentials') {
    var uid = $('#uid').val();
    var api_token = $('#apitoken').val();
    chrome.runtime.sendMessage({
      route: 'save_credentials',
      api_token: api_token,
      uid: uid
    });
    if (uid && api_token) {
      alert('Successfully got credentials!');
    } else {
      alert('Error loading credentials!');
    }
  }
}

function get_page() {
  return window.location.pathname.split('/').pop();
}
