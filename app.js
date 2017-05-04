var app = {
    templates: {}, // obiekt zostanie utworzony PO document ready
    models: {}, // z osobnego pliku
    helper: {
        compileSingleHbsTemplate: function(selector) {
            var source = $(selector).html();
            return Handlebars.compile(source);
        },
        compileHbsTemplates: function() {
            app.templates.homepageTemplate = app.helper.compileSingleHbsTemplate('#home');
            app.templates.addAndEditBookFormTemplate = app.helper.compileSingleHbsTemplate('#add-edit-book');
            app.templates.filterBooksPageTemplate = app.helper.compileSingleHbsTemplate('#filter-books');
            app.templates.wishListPageTemplate = app.helper.compileSingleHbsTemplate('#wish-list');
            app.templates.booksListTemplate = app.helper.compileSingleHbsTemplate('#books-list');
            app.templates.submenuFormsTemplate = app.helper.compileSingleHbsTemplate('#submenu-forms');
            app.templates.submenuGenresTemplate = app.helper.compileSingleHbsTemplate('#submenu-genres');
            // app.templates.formsListTemplate = app.helper.compileSingleHbsTemplate('#forms');
            // app.templates.genresListTemplate = app.helper.compileSingleHbsTemplate('#genres');
        },
        createUiSelectors: function() {
            app.selectors = {
                menuTabBookList: $('#my-library'),
                menuTabAddBook: $('#add-book-form'),
                menuTabWishList: $('#wish-list-page'),
                menuTabAll: $('#main-menu li')
            }
        }
    },
    selectors: {}, // obiekt zostanie utworzony PO document ready
    actions: {
        displayHomepage: function() {
            var context = {title: 'Hello, book lovers!', subtitle: 'Work in progress...'};
            var homepageHtmlResult = app.templates.homepageTemplate(context);
            unhighlightMenuTab();
            $('#container').html(homepageHtmlResult);
        },
        displayAddBookForm: function() {
            var bookTypesPromise = app.models.bookTypes.getCollection();
            var bookFormsPromise = app.models.bookForms.getCollection();
            var bookGenresPromise = app.models.bookGenres.getCollection();

            highlightMenuTab('menuTabAddBook');
            addSpinner();
            Promise.all([bookTypesPromise, bookFormsPromise, bookGenresPromise]).then(function(responses) {
                removeSpinner();
                $('#container').html(app.templates.addAndEditBookFormTemplate({
                    title: 'Give BUKA more books!',
                    displayBorrowedCheckbox: false,
                    bookTypes: responses[0],
                    bookForms: responses[1],
                    bookGenres: responses[2]
                }));
            });
        },
        displayEditBookForm: function() {
            var bookId = $(this).attr('data-book-id');
            var bookPromise = app.models.book.getItem(bookId);
            var bookTypesPromise = app.models.bookTypes.getCollection();
            var bookFormsPromise = app.models.bookForms.getCollection();
            var bookGenresPromise = app.models.bookGenres.getCollection();

            addSpinner();
            Promise.all([bookPromise, bookTypesPromise, bookFormsPromise, bookGenresPromise]).then(function(responses) {
                removeSpinner();
                $('#container').html(app.templates.addAndEditBookFormTemplate({
                    title: 'Something changed? Update it!',
                    displayBorrowedCheckbox: responses[0].bookTypeId === 1,
                    book: responses[0],
                    bookTypes: responses[1],
                    bookForms: responses[2],
                    bookGenres: responses[3]
                }));
            });
        },
        displayWishListPage: function() {
            highlightMenuTab('menuTabWishList');
            var context = {title: 'Here will be a list of books that I want to have.'};
            var wishListPageHtmlResult = app.templates.wishListPageTemplate(context);
            $('#container').html(wishListPageHtmlResult);
        },
        displayPaperBooks: function() {
            highlightMenuTab('menuTabBookList');
            addSpinner();
            app.models.book.getCollection({
                bookTypeIds: [1]
            }).then(function(response) { // wywołania ajaxa zwracają PROMISY; promista to OBIEKT, który ma metodę .then()
                $('#container').html(app.templates.booksListTemplate({
                    header: 'Paper books',
                    books: response
                }));
                removeSpinner();
            });
        },
        displayEbooks: function() {
            highlightMenuTab('menuTabBookList');
            addSpinner();
            app.models.book.getCollection({
                bookTypeIds: [2]
            }).then(function(response) {
                $('#container').html(app.templates.booksListTemplate({
                    header: 'E-books',
                    books: response
                }));
                removeSpinner();
            });
        },
        displayAudiobooks: function() {
            highlightMenuTab('menuTabBookList');
            addSpinner();
            app.models.book.getCollection({
                bookTypeIds: [3]
            }).then(function(response) {
                $('#container').html(app.templates.booksListTemplate({
                    header: 'Audiobooks',
                    books: response
                }));
                removeSpinner();
            });
        },
        displayAllBooks: function() {
            highlightMenuTab('menuTabBookList');
            addSpinner();
            app.models.book.getCollection({}).then(function(response) {
                $('#container').html(app.templates.booksListTemplate({
                    header: 'All books',
                    books: response
                }));
                removeSpinner();
            });
        },
        // displayFormsList: function() {
        //     highlightMenuTab('menuTabBookList');
        //     addSpinner();
        //     app.models.bookForms.getCollection().then(function(response) {
        //         $('#container').html(app.templates.formsListTemplate({
        //             header: 'Forms:',
        //             forms: response
        //         }));
        //         removeSpinner();
        //     });
        // },
        // displayGenresList: function() {
        //     highlightMenuTab('menuTabBookList');
        //     addSpinner();
        //     app.models.bookGenres.getCollection().then(function(response) {
        //         $('#container').html(app.templates.genresListTemplate({
        //             header: 'Genres:',
        //             genres: response
        //         }));
        //         removeSpinner();
        //     });
        // },
        displaySubmenuForms: function() {
            highlightMenuTab('menuTabBookList');
            $('#spinner-submenu-forms').addClass('spinner-small');
            app.models.bookForms.getCollection().then(function(response) {
                $('#open-submenu-forms').append(app.templates.submenuFormsTemplate({
                    forms: response
                }));
                $('#spinner-submenu-forms').removeClass('spinner-small');
            });
        },
        displaySubmenuGenres: function() {
            highlightMenuTab('menuTabBookList');
            $('#spinner-submenu-genres').addClass('spinner-small');
            app.models.bookGenres.getCollection().then(function(response) {
                $('#open-submenu-genres').append(app.templates.submenuGenresTemplate({
                    genres: response
                }));
                $('#spinner-submenu-genres').removeClass('spinner-small');
            });
        },
        displayAllFilters: function() {
            highlightMenuTab('menuTabBookList');
            addSpinner();

            var bookTypesPromise = app.models.bookTypes.getCollection();
            var bookFormsPromise = app.models.bookForms.getCollection();
            var bookGenresPromise = app.models.bookGenres.getCollection();

            Promise.all([bookTypesPromise, bookFormsPromise, bookGenresPromise]).then(function(responses) {
                $('#container').html(app.templates.filterBooksPageTemplate({
                    title: 'Use these filters to find the books you are looking for.',
                    types: responses[0],
                    forms: responses[1],
                    genres: responses[2]
                }));
                removeSpinner();
            });
        },
        displayBooksFilteredByForm: function() {
            var bookFormId = $(this).attr('data-book-form-id');
            var bookFormType = $(this).attr('data-book-form-type');
            highlightMenuTab('menuTabBookList');
            addSpinner(); // zagadnienie: jak skeszowana promisa ma NIE pokazywać spinnera?
            app.models.book.getCollection({
                bookFormIds: [bookFormId]
            }).then(function(response) {
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
            highlightMenuTab('menuTabBookList');
            addSpinner(); // zagadnienie: jak skeszowana promisa ma NIE pokazywać spinnera?
            app.models.book.getCollection({
                bookGenreIds: [bookGenreId]
            }).then(function(response) {
                $('#container').html(app.templates.booksListTemplate({
                    header: capitalize(bookGenreType),
                    books: response
                }));
                removeSpinner();
            });
        },
        deleteBook: function() {
            var bookId = $(this).attr('data-book-id');
            var bookToDelete = confirm('BUKA SAYS: This book will be deleted. Are you sure?');
            if(bookToDelete) {
                addSpinner();
                app.models.book.deleteItem(bookId).then(function() {
                    removeSpinner();
                    alert('BUKA SAYS: The book number ' + bookId + ' was deleted.'); // przeglądarka nie robi 'repaint'
                    // (namalowanie HTML+CSS od nowa) po zdjęciu klasy 'spinner'; rozbicie jednej promisy na dwie promisy
                    // (najpierw zdjęcie css, potem wyświetlenie alertu) nie rozwiązuje problemu, dalej nie ma 'repaint'
                    // TODO force repaint here
                }).then(app.actions.displayAllBooks);
            } else {
                alert('BUKA SAYS: Ok, I will leave this book where it is.');
            }
        },
        addBook: function() {
            var book = {
                title: $('#inputBookTitle').val(),
                author: $('#inputBookAuthor').val(),
                description: $('#inputBookDescription').val(),
                bookTypeId: $('#singleType').val(),
                bookFormId: $('#singleForm').val(),
                bookGenreId: $('#singleGenre').val(),
                borrowed: $('#borrowedCheckbox').is(':checked') // zwraca true or false
            };

            addSpinner();
            app.models.book.createItem(book).then(function() {
                removeSpinner();
                alert('BUKA SAYS: New book has been added, oh yeah!');
            }).then(app.actions.displayAllBooks);
        },
        updateBook: function() {
            var bookId = $('#inputBookId').val();
            var book = {
                title: $('#inputBookTitle').val(),
                author: $('#inputBookAuthor').val(),
                description: $('#inputBookDescription').val(),
                bookTypeId: $('#singleType').val(),
                bookFormId: $('#singleForm').val(),
                bookGenreId: $('#singleGenre').val(),
                borrowed: $('#borrowedCheckbox').is(':checked') // zwraca true or false
            };

            addSpinner();
            app.models.book.updateItem(bookId, book).then(function() {
                removeSpinner();
                alert('BUKA SAYS: This book has been updated, oh yeah!');
            }).then(app.actions.displayAllBooks);
        },
        displayBookSearch: function() {
            var searchBookFilters = {
                bookTypeIds: [],
                bookFormIds: [],
                bookGenreIds: [],
                borrowed: $('input[name=inlineRadioIsBorrowed]:checked').val()
            };

            var filterLabels = [];

            $('input.checkbox-book-type').each(function(index, el) { // jQuery'owa metoda 'each' (w JS: forEach)
                if (el.checked) { // JS'owy odpowiednik jQuery'owego $('el')is(':checked')
                    searchBookFilters.bookTypeIds.push($(el).attr('data-book-type-id'));
                    filterLabels.push($(el).attr('data-book-type-type'));
                }
            });

            $('input.checkbox-book-form').each(function(index, el) {
                if (el.checked) {
                    searchBookFilters.bookFormIds.push($(el).attr('data-book-form-id'));
                    filterLabels.push($(el).attr('data-book-form-type'));
                }
            });

            $('input.checkbox-book-genre').each(function(index, el) {
                if (el.checked) {
                    searchBookFilters.bookGenreIds.push($(el).attr('data-book-genre-id'));
                    filterLabels.push($(el).attr('data-book-genre-type'));
                }
            });

            if (searchBookFilters.borrowed) {
                var label = (searchBookFilters.borrowed === 'true' ? '' : 'not ') + 'borrowed'; // cond ? trueValue : falseValue
                // (if na wyrażenie, nie na instrukcję)
                filterLabels.push(label);
            }

            highlightMenuTab('menuTabBookList');
            addSpinner();
            app.models.book.getCollection(searchBookFilters).then(function(response) {
                var bookListHeader = filterLabels.filter(function(el) {
                    return el.length > 0;
                });
                var header = (bookListHeader.length ? bookListHeader.join(', ') : 'all books');
                $('#container').html(app.templates.booksListTemplate({
                    header: capitalize('selected filter(s): ' + header),
                    books: response
                }));
                removeSpinner();
            });
        },
        displayBorrowedCheckbox: function() {
            if (parseInt($(this).val()) === 1) { // wartość inputa z HTML to zawsze string, dlat potrzebna jest zamiana na number
                $('#display-borrowed-checkbox').show(600);
            } else {
                $('#display-borrowed-checkbox').hide(600);
                $('#borrowedCheckbox').prop('checked', false); // zapobiega zaznaczeniu checkboxa w przypadku zmiany typu
                // na paper book, a potem przywróceniu typu audioboook lub e-book
            }
        }
    },
    eventHandlers: {
        registerEventHandlers: function() {
            $('#home-page').on('click', app.actions.displayHomepage);
            $('#add-book-form').on('click', app.actions.displayAddBookForm);
            $('#wish-list-page').on('click', app.actions.displayWishListPage);
            $('#paper-book-filter').on('click', app.actions.displayPaperBooks);
            $('#e-book-filter').on('click', app.actions.displayEbooks);
            $('#audiobook-filter').on('click', app.actions.displayAudiobooks);
            $('#all-books-filter').on('click', app.actions.displayAllBooks);
            // $('#form-filter').on('click', app.actions.displayFormsList);
            // $('#genre-filter').on('click', app.actions.displayGenresList);
            $('#multi-filter').on('click', app.actions.displayAllFilters);
            // $('#container').on('click', '.book-form-link', app.actions.displayBooksFilteredByForm);
            // $('#container').on('click', '.book-genre-link', app.actions.displayBooksFilteredByGenre);
            $('#click-submenu-forms').on('click', app.actions.displaySubmenuForms);
            $('#click-submenu-genres').on('click', app.actions.displaySubmenuGenres);
            $('#open-submenu-forms').on('click', '.book-form-link', app.actions.displayBooksFilteredByForm);
            $('#open-submenu-genres').on('click', '.book-genre-link', app.actions.displayBooksFilteredByGenre);
            $('.book-genre-link').on('click', app.actions.displayBooksFilteredByGenre);
            $('#container').on('click', '#delete-book-btn', app.actions.deleteBook);
            $('#container').on('click', '#add-book-btn', app.actions.addBook);
            $('#container').on('click', '#edit-book-btn', app.actions.displayEditBookForm);
            $('#container').on('click', '#save-changes-btn', app.actions.updateBook);
            $('#container').on('click', '#search-books-btn', app.actions.displayBookSearch);
            $('#container').on('click', '#cancel-btn-link', app.actions.displayHomepage);
            $('#container').on('change', '#singleType', app.actions.displayBorrowedCheckbox);
        }
        // registerOnInit
        // registerOnFormsGenresLoaded
    },
    // wszystko uruchamiane w app.init ma zagwarantowane, że document jest już ready
    init: function() {
        app.helper.compileHbsTemplates();
        app.eventHandlers.registerEventHandlers();
        app.helper.createUiSelectors();
        app.actions.displayHomepage();
        $('[data-submenu]').submenupicker();
    }
};

$(document).ready(function() {
    app.init();
});

// http://stackoverflow.com/a/20891435
Handlebars.registerHelper('selected', function(option, value){
    if (option === value) {
        return ' selected';
    } else {
        return ''
    }
});

// http://tutorialzine.com/2015/01/learn-handlebars-in-10-minutes/
Handlebars.registerHelper('capitalize', function(str){
    // str is the argument passed to the helper when called
    str = str || '';
    return str.slice(0,1).toUpperCase() + str.slice(1);
});