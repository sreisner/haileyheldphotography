function onload() {
    getImagesForSeriesFromServer(1);
}

function onSeriesClick(element) {
    getImagesForSeriesFromServer(element.id);
}

function getImagesForSeriesFromServer(seriesId) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            /*
            document.getElementById('current-series').innerText = getSeriesName(seriesId);
            document.getElementById("image-grid").innerHTML = request.responseText;
            */
        }
    };
    request.open("GET", "getImagesInSeries.php?seriesId=" + seriesId, true);
    request.send();
}

function getSeriesName(seriesId) {
    var seriesLinks = document.getElementsByClassName('series-link');
    for(var i = 0; i < seriesLinks.length; i++) {
        var link = seriesLinks[i];
        if(link.id == seriesId) {
            return link.innerText;
        }
    }
    return '';
}
