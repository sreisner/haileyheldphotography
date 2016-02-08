var series;
var currentSeriesId;

function onload() {
    $('#about').hide();
    registerPhotoPreviewClickHandler();
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

function onSeriesClick(seriesButton) {
    transitionToPage('#about', '#gallery');
    $('.active').toggleClass('active');
    $('#navbar-series').toggleClass('active');
    $(seriesButton).parent().toggleClass('active');
    var seriesId = $(seriesButton).attr("data-id");
    selectSeries(seriesId);
    clearImageGallery();
    populateImageGallery(seriesId);
}

function onAboutClick() {
    $('.active').toggleClass('active');
    $('#navbar-about').toggleClass('active');
    transitionToPage('#gallery', '#about');
}

function transitionToPage(fromSelector, toSelector) {
    $(fromSelector).fadeOut(500, function() {
        $(toSelector).fadeIn(500);
    });
}

function initializeSeries() {
    series = retrieveSeriesFromServer();
    populateSeriesDropdown();
    $('#navbar-series').toggleClass('active');
    var firstSeriesId = Object.keys(series)[0];
    $('a[data-id="' + firstSeriesId + '"]').parent().toggleClass('active');
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
    return '<li><a data-id="' + seriesId + '" href="#" onclick="onSeriesClick(this)">' + name + '</a></li>';
}

function selectSeries(seriesId) {
    var dropdownTitle = $('#current-series');
    var name = series[seriesId];
    dropdownTitle.html(name);

    currentSeriesId = seriesId;
}