var SpriteSheetControl = Class.create({

    initialize: function() {

        // vars
        this.name = "SpriteSheetControl";
        this.video = $j('#animation-video-clip');
        this.spriteSheetContainer = $j('#animation-sprites-holder');

        this.origVidWidth = 1920;
        this.origVidHeight = 1080;

        this.currentVidWidth;
        this.currentVidHeight;

        this.currentPercentWidth;
        this.currentPercentHeight;

        this.init();

    },

    // functions

    init: function () {
        //this.addWindowResizeListener();

    },

    addWindowResizeListener: function () {

        var that = this;

        $j( window ).resize(function() {
            // 40 and 30
            // 30/40*100=75. So 30 is 75% of 40.

            that.currentVidWidth = that.video.width();
            that.currentVidHeight = that.video.height();

            that.currentPercentWidth = that.currentVidWidth / that.origVidWidth;
            that.currentPercentHeight = that.currentVidHeight / that.origVidHeight;
            //console.log("this.currentPercentWidth: " + that.currentPercentWidth);
            //console.log("this.currentPercentHeight: " + that.currentPercentHeight);

            TweenMax.set(that.spriteSheetContainer, {
                scale: that.currentPercentWidth,
                transformOrigin:"left top"
            });

            /*,
            x: that.video.css('margin-left'),
                y: that.video.css('margin-top')*/

            //console.log("that.video.marginTop: " + that.video.css('margin'));
        });

    }


});