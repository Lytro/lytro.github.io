var TopNav = Class.create({

    initialize: function() {

        // vars
        this.name = "TopNav";
        this.display = $j("#main-nav");
        this.displayHeight = this.display.height();
        this.mainBtns = $j('#main-nav ul#main-btns li');
        this.numMainBtns = this.mainBtns.length;
        this.highlight = $j('#btn-highlight');
        this.logo = $j('#main-nav-inner #logo');
        this.menuBtn = $j('#extra-menu-btn');
        this.menu = $j('#extra-menu');

        this.selectedBtn;
        this.isHovering = false;
        this.menuOpen = false;

        TweenMax.set(this.display, { top:-92 });
        TweenMax.set(this.highlight, { alpha:0 });
        TweenMax.set(this.menu, { alpha:0 });

        this.initBtns();
    },

    // functions

    initBtns: function () {
        var that = this;
        // main btns
        $j(this.mainBtns).each(function (){

            $j(this).bind('click', function (){

                that.removeSelectedClass();
                that.selectedBtn = $j(this);
                $j(this).addClass('selected');
                //that.moveHighlightToPos($j(this).position().left, $j(this).width());

            });

            $j(this).bind('mouseover', function (){

                that.isHovering = true;

                //that.moveHighlightToPos($j(this).position().left, $j(this).width());

            });

            $j(this).bind('mouseout', function (){

                that.isHovering = false;

                if (that.selectedBtn == undefined) {
                    that.deselect();
                } else {
                    TweenMax.delayedCall(0.5, function (){
                        if (!that.isHovering) {
                            //that.moveHighlightToPos($j(that.selectedBtn).position().left, $j(that.selectedBtn).width());
                        }
                    });
                }
            });

        });

        // extra menu btn
        this.menuBtn.click(function (event){
            event.stopPropagation();

            if (!that.menuOpen) {
                that.showExtraMenu();
            } else {
                that.hideExtraMenu();
            }
        });
    },

    showExtraMenu: function () {
        var that = this;
        this.menuOpen = true;
        $j(that.menu).css('display', 'block');
        TweenMax.fromTo(that.menu, 0.5, { alpha:0, y:-20 }, { alpha:1, y:0 });
        $j(this.menuBtn).css('background-position', '-31px 0px');
    },

    hideExtraMenu: function () {
        var that = this;
        this.menuOpen = false;
        $j(that.menu).css('display', 'block');
        TweenMax.to(that.menu, 0.5, { alpha:0, onComplete:function (){
            $j(that.menu).css('display', 'none');
        }});
        $j(this.menuBtn).css('background-position', '0px 0px');
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
        this.hideExtraMenu();
        TweenMax.to(this.display, 0.5, { top:-this.displayHeight, ease:Power1.easeOut });
    },

    show: function() {
        TweenMax.to(this.display, 0.5, { top:0, ease:Power1.easeOut });
    }
});