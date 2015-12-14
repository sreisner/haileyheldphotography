function onload() {
    $('.clickable').on('click', function() {
        var row = $(this).parent();
        var messageId = row.attr('data-message-id');
        row.removeClass('new');

        $.ajax({
            url: '/messages?messageId=' + messageId,
            method: 'PUT'
        });
        
        var data = row.find('td');

        var received = data[1].innerText;
        var name = data[2].innerText;
        var email = data[3].innerText;
        var comment = data[4].innerText;

        var modal = $('#messageModal');
        $('.modal-body').html([
            '<p><strong>Received</strong><br />' + received + '</p>',
            '<p><strong>Name</strong><br />' + name + '</p>',
            '<p><strong>Email</strong><br />' + email + '</p>',
            '<p><strong>Comment</strong><br />' + comment + '</p>',
        ].join(''));
        modal.modal();
    });

    $('input[type="checkbox"]').on('click', function() {
        var checkedBoxes = getCheckedBoxes();

        if(checkedBoxes.length > 0) {
            $('#delete-button').removeAttr('disabled');
        } else {
            $('#delete-button').attr('disabled', '');
        }
    });
}

function onDeleteClick() {
    var checkedBoxes = getCheckedBoxes();
    var confirm = window.confirm("Are you sure you want to delete these " + checkedBoxes.length + " messages?");
    if(confirm) {
        for(var i = 0; i < checkedBoxes.length; i++) {
            var checkbox  = checkedBoxes[i];
            var row = $(checkbox).parent().parent();
            var messageId = row.attr('data-message-id');
            $.ajax({
                url: '/messages?messageId=' + messageId,
                method: 'DELETE'
            });
            row.remove();
        }
    }
}

function getCheckedBoxes() {
    return $('input[type="checkbox"]').filter(function() {
        return this.checked;
    });
}