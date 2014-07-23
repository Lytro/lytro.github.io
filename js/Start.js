var $j = jQuery.noConflict();

$j(window).bind("load", function() {

    TweenMax.set($j('html, body'), { scrollTop: 0 });

    preloader   = new Preloader();

    // fade preloader out, show first elements of page
    preloader.doneLoading = true;;

    if (IS_MOBILE) {

        topNav = new TopNavMobile();
        footer      = new Footer();

        // show main nav
        TweenMax.delayedCall(0.5, function (){
            //console.log("SHOW NAV");
            topNav.show();
        });

    } else {

        //console.log("INITIATING DESKTOP EXPERIENCE");
        // navigation classes
        topNav      = new TopNav();
        dotNav      = new DotNav();
        mouseWheel  = new MouseWheel();
        arrowKeys   = new ArrowKeys();
        reviews     = new Reviews();
        footer      = new Footer();

        // intro video class
        introVideo  = new IntroVideo();

        // animation class
        productAnimation = new ProductAnimation();

        // sprite sheet control
        spriteSheetControl = new SpriteSheetControl();

        // set footer invisible
        $j('#footer-reviews-wrapper').css('display', 'none');
        $j('#footer-wrapper').css('display', 'none');

        // show main nav
        TweenMax.delayedCall(0.5, function (){
            topNav.show();
        });

        // show intro video
        TweenMax.delayedCall(1, function (){   introVideo.initAnimation();   });

        // show dotNav
        TweenMax.delayedCall(2, function (){
            if (!introVideo.longVideoPlaying) {
                /*dotNav.initAnimationIn();
                 dotNav.show();*/
            }
        });

        // set up window resize listener to show message if browser too small
        var resizeMessageVisible = false;
        $j( window ).resize(function() {

            var messageDiv = $j('#resize-window-message');

            var windowHeight = $j(window).height();
            var windowWidth = $j(window).width();

            if (windowHeight < HEIGHT_BREAK_POINT) {
                if (!resizeMessageVisible) {
                    resizeMessageVisible = true;
                    //TweenMax.to(messageDiv, 0.5, { autoAlpha:1 });
                    TweenMax.set(messageDiv, { autoAlpha:1 });
                }
            } else {
                if (resizeMessageVisible) {
                    resizeMessageVisible = false;
                    //TweenMax.to(messageDiv, 0.5, { autoAlpha:0 });
                    TweenMax.set(messageDiv, { autoAlpha:0 });
                }
            }
        });
        $j( window ).resize();
    }

});