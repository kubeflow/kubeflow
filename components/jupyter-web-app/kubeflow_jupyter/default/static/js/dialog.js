function showDialog(options) {
    id = 'delDialog'

    // Close previously opened dialog
    $('.dialog-container').remove();
    $(document).unbind("keyup.dialog");

    $('<div id="' + id + '" class="dialog-container"><div class="mdl-card mdl-shadow--16dp" id="' + id + '_content"></div></div>').appendTo("body");
    var dialog = $('#' + id);
    var content = dialog.find('.mdl-card');
    
    // Content text
    $('<h5>' + options.title + '</h5>').appendTo(content);
    $('<p>' + options.text + '</p>').appendTo(content);
    
    if (options.negative || options.positive) {
        var buttonBar = $('<div class="mdl-card__actions dialog-button-bar"></div>');
        if (options.negative) {
            var negButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="negative">' + options.negative.title + '</button>');
            negButton.click(function (e) {
                e.preventDefault();
                hideDialog(dialog)
            });
            negButton.appendTo(buttonBar);
        }
        if (options.positive) {
            var posButton = $('<button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="positive">' + options.positive.title + '</button>')
                .attr({
                    style: 'color:red;'
                });
            posButton.click(function (e) {
                e.preventDefault();
                if (!options.positive.onClick(e))
                    hideDialog(dialog)
            });
            posButton.appendTo(buttonBar);
        }
        buttonBar.appendTo(content);
    }
    componentHandler.upgradeDom();
    
    // Close the dialog on click out
    dialog.click(function () {
        hideDialog(dialog);
    });
    $(document).bind("keyup.dialog", function (e) {
        if (e.which == 27)
            hideDialog(dialog);
    });
    content.click(function (e) {
        e.stopPropagation();
    });
    setTimeout(function () {
        dialog.css({opacity: 1});
        if (options.onLoaded)
            options.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({opacity: 0});
    setTimeout(function () {
        dialog.remove();
    }, 400);
}