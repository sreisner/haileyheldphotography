function resizeIframe(obj) {
    setTimeout(function() {
        obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    }, 1000);
}