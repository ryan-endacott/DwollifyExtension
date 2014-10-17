$(document).ready(grab_credentials);
$(document).on('page:load', grab_credentials);

function grab_credentials() {
  alert(get_page());
}

function get_page() {
  return window.location.pathname.split('/').pop();
}
