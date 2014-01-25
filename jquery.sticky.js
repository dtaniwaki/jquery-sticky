/*!
 * jQuery Sticky
 * (c) 2014-2014 Daisuke Taniwaki
 * MIT Licensed.
 *
 * http://github.com/dtaniwaki/jquery-sticky
 */

(function($) {
  var defaultOptions = {
      stickyX: true,
      stickyY: true
    },
    $window = $(window),
    $document = $(document);

  var scrollFunc = function($target, options) {
    var $container = $target.parent();
    if ($container.css('position') !== 'relative' && $container.css('position') !== 'absolute') {
      $container.css('position', 'relative');
    }
    var scrollTop = $window.scrollTop();
    var scrollLeft = $window.scrollLeft();
    var containerWidth = $container.width();
    var containerHeight = $container.height();
    var containerTop = $container.offset().top;
    var containerLeft = $container.offset().left;
    var targetHeight = $target.outerHeight() + parseInt($target.css('margin-top')) + parseInt($target.css('margin-bottom'));
    var targetWidth = $target.outerWidth() + parseInt($target.css('margin-left')) + parseInt($target.css('margin-right'));
    var paddingTop = parseInt($container.css('padding-top'));
    var paddingBottom = parseInt($container.css('padding-bottom'));
    var paddingLeft = parseInt($container.css('padding-left'));
    var paddingRight = parseInt($container.css('padding-right'));

    var diffW = containerLeft + paddingLeft - scrollLeft + parseInt($container.css('border-left'));
    var diffH = containerTop + paddingTop - scrollTop + parseInt($container.css('border-top'));
    if (diffW <= targetWidth + paddingRight - containerWidth || diffH <= targetHeight + paddingBottom - containerHeight) {
      $target.css({
        position: 'absolute',
        top: '',
        bottom: '',
        left: '',
        right: ''
      });
      if (options.stickyY) {
        if (diffH <= targetHeight + paddingBottom - containerHeight) {
          $target.css({
            bottom: paddingBottom
          });
        } else if (0 > diffH - paddingTop) {
          $target.css({
            top: - diffH + 2 * paddingTop
          });
        }
      }
      if (options.stickyX) {
        if (diffW <= targetWidth + paddingRight - containerWidth) {
          $target.css({
            right: paddingRight
          });
        } else if (0 > diffW - paddingLeft) {
          $target.css({
            left: - diffW + 2 * paddingLeft
          });
        }
      }
    } else if (diffW < paddingLeft || diffH < paddingTop) {
      $target.css({
        position: 'fixed',
        top: diffH,
        bottom: '',
        left: diffW,
        right: '',
      });
      if (options.stickyY) {
        if (diffH < paddingTop) {
          $target.css({
            top: paddingTop
          });
        }
      }
      if (options.stickyX) {
        if (diffW < paddingLeft) {
          $target.css({
            left: paddingLeft
          });
        }
      }
    } else {
      $target.css({
        position: '',
        top: '',
        bottom: '',
        left: '',
        right: ''
      });
    }
  };

  $.fn.sticky = function(options) {
    var options = $.extend({}, defaultOptions, options);
    var $targets = $(this);

    $window.on('scroll resize', function(){
      $targets.each(function(idx) {
        var $target = $(this);
        scrollFunc($target, options);
      });
    });

    setTimeout(function() {
      $targets.each(function(idx) {
        var $target = $(this);
        scrollFunc($target, options);
      });
    }, 0);
  };
})(jQuery);
