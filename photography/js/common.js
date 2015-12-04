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