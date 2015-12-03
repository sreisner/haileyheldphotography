var series;
var currentSeriesId;

function onload() {
    registerPhotoPreviewClickHandler();
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

function initializeImageGallery() {

}

function retrieveImagesFromServer() {
    
}