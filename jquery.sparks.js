(function($){
 
    $.fn.sparks = function(userDefinedSettings) {
        
        // extend our default settings with user defined
        var sparks = $.extend([
 
            /*  DEFAULTS  */
            {
                number: 10,
                speed:  5,
                img:    '/img/sparks/spark.png'
            }
 
        ], userDefinedSettings);
        
        
        // get the container width and height
        var cWidth = parseInt($(this).width());
        var cHeight = parseInt($(this).height());
        
        
        // for each type of spark defined in the settings array
        for (var i in sparks){
            
            // for each spark of this type
            for (var j=0; j<sparks[i].number; j++){
                
                // generate a random start point
                var posLeft = Math.floor(Math.random() * cWidth);
                var posTop = Math.floor(Math.random() * cHeight);
                
                // and normalise the time. this makes higher speed = faster
                var time = 20000 / sparks[i].speed;
                
                // create a new container div for the spark
                $('<div/>')
                    .attr('id', i + '_' + (j+1))
                    .addClass(i)
                    .append('<img src="'+sparks[i].img+'" />')
                    .css('position', 'absolute')
                    .css('left', posLeft-50)
                    .css('top', posTop-50)
                    .appendTo(this);
                
                // and animate it
                $(this).sparks.animateSparks( '#' + $(this).attr('id'),
                                              time,
                                              i + '_' + (j+1)
                                            );
            }
        }
 
        // finally return this for jQuery chaining
        return this;
    };
 
 
    // the animateSparks() utility function. not to be called by user
    $.fn.sparks.animateSparks = function (container, time, id) {
        var pageWidth = parseInt($(container).width());
        var pageHeight = parseInt($(container).height());
 
        var posLeft = Math.floor(Math.random() * pageWidth);
        var posTop = Math.floor(Math.random() * pageHeight);
 
        $('#' + id).animate({
            left: posLeft - 50,
            top: posTop - 50
        },time,function(){
            $(document).sparks.animateSparks(container, time, id);
        });
    };
 
})(jQuery);