$(document).ready(function () {
    // scroll top
    $('.blog-details').waypoint(function (dicrection) {
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

    var countComments = function () {
        // Count and add to the number of comments
        var commentWrap = $('.comments');
        var mainComments = $('.main-comment');
        // count element
        let numberEle = $('.comment-item').length;
        // convert to string
        let numberText = '(' + numberEle.toString() + ')';
        // add
        commentWrap.find('.numbers').text(numberText);
    }

    countComments();

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
        let result = true;
        let selector = $(selectorName + ' input');
        let comment = $('.comment-form #comment');
        // check empty
        selector.each(function () {
            if (isEmpty($(this).val())) {
                result = false;
                onError($(this));
            }
            else
                onNoError($(this));
        });
        if (isEmpty(comment.val())) {
            onError(comment);
            result = false;
        }
        else
            onNoError(comment);
        // check email
        let email = $(selectorName + ' #email');
        if (isEmail(email.val())) {
            onNoError(email);
        }
        else {
            onError(email);
            result = false;
        }
        return result;
    }

    // post comment
    var postComment = function (selectorName) {
        let commentClone = $('.comment-item:first').clone();
        // author image
        commentClone.find('.author-img img').attr('src', './imgs/comment/guest.jpg');
        // set name 
        commentClone.find('.author-name').text($(selectorName + ' #fullName').val());
        // set date
        let now = moment();
        commentClone.find('.date').text(now);
        // set message
        commentClone.find('.comment-text').text($(selectorName + ' #comment').val());
        commentClone.prependTo($('.main-comments'));
        // reset form
        $(selectorName + ' input').each(function () {
            $(this).val('');
        });
        $(selectorName + ' textarea').val('');
        // count comments
        countComments();
    }

    $('.comment-form .post-btn').on('click', function () {
        let valid = validateForm('.comment-form');
        if (valid) {
            postComment('.comment-form');
        }
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