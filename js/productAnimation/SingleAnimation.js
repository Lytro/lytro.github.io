var SingleAnimation = Class.create({

    initialize: function(containerDiv, videoStartTime, videoStopTime, spriteSheetsArray) {

        // vars
        this.name = "SingleAnimation";
        this.video = $j("#animation-video-clip")[0];
        this.containerDiv = containerDiv;
        this.videoStartTime = videoStartTime;
        this.videoStopTime = videoStopTime;
        this.spriteSheetsArray = spriteSheetsArray;

        // contant items
        this.title = $j(this.containerDiv).find('.title');
        this.subtitle = $j(this.containerDiv).find('.sub-title');
        this.divider = $j(this.containerDiv).find('.divider');
        this.text = $j(this.containerDiv).find('.text');

        this.timeline;

        this.videoInterval;
        this.videoBackwardsTimeout;

        this.fps = 30;

        this.init();

    },

    // functions

    init: function () {

    },

    playForwards: function () {
        this.video.play();
        this.startVideoTimer();
    },

    startVideoTimer: function () {
        var that = this;

        this.videoInterval = setInterval(function (){

            var curTime = that.video.currentTime;
            if (curTime > that.videoStopTime) {
                that.video.pause();
                that.stopVideoTimer();
                that.playSprites();
            }
            //console.log("checking video..." + curTime);
        }, 25);
    },

    stopVideoTimer: function () {
        var that = this;

        clearInterval(that.videoInterval);
        that.videoInterval = 0;
    },

    playSprites: function () {
        var that = this;

        if (that.spriteSheetsArray === null) {
            // skip the sprite sheets and animate the text
            that.showTextualContent();
        } else {
            // play sprite sheets
            /*console.log("--------------------");
            console.log(this.spriteSheetsArray);
            console.log("--------------------");
            for (var i = 0; i < this.spriteSheetsArray.length; i++ ) {
                this.spriteSheetsArray[i].play();
            }
            that.showTextualContent();*/
        }
    },

    showTextualContent: function () {
        this.timeline = new TimelineMax({onComplete:function (){

            dotNav.active = true;
            dotNav.fadeDots(1);
            dotNav.hideBtnText();

        }});

        this.timeline.set(this.containerDiv, { autoAlpha:1 })
            .fromTo(this.title, 0.5, { alpha:0, y:20 }, { alpha:1, y:0 }, "-=0.25")
            .fromTo(this.subtitle, 0.5, { alpha:0, y:20 }, { alpha:1, y:0 }, "-=0.25")
            .fromTo(this.divider, 0.5, {scaleX:0, y:20}, {scaleX:1, y:0}, "-=0.25")
            .fromTo(this.text, 0.5, {alpha:0, y:30}, {alpha:1, y:0}, "-=0.25");

        this.timeline.gotoAndPlay(0);
        //this.timeline.play();
    },

    hideContent: function () {
        var that = this;

        var timelineOut = new TimelineMax({onComplete:function (){

            productAnimation.playNextAnimation();

        }});

        timelineOut.fromTo(this.text, 0.5, { alpha:1, y:0 }, { alpha:0, y:20 })
            .fromTo(this.divider, 0.5, {scaleX:1, y:0}, {scaleX:0, y:20}, "-=0.4")
            .fromTo(this.subtitle, 0.5, { alpha:1, y:0 }, { alpha:0, y:20 }, "-=0.4")
            .fromTo(this.title, 0.5, {alpha:1, y:0}, {alpha:0, y:30}, "-=0.4")
            .set(this.containerDiv, { autoAlpha:0 });
    },

    playVideoBackwards: function () {

        var that = this;

        var time = that.video.currentTime - that.videoStartTime;

        TweenMax.to(that.video, time, { currentTime: that.videoStartTime, ease:Linear.easeNone, onComplete:function(){

            productAnimation.showPreviousAnimationContent();

        }});
    }
});