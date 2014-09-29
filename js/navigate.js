$(document).ready(function() {
    checkURL(); // check if the URL has a reference to a page and load it
    $('ul li a').click(function (e){ // traverse through all our navigation links..
        checkURL(this.hash); // and assign them a new onclick event, using their own hash as a parameter (#page1 for example)
    });
    setInterval("checkURL()", 250);//check for a change in the URL every 250 ms to detect if the history buttons have been used
});

var lasturl="mumbojumbo";

function checkURL(hash) {
    if (!hash) {
        if (lasturl === "mumbojumbo" && window.location.hash === '') {
            // first page load, go home
            hash = '#home';
        } else {
            // if no parameter is provided, use the hash value from the current address
            hash = window.location.hash;
        }
    }
    
    if (hash == '') {
        hash='#home';
    }
    
    if (hash != lasturl) {
        $('a[href=' + lasturl + ']').parent().removeClass("active");
        $('a[href=' + hash + ']').parent().addClass("active");

        lasturl = hash;
        loadPage(hash);
    }
}

function loadPage(url) {
    url = url.replace('#', ''); //strip the # part of the hash and leave only the name
    if (url == '') {
        url = "home";
    }
    $.ajax({
        type: "GET",
        url: "pages/" + url + ".html",
        dataType: "html",
        success: function(msg) {
            if (parseInt(msg) != 0) { // if no errors
                $('#content').html(msg);
                updateTitle(url);
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
