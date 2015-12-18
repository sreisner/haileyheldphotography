var previousScrollPosition;
var scrolling;

function onload() {
    initializeSectionClickListener();
    initializeNavBar();

    previousScrollPosition = 0;
    scrolling = false;
}

function initializeSectionClickListener() {
    $('.section-link').on('click', function() {
        if(!scrolling) {
            scrolling = true
            var section = $($(this).attr('data-section'));
            $("html, body").animate({
                scrollTop: section.offset().top
            }, 500, 'easeOutQuint', function() {
                scrolling = false
            });
        }
    });
}

function initializeNavBar() {
    $(window).scroll(function() {
        var currentScrollPosition = $(window).scrollTop();

        var toggleMenuThreshold = $('.menu-container').offset().top + $('.menu-container').height()
        var justWentBelowThreshold = previousScrollPosition < toggleMenuThreshold && currentScrollPosition >= toggleMenuThreshold;
        var justWentAboveThreshold = previousScrollPosition >= toggleMenuThreshold && currentScrollPosition < toggleMenuThreshold;

        if (justWentAboveThreshold) { 
            $('.navbar').fadeOut(250);
        } else if(justWentBelowThreshold) {
            $('.navbar').fadeIn(250);
        }

        previousScrollPosition = currentScrollPosition;
    });
}