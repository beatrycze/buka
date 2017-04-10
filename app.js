var app = {
    templates: {},
    models: {},
    helper: {
        compileSingleHbsTemplate: function(selector) {
            var source = $(selector).html();
            return Handlebars.compile(source);
        },
        compileHbsTemplates: function() {
            app.templates.homepageTemplate = app.helper.compileSingleHbsTemplate("#home");
            app.templates.addBookFormTemplate = app.helper.compileSingleHbsTemplate("#add-book");
            app.templates.wishListPageTemplate = app.helper.compileSingleHbsTemplate("#wish-list");
            app.templates.booksListTemplate = app.helper.compileSingleHbsTemplate('#books-list');
            app.templates.formsListTemplate = app.helper.compileSingleHbsTemplate('#forms');
            app.templates.genresListTemplate = app.helper.compileSingleHbsTemplate('#genres');
        }
    },
    actions: {
        displayHomepage: function() {
            var context = {title: "Hello, book lovers!", subtitle: "Work in progress..."};
            var homepageHtmlResult = app.templates.homepageTemplate(context);
            $('#container').html(homepageHtmlResult);
        },
        displayAddBookForm: function() {
            var bookTypesPromis = app.models.bookTypes.getCollection();
            var bookFormsPromis = app.models.bookForms.getCollection();
            var bookGenresPromis = app.models.bookGenres.getCollection();

            Promise.all([bookTypesPromis, bookFormsPromis, bookGenresPromis]).then(function(responses) {
                $('#container').html(app.templates.addBookFormTemplate({
                    title: 'Give BUKA more books!',
                    types: responses[0],
                    forms: responses[1],
                    genres: responses[2]
                }));
            });
        },
        displayWishListPage: function() {
            var context = {title: "Here will be a list of books that I want to have."};
            var wishListPageHtmlResult = app.templates.wishListPageTemplate(context);
            $('#container').html(wishListPageHtmlResult);
        },
        displayPaperBooks: function() {
            addSpinner();
            app.models.book.getCollection(1).then(function(response) { // wywołania ajaxa zwracają PROMISY; promista to OBIEKT, który ma metodę .then()
                $('#container').html(app.templates.booksListTemplate({
                    header: 'Paper books',
                    books: response
                }));
                removeSpinner();
            });

        },
        displayEbooks: function() {
            addSpinner();
            app.models.book.getCollection(2).then(function(response) {
                $('#container').html(app.templates.booksListTemplate({
                    header: 'E-books',
                    books: response
                }));
                removeSpinner();
            });
        },
        displayAudiobooks: function() {
            addSpinner();
            app.models.book.getCollection(3).then(function(response) {
                $('#container').html(app.templates.booksListTemplate({
                    header: 'Audiobooks',
                    books: response
                }));
                removeSpinner();
            });
        },
        displayAllBooks: function() {
            addSpinner();
            app.models.book.getCollection().then(function(response) {
                $('#container').html(app.templates.booksListTemplate({
                    header: 'All books',
                    books: response
                }));
                removeSpinner();
            });
        },
        displayFormsList: function() {
            addSpinner();
            app.models.bookForms.getCollection().then(function(response) {
                $('#container').html(app.templates.formsListTemplate({
                    header: 'Forms:',
                    forms: response
                }));
                removeSpinner();
            });
        },
        displayGenresList: function() {
            addSpinner();
            app.models.bookGenres.getCollection().then(function(response) {
                $('#container').html(app.templates.genresListTemplate({
                    header: 'Genres:',
                    genres: response
                }));
                removeSpinner();
            });
        },
        displayBooksFilteredByForm: function() {
            var bookFormId = $(this).attr('data-book-form-id');
            var bookFormType = $(this).attr('data-book-form-type');
            addSpinner(); // zagadnienie: jak skeszowana promisa ma NIE pokazywać spinnera?
            app.models.book.getCollection(null, bookFormId, null).then(function(response) {
                $('#container').html(app.templates.booksListTemplate({
                    header: capitalize(bookFormType),
                    books: response
                }));
                removeSpinner();
            });
        },
        displayBooksFilteredByGenre: function() {
            var bookGenreId = $(this).attr('data-book-genre-id');
            var bookGenreType = $(this).attr('data-book-genre-type');
            addSpinner(); // zagadnienie: jak skeszowana promisa ma NIE pokazywać spinnera?
            app.models.book.getCollection(null, null, bookGenreId).then(function(response) {
                $('#container').html(app.templates.booksListTemplate({
                    header: capitalize(bookGenreType),
                    books: response
                }));
                removeSpinner();
            });
        },
        deleteBook: function() {
            var bookId = $(this).attr('data-book-id');
            var bookToDelete = confirm("BUKA SAYS: This book will be deleted. Are you sure?");
            if(bookToDelete) {
                addSpinner();
                app.models.book.deleteItem(bookId).then(function() {
                    removeSpinner();
                    alert("BUKA SAYS: The book number " + bookId + " was deleted."); // przeglądarka nie robi "repaint"
                    // (namalowanie HTML+CSS od nowa) po zdjęciu klasy "spinner"; rozbicie jednej promisy na dwie promisy
                    // (najpierw zdjęcie css, potem wyświetlenie alertu) nie rozwiązuje problemu, dalej nie ma "repaint"
                    // TODO force repaint here
                }).then(app.actions.displayHomepage);
            } else {
                alert("BUKA SAYS: Ok, I will leave this book where it is.");
            }
        },
        addBook: function() {
            var book = {
                title: $("#inputBookTitle").val(),
                author: $("#inputBookAuthor").val(),
                description: $("#inputBookDescription").val(),
                bookTypeId: $("#singleType").val(),
                bookFormId: $("#singleForm").val(),
                bookGenreId: $("#singleGenre").val(),
                borrowed: $("#borrowedCheckbox").is(":checked") // zwraca true or false
            };

            addSpinner();
            app.models.book.createItem(book).then(function() {
                removeSpinner();
                alert("BUKA SAYS: New book has been added, oh yeah!");
            }).then(app.actions.displayAddBookForm);
        }
    },
    eventHandlers: {
        registerEventHandlers: function() {
            $('#home-page').on('click', app.actions.displayHomepage);
            $('#add-book-form').on('click', app.actions.displayAddBookForm);
            $('#wish-list-page').on('click', app.actions.displayWishListPage);
            $('.dropdown-menu').on('click', '#paper-book-filter', app.actions.displayPaperBooks);
            $('.dropdown-menu').on('click', '#e-book-filter', app.actions.displayEbooks);
            $('.dropdown-menu').on('click', '#audiobook-filter', app.actions.displayAudiobooks);
            $('.dropdown-menu').on('click', '#all-books-filter', app.actions.displayAllBooks);
            $('.dropdown-menu').on('click', '#form-filter', app.actions.displayFormsList);
            $('.dropdown-menu').on('click', '#genre-filter', app.actions.displayGenresList);
            $('#container').on('click', '.book-form-link', app.actions.displayBooksFilteredByForm);
            $('#container').on('click', '.book-genre-link', app.actions.displayBooksFilteredByGenre);
            $('#container').on('click', '#delete-book-btn', app.actions.deleteBook);
            $('#container').on('click', '#add-book-btn', app.actions.addBook);
            $('#container').on('click', '#cancel-btn-link', app.actions.displayHomepage);
        }
    },
    init: function() {
        app.helper.compileHbsTemplates();
        app.eventHandlers.registerEventHandlers();
        app.actions.displayHomepage();
    }
};

$(document).ready(function() {
    app.init();
});
