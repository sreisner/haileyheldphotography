function showImageModal(element) {
    var photoId = $(element).attr('data-photo-id');
    $('.modal-body').html('<img src="/img?img_id=' + photoId + '" />');
    $('.modal-title').html($(element).attr('data-caption'));
    $('#imageModal').modal();
}