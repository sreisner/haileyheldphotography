function onload() {
    registerPhotoPreviewClickHandler();
    populateSeriesList();
    updateManageGallery();
    hideManageForm();
}

function registerPhotoPreviewClickHandler() {
    $('#gallery').on('click', '.image-preview-container', function() {
        clearSelected();
        var selectedImageElement = $(this).find('.image-preview-overlay-container');
        selectImagePreview(selectedImageElement);
        showManageForm();
        populateForm(selectedImageElement);
    });
}

function clearSelected() {
    $('.image-preview-overlay-container').removeClass('selected');
}

function selectImagePreview(element) {
    element.toggleClass('selected');
}

function populateForm(element) {
    var caption = element.find('.image-preview-overlay-caption').text();
    var seriesId = getSelectedManageSeriesId();
    $('#edit-series').val(seriesId);
    $('#edit-caption').val(caption);
}

function populateSeriesList() {
    var seriesElement = $('.series');
    var series = retrieveSeriesFromServer();
    for(var seriesId in series) {
        var seriesName = series[seriesId];
        var html = '<option value="' + seriesId + '">' + seriesName + '</option>';
        seriesElement.append(html);
    }
}

function updateManageGallery() {
    var seriesId = getSelectedManageSeriesId();
    clearImageGallery();
    populateImageGallery(seriesId);
}

function getSelectedManageSeriesId() {
    var seriesElement = document.getElementById('preview-series');
    return seriesElement.options[seriesElement.selectedIndex].value;
}

function showManageForm() {
    $('#manage-form').show();
}

function hideManageForm() {
    $('#manage-form').hide();
}

function deleteImage() {
    var confirm = window.confirm("Are you sure you want to delete this image?");
    if(confirm) {
        var selectedImageId = getSelectedImageId();
        $.ajax({
            url: 'deleteImage.php?image=' + selectedImageId,
            async: false
        });
        hideManageForm();
        updateManageGallery();
    }
}

function saveImageMetadata() {
    var selectedImageId = getSelectedImageId();
    var newCaption = $('#edit-caption').val();
    var newSeries = $('#edit-series').val();
    $.ajax({
        url: 'updateImage.php?image=' + selectedImageId + '&caption=' + newCaption + '&series=' + newSeries,
        async: false
    });
    var selectedImageId = getSelectedImageId();
    updateManageGallery();
    selectImagePreview($('div[data-id="' + selectedImageId + '"]').find('.image-preview-overlay-container'));
}

function getSelectedImageId() {
    return $('.selected').parent().attr('data-id');
}