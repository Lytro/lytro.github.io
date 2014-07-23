var Carousel = Class.create({

    initialize: function(display, imageWidth, resizeable, text, imageMargin) {

        // vars
        this.name = "Carousel";
        this.display = display;
        this.imageWidth = imageWidth;
        this.text = text;
        this.imageMargin = typeof imageMargin !== 'undefined' ? imageMargin : 0;
        this.resizeable = resizeable;
        this.leftBtn;
        this.rightBtn;
        this.currentSlide = 0;
        this.imagesHolder = $j(this.display).find('.carousel-images-holder');

        this.numImages = $j(this.imagesHolder).find('li').length;
        this.imagesUL = $j(this.imagesHolder).find('ul');
        this.imagesLI = $j(this.imagesHolder).find('li');
        this.imageHeight;


        this.initBtns();
        this.updateText();

        if (this.resizeable) {
            this.setupSizes();
            this.addResizeListener();
        } else {
            this.setupImages();
        }

    },

    // functions
    setupSizes: function() {
        var that = this;

        // calculate image width based on holder size
        this.imageWidth = this.imagesHolder.width();

        // resize images
        $j(this.imagesLI).each(function (){
            $j(this).find('img').css('width', that.imageWidth + 'px');
        });

        that.imageHeight = $j(this.imagesLI).first().find('img').height();
        //console.log(that.imageHeight);

        // calculate total UL width with all images inside
        var carouselImagesHolderWidth = (this.imageWidth + (this.imageMargin * 2)) * this.numImages;
        $j(that.imagesHolder).find('ul').css('width', carouselImagesHolderWidth + 'px');
        $j(that.imagesHolder).find('ul').css('height', that.imageHeight + 'px');
        $j(that.imagesHolder).css('height', that.imageHeight + 'px');
        $j(that.display).css('height', that.imageHeight + 'px');

        // add margins around images
        $j(this.imagesLI).each(function (){
            $j(this).css({'margin-left':that.imageMargin, 'margin-right':that.imageMargin});
        });

        // re-position UL according to which slide we are looking at.
        var newX = that.currentSlide * that.imageWidth;
        TweenMax.set(that.imagesUL, { x:-newX });

        // re-position left and right arrows
        TweenMax.set(that.leftBtn, { top:(that.imageHeight / 2) - (that.leftBtn.height() / 2) });
        TweenMax.set(that.rightBtn, { top:(that.imageHeight / 2) - (that.rightBtn.height() / 2) });
    },

    addResizeListener: function () {
        var that = this;
        $j( window ).resize(function() {
            that.setupSizes();
        });
    },

    setupImages: function() {
        var that = this;

        // calculate image width based on holder size
        this.imageWidth = this.imagesHolder.width();

        // calculate total UL width with all images inside
        var carouselImagesHolderWidth = (this.imageWidth + (this.imageMargin * 2)) * this.numImages;
        $j(that.imagesHolder).find('ul').css('width', carouselImagesHolderWidth + 'px');

    },

    initBtns: function () {
        var that = this;

        this.leftBtn = $j(this.display).find('.arrow-left');
        this.rightBtn = $j(this.display).find('.arrow-right');

        TweenMax.set(this.leftBtn, { autoAlpha:0 });
        $j(that.leftBtn).css('display', 'none');

        this.leftBtn.click(function (){
            // if this.rightBtn's opacity is less than 1, fade it in
            if ($j(that.rightBtn).css('opacity') < 1) {
                TweenMax.to(that.rightBtn, 0.5, { autoAlpha:1 });
            }

            if (that.currentSlide > 0) {
                that.currentSlide --;
                var xPos = (that.imageWidth + (that.imageMargin * 2)) * that.currentSlide;
                TweenMax.to(that.imagesUL, 1, { x:-xPos, ease:Power1.easeInOut });
                that.updateText();

                // tween the alpha of leaving item, and arriving item
                TweenMax.to(that.imagesLI[that.currentSlide + 1], 0.5, { alpha:0 });
                TweenMax.fromTo(that.imagesLI[that.currentSlide], 1, { alpha:0 }, { alpha:1 });
            }

            if (that.currentSlide == 0) {
                TweenMax.to(that.leftBtn, 0.5, { autoAlpha:0 });
            }
        });

        this.leftBtn.bind('mouseover', function (){
            TweenMax.to(this, 0.5, { backgroundPosition:'0px 0px' });
        });

        this.leftBtn.bind('mouseout', function (){
            TweenMax.to(this, 0.5, { backgroundPosition:'10px 0px' });
        });

        this.rightBtn.click(function (){

            // if this.leftBtn's opacity is less than 1, fade it in
            if ($j(that.leftBtn).css('opacity') < 1) {
                $j(that.leftBtn).css('display', 'block');
                TweenMax.to(that.leftBtn, 0.5, { autoAlpha:1 });
            }

            if (that.currentSlide < that.numImages-1) {
                //console.log(that.imageWidth);
                that.currentSlide ++;
                var xPos = (that.imageWidth + (that.imageMargin * 2)) * that.currentSlide;
                TweenMax.to(that.imagesUL, 1, { x:-xPos, ease:Power1.easeInOut });
                that.updateText();

                // tween the alpha of leaving item, and arriving item
                TweenMax.to(that.imagesLI[that.currentSlide - 1], 0.5, { alpha:0 });
                TweenMax.fromTo(that.imagesLI[that.currentSlide], 1, { alpha:0 }, { alpha:1 });
            }

            if (that.currentSlide == that.numImages-1) {
                TweenMax.to(that.rightBtn, 0.5, { autoAlpha:0 });
            }
        });

        this.rightBtn.bind('mouseover', function (){
            TweenMax.to(this, 0.5, { backgroundPosition:'10px 0px' });
        });

        this.rightBtn.bind('mouseout', function (){
            TweenMax.to(this, 0.5, { backgroundPosition:'0px 0px' });
        });
    },

    updateText: function () {
        var currentSlide = this.imagesLI[this.currentSlide];
        $j(this.text).html($j(currentSlide).find('img').attr('html'));
    },

    kill: function (){

    }
});