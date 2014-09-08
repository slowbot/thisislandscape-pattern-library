$(document).foundation();

$(document).ready(function() {
  $('body').addClass('js');
  
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

// $(window).resize(function () {
//   $(.single-content).css({‘margin-top’: $(‘.hero)[0].offsetHeight;});
// });