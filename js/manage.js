function onload() {
    $('#manage-form').hide();
}

function selectImage(imageContainer) {
    var caption = $(imageContainer).find('.image-preview-overlay-caption').text();
    var seriesName = $('#preview-series').find('[selected]').text();
    $('#edit-series').val(seriesName);
    $('#edit-caption').val(caption);
    $('#manage-form').show();

    $('.selected').toggleClass('selected');
    $(imageContainer).toggleClass('selected');
    $(imageContainer).find('.image-preview-overlay-container').toggleClass('selected');
}

function getSelectedPhotoId() {
    return $('.image-preview-container.selected').attr('data-id');
}

function deleteClick() {
    var confirm = window.confirm("Are you sure you want to delete this image?");
    if(confirm) {
        deletePhoto(getSelectedPhotoId());
        setTimeout(function() {
            location.reload()
        }, 500);
    }
}

function deletePhoto(id) {
    $.ajax({
        url: '/img?img_id=' + id,
        async: false,
        method: 'DELETE'
    });
}

function updateClick() {
    var series_name = $('#edit-series').val();
    var caption = $('#edit-caption').val();
    updatePhoto(getSelectedPhotoId(), series_name, caption);

    setTimeout(function() {
        location.reload()
    }, 500);
}

function updatePhoto(id, series_name, caption) {
    $.ajax({
        url: '/img?img_id=' + id + '&caption=' + caption + '&series_name=' + series_name,
        async: false,
        method: 'PUT'
    });
}

function onPreviewSeriesChange() {
    var series_name = $('#preview-series').val();
    window.location.assign('/admin/manage?series_name=' + series_name);
}