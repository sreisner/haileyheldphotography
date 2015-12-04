function onload() {
    populateSeriesList();
}

function populateSeriesList() {
    var seriesElement = $('#series');
    var series = retrieveSeriesFromServer();
    for(var seriesId in series) {
        var seriesName = series[seriesId];
        var html = '<option value="' + seriesId + '">' + seriesName + '</option>';
        seriesElement.append(html);
    }
}