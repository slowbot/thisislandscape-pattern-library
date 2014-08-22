$(document).foundation();

$(document).ready(function() {
  $('body').addClass('js');
  
  var $menu = $('#header'),
  	  $menulink = $('#trigger-overlay');
      $sharelink = $('#trigger-overlay-share');
	
	$menulink.click(function(e) {
		e.preventDefault();
		$menulink.toggleClass('active');
	});

  $sharelink.click(function(e) {
    e.preventDefault();
    $sharelink.toggleClass('active');
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

var triggerBttn = document.getElementById( 'trigger-overlay-share' ),
    overlay = document.querySelector( 'div.overlay-share' ),
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

// $(window).resize(function () {
//   $(.single-content).css({‘margin-top’: $(‘.hero)[0].offsetHeight;});
// });