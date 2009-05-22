/*------------------------------------------------------------------------------
  Copyright (c) 2009 Matt Kirman (http://mattkirman.com)
  Copyright (c) 2009 Redflex LLP (http://redflex.co.uk)
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
------------------------------------------------------------------------------*/

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