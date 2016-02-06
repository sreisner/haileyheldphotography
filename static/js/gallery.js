function showImageModal(element) {
    var photoId = $(element).attr('data-photo-id');
    $('.modal-body').html('<img src="/api/photo/' + photoId + '" />');
    $('.modal-title').html($(element).attr('data-caption'));
    var uploaded = new Date($(element).attr('data-uploaded'));
    uploaded.setTime(uploaded.getTime() - (uploaded.getTimezoneOffset() * 60000));
    $('.uploaded').html(strftime('%A, %B %d, %Y @ %I:%M%p', new Date(uploaded)));
    $('#imageModal').modal();
}
