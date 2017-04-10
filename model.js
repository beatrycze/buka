var API_URL = "http://localhost:3000";

app.models.book = {
    getCollection: function(bookTypeId, bookFormId, bookGenreId) { // argumenty funkcji są pozycyjne (kolejność ma znaczenie!)
        if(bookTypeId) {
            return $.get(API_URL + '/books', {bookTypeId: bookTypeId});
        } else if(bookFormId) {
            return $.get(API_URL + '/books', {bookFormId: bookFormId});
        } else if(bookGenreId) {
            return $.get(API_URL + '/books', {bookGenreId: bookGenreId});
        } else {
            return $.get(API_URL + '/books');
        }
    },
    getItem: function() {
        //...
    },
    createItem: function(itemData) {
        return $.post(API_URL + '/books', itemData);
    },
    updateItem: function() {
        //...
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
