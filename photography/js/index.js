function onload() {
    registerPhotoPreviewClickHandler();
}

function registerPhotoPreviewClickHandler() {
    $('#gallery').on('click', '.image-preview-container', function() {
        var image = $(this).find('img').clone();
        $('.modal-body').html(image);
        $('#imageModal').modal();
    });
}