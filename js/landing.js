function onload() {
    $('.menu-container > ul > li > a').on('click', function() {
        var section = $($(this).attr('data-section'));
        $("html, body").animate({
            scrollTop: section.offset().top
        }, 1000, 'easeInOutQuart');
    });
}