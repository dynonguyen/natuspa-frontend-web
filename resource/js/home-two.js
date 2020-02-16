$(window).on('load', function () {
    // Loading ...
    $('body').removeClass('.preload');
    $('#loader').delay(400).fadeOut('fast');
});
var windows = $(window);
$(document).ready(function () {
    // ================= Way point - nav sticky and scroll-top ================
    $('.services-section').waypoint(function (dicrection) {
        if (dicrection === 'down') {
            $('nav').addClass('nav-sticky');
            $('.scroll-top').css({
                'visibility': 'visible',
                'opacity': '1'
            });
        } else {
            $('nav').removeClass('nav-sticky');
            $('.scroll-top').css({
                'visibility': 'hidden',
                'opacity': '0'
            });
        }
    }, {
        offset: '0px'
    });

    // =========================== search button ==============================
    // open
    $('.search-button').on('click', function () {
        $('.search-form').css({
            'opacity': '1',
            'visibility': 'visible'
        });
    });
    // close
    $('.close-search').on('click', function () {
        $('.search-form').css({
            'opacity': '0',
            'visibility': 'hidden'
        });
    });

    // ============================ shop cart button =========================
    // open
    $('.bag-button').on('mouseenter', function () {
        $('.shop-cart').css({
            'opacity': '1',
            'visibility': 'visible'
        });
    });
    // close
    $('.bag-button').on('click', function () {
        $('.shop-cart').css({
            'opacity': '0',
            'visibility': 'hidden'
        });
    });
    $('.shop-cart').on('mouseleave', function () {
        $('.shop-cart').css({
            'opacity': '0',
            'visibility': 'hidden'
        });
    });

    // ======================== menu popup slide ============================
    $('.slide-icon').on('click', function () {
        $('.menu-popup').css('width', '450px');
    });
    $('.menu-popup .close-icon').on('click', function () {
        $('.menu-popup').css('width', '0');
    });

    // ======================= mobile navigation icon =======================
    let windows = $(window);
    if (windows.width() < 1190) {
        $('.main-nav').attr('id', 'main-nav-mobile');
    }
    windows.resize(function () {
        let width = windows.width();
        if (width < 1190) {
            $('.main-nav').attr('id', 'main-nav-mobile');
        } else {
            $('.main-nav').attr('id', '');
        }
    });

    // ====================== dropdown navigation ============================
    var addDropdownIcon = function () {
        $('.menu-item-has-child').each(function () {
            let currentItem = $(this).find('.nav-link');
            let currentText = currentItem.text();
            currentItem.html(currentText + '<span class="icon-dropdown"><i class="fal fa-caret-down"></i></span>')
        });
    }
    if ($('.main-nav').attr('id') === 'main-nav-mobile') {
        addDropdownIcon();
    }
    windows.resize(function () {
        if (windows.width() < 1190) {
            addDropdownIcon();
        } else {
            $('.icon-dropdown').css('display', 'none');
        }
    });


    // ======================= slide header ==================================
    //add id for slide
    $('.slide-item').each(function (index) {
        $(this).attr('id', index + 1);
    });
    // slide / slides
    var addIndexForSlide = function () {
        let totalSlides = $('.slide-item').length;
        let currentIndex = $('.slide-item.active').attr('id');
        $('.slider-index').html('0' + currentIndex.toString() + '/<span>' + totalSlides + '</span>');
    }
    addIndexForSlide();
    // add animation for slide text
    var addAnimatedForSlideText = function () {
        let activeSlide = $('.slide-item.active .slide-text');
        activeSlide.find('h3').addClass('animated fadeInUp');
        activeSlide.find('h1').addClass('animated fadeInDown');
        activeSlide.find('p').addClass('animated fadeInUp');
        activeSlide.find('button').addClass('animated fadeInRight');
    }
    var removeAnimatedForSlideText = function () {
        let activeSlide = $('.slide-item.active .slide-text');
        activeSlide.find('h3').removeClass('animated fadeInUp');
        activeSlide.find('h1').removeClass('animated fadeInDown');
        activeSlide.find('p').removeClass('animated fadeInUp');
        activeSlide.find('button').removeClass('animated fadeInRight');
    }
    addAnimatedForSlideText();

    // next and prev button
    var toNextSlide = function () {
        let activeSlide = $('.slide-item.active');
        let nextSlide = activeSlide.next();

        if (nextSlide.length !== 0) {
            removeAnimatedForSlideText();
            activeSlide.addClass('fadeOut').one('webkitAnimationEnd', function () {
                $('.fadeOut').removeClass('fadeOut').removeClass('active');
            });

            nextSlide.addClass('fadeIn active').one('webkitAnimationEnd', function () {
                addAnimatedForSlideText();
                $('.fadeIn').removeClass('fadeIn');
                addIndexForSlide();
            });
        } else {
            removeAnimatedForSlideText();
            activeSlide.addClass('fadeOut').one('webkitAnimationEnd', function () {
                $('.fadeOut').removeClass('fadeOut').removeClass('active');
            });
            $('.slide-item:first-child').addClass('fadeIn active').one('webkitAnimationEnd', function () {
                addAnimatedForSlideText();
                $('.fadeIn').removeClass('fadeIn');
                addIndexForSlide();
            });
        }
    }
    var toPrevSlide = function () {
        let activeSlide = $('.slide-item.active');
        let prevSlide = activeSlide.prev();
        if (prevSlide.length !== 0) {
            removeAnimatedForSlideText();
            activeSlide.addClass('fadeOut').one('webkitAnimationEnd', function () {
                $('.fadeOut').removeClass('fadeOut').removeClass('active');
            });
            prevSlide.addClass('fadeIn active').one('webkitAnimationEnd', function () {
                addAnimatedForSlideText();
                $('.fadeIn').removeClass('fadeIn');
                addIndexForSlide();
            });
        } else {
            removeAnimatedForSlideText();
            activeSlide.addClass('fadeOut').one('webkitAnimationEnd', function () {
                $('.fadeOut').removeClass('fadeOut').removeClass('active');
            });
            $('.slide-item:last-child').addClass('fadeIn active').one('webkitAnimationEnd', function () {
                addAnimatedForSlideText();
                $('.fadeIn').removeClass('fadeIn');
                addIndexForSlide();
            });
        }
    }
    autoTurnSlide = function () {
        let idInterval = setInterval(() => {
            toNextSlide();
        }, 8000);
    }

    // control silde
    $('#next').on('click', function () {
        toNextSlide();
    });
    $('#prev').on('click', function () {
        toPrevSlide();
    });
    autoTurnSlide();
    // ============================== Scroll Top =================================
    $('a').on('click', function (event) {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
        event.preventDefault();
    });
});
