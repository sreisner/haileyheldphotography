function onload() {
    initializeSeries();

    $('form').submit(function(event) {
        if(!validateUploadForm($(this))) {
            return false;
        }
        var inputs = $(this).find('input');
        $.ajax({
            data: new FormData(this),
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            contentType: false,
            processData: false,
            success: function(response) {
                if(response.error) {
                    $('.alert-message').text('Image failed to upload. ' + response.error);
                    $('.alert').switchClass('alert-success', 'alert-danger');
                } else {
                    $('.alert-message').text('Image uploaded successfully.');
                    $('.alert').switchClass('alert-danger', 'alert-success');
                }
                $('.alert').slideDown('slow');
                setTimeout(function() {
                    $('.alert').slideUp('slow');
                }, 3000);
                $('form').trigger('reset');
            },
            complete: function() {
                $('#loading-icon').hide();
                inputs.removeAttr('disabled');
            }
        });
        $('#loading-icon').show();
        inputs.attr('disabled', '');
        return false;
    });
}

function validateUploadForm(form) {
    var pass = true;
    var imageInput = form.find('input[name="image_data"]');
    var captionInput = form.find('input[name="caption"]');
    imageInput.parent().removeClass('has-error');
    captionInput.parent().removeClass('has-error');
    if(imageInput.val() == '') {
        imageInput.parent().addClass('has-error');
        pass = false;
    }
    if(captionInput.val() == '') {
        captionInput.parent().addClass('has-error');
        pass = false;
    }
    return pass;
}

// TODO:  Fix copy-paste between these two functions and landing.js.
function initializeSeries() {
    retrieveAllSeries(createSeriesList);
}

function createSeriesList(series) {
    series.forEach(function(current) {
        $('.gallery-select').append('<option value="' + current._id + '">' + current.name + '</option>');
    });
}
