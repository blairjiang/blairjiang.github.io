var scrollPos = 0;
var windowH = $(window).height();

function onScroll(){

	// 滚动距离
    scrollPos = Math.floor($(document).scrollTop() - 50);
	var offsetPos = [];

    $('.page').each(function(){

		// 容器顶部距离文档顶部的距离
    	offsetPos.push(Math.floor($(this).offset().top));
    	// console.log(scrollPos + ', ' + windowH + ', ' + offsetPos);
    });

    $('#nav li .lk').each(function(){

    	var idx = $(this).parents('li').index();

    	if(offsetPos[idx] <= scrollPos + windowH){
    		$('#nav li').removeClass('selected');
    		$(this).parents('li').addClass('selected');
    	}else{
    		$(this).parents('li').removeClass('selected');
    	}
    });

    if($('#index_second').hasClass('selected') && !$('#index_third').hasClass('selected')){
    	$('body').addClass('darkbg');
    }else{
    	$('body').removeClass('darkbg');
    }

    if($('#index_third').hasClass('selected')){
    	$('body').addClass('sidenavlower');
    }else{
    	$('body').removeClass('sidenavlower');
    }

}

window.onscroll = onScroll;
window.onload = onScroll;

// init controller
var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 0}});

// build scenes
new ScrollMagic.Scene({triggerElement: "#index_intro"})
	.setClassToggle("#index_intro", "selected") // add class toggle
	.addTo(controller);
new ScrollMagic.Scene({triggerElement: "#index_second"})
	.setClassToggle("#index_second", "selected") // add class toggle
	.addTo(controller);
new ScrollMagic.Scene({triggerElement: "#index_third"})
	.setClassToggle("#index_third", "selected") // add class toggle
	.addTo(controller);

$(function() {

	smoothScroll.init();

	// lazyload
    $("img.lazy").lazyload({
	    effect : "fadeIn",
	    threshold : 500
    });

    // parallax
	var $window = $(window);
	var $index_firstBG = $('#index_intro');
	var $index_secondBG = $('#index_second');
	var $index_thirdBG = $('#index_third');

	var windowHeight = $window.height();

	$('#index_intro, #index_second, #index_third').bind('inview', function (event, visible) {
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
	    var windowCenter = (windowHeight / 2);
	}

	function newPos(x, windowHeight, pos, adjuster, inertia){
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
	}

	function Move(){
	    var pos = $window.scrollTop();

	    if(pos > 500){
	    	$('.guide').css('display','none');
	    }

	    if($index_firstBG.hasClass("inview")){
	    	$index_firstBG.css({'backgroundPosition': newPos(100, windowHeight, pos, 1080, 0.3) + ", " + newPos(0, windowHeight, pos, 1500, 0.4) + ", " + newPos(100, windowHeight, pos, 2000, 0.5)});
		}

	    if($index_secondBG.hasClass("inview")){
		    $index_secondBG.css({'backgroundPosition': newPos(11, windowHeight, pos, 2400, 0.2) + ", " + newPos(48, windowHeight, pos, 2700, 0.4) + ", " + newPos(50, windowHeight, pos, 2000, 0)});
		}

	    if($index_thirdBG.hasClass("inview")){
		    $index_thirdBG.css({'backgroundPosition': newPos(11, windowHeight, pos, 3500, 0.1) + ", " + newPos(100, windowHeight, pos, 3800, .3)});
		}
	}
});

