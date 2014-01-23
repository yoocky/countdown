$(function(){
   $.extend({'countdown':function(options){
 	   var defaults = {
            img : {
     			urlUp : "imgs/up/",
                urlDown : 'imgs/down/',
                type :'.png',
                height: 26
             },
            endTime: new Date().getTime()
 	   };
 	   var options = $.extend(true,defaults,options)
	   var flip = function (location, number, maxNumber){
	   	    if($(location).data('number') == number ){
	   	    	return;
	   	    }
	        $(location).data('number',number);
	   	    var $lastUp = $(location).find('.upperHalf img').last();
	   	    var $firstUp = $(location).find('.upperHalf img').first();
	   	    var $lastDown = $(location).find('.lowerHalf img').last();
	    	var $firstDown = $(location).find('.lowerHalf img').first();
			$lastUp.attr({'src':options.img.urlUp+(number == maxNumber? 0 : number+1)+options.img.type,'style':''});
			$firstUp.attr('src',options.img.urlUp+number+options.img.type);
			$firstDown.attr('src',options.img.urlDown+(number == maxNumber? 0 : number+1)+options.img.type);
			$lastDown.attr('src',options.img.urlDown+number+options.img.type).css('height',0);
	        $lastUp.animate({height:0,marginTop:options.img.height},200,function(){ 
				$lastDown.animate({height:options.img.height},200)        
	        })
			
		}
		var aliquots_remainder = function(num1, num2) {
	            return [parseInt(num1 / num2, 10), num1 % num2];
	        };
	        /**
	         * @description 将一个时间差转换成x天x时x分x秒
	         * @param {Number} num  时间差
	         * @return {String} x天x时x分x秒
	         */
	    var to_dhms = function(num) {
	            var d, h, m;
	            d = aliquots_remainder(num * 1, 86400000);
	            //24 * 60 * 60 * 1000
	            h = aliquots_remainder(d[1], 3600000);
	            //60 * 60 * 1000
	            m = aliquots_remainder(h[1], 60000);
	            //60*1000
	            return [d[0], h[0], m[0], parseInt(m[1] / 1000, 10)];
	    };

		var countdown_main = function(endTime){
	               var nowTime = new Date().getTime(); remianTime = endTime - nowTime;
	                   if(remianTime<0){
	                   	return;
	                   }
	               var t= to_dhms(remianTime);
	                   day1 = Math.floor(t[0]/10);
	                   day2 = t[0]%10;
	                   hours1 = Math.floor(t[1]/10);
	                   hours2 = t[1]%10;
	                   minutes1 = Math.floor(t[2]/10);
	                   minutes2 = t[2]%10;
	                   seconds1 = Math.floor(t[3]/10);
	                   seconds2 = t[3]%10;
	                   flip('#day1',day1,9);
	                   flip('#day2',day2,9);
	                   flip('#hours1',hours1,2);
	                   flip('#hours2',hours2,9);
	                   flip('#minutes1',minutes1,5);
	                   flip('#minutes2',minutes2,9);
	                   flip('#seconds1',seconds1,5);
	                   flip('#seconds2',seconds2,9);
	                   setTimeout(function(){countdown_main(endTime)},1000)
		};
		countdown_main(options.endTime);
	 }
	});
   $.countdown({
   	  endTime : new Date(2014,01,0).getTime(),//时间戳
   	  img : {
     			urlUp : "imgs/up/",
                urlDown : 'imgs/down/',
                type :'.png',
                height: 26
             },
   });	 
})