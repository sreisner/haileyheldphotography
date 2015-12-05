var series;
var currentSeriesId;

function onload() {
    registerPhotoPreviewClickHandler();
    registerSeriesClickHandler();
    initializeSeries();
    populateImageGallery(currentSeriesId);
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
        populateImageGallery(seriesId);
    });
}

function initializeSeries() {
    series = retrieveSeriesFromServer();
    populateSeriesDropdown();
    var firstSeriesId = Object.keys(series)[0]
    selectSeries(firstSeriesId);
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