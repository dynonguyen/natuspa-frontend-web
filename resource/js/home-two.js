$(window).on('load', function () {
    // Loading ...
    $('body').removeClass('.preload');
    $('#loader').delay(400).fadeOut('fast');
});
const windows = $(window);

$(document).ready(function () {
    // ================= Way point - nav sticky and scroll-top ================
    $('.about-section').waypoint(function (dicrection) {
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
    // ========================= Collection section =============================
    $('.collection').magnificPopup({
        type: 'image',
        delegate: 'a',
        fixedContentPos: false,
        gallery: {
            enabled: true
        },
        removalDelay: 300,
        mainClass: 'mfp-fade',
        zoom: {
            enabled: true,
            duration: 550,
            easing: 'ease-in-out',
            opener: function (openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });
    // detect mouse direction use JavaScript
    var direction = '';
    var oldX = 0;
    var oldY = 0;
    var mousemovemethod = function (e) {
        if (e.pageX > oldX && e.pageY == oldY) {
            direction = 'left-right';
        }
        else if (e.pageX == oldX && e.pageY > oldY) {
            direction = 'top-bottom';
        }
        else if (e.pageX == oldX && e.pageY < oldY) {
            direction = 'bottom-top'
        }
        else if (e.pageX < oldX && e.pageY == oldY) {
            direction = 'right-left';
        }
        oldX = e.pageX;
        oldY = e.pageY;
    }
    document.addEventListener('mousemove', mousemovemethod);
    $('.collect-item').on('mouseenter', function () {
        let active = $(this);
        let currentDirec;
        // static variable : fix the direction is constantly changing
        if (typeof currentDirec == 'undefined') {
            currentDirec = direction;
            document.removeEventListener('mousemove mousedown', mousemovemethod);
        }
        // add class fade in
        active.addClass('appear-' + currentDirec);
        active.find('.plus-icon').show(150);
        document.addEventListener('mousemove', mousemovemethod);
        // mouse leave -> add class fade out and remove class fade in
        active.on('mouseleave', function () {
            active.find('.plus-icon').hide(150);
            active.addClass('disappear-' + currentDirec).one('webkitAnimationEnd', function () {
                active.removeClass('appear-' + currentDirec);
                active.removeClass('disappear-' + currentDirec);
            });
        });
    });

    // =============================== Slick of testimonial =====================================
    // clone item
    $('.slide-content').clone().addClass('cloned').appendTo('.slick-slide-cite');
    $('.slick-slide-cite').slick({
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
    });
    // ============================= play-btn videobox - counter section ======================
    // play video embed
    let videoEmbed = $('.video-embed');
    $('.play-btn').on('click', function () {
        videoEmbed.show(350);
        $('#overlay').css('display', 'block');
        $('.close-btn').show(350);
    });
    $('.videobox-counter-wrapper .close-btn').on('click', function () {
        videoEmbed.hide(350);
        $('#overlay').css('display', 'none');
        $('.close-btn').hide(350);
    });

    // ========================= counter section ===============================
    let maxNumber = [1569, 160, 136];
    let syncRate_1 = Math.round(maxNumber[0] / maxNumber[1]);
    let syncRate_2 = Math.round(maxNumber[2] / maxNumber[1]);
    var countSync = function (speed = 150) {
        let count = [0, 0, 0];
        let intervalID = setInterval(function () {
            let flag = true;
            for (let i = 0; i < 3; ++i) {
                if (count[i] < maxNumber[i]) {
                    flag = false;
                    if (!i) {
                        count[i] += syncRate_1;
                    } else {
                        ++count[i];
                    }
                }
            }
            if (flag) {
                clearInterval(intervalID);
            }
            // fixed: over max number
            for (let i = 0; i < 3; ++i) {
                if (count[i] > maxNumber[i]) {
                    count[i] = maxNumber[i];
                }
            }
            // add html
            $('.number #number-1').text(count[0]);
            $('.number #number-2').text(count[1]);
            $('.number #number-3').text(count[2]);

        }, speed);
    }
    countSync();
    $('.counter-item').on('click', function () {
        countSync(35);
    });
    // ======================== latest blog slick ==============================
    // clone
    $('.post-box').clone().addClass('cloned').appendTo('.post-slider');
    // slick slider
    $('.post-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 1500
                }
            }
        ]
    });

    // ========================= Form Input - Service ==========================
    // dropdown
    let dropdownIcon = $('.dropdown-icon i');

    var flipUp = function () {
        $('.option-menu').animate({
            'opacity': '0',
            'height': '0'
        }, 500);
        dropdownIcon.removeClass('rotate').addClass('down');
    }
    var flipDown = function () {
        $('.option-menu').animate({
            'opacity': '1',
            'height': '156px'
        }, 500);
        dropdownIcon.removeClass('down').addClass('rotate');
    }

    dropdownIcon.on('click', function () {
        if (dropdownIcon.hasClass('down') === true) {
            flipDown();
        } else {
            flipUp();
        }
    });
    // select services
    let option = $('.option-menu .option');
    option.on('click', function () {
        $('.current-option').text($(this).text());
        $('.current-option').attr('data-value', $(this).attr('data-value'));
        if ($('.current-option').attr('data-value') != '0')
            $('.current-option').css('color', '#000');
        else
            $('.current-option').css('color', '#888');
        flipUp();
    });
    // Form Validation
    var isEmpty = function (item) {
        if (!item)
            return true;
        return false;
    }
    var isEmail = function (email) {
        let regex = /^([a-zA-Z0-9_])+\@(([a-zA-Z]{3,})+\.com)$/i;
        return regex.test(email);
    }
    var isPhoneNumber = function (phoneNumber) {
        let regex = /^\d{10,11}$/
        return regex.test(phoneNumber);
    }
    var checkTypeOfServices = function (tOS) {
        if (tOS.attr('data-value') == '0')
            return false;
        return true;
    }

    var onError = function (selector) {
        selector.next().css('display', 'block');
        selector.addClass('apply-shake').one('webkitAnimationEnd', function () {
            selector.removeClass('apply-shake')
        });
    }
    var onNoError = function (selector) {
        selector.next().css('display', 'none');
        selector.removeClass('apply-shake');
    }

    var validateForm = function (selectorName) {
        let selector = $(selectorName + ' .form-input input');
        // check empty
        selector.each(function () {
            if (isEmpty($(this).val()))
                onError($(this));
            else
                onNoError($(this));
        });
        // check email
        let email = $(selectorName + ' #email');
        if (isEmail(email.val()))
            onNoError(email);
        else
            onError(email);
        // check phone number
        let phone = $(selectorName + ' #phone-number');
        if (isPhoneNumber(phone.val()))
            onNoError(phone);
        else
            onError(phone);
        // check type of services
        let typeOfService = $(selectorName + ' .current-option');
        if (checkTypeOfServices(typeOfService))
            onNoError(typeOfService);
        else
            onError(typeOfService);
    }

    $('.maps .submit-btn').click(function () {
        validateForm('.maps');
    });
    // ============================= modal dialog box ==============================
    // open
    let freeTime = 0;
    var setFreeTime = function () {
        windows.on('mousemove', () => { freeTime = 0; });
        windows.on('keypress', () => { freeTime = 0; });
        ++freeTime;
        // if it's 10 seconds then open
        if (freeTime >= 10 && windows.width() > 855) {
            $('#overlay').css('display', 'block');
            $('.modal-dialog-box').show(350);
            clearInterval(idFreeTimeInterval);
            freeTime = 0;
        }
    }
    let idFreeTimeInterval = setInterval(setFreeTime, 1000);
    // close
    $('.modal-dialog-box .close-icon').on('click', function () {
        $('#overlay').css('display', 'none');
        $('.modal-dialog-box').hide(350);
        idFreeTimeInterval = setInterval(setFreeTime, 1000);
    });
});
