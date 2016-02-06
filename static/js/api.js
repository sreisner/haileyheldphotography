function retrievePhotos(callback, series) {
    var url = '/api/photo';
    if(series) {
        url += '?series=' + series;
    }
    $.ajax({
        type: "GET",
        url: url,
        success : function(response) {
            callback(response);
        }
    });
}

function retrieveAllSeries(callback) {
    $.ajax({
        type: "GET",
        url: "/api/series",
        success : function(response) {
            callback(response);
        }
    });
}
