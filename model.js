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
    createItem: function() {
        //...
    },
    updateItem: function() {
        //...
    },
    deleteItem: function() {
        //...
    }
};

app.models.bookTypes = {
    getCollection: function() {
        return $.get(API_URL + '/bookTypes');
    }
};

app.models.bookForms = {
    getCollection: function() {
        return $.get(API_URL + '/bookForms');
    }
};

app.models.bookGenres = {
    getCollection: function() {
        return $.get(API_URL + '/bookGenres');
    }
};
