var DotNav = Class.create({

    initialize: function() {

        // vars
        this.name = "DotNav";
        this.display = $j('nav#dot-nav');
        this.displayWidth = this.display.width();
        this.highlightPos = 0;
        this.btns = $j('nav#dot-nav ol.list li');
        this.numBtns = this.btns.length;
        this.firstBtn = $j('nav#dot-nav ol.list li:first');
        this.highlight = $j('#dot-highlight');
        this.active = true;
        this.onHomeScreen = true;
        this.inLastDot = false;

        this.initBtns();
    },

    // functions

    initBtns: function () {
        var that = this;

        $j(this.btns).each(function (){

            TweenMax.set($j(this).find('.label'), { alpha:0 });

            $j(this).find('.hit-area').bind('click', function (){
                if (that.active) {
                    //console.log("btn index: " + $j(this).parent().index());
                    that.highlightPos = $j(this).parent().index();
                    that.selectSection($j(this).parent().position().top);
                }
            });

            $j(this).find('.hit-area').bind('mouseover', function (){
                if (that.active) {
                    var label = $j(this).prev();
                    TweenMax.set(label, { alpha:0 });
                    TweenMax.to(label, 0.5, { autoAlpha:1 });
                }
            });

            $j(this).find('.hit-area').bind('mouseout', function (){
                if (that.active) {
                    var label = $j(this).prev();
                    //if (!$j(this).parent().hasClass('selected')) {
                        TweenMax.to(label, 0.5, { autoAlpha:0 });
                    //}
                }
            });

        });

    },

    initAnimationIn:function (){

        var that = this;

        // set buttons off stage to right
        TweenMax.set(this.highlight, { alpha:0, scale:2 });
        TweenMax.set(this.btns[1], { alpha:0 })

        for (var i = 0;i < this.numBtns; i++){
            //this.btns[i].css('margin-left', '110px');
            TweenMax.set(this.btns[i], { marginLeft:'110px' });
        }

        // add animations to each button
        var tl = new TimelineMax({onComplete:function (){ /*TweenMax.to(that.btns[1], 0.5, { alpha:1 })*/ }});
        for (i = 0; i < this.numBtns; i ++) {
            var staggerAmount = 0;
            if (i == 0) {
                staggerAmount = 0;
            } else {
                staggerAmount = 0.3;
            }
            tl.to(this.btns[i], 0.5, { marginLeft:'0px', ease:Power2.easeOut }, "-=" + staggerAmount);
        }

        TweenMax.to(that.btns[1], 0.5, { alpha:1 });

        /*TweenMax.delayedCall(0.7, function (){
            mouseWheel.start();
            arrowKeys.start();
        });*/
    },

    wheelMoveHightlight: function(direction) {
        //console.log( direction );
        //console.log("this.highlightPos: " + this.highlightPos);
        //console.log("this.numBtns: " + this.numBtns);

        var destY;

        if (this.highlightPos == 0) {
            $j("#explore-btn").click();
            this.highlightPos ++;
        } else {
            switch(direction) {
                case "DOWN":
                    if (this.highlightPos < this.numBtns - 1) {
                        this.highlightPos ++;
                    }
                    break;

                case "UP":
                    //if ($j(document).scrollTop() == 0) {
                    if (this.highlightPos > 0) {
                        this.highlightPos --;
                    }
                    //}
                    break;
            }
            destY = $j(this.btns[this.highlightPos]).position().top;
            this.selectSection(destY);
        }
        //console.log(this.highlightPos);
    },

    selectSection: function (yPos) {
        var that = this;
        //console.log("selectSection: this.highlightPos: " + this.highlightPos );
        //console.log("this.inLastDot: " + this.inLastDot);

        // first deselect any selected button labels
        $j(this.btns).each(function (){
            if ($j(this).hasClass('selected')) {
                $j(this).removeClass('selected')
                TweenMax.to($j(this).find('.label'), 0.5, { autoAlpha:0 });
            }
        });

        // add 'selected' class to label
        $j(this.btns[this.highlightPos]).addClass('selected');
        TweenMax.to($j(this.btns[this.highlightPos]).find('.label'), 0.5, { autoAlpha:1 });
        //console.log(this.btns[this.highlightPos]);

        // move highlight into new position, and call animations
        this.moveHighlightToPos(yPos, this.highlightPos);

        if (this.highlightPos == this.numBtns-1) {
            this.inLastDot = true;
        } else {
            this.inLastDot = false;
        }
    },

    moveHighlightToPos: function (yPos) {

        var that = this;

        this.active = false;

        this.fadeDots(0.4);

        // first dot
        if (this.highlightPos == 1) {

            TweenMax.set(this.highlight, { left:'-3px' });

            var tl = new TimelineMax();
            tl.to(this.highlight, 0.1, { alpha: 0 })
                .set(this.highlight, { y: yPos, scale:1.5 })
                .to(this.highlight, 0.2, { alpha: 1, scale:1.07, ease:Power1.easeOut })
                .to(this.highlight, 1, { scale:1 });

            if (!this.onHomeScreen) {
                productAnimation.exitCurrentAnimation(that.highlightPos);
            } else {
                //console.log("GO");
                //$j("#explore-btn").click();
            }

            this.onHomeScreen = false;
        }

        // all dots after first one
        if (this.highlightPos > 1 && this.highlightPos < this.numBtns) {
            this.onHomeScreen = false;
            TweenMax.set(this.highlight, { left:'-3px' });

            var tl = new TimelineMax();
            tl.to(this.highlight, 0.1, { alpha: 0 })
            .set(this.highlight, { y: yPos, scale:1.5 })
            .to(this.highlight, 0.2, { alpha: 1, scale:1.07, ease:Power1.easeOut, onComplete:function (){

                    //console.log("that.highlightPos: " + that.highlightPos);
                    productAnimation.exitCurrentAnimation(that.highlightPos);

            } }).to(this.highlight, 1, { scale:1 });
        }

        // going to top dot
        if (this.highlightPos == 0) {
            TweenMax.to(this.highlight, 0.5, { alpha:0, scale:0, onComplete:function (){
                TweenMax.set(that.highlight, { left:'300px' });
                if (!that.onHomeScreen) {
                    window.location.href = 'index.html';
                } else {
                    that.active = true;
                }
            } });
        }
    },

    fadeDots: function (opacity) {
        var that = this;

        this.btns.each(function(){
            var item = $j(this);
          TweenMax.to(item.find('.hit-area'), 0.5, { autoAlpha:opacity });
          //console.log(this);
        });
    },

    hideBtnText: function () {
        $j(this.btns).each(function (){

            TweenMax.to($j(this).find('.label'), 0.5, { autoAlpha:0 });

        });
    },

    hide: function() {
        this.active = false;
        TweenMax.to(this.display, 0.5, { right:-this.displayWidth - 50, autoAlpha:0, ease:Power1.easeOut });
    },

    show: function() {
        this.active = true;
        TweenMax.to(this.display, 0.5, { right:-25, autoAlpha:1, ease:Power1.easeOut });
    }
});