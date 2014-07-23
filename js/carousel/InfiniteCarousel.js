var InfiniteCarousel = Class.create({

    initialize: function(display, imageWidth, numVisible, imageMargin, text, btnCallback) {

        // vars
        this.name = "InfiniteCarousel";
        this.display = display;
        this.imageWidth = imageWidth;
        this.text = text;
        this.btnCallback = btnCallback;
        this.imageMargin = typeof imageMargin !== 'undefined' ? imageMargin : 0;
        this.numVisible = typeof numVisible !== 'undefined' ? numVisible : 3;
        this.leftBtn;
        this.rightBtn;
        this.currentSlide = this.numVisible;
        this.imagesHolder = $j(this.display).find('.carousel-images-holder');
        this.numImages = $j(this.imagesHolder).find('li').length;
        this.imagesUL = $j(this.imagesHolder).find('ul');
        this.imagesLI = $j(this.imagesHolder).find('li');
        this.videoThumbnailsHolder = this.display.find('.carousel-images-holder ul');
        this.clickActive = true;
        this.windowWidth = $j(window).width();
        this.currentUL_X;
        this.pageResizeDiff = 0;

        this.start();
        this.initBtns();
        this.updateText();

    },

    // functions
    start: function() {
        var that = this;

        // duplicate last this.numVisible items and put them in front of the first item. For infinite scrolling
        for (var i = 1; i < this.numVisible + 1; i++) {
            var copiedItem = $j(this.imagesLI[this.numImages-i]).clone();
            $j(this.imagesUL).prepend(copiedItem);
        }

        // increment numImages
        this.numImages += this.numVisible;

        // re-define imagesLI so it has references to the new items
        this.imagesLI = $j(this.imagesHolder).find('li');

        // Make item holder wide enough to hold all the elements. No way to calculate this width in html
        var carouselImagesHolderWidth = (this.imageWidth + (this.imageMargin * 2)) * this.numImages;
        $j(this.imagesHolder).find('ul').css('width', carouselImagesHolderWidth + 'px');

        // add spacing margin to items
        $j(this.imagesLI).each(function (){
            $j(this).css({'margin-left':that.imageMargin, 'margin-right':that.imageMargin});
        });

        // position the slides so the first slide is in the middle
        that.currentUL_X = -(that.imageWidth / 2) - (that.imageWidth * that.currentSlide) - ((that.imageMargin * 2) * that.currentSlide);
        TweenMax.set(this.imagesUL, { left: that.currentUL_X });
    },

    initBtns: function () {
        var that = this;

        this.leftBtn = $j(this.display).find('.arrow-left');
        this.rightBtn = $j(this.display).find('.arrow-right');

        ///////////////////
        /*  LEFT BUTTON  */
        ///////////////////
        this.leftBtn.click(function (){

            var xPos;
            //console.log(that.currentSlide);

            if (that.clickActive) {

                that.clickActive = false;

                if (that.currentSlide == 1) {
                    //console.log("SWITCH LEFT");
                    that.currentSlide = that.numImages - (that.numVisible-1);
                    xPos = (that.imageWidth / 2) + (that.imageWidth * (that.numImages - that.numVisible + 1)) + ((that.imageMargin * (that.numImages * 2)) - (that.imageMargin * 4));
                    TweenMax.set(that.imagesUL, { left: -xPos});
                    that.currentSlide --;
                    xPos = (that.imageWidth / 2) + (that.imageWidth * that.currentSlide) + ((that.imageMargin * 2) * that.currentSlide);
                    TweenMax.to(that.imagesUL, 0.5, { left:-xPos, onComplete:function (){
                        that.clickActive = true;
                    }});
                } else {

                    that.currentSlide --;
                    xPos = (that.imageWidth / 2) + (that.imageWidth * that.currentSlide) + ((that.imageMargin * 2) * that.currentSlide);
                    that.currentUL_X = -xPos;
                    TweenMax.to(that.imagesUL, 0.5, { left:-xPos, onComplete:function (){
                        that.clickActive = true;
                        if (that.currentSlide == 1) {
                            //console.log("SWITCH LEFT");
                            that.currentSlide = that.numImages - (that.numVisible-1);
                            xPos = (that.imageWidth / 2) + (that.imageWidth * (that.numImages - that.numVisible + 1)) + ((that.imageMargin * (that.numImages * 2)) - (that.imageMargin * 4));
                            TweenMax.set(that.imagesUL, { left: -xPos});
                        }
                    }});
                }

                that.updateText();
            }
        });

        this.leftBtn.bind('mouseover', function (){
            TweenMax.to(this, 0.5, { backgroundPosition:'0px 0px' });
        });

        this.leftBtn.bind('mouseout', function (){
            TweenMax.to(this, 0.5, { backgroundPosition:'10px 0px' });
        });

        ////////////////////
        /*  RIGHT BUTTON  */
        ////////////////////
        this.rightBtn.click(function (){

            //console.log("that.currentSlide: " + that.currentSlide);
            //console.log("that.numImages: " + that.numImages);
            var xPos;
            //console.log("that.currentSlide: " + that.currentSlide);
            //console.log("that.numImages: " + that.numImages);

            if (that.clickActive) {

                that.clickActive = false;

                if (that.currentSlide == that.numImages - 2) {
                    //console.log("SWITCH RIGHT BEFORE TWEENING");
                    //console.log("SWITCH LEFT");
                    that.currentSlide = that.numVisible - 2;
                    xPos = -(that.imageWidth / 2) - (that.imageWidth * that.currentSlide) - ((that.imageMargin * 2) * that.currentSlide);
                    TweenMax.set(that.imagesUL, { left: xPos});
                    that.currentSlide ++;
                    xPos = xPos = -(that.imageWidth / 2) - (that.imageWidth * that.currentSlide) - ((that.imageMargin * 2) * that.currentSlide);
                    TweenMax.to(that.imagesUL, 0.5, { left: xPos, onComplete:function (){
                        that.clickActive = true;
                    } });

                } else {

                    that.currentSlide ++;
                    xPos = (that.imageWidth / 2) + (that.imageWidth * that.currentSlide) + ((that.imageMargin * 2) * that.currentSlide);
                    that.currentUL_X = -xPos;
                    TweenMax.to(that.imagesUL, 0.5, { left:-xPos, onComplete:function (){
                        that.clickActive = true;
                        if (that.currentSlide == that.numImages - (that.numVisible-1)) {
                            //console.log("SWITCH RIGHT");
                            that.currentSlide = 1;
                            xPos = -(that.imageWidth / 2) - (that.imageWidth * that.currentSlide) - ((that.imageMargin * 2) * that.currentSlide);
                            TweenMax.set(that.imagesUL, { left: xPos});
                        }
                    } });
                }
                that.updateText();
            }
        });

        this.rightBtn.bind('mouseover', function (){
            TweenMax.to(this, 0.5, { backgroundPosition:'10px 0px' });
        });

        this.rightBtn.bind('mouseout', function (){
            TweenMax.to(this, 0.5, { backgroundPosition:'0px 0px' });
        });

        // thumbnail buttons
        this.videoThumbnailsHolder.find('li').each(function (){
            //console.log(this);
            $j(this).click(function (e){

                if (that.clickActive) {

                    var parentOffset = $j(this).parent().parent().offset();
                    var parentWidth = $j(this).parent().parent().width();
                    var relX = e.pageX - parentOffset.left;

                    console.log("parentOffset: " + parentOffset);
                    console.log("parentWidth: " + parentWidth);
                    console.log("relX: " + relX);


                    if ($j(this).hasClass('selected')) {
                        // just re-load the video
                        that.btnCallback($j(this).find('.img-holder').attr('vidurl'));
                    } else {
                        // go through all the buttons and remove class 'selected'
                        that.videoThumbnailsHolder.find('li').each(function(){
                            if ($j(this).hasClass('selected')) {
                                $j(this).removeClass('selected');
                            }
                        });

                        if (relX < -(that.imageWidth / 2)) {
                            that.leftBtn.click();
                        }

                        if (relX > (that.imageWidth / 2)) {
                            that.rightBtn.click();
                        }

                        // add 'selected' class to this
                        $j(this).addClass('selected');

                        //console.log($j(this).find('.img-holder').attr('vidurl'));
                        //console.log($j(this).index());
                        that.btnCallback($j(this).find('.img-holder').attr('vidurl'));
                    }
                }
            });
        });

        // set 'selected' to index 3 (because the infinite carousel prepends 3 items before first item
        //var selected = this.videoThumbnailsHolder.find('li').get(3);
        //$j(selected).addClass('selected');

    },

    updateText: function () {
        var currentSlide = this.imagesLI[this.currentSlide];
        $j(this.text).html($j(currentSlide).find('img').attr('html'));
    },

    kill: function (){

    }
});