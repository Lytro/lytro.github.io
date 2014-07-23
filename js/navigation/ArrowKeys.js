var ArrowKeys = Class.create({

    initialize: function() {

        // vars
        this.name = "ArrowKeys";

        this.start();
    },

    // functions
    start: function() {
        var that = this;

        $j(document).on('keydown', function(e){
            var direction;
            switch (e.keyCode) {
                case 37:
                    direction = "UP";
                    break;
                case 38:
                    direction = "UP";
                    break;
                case 39:
                    direction = "DOWN";
                    break;
                case 40:
                    direction = "DOWN";
                    break;
            }
            if (dotNav.active && direction != undefined) {
                if ($j(document).scrollTop() < 10) {
                    if (direction == "DOWN") {
                        if (!dotNav.inLastDot) {
                            dotNav.wheelMoveHightlight(direction);
                        }
                    } else {
                        dotNav.wheelMoveHightlight(direction);
                    }
                }
            }
        });
    },

    kill: function (){
        $j(document).off('keydown');
    }
});