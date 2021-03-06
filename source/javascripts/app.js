$(document).foundation();

$(document).ready(function() {
  $('body').addClass('js');
  $(".loading").delay(500).animate({"opacity": "1"}, 500);

  var $menu = $('#header'),
  	  $menulink = $('#trigger-overlay');
	
	$menulink.click(function(e) {
		e.preventDefault();
		$menulink.toggleClass('active');
	});

	// Dock the header to the top of the window when scrolled past the banner.
    // This is the default behavior.

    $('.sticky').scrollToFixed({
            limit: $('.header').offset().top - $('.footer').outerHeight() - 10,
        zIndex: 1000,
        removeOffsets: true,
        // preFixed: function() { $(this).find('.stuck').css('opacity', '1'); },
        // postFixed: function() { $(this).find('.stuck').css('opacity', '0'); }
    });  

    // This is the default behavior.

	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay-navigation' ),
		closeBttn = overlay.querySelector( 'a.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
  
});

$(function(){
    $(document).scroll(function(){
        $('#wrapper').stop().animate({
            scrollTop : $(this).scrollTop()
        });            
    });
});

$(function(){

    $(window).load(setScrollToFixed);

    $(window).resize(function() {
      $('h3.flip').trigger('detach.ScrollToFixed');
      window.setTimeout(setScrollToFixed, 2);
    });

    function setScrollToFixed() {
      var total_flips = $('h3.flip').length;
      for (i = 1; i <= total_flips; i++) {
        var flip_selector = '#flip',
          next_selector,
          this_selector = '#offering';

        if(i > 1) {
          flip_selector += '-'+i;
          this_selector += '-'+i;
        }
        if(i+1 <= total_flips) {
          next_selector = '#offering-' + (i+1);
        } else {
          next_selector = '.footer';
        }

        $(flip_selector).scrollToFixed({
          marginTop: 10,
          limit: $(next_selector).offset().top - $(flip_selector).height() - 50,
          removeOffsets: true
        });
      }
    }
});

$(function() {
  var up = $('.scroll-arrows a.arrow[data-direction=up]'),
    down = $('.scroll-arrows a.arrow[data-direction=down]'),
    mask = $('.nav-projects-mask'),
    menu_height = mask.find('li').first().outerHeight(true) * mask.find('li').length,
    scroll_bottom = menu_height - mask.height();
  $(window).resize(function() {
    menu_height = mask.find('li').first().outerHeight(true) * mask.find('li').length;
    scroll_bottom = menu_height - mask.height();
  });
  $('.nav-projects-mask').scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      if(mask.scrollTop() == 0) {
        up.addClass('disabled');
        down.removeClass('disabled');
      } else if(mask.scrollTop() == scroll_bottom) {
        up.removeClass('disabled');
        down.addClass('disabled');
      } else {
        up.removeClass('disabled');
        down.removeClass('disabled');
      }
    }, 2));
  });
  $('.scroll-arrows a.arrow').click(function(e) {
    e.stopPropagation();
    var row_height = $('.nav-projects li').first().outerHeight(true),
      num_rows_to_scroll = 3,
      distance_to_scroll = row_height * num_rows_to_scroll,
      mask = $('.nav-projects-mask'),
      current_scroll = mask.scrollTop(),
      new_scroll;

    if($(this).attr('data-direction') == 'up') {
      distance_to_scroll = -distance_to_scroll;
    }

    new_scroll = current_scroll += distance_to_scroll;

    mask.animate({
      scrollTop: new_scroll
    }, 400, 'swing');
      return false;
  });
}); 

$(function() {
  $(document).scroll(function(){
    $('#wrapper').stop().animate({
      scrollTop : $(this).scrollTop()
    });
  });
});

$(function() {
  $(document).scroll(function(){
    $('#wrapper').stop().animate({
      scrollTop : $(this).scrollTop()
    });
  });
});

// $(function() {
//     var BV = new $.BigVideo();
//     BV.init();
//     BV.show('http://player.vimeo.com/external/100548965.hd.mp4?s=9a82338920735dbeddd973533916a291');
// });
  var BV,
    isTouch = Modernizr.touch,
    $window = $(window);

      $(document).ready(function(){
           
        if (!isTouch) {
          // initialize BigVideo
          BV = new $.BigVideo({forceAutoplay:isTouch});
          BV.init();
          showVideo();
                  
          BV.getPlayer().addEvent('loadeddata', function() {
            onVideoLoaded();
          });
  
          // fix image alignment problem
          adjustImagePositioning();
                  // repeat fix when window gets resized
                  $window.on('resize', adjustImagePositioning);
        }
  
        function showVideo() {
          BV.show($('.wrapper .screen').attr('data-video'),{ambient:true});
          $('.wrapper .screen .big-image').css({opacity:0});
        } 

        function onVideoLoaded() {
          $('.wrapper .screen').find('.big-image').animate({opacity:0},500);
        }
      });

      function adjustImagePositioning() {
        $(".big-image").each(function(){
          var $img = $(this),img = new Image();
          img.src = $img.attr('src');

          var windowWidth = $window.width(),
            windowHeight = $window.height(),
            r_w = windowHeight / windowWidth,
            i_w = img.width,
            i_h = img.height,
            r_i = i_h / i_w,
            new_w, new_h, new_left, new_top;

          if( r_w > r_i ) {
            new_h   = windowHeight;
            new_w   = windowHeight / r_i;
          } else {
            new_h   = windowWidth * r_i;
            new_w   = windowWidth;
          }

          $img.css({
            position: "absolute",
            width   : new_w,
            height  : new_h,
            left    : ( windowWidth - new_w ) / 2,
            top     : (( windowHeight - new_h ) / 2),
            marginTop:-43
          });
        });
      }

      vjs('100548965', {nativeControlsForTouch: false});