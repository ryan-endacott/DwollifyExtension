$(document).ready(grab_credentials);
$(document).on('page:load', grab_credentials);

function grab_credentials() {
  if (get_page() == 'credentials') {
    var uid = $('#uid').val();
    var api_token = $('#apitoken').val();
  }
}

function get_page() {
  return window.location.pathname.split('/').pop();
}
