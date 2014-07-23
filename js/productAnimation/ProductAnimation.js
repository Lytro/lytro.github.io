var ProductAnimation = Class.create({

    initialize: function() {

        // vars
        var that = this;
        this.name = "ProductAnimation";
        this.currentSection = 0;
        this.nextSection = 1;
        this.animationDiv = $j('#animation');
        this.animationIntroVideo = $j("#animation-intro-clip")[0];
        this.animationVideo = $j("#animation-video-clip")[0];

        /*this.animation2Sprites = new Array(
            new SpriteAnimation($j('#frame-2-sprite-1'), "images/page-product/sensor-sprite-1.png", 950, 450, 128, 0.2, 0, false)
        );*/

		this.animation1 = new SingleAnimation($j('#frame-1'), 0, 1.3, null);
		this.animation2 = new SingleAnimation($j('#frame-2'), 1.3, 6.5, null);
		this.animation3 = new SingleAnimation($j('#frame-3'), 6.5, 15, null);
		this.animation4 = new SingleAnimation($j('#frame-4'), 15, 21, null);
		this.animation5 = new SingleAnimation($j('#frame-5'), 21, 27.7, null);
                                                //containerDiv, videoStartTime, videoStopTime, spriteSheetsArray

        this.inLastScreen = false;

        this.videoInterval;

        this.animationStarted = false;

        // push all animations into an array for easier use
        this.animationsArray = new Array(null, this.animation1, this.animation2, this.animation3, this.animation4, this.animation5);

    },

    // functions
    start: function () {
        this.currentSection = 1;
        TweenMax.set(this.animationDiv, { autoAlpha:1 });
        TweenMax.to(this.animationIntroVideo, 0.5, { alpha:1 });
        this.animationIntroVideo.play();
        this.startVideoTimer();
    },

    startVideoTimer: function () {
        var that = this;

        //console.log("that.animationIntroVideo.duration: " + that.animationIntroVideo.duration);

        this.videoInterval = setInterval(function (){

            var curTime = that.animationIntroVideo.currentTime;

            // check a little before end of video, fade it out and begin playing the first animation
            if (curTime >= that.animationIntroVideo.duration - 1) {
                if (!that.animationStarted) {
                    that.animationStarted = true;
                    that.startForReal();
                }
            }

            // check if at end, then stop all this
            if (curTime == that.animationIntroVideo.duration) {
                that.animationIntroVideo.pause();
                that.stopVideoTimer();
                //console.log("stopping video!!!!!!!!!");
            }
            //console.log("checking video..." + curTime);
        }, 25);
    },

    stopVideoTimer: function () {
        var that = this;

        clearInterval(that.videoInterval);
        that.videoInterval = 0;
    },

    startForReal: function () {
        dotNav.highlightPos = 1;
        dotNav.selectSection(0);
        dotNav.initAnimationIn();
        dotNav.show();
        dotNav.active = false;

        TweenMax.to(this.animationIntroVideo, 1, { autoAlpha:0 });
        TweenMax.to(this.animationVideo, 1, { alpha:1 });

        this.animation1.playForwards();
    },

    exitCurrentAnimation: function (nextSection) {

        /*console.log("CURRENT SECTION: " + this.currentSection);
        console.log("NEXT SECTION: " + nextSection);*/

        this.nextSection = nextSection;

        if (this.nextSection < this.currentSection) {
            this.hideScroller();
        }

        this.animationsArray[this.currentSection].hideContent();
    },

    playNextAnimation: function () {

        var that = this;

        var skip = false;
        var diff = Math.abs(this.nextSection - this.currentSection);
        //console.log('diff: ' + diff);
        if (diff > 1) {
            skip = true;
        }

        var backwards = false;
        if (this.nextSection < this.currentSection) {
            backwards = true;
        }

        this.currentSection = this.nextSection;

        if (skip == true) {
            TweenMax.to(this.animationVideo, 0.5, { alpha:0, onComplete:function(){

                that.animationVideo.currentTime = that.animationsArray[that.currentSection].videoStartTime + ((that.animationsArray[that.currentSection].videoStopTime - that.animationsArray[that.currentSection].videoStartTime) / 2);
                that.animationsArray[that.currentSection].playForwards();
                TweenMax.to(that.animationVideo, 0.5, { alpha:1, delay:0.2 });

            } });
        } else {
            if (!backwards) {
                this.animationsArray[this.currentSection].playForwards();
            } else {
                // if we're going backwards, play video backwards
                this.animationsArray[this.currentSection + 1].playVideoBackwards();
            }
        }

        this.checkWhichFrame();
    },

    showPreviousAnimationContent: function () {
        var that = this;

        this.animationsArray[this.currentSection].playSprites();
    },

    showScroller: function () {
        var that = this;

        $j('html').css('overflow-y', 'scroll');
        $j('html').css('overflow-x', 'hidden');
        $j(that.animationDiv).css('position', 'relative');
        $j(that.animationDiv).css('height', $j( window ).height());
        $j('#footer-reviews-wrapper').css('display', 'block');
        $j('#footer-wrapper').css('display', 'block');

        that.inLastScreen = true;
    },

    hideScroller: function () {
        var that = this;
        //console.log("HIDE SCROLLBAR");
        if ($j('html').css('overflow-y') != 'hidden') {
            //console.log("SCROLLBAR SHOULD BE GONE");
            $j('html').css('overflow-y', 'hidden');
            $j('html').css('overflow-x', 'hidden');
            $j(that.animationDiv).css('position', 'absolute');
            $j(that.animationDiv).css('height', '');
            $j('#footer-reviews-wrapper').css('display', 'none');
            $j('#footer-wrapper').css('display', 'none');
            that.inLastScreen = false;
        }
    },

    checkWhichFrame: function () {
        if (this.currentSection == this.animationsArray.length - 1) {
            if (!this.inLastScreen) {
                this.showScroller();
            }
        } else {
            this.hideScroller();
        }
    },

    hideThis: function () {
        var that = this;

        dotNav.hide();

        productAnimation.exitCurrentAnimation(that.currentSection);
        TweenMax.to(this.animationVideo, 0.5, { alpha:0, onComplete:function(){

            TweenMax.set(that.animationDiv, { autoAlpha:0 });
            introVideo.returnAnimation();


        } });


    }
});