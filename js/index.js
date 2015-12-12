function showImageModal(element) {
    var image = $(element).find('img').clone();
    $('.modal-body').html(image);
    $('.modal-title').html($(element).attr("data-caption"));
    $('#imageModal').modal();
}