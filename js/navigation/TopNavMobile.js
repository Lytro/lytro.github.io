var TopNavMobile = Class.create({

    initialize: function() {

        // vars
        this.name = "TopNavMobile";
        this.display = $j("#main-nav-mobile");
        this.displayHeight = this.display.height();
        this.logo = $j('#logo-mobile');
        this.menuBtn = $j('#menu-btn-mobile');
        this.menu = $j('#menu-mobile');
        this.pageContent = $j('#index-page-content');
        this.footer = $j('#footer-wrapper');
        this.menuBtns = $j(this.menu).find('ul li');

        this.selectedBtn;
        this.isHovering = false;
        this.menuOpen = false;

        this.currentScrollPosition;

        //TweenMax.set(this.display, { top:-36, alpha:0 });
        //TweenMax.set(this.menu, { alpha:0 });

        this.initBtns();
        this.orientationListener();
    },

    // functions

    initBtns: function () {
        var that = this;

        // logo btn
        this.logo.swipe( {
            tap:function(event, target) {
                window.location.href = 'index.html';
            }
        });

        // menu btn
        this.menuBtn.swipe( {
            tap:function(event, target) {
                if (!that.menuOpen) {
                    that.showMenu();
                } else {
                    that.hideMenu();
                }
            }
        });

        /*this.menu.swipe( {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') {
                    that.hideMenu();
                }
            },
            threshold:50
        });*/
    },

    orientationListener: function() {
        var that = this;
        // Listen for orientation changes
        /*window.addEventListener("orientationchange", function() {
            // Announce the new orientation number
            //alert("HI SHAWN. " + window.orientation);
            $j(that.menu).css('height', $j( window ).height());
        }, false);*/

        // android fires the orientation event before the window switches, iOS fires it after. so, i'm using the window.resize event instead.
        $j( window ).resize(function() {
            that.resizeMenu();
        });
    },

    resizeMenu: function () {
        var that = this;

        var menuHeight = 0;

        $j(that.menu).find('ul').each(function(){
            //console.log($j(this).height());
            menuHeight += $j(this).height();
        });

        menuHeight += this.display.height();

        var windowHeight = $j( window ).height();

        if (menuHeight > windowHeight) {
            $j(that.menu).css('height', windowHeight);
            $j(that.menu).css('overflow-y', 'scroll');
        }

        if (menuHeight < windowHeight) {
            $j(that.menu).css('height', menuHeight);
            $j(that.menu).css('overflow-y', 'hidden');
        }
    },

    showMenu: function () {
        var that = this;

        this.currentScrollPosition = $j(document).scrollTop();
        //alert(this.currentScrollPosition);

        this.menuOpen = true;
        $j(that.menu).css('display', 'block');
        TweenMax.fromTo(that.menu, 0.3, { alpha:0, x:-320 }, { alpha:1, x:0 });
        $j('body').css('overflow', 'hidden');
        $j('body').css('position', 'fixed');
        TweenMax.set(this.pageContent, { autoAlpha:0 });
        TweenMax.set($j('#mobile-content-wrapper'), { autoAlpha:0 });
        TweenMax.set(this.footer, { autoAlpha:0 });

        //$j(that.menu).css('height', $j( window ).height());

        that.resizeMenu();

    },

    hideMenu: function () {
        var that = this;

        this.menuOpen = false;
        $j('body').css('overflow', 'auto');
        $j('body').css('position', '');
        TweenMax.to(that.menu, 0.5, { alpha:0, x:-320, onComplete:function (){
            $j(that.menu).css('display', 'none');
        }});

        TweenMax.to(that.pageContent, 0.5, { autoAlpha:1 });
        TweenMax.to($j('#mobile-content-wrapper'), 0.5, { autoAlpha:1 });
        TweenMax.to(that.footer, 0.5, { autoAlpha:1 })

        $j(document).scrollTop(that.currentScrollPosition);
    },

    moveHighlightToPos: function (xPos, width) {

        if ($j(topNav.highlight).css('opacity') != '1') {
            TweenMax.set(this.highlight, { x:xPos, width:width });
            TweenMax.to(this.highlight, 0.1, { alpha:1 });
        }

        TweenMax.to(this.highlight, 0.1, { x: xPos, width:width+3, ease:Power1.easeOut });


        //TweenMax.set(this.highlight, { boxShadow: "0px 0px 20px 3px #00aed6", color:"#00aed6" });
        //TweenMax.to(this.highlight, 1, { boxShadow: "0px 0px 0px 0px #00aed6", color:"#00aed6", delay:0.1, ease:Power1.easeOut });
    },

    removeSelectedClass: function () {
        $j(this.mainBtns).each(function (){
           //console.log($j(this));
            if ($j(this).hasClass('selected')) {
                $j(this).removeClass('selected');
            }
        });
    },

    deselect: function () {
        TweenMax.to(this.highlight, 0.1, { alpha:0 });
    },

    hide: function() {
        this.hideMenu();
        TweenMax.to(this.display, 0.5, { top:-this.displayHeight, ease:Power1.easeOut });
    },

    show: function() {
        TweenMax.to(this.display, 0.5, { top:0, alpha:1, ease:Power1.easeOut });
    }
});