var series;
var currentSeriesId;

function onload() {
    registerPhotoPreviewClickHandler();
    registerSeriesClickHandler();
    initializeSeries();
    initializeImageGallery();
}

function registerPhotoPreviewClickHandler() {
    $('#gallery').on('click', '.image-preview-container', function() {
        var image = $(this).find('img').clone();
        $('.modal-body').html(image);
        $('.modal-title').html($(this).attr("data-caption"));
        $('#imageModal').modal();
    });
}

function registerSeriesClickHandler() {
    $('.dropdown-menu').on('click', 'a', function() {
        var seriesId = $(this).attr("data-id");
        selectSeries(seriesId);
        clearImageGallery();
        initializeImageGallery();
    });
}

function initializeSeries() {
    series = retrieveSeriesFromServer();
    populateSeriesDropdown();
    var firstSeriesId = Object.keys(series)[0]
    selectSeries(firstSeriesId);
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

function populateSeriesDropdown() {
    var seriesDropdown = $('.dropdown-menu');
    for(var seriesId in series) {
        var html = getSeriesDropdownItemHtml(seriesId);
        seriesDropdown.append(html);
    }
}

function getSeriesDropdownItemHtml(seriesId) {
    var name = series[seriesId];
    return '<li><a data-id="' + seriesId + '" href="#">' + name + '</a></li>';
}

function selectSeries(seriesId) {
    var dropdownTitle = $('#current-series');
    var name = series[seriesId];
    dropdownTitle.html(name);

    currentSeriesId = seriesId;
}

function clearImageGallery() {
    var columns = document.getElementsByClassName('gallery-column');
    for(var i = 0; i < columns.length; i++) {
        $(columns[i]).html('');
    }
}

function initializeImageGallery() {
    var columns = document.getElementsByClassName('gallery-column');
    var images = retrieveImagesFromServer();
    for(var i = 0; i < images.length; i++) {
        var image = images[i];
        var column = columns[i % columns.length];
        var html = [
            '<div class="image-preview-container" data-caption="' + image.caption + '">',
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

function retrieveImagesFromServer() {
    var response = $.ajax({
        url: 'images.php?seriesId=' + currentSeriesId,
        async: false
    });
    return $.parseJSON(response.responseText);
}