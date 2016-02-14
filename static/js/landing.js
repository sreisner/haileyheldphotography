function onload() {
    previousScrollPosition = 0;
    scrolling = false;

    $('.section-link').on('click', onSectionLinkClick);
    $(window).scroll(handleNavbarDisplay);
    handleNavbarDisplay();

    initializeSeries();
    initializeImages();

    $('#contact-form').submit(function(event) {
        if(!validateContactForm($(this))) {
            return false;
        }
        $.ajax({
            data: $(this).serialize(),
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function(response) {
                if(response.error) {
                    $('.alert').switchClass('alert-success', 'alert-danger');
                    $('#comment-submit-message').text('Please try again later.');
                } else {
                    $('.alert').switchClass('alert-danger', 'alert-success');
                    $('#comment-submit-message').text('Thanks!');
                }
                $('.alert').slideDown('slow');
                setTimeout(function() {
                    $('.alert').slideUp('slow');
                }, 5000);
                $('#contact-form').trigger('reset');
            }
        });
        return false;
    })
}

function validateContactForm(form) {
    var pass = true;
    var nameInput = form.find('input[name="name"]');
    var emailInput = form.find('input[name="email"]');
    var commentInput = form.find('textarea[name="comment"]');
    nameInput.parent().removeClass('has-error');
    emailInput.parent().removeClass('has-error');
    commentInput.parent().removeClass('has-error');
    if(nameInput.val() == '') {
        nameInput.parent().addClass('has-error');
        pass = false;
    }
    if(emailInput.val() == '') {
        emailInput.parent().addClass('has-error');
        pass = false;
    }
    if(commentInput.val() == '') {
        commentInput.parent().addClass('has-error');
        pass = false;
    }
    return pass;
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
    var series = gallerySelect.val();
    clearGallery();
    if(series == 'all-photos') {
        retrievePhotos(populateGallery);
    } else {
        retrievePhotos(populateGallery, series);
    }
}

function initializeSeries() {
    retrieveAllSeries(createSeriesList);
}

function createSeriesList(series) {
    series.forEach(function(current) {
        $('.gallery-select').append('<option value="' + current._id + '">' + current.name + '</option>');
    });
}

function initializeImages() {
    retrievePhotos(populateGallery);
}

function clearGallery() {
    $('.gallery-column').empty();
}

function populateGallery(images) {
    var galleryColumns = $('.gallery-column');
    for(var i = 0; i < images.length; i++) {
        var caption = images[i].caption.split('"').join("&quot;");
        $(galleryColumns[i % galleryColumns.length]).append([
            '<div class="image-preview-container" data-photo-id="' + images[i]._id + '" data-caption="' + caption + '" data-uploaded="' + images[i].date_uploaded + '" onclick="showImageModal(this)">',
                '<img src="/api/photo/' + images[i]._id + '?preview=true" />',
                '<div class="image-preview-overlay-container">',
                    '<div class="image-preview-overlay-rectangle"></div>',
                    '<p class="image-preview-overlay-caption">' + caption + '</p>',
                '</div>',
            '</div>'
        ].join(''));
    }
}
