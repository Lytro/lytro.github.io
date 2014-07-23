var Reviews = Class.create({

    initialize: function() {

        // vars
        this.name = "Reviews";
        this.display = $j("#footer-reviews");
        this.items = $j(this.display).find('.review-item');
        this.numItems = this.items.length;

        this.init();

    },

    // functions

    init: function () {

        // get 3 random reviews
        var randomElements = $j(this.items).get().sort(function(){
            return Math.round(Math.random())-0.5
        }).slice(0,3);

        // empty container
        $j(this.display).empty();

        // add the 3 items back in
        $j(this.display).html(randomElements);
    }
});