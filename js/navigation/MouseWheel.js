var MouseWheel = Class.create({

    initialize: function() {

        // vars
        this.name = "MouseWheel";

        this.start();
    },

    // functions
    start: function() {
        this.bindMouseWheel();
    },

    bindMouseWheel: function () {
        var that = this;
        var scrollTicks = 0;

        $j('html').bind('mousewheel', function(event) {
            //event.preventDefault();

            if (dotNav.active) {
                var scrollTop = this.scrollTop;
                this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
                //console.log("this.scrollTop: " + this.scrollTop);
                //console.log(event.deltaY, event.deltaFactor, event.originalEvent.deltaMode, event.originalEvent.wheelDelta);

                if ($j(document).scrollTop() < 10) {
                    if (event.deltaY > 0) {
                        scrollTicks ++;
                    } else {
                        scrollTicks --;
                    }
                }

                //console.log("scrollTicks: " + scrollTicks);

                var leeway = 1;

                if (scrollTicks > leeway || scrollTicks < -leeway) {
                    if (scrollTicks < -leeway) {
                        if (!dotNav.inLastDot) {
                            dotNav.wheelMoveHightlight("DOWN");
                            dotNav.active = false;
                        }
                    } else {
                        dotNav.wheelMoveHightlight("UP");
                        dotNav.active = false;
                    }
                    scrollTicks = 0;
                }
            }
        });
    },

    unbindMouseWheel: function () {
        $j('html').unbind('mousewheel');
    },

    kill: function (){
        $j('html').unbind('mousewheel');
    }
});