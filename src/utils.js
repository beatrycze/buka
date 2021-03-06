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

function addMediumSpinner() {
    $('#single-book-container').html(' ');
    $('.spinner-autocomplete').addClass('spinner-medium');
}

function removeMediumSpinner() {
    $('.spinner-autocomplete').removeClass('spinner-medium');
}

function highlightMenuTab(name) {
    app.selectors.menuTabAll.removeClass('active');
    app.selectors[name].addClass('active'); // odwołanie po . to wejście w konkretny atrybut (klucz o danej nazwie, po .)
    // użycie nawiasu [] daje dynamiczny dostęp do kluczy obiektu; [name] jest zmienną
}

function unhighlightMenuTab() {
    app.selectors.menuTabAll.removeClass('active');
}
