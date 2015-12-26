var previousScrollPosition;
var scrolling;

function onload() {
    previousScrollPosition = 0;
    scrolling = false;

    $('.section-link').on('click', onSectionLinkClick);
    $(window).scroll(handleNavbarDisplay);
    handleNavbarDisplay();

}

function onSectionLinkClick(event) {
    var section = $(event.currentTarget).attr('data-section');
    if($('.navbar-toggle').attr('aria-expanded') === 'true') {
        $('.navbar-toggle').click();
    }
    scrollToSection(section);
}

function scrollToSection(section) {
    if(!scrolling) {
        scrolling = true
        $("html, body").animate({
            scrollTop: $(section).offset().top
        }, 500, 'easeOutQuint', function() {
            scrolling = false
        });
    }
}

function handleNavbarDisplay() {
    var currentScrollPosition = $(window).scrollTop();

    var toggleMenuThreshold = $('.menu-container').offset().top + $('.menu-container').height();
    var justWentBelowThreshold = previousScrollPosition < toggleMenuThreshold && currentScrollPosition >= toggleMenuThreshold;
    var justWentAboveThreshold = previousScrollPosition >= toggleMenuThreshold && currentScrollPosition < toggleMenuThreshold;

    if (justWentAboveThreshold) { 
        $('.navbar').fadeOut(250);
    } else if(justWentBelowThreshold) {
        $('.navbar').fadeIn(250);
    }

    previousScrollPosition = currentScrollPosition;
}

function selectSeries() {
    var gallerySelect = $(".gallery-select");
    var seriesName = gallerySelect.val();
    document.location.href = "/?series_name=" + seriesName + "#gallery-section";
}