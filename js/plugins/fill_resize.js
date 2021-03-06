//credit to Alexander Stek, web developer. @ http://epicwebsites.com/
//additional credit to Drew Baker on StackOverflow, original post http://stackoverflow.com/questions/4380105/html5-video-scale-modes

   var sxsw = {

    full_bleed: function(boxWidth, boxHeight, imgWidth, imgHeight) {

        // Calculate new height and width...
        var initW = imgWidth;
        var initH = imgHeight;
        var ratio = initH / initW;

        imgWidth = boxWidth;
        imgHeight = boxWidth * ratio;

        // If the video is not the right height, then make it so...     
		
        if(imgHeight < boxHeight){
            imgHeight = boxHeight;
            imgWidth = imgHeight / ratio;
        }
		
		
        //  Return new size for video
        return {
            width: imgWidth,
            height: imgHeight
        };

    },

};


jQuery(document).ready(function($) {       

    /*
     * Full bleed background
     */

	 function recalculateFills() {
		 
		 //get pixel size of browser window.
		var browserHeight = Math.round($(window).height());
        var browserWidth = Math.round($(window).width());
		
		
		//jquery all items on page with fill tag
		var fills = $('.fill');
		
		
		//for each fill, recalculate size and position and apply using jQuery
		fills.each(function () {
			
		//height of element. not neccessarily video
        var videoHeight = $(this).height();
        var videoWidth = $(this).width();


		//calculate new size
        var new_size = sxsw.full_bleed(browserWidth, browserHeight, videoWidth, videoHeight);

		//distance from top and left is half of the difference between the browser width and the size of the element
        $(this)
            .width(new_size.width)
            .height(new_size.height)
			.css("margin-left", ((browserWidth - new_size.width)/2))
			.css("margin-top", ((browserHeight - new_size.height)/2));
			
		});
	 }
	 
	 
	 recalculateFills();

	//we also have to recalculate if the window rectangle changes.
    $(window).resize(function() {
		recalculateFills();

    });
	
})