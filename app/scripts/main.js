(function($) {
    'use strict';

    $(document).ready(function() {
        FastClick.attach(document.body);

        $('.highlight__title').fitText(0.8, {
            minFontSize: '43px',
            maxFontSize: '100px'
        });

        $('.highlight__title').velocity('transition.slideDownIn');
        $('.highlight__text').velocity('transition.slideUpIn', {
            delay: 100
        });
        $('footer i').velocity('transition.slideUpIn', {
            delay: 200,
            stagger: 100
        });

        var callout = window.setInterval(function() {
            $('.highlight__text').velocity('callout.bounce');
        }, 3000);

        var opened = false;
        $('.highlight__text__title').click(function() {
            if (opened) {
                $('.highlight img').velocity('reverse');
                $('.highlight__text__info').velocity('reverse');
                opened = false;
            } else {
                $('.highlight i').velocity({
                    opacity: 0
                });
                $('.highlight img').velocity({
                    opacity: 1
                }, {
                    delay: 300
                });
                window.clearInterval(callout);
                $('.highlight__text__info').velocity({
                    'max-height': 350
                }, {
                    easing: 'easeInOutCubic',
                    duration: 750
                });
                opened = true;
            }

        });

    });


    function fullscreenFix() {
        var h = $('body').height();
        // set .fullscreen height
        $('.content-b').each(function(i) {
            if ($(this).innerHeight() <= h) {
                $(this).closest('.fullscreen').addClass('not-overflow');
            }
        });
    }

    $(window).resize(fullscreenFix);
    fullscreenFix();

    /* resize background images */
    function backgroundResize() {
        var windowH = $(window).height();
        $('.background').each(function(i) {
            var path = $(this);
            // variables
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr('data-img-width');
            var imgH = path.attr('data-img-height');
            var ratio = imgW / imgH;
            // overflowing difference
            var diff = parseFloat(path.attr('data-diff'));
            diff = diff ? diff : 0;
            // remaining height to have fullscreen image only on parallax
            var remainingH = 0,
                maxH;
            if (path.hasClass('parallax')) {
                maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            // set img values depending on cont
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            // fix when too large
            if (contW > imgW) {
                imgW = contW;
                imgH = imgW / ratio;
            }
            //
            path.data('resized-imgW', imgW);
            path.data('resized-imgH', imgH);
            path.css('background-size', imgW + 'px ' + imgH + 'px');
        });
    }
    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize();
})(jQuery);