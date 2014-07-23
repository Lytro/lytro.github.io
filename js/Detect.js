if (device.mobile()) { IS_MOBILE = true; }

if (device.tablet()) { IS_TABLET = true; IS_MOBILE = true; }

if (!IS_MOBILE && !IS_TABLET) {
    if ($j(window).width() < WIDTH_BREAK_POINT) { IS_TABLET = true; IS_MOBILE = true; }
}

//console.log("Window width: " + $j(window).width());

/*IS_MOBILE = true;
IS_TABLET = true;*/

if (IS_MOBILE || IS_TABLET) {
    // remove desktop-only content
    //console.log("MOBILE OR TABLET");

    $j('head').append( '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimal-ui">' );

    $j('#desktop-content').remove();

    $j("#site-styles").attr("href", "css/styles-mobile.css");

} else {
    //console.log('DESKTOP');

    $j('#mobile-content').remove();
}

// window resize listener
$j( window ).resize(function() {

    // if we are in desktop experience and width goes less than 1200, reload page
    if ($j(window).width() < WIDTH_BREAK_POINT) {

        if (!IS_TABLET && !IS_MOBILE && !RELOADED) {
            //console.log("LOAD MOBILE VIEW");
            window.location.href = window.location.href;
            RELOADED = true;
        }
    }

    if ($j(window).width() > WIDTH_BREAK_POINT) {

        if (IS_TABLET || IS_MOBILE && !RELOADED) {
            //console.log("LOAD DESKTOP VIEW");
            window.location.href = window.location.href;
            RELOADED = true;
        }
    }

});