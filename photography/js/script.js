var gallery;

function onload() {
    getImagesForSeriesFromServer(1);
    gallery = initializePhotoSwipe();
}

function initializePhotoSwipe(imageData) {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    var items = [];
    for(var i = 0; i < imageData.length; i++) {
        var image = imageData[i];
        items.append({
            src: 'images/' + image.filename + '.jpg',
            w: 400,
            h: 400
        });
    }

    var options = {
        index: 0
    };

    return new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
}

function onSeriesClick(element) {
    getImagesForSeriesFromServer(element.id);
}

function getImagesForSeriesFromServer(seriesId) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var response = $.parseJSON(request.responseText);
            gallery = initializePhotoSwipe(response);
            document.getElementById('current-series').innerText = getSeriesName(seriesId);
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
