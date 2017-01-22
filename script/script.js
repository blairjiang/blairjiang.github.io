$(function() {

	// lazyload
    $("img.lazy").lazyload({
	    effect : "fadeIn",
	    threshold : 500
    });

    // parallax
	var $window = $(window);
	var $firstBG = $('#intro');
	var $secondBG = $('#second');
	var $thirdBG = $('#third');

	var windowHeight = $window.height();

	$('#intro, #second, #third').bind('inview', function (event, visible) {
	    if (visible == true) {
	        $(this).addClass("inview");
	    }else{
	      $(this).removeClass("inview");
	    }
	});

	$window.resize(function(){
	    Move();
	    RepositionNav();
	});
	window.onload = function(){
	    Move();
	    RepositionNav();
	}
	$window.bind('scroll', function(){
	    Move();
	});

	function RepositionNav(){
	    var windowHeight = $window.height();
	    var navHeight = $('#nav').height() / 2;
	    var windowCenter = (windowHeight / 2);
	    var newtop = windowCenter - navHeight;
	    $('#nav').css({"top": newtop});
	}

	function newPos(x, windowHeight, pos, adjuster, inertia){
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
	}

	function Move(){
	    var pos = $window.scrollTop();

	    if($firstBG.hasClass("inview")){
	    	$firstBG.css({'backgroundPosition': newPos(100, windowHeight, pos, 2400, 0.1) + ", " + newPos(0, windowHeight, pos, 2500, 0.3) + ", " + newPos(100, windowHeight, pos, 2500, 0.5)});
		}

	    if($secondBG.hasClass("inview")){
		    $secondBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 800, 0.1)});
		}

	    if($thirdBG.hasClass("inview")){
		    $thirdBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 800, 0.1)});
		}
	}
});

