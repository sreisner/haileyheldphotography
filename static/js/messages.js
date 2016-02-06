function onload() {
    $(document).on('click', '.clickable', function() {
        var row = $(this).parent();
        var messageId = row.attr('data-message-id');
        row.removeClass('new');

        $.ajax({
            url: '/api/message/' + messageId,
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

    $(document).on('click', 'input[type="checkbox"]', function() {
        var checkedBoxes = getCheckedBoxes();

        if(checkedBoxes.length > 0) {
            $('#delete-button').removeAttr('disabled');
        } else {
            $('#delete-button').attr('disabled', '');
        }
    });

    $.ajax({
        url: '/api/message',
        method: 'GET',
        success: function(messages) {
            if(messages.error) {
                alert('Error retrieving messages from server');
                return;
            }
            messages.forEach(function(message) {
                var trClass = message.seen ? '' : 'new';
                $('.table').append([
                    '<tr class="' + trClass + '" data-message-id="' + message._id + '">',
                        '<td><input type="checkbox"></td>',
                        '<td class="clickable">' + strftime('%A, %B %d, %Y @ %I:%M%p', new Date(message.received)) + '</td>',
                        '<td class="clickable">' + message.name + '</td>',
                        '<td class="clickable">' + message.email + '</td>',
                        '<td class="clickable"><div class="comment-preview">' + message.comment + '</div></td>',
                    '</tr>'
                ].join(''));
            });
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
                url: '/api/message/' + messageId,
                method: 'DELETE'
            });
            row.remove();
        }
        $('#delete-button').attr('disabled', '');
    }
}

function getCheckedBoxes() {
    return $('input[type="checkbox"]').filter(function() {
        return this.checked;
    });
}
