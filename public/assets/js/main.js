(function($) {
    "use strict";

    /*----------------------------
    Responsive menu Active
    ------------------------------ */
    $(".mainmenu ul#primary-menu").slicknav({
        allowParentLinks: true,
        prependTo: '.responsive-menu',
    });

    /*----------------------------
    START - Menubar scroll animation
    ------------------------------ */
    jQuery(window).on('scroll', function() {
        if ($(this).scrollTop() > 10) {
            $('.header').addClass("sticky");
        } else {
            $('.header').removeClass("sticky");
        }
    });

    /*----------------------------
    START - Smooth scroll animation
    ------------------------------ */
    $('.mainmenu li a, .logo a,.slicknav_nav li a').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target ||
                $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body')
                    .animate({ scrollTop: targetOffset }, 2000);
                return false;
            }
        }
    });

    /*----------------------------
    START - Scroll to Top
    ------------------------------ */
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 600) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    $('.scrollToTop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 2000);
        return false;
    });

    /*----------------------------
    START - Slider activation
    ------------------------------ */
    $('.screenshot-wrap').slick({
        autoplay: true,
        dots: true,
        autoplaySpeed: 1000,
        slidesToShow: 1,
        centerPadding: '20%',
        centerMode: true,
        prevArrow: '',
        nextArrow: '',
        responsive: [{

            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                centerPadding: '33.3%'
            }

        }, {

            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                centerPadding: '0'
            }

        }]
    });


    /*----------------------------
    START - videos popup
    ------------------------------ */
    $('.popup-youtube').magnificPopup({ type: 'iframe' });
    //iframe scripts
    $.extend(true, $.magnificPopup.defaults, {
        iframe: {
            patterns: {
                //youtube videos
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        }
    });

    /*----------------------------
    START - Counterup
    ------------------------------ */
    $('.counter').counterUp({
        delay: 20,
        time: 3000
    });

    /*----------------------------
    START - Video
    ------------------------------ */
    if ($.fn.YTPlayer) {
        $(".player").YTPlayer();
    }


    /*----------------------------
    START - Preloader
    ------------------------------ */
    jQuery(window).on('load', function() {
        jQuery("#preloader").fadeOut(500);
    });

    /*----------------------------
    START - WOW JS animation
    ------------------------------ */
    new WOW().init();


    /*----------------------------
    START - Contact Form
    ------------------------------ */

    $("#contact-form").submit(function(e) {
        e.preventDefault();

        $($("#contact-form button")[0]).prop('disabled', true);

        $.post('/contact', $('form#contact-form').serialize(), function(response) {
                if (response.status) {
                    $('p.form-message').addClass('alert-success');
                } else {
                    $('p.form-message').addClass('alert-warning');
                }

                $('p.form-message').show().text(response.message).delay(5000).fadeOut(3000);
                $($("#contact-form button")[0]).prop('disabled', false);
            },
            'json'
        );
    });
}(jQuery));