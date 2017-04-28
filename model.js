var API_URL = "http://localhost:3000";

app.models.book = {
    getCollection: function(filterParams) {
        var queryStringParts = [];

        if (filterParams.bookTypeIds) {
            var type = filterParams.bookTypeIds.map(function(el) { // nazwy kluczy obiektu (.bookTypeIds itd.) są istotne (muszą być takie same jak w pliku app.js)
                // natomiast nazwa zmiennej, pod kt dostępny jest obiekt (filterParams) nie ma znaczenia (to searchBooksFilters w app.js)
                return 'bookTypeId='+el;
            }).join('&');
            queryStringParts.push(type);
        }

        if (filterParams.bookFormIds) {
            var form = filterParams.bookFormIds.map(function(el) {
                return 'bookFormId='+el;
            }).join('&');
            queryStringParts.push(form);
        }

        if (filterParams.bookGenreIds) {
            var genre = filterParams.bookGenreIds.map(function(el) {
                return 'bookGenreId='+el;
            }).join('&');
            queryStringParts.push(genre);
        }

        if (queryStringParts.length) { // potrzebne jest .length, bo pusta lista jest truthy
            var queryString = queryStringParts.filter(function(el) {
                return el.length > 0;
            }).join('&');
            return $.get(API_URL + '/books?' + queryString);
        } else {
            return $.get(API_URL + '/books'); // w app.js muszę przekazać pusty obiekt jako argument funkcji (!)
        }
    },
    getItem: function(id) {
        return $.get(API_URL + '/books/' + id);
    },
    createItem: function(itemData) {
        return $.post(API_URL + '/books', itemData);
    },
    updateItem: function(id, itemData) {
        return $.ajax({
            url: API_URL + '/books/' + id,
            type: 'PUT',
            data: itemData
        });
    },
    deleteItem: function(id) {
        return $.ajax({
            url: API_URL + '/books/' + id,
            type: 'DELETE'
        })
    }
};

app.models.bookTypes = {
    getCollection: function() {
        return $.get(API_URL + '/bookTypes');
    }
};

(function(){ // IIFE czyli Immediately Invoked Function Expression
    // wszystkie var-y wewn. tego IIFE NIE są dostępne na zewn. (istnieją, są używane - ale są ukryte, niedostępne = są PRYWATNE)

    var cachedBookForms;
    app.models.bookForms = {
        getCollection: function() {
            if(!cachedBookForms) { // warunek w if-e zawsze zrzuca się do true/false (uwaga na tzw. falsy values);
                // jeśli false, to wykonywany jest else (o ile został określony)
                cachedBookForms = $.get(API_URL + '/bookForms');
            }
            return cachedBookForms;
            // żaden kod po return nie zostanie nigdy wykonany
        }
    };

    var cachedBookGenres;
    app.models.bookGenres = {
        getCollection: function() {
            if(!cachedBookGenres) {
                cachedBookGenres = $.get(API_URL + '/bookGenres');
            }
            return cachedBookGenres;
        }
    };

}());
