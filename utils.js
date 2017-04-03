function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addSpinner() {
    $('#container').html(' ');
    $('#container').addClass('spinner');
}

function removeSpinner() {
    $('#container').removeClass('spinner');
}
