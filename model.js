var API_URL = "http://localhost:3000";

app.models.book = {
    getCollection: function(bookTypeId) {
        if(bookTypeId) {
            return $.get(API_URL + '/books', {bookTypeId: bookTypeId});
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
