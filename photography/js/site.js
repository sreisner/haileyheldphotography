function onload() {
    $('#gallery').on('click', '.img-container', function() {
        showImageDetail($(this).children().first().clone());
    })
}

function showImageDetail(imageElement) {
    $('.img-detail-overlay').attr('shown', 'true');
    $('.img-holder').css('height', $(window).height());
    $('.img-holder').css('width', $(window).width());
    $('.img-holder').append(imageElement);
    imageElement.css('width', '100%');
    imageElement.css('height', '100%');
}