function onload() {
    retrieveAllSeries(onSeriesInitialized);
}

function onSeriesInitialized(series) {
    createSeriesList(series);
    onPreviewSeriesChange();
}

function createSeriesList(series) {
    if(series.error) {
        alert('Error retrieving data from server.');
        return;
    }
    series.forEach(function(current) {
        $('.gallery-select').append('<option value="' + current._id + '">' + current.name + '</option>');
    });
}

function populateGallery(images) {
    if(series.error) {
        alert('Error retrieving data from server.');
        return;
    }
    var galleryColumns = $('.gallery-column');
    for(var i = 0; i < images.length; i++) {
        $(galleryColumns[i % galleryColumns.length]).append([
            '<div class="image-preview-container" data-photo-id="' + images[i]._id + '" data-caption="' + images[i].caption + '" data-uploaded="' + images[i].date_uploaded + '" onclick="selectImage(this)">',
                '<img src="/api/photo/' + images[i]._id + '?preview=true" />',
                '<div class="image-preview-overlay-container">',
                    '<div class="image-preview-overlay-rectangle"></div>',
                    '<p class="image-preview-overlay-caption">' + images[i].caption + '</p>',
                '</div>',
            '</div>'
        ].join(''));
    }
}

function selectImage(imageContainer) {
    var caption = $(imageContainer).find('.image-preview-overlay-caption').text();
    var series = $('#preview-series').val();
    $('#edit-series').val(series);
    $('#edit-caption').val(caption);
    $('#manage-form').show();

    $('.selected').toggleClass('selected');
    $(imageContainer).toggleClass('selected');
    $(imageContainer).find('.image-preview-overlay-container').toggleClass('selected');
}

function getSelectedPhotoId() {
    return $('.image-preview-container.selected').attr('data-photo-id');
}

function deleteClick() {
    var confirm = window.confirm("Are you sure you want to delete this image?");
    if(confirm) {
        deletePhoto(getSelectedPhotoId());
    }
}

function deletePhoto(id) {
    $.ajax({
        url: '/api/photo/' + id,
        method: 'DELETE',
        success: function() {
            $('div[data-photo-id="' + id + '"]').remove();
            onPreviewSeriesChange();
        }
    });
}

function updateClick() {
    var series = $('#edit-series').val();
    var caption = $('#edit-caption').val();
    if(caption) {
        updatePhoto(getSelectedPhotoId(), series, caption);
    }
}

function updatePhoto(id, series, caption) {
    $.ajax({
        url: '/api/photo/' + id,
        data: {
            'caption' : caption,
            'series' : series
        },
        method: 'PUT',
        complete: function() {
            $('#preview-series').val(series);
            $('#preview-series').trigger('change');
        }
    });
}

function onPreviewSeriesChange() {
    $('#manage-form').hide();
    var seriesId = $('#preview-series').val();
    clearGallery();
    retrievePhotos(populateGallery, seriesId);
}

function clearGallery() {
    $('.gallery-column').empty();
}
