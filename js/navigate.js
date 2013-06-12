$(document).ready(function() { //executed after the page has loaded
  checkURL(); //check if the URL has a reference to a page and load it
  $('ul li a').click(function (e){//traverse through all our navigation links..
    checkURL(this.hash);//.. and assign them a new onclick event, using their own hash as a parameter (#page1 for example)
  });
  setInterval("checkURL()",250);//check for a change in the URL every 250 ms to detect if the history buttons have been used
});

var lasturl="mumbojumbo";//here we store the current URL hash

function checkURL(hash) {
  if (!hash) {
    hash=window.location.hash;//if no parameter is provided, use the hash value from the current address
  } else if (hash == '') {
    hash='#home';
  } if (hash != lasturl) { // if the hash value has changed
    $('a[href=' + lasturl + ']').parent().removeClass("active");
    lasturl = hash; //update the current hash
    $('a[href=' + lasturl + ']').parent().addClass("active");
    loadPage(hash); // and load the new page
  }
}

/** the function that loads pages via AJAX */
function loadPage(url) {
  url = url.replace('#', ''); //strip the # part of the hash and leave only the name
  // $('#loading').css('visibility','visible');//show the rotating gif animation
  if (url == '') {
    url = "home";
  }
  $.ajax({ //create an ajax request to load_page.php
    type: "GET",
    url: "pages/" + url + ".html",
    dataType: "html",//expect html to be returned
    success: function(msg) {
      if (parseInt(msg) != 0) { //if no errors
        $('#content').html(msg);//load the returned html into pageContet
        updateTitle(url);
        // $('#loading').css('visibility','hidden');//and hide the rotating gif
      }
    },
  });
}

function updateTitle(url) {
  if (url == 'home') {
    $('#page-title').html("<h1>Home <small>Irvine University Park Friends of the Library</small></h1>");
  } else if (url == 'hours_location') {
    $('#page-title').html("<h1>Hours & Location <small>Irvine University Park Friends of the Library</small></h1>");
  } else if (url == 'inventory') {
    $('#page-title').html("<h1>Inventory <small>Irvine University Park Friends of the Library</small></h1>");
  } else if (url == 'volunteering') {
    $('#page-title').html("<h1>Volunteering <small>Irvine University Park Friends of the Library</small></h1>");
  } else if (url == 'donating') {
    $('#page-title').html("<h1>Donating <small>Irvine University Park Friends of the Library</small></h1>");
  } else if (url == 'contact') {
    $('#page-title').html("<h1>Contact <small>Irvine University Park Friends of the Library</small></h1>");
  }    
}
