function retrieveImagesFromServer(seriesId) {
    var response = $.ajax({
        url: 'images.php?seriesId=' + seriesId,
        async: false
    });
    return $.parseJSON(response.responseText);
}

function retrieveSeriesFromServer() {
    var response = $.ajax({
        url: 'series.php',
        async: false
    });
    var seriesList = $.parseJSON(response.responseText);
    var seriesDict = [];
    for(var i = 0; i < seriesList.length; i++) {
        var seriesItem = seriesList[i];
        seriesDict[seriesItem.id] = seriesItem.name;
    }
    return seriesDict;
}

function clearImageGallery() {
    var columns = document.getElementsByClassName('gallery-column');
    for(var i = 0; i < columns.length; i++) {
        $(columns[i]).html('');
    }
}

function populateImageGallery(seriesId) {
    var columns = document.getElementsByClassName('gallery-column');
    var images = retrieveImagesFromServer(seriesId);
    for(var i = 0; i < images.length; i++) {
        var image = images[i];
        var column = columns[i % columns.length];
        var html = [
            '<div class="image-preview-container" data-id="' + image.id + '" data-caption="' + image.caption + '">',
                '<img src="' + image.filename + '" />',
                '<div class="image-preview-overlay-container">',
                '    <div class="image-preview-overlay-rectangle"></div>',
                '    <p class="image-preview-overlay-caption">' + image.caption + '</p>',
                '</div>',
            '</div>'
        ].join('\n');
        $(column).append(html);
    }
}