var app = {
    templates: {}, // obiekt zostanie utworzony PO document ready
    models: {}, // z osobnego pliku
    helper: {
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
            var homepageHtmlResult = app.templates.homePage(context);
            unhighlightMenuTab();
            $('#container').html(homepageHtmlResult);
        },
        displaySingleBook: function(bookId) {
            addMediumSpinner();
            app.models.book.getItem(bookId)
            .then(function(response) {
                removeMediumSpinner();
                $('#single-book-container').html(app.templates.singleBook({
                    book: response
                }));
            });
        },
        clearBooksList: function() {
            $('#all-books-list').html('');
        },
        displayAddBookForm: function() {
            var bookTypesPromise = app.models.bookTypes.getCollection();
            var bookFormsPromise = app.models.bookForms.getCollection();
            var bookGenresPromise = app.models.bookGenres.getCollection();

            highlightMenuTab('menuTabAddBook');
            addSpinner();
            Promise.all([bookTypesPromise, bookFormsPromise, bookGenresPromise])
            .then(function(responses) {
                removeSpinner();
                $('#container').html(app.templates.addAndEditBookForm({
                    title: 'Give BUKA more books!',
                    displayBorrowedCheckbox: false,
                    displayGenreSelect: false,
                    bookTypes: responses[0],
                    bookForms: responses[1],
                    bookGenres: responses[2]
                }));
            });
        },
        validateAddBookForm: function() {
            $.validate({
                form: '#add-and-edit-book',
                modules: 'logic',
                onSuccess: function() {
                    app.actions.addBook();
                }
            });
        },
        displayEditBookForm: function() {
            var bookId = $(this).attr('data-book-id');
            var bookPromise = app.models.book.getItem(bookId);
            var bookTypesPromise = app.models.bookTypes.getCollection();
            var bookFormsPromise = app.models.bookForms.getCollection();
            var bookGenresPromise = app.models.bookGenres.getCollection();

            addSpinner();
            Promise.all([bookPromise, bookTypesPromise, bookFormsPromise, bookGenresPromise])
            .then(function(responses) {
                removeSpinner();
                $('#container').html(app.templates.addAndEditBookForm({
                    title: 'Something changed? Update it!',
                    displayBorrowedCheckbox: responses[0].bookTypeId === 1,
                    displayGenreSelect: responses[0].bookFormId === 2,
                    book: responses[0],
                    bookTypes: responses[1],
                    bookForms: responses[2],
                    bookGenres: responses[3]
                }));
                $.validate({
                    form: '#add-and-edit-book',
                    modules: 'logic',
                    onSuccess: function() {
                        app.actions.updateBook();
                    }
                });
            });
        },
        displayWishListPage: function() {
            highlightMenuTab('menuTabWishList');
            var context = {title: 'Here will be a list of books that I want to have'};
            var wishListPageHtmlResult = app.templates.wishListPage(context);
            $('#container').html(wishListPageHtmlResult);
        },
        displayPaperBooks: function() {
            highlightMenuTab('menuTabBookList');
            addSpinner();
            app.models.book.getCollection({
                bookTypeIds: [1]
            })
            .then(function(response) { // wywołania ajaxa zwracają PROMISY; promista to OBIEKT, który ma metodę .then()
                $('#container').html(app.templates.booksListPage({
                    displayAutocomplete: false,
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
            })
            .then(function(response) {
                $('#container').html(app.templates.booksListPage({
                    displayAutocomplete: false,
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
                $('#container').html(app.templates.booksListPage({
                    displayAutocomplete: false,
                    header: 'Audiobooks',
                    books: response
                }));
                removeSpinner();
            });
        },
        displayAllBooks: function() {
            highlightMenuTab('menuTabBookList');
            addSpinner();
            app.models.book.getCollection({})
            .then(function(response) {
                $('#container').html(app.templates.booksListPage({
                    displayAutocomplete: true,
                    header: 'All books',
                    books: response
                }));
                app.eventHandlers.registerAutocompleterForAllBooksList();
                removeSpinner();
            });
        },
        displaySubmenuForms: function() {
            $('#spinner-submenu-forms').addClass('spinner-small');
            app.models.bookForms.getCollection()
            .then(function(response) {
                $('#open-submenu-forms').append(app.templates.formsSubmenu({
                    forms: response
                }));
                $('#spinner-submenu-forms').removeClass('spinner-small');
            });
        },
        displaySubmenuGenres: function() {
            $('#spinner-submenu-genres').addClass('spinner-small');
            app.models.bookGenres.getCollection()
            .then(function(response) {
                $('#open-submenu-genres').append(app.templates.genresSubmenu({
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

            Promise.all([bookTypesPromise, bookFormsPromise, bookGenresPromise])
            .then(function(responses) {
                $('#container').html(app.templates.filtersPage({
                    title: 'Use these filters to find the books you are looking for',
                    displayGenreCheckboxes: false,
                    types: responses[0],
                    forms: responses[1],
                    genres: responses[2]
                }));
                app.eventHandlers.registerAutocompleterForFiltersPage();
                removeSpinner();
            });
        },
        displayBooksFilteredByForm: function() {
            var bookFormId = $(this).attr('data-book-form-id');
            var bookFormType = $(this).attr('data-book-form-type');
            highlightMenuTab('menuTabBookList');
            addSpinner(); // zagadnienie: jak skeszowana promisa ma NIE pokazywać spinnera?
            app.models.book.getCollection({
                bookFormIds: [parseInt(bookFormId)]
            })
            .then(function(response) {
                $('#container').html(app.templates.booksListPage({
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
                bookGenreIds: [parseInt(bookGenreId)]
            }).then(function(response) {
                $('#container').html(app.templates.booksListPage({
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
                app.models.book.deleteItem(bookId)
                .then(function() {
                    removeSpinner();
                    alert('BUKA SAYS: The book number ' + bookId + ' was deleted.'); // przeglądarka nie robi 'repaint'
                    // (namalowanie HTML+CSS od nowa) po zdjęciu klasy 'spinner'; rozbicie jednej promisy na dwie promisy
                    // (najpierw zdjęcie css, potem wyświetlenie alertu) nie rozwiązuje problemu, dalej nie ma 'repaint'
                    // TODO force repaint here
                })
                .then(app.actions.displayAllBooks);
            } else {
                alert('BUKA SAYS: Ok, I will leave this book where it is.');
            }
        },
        addBook: function() {
            var book = {
                title: $('#inputBookTitle').val(),
                author: $('#inputBookAuthor').val(),
                description: $('#inputBookDescription').val(),
                bookTypeId: parseInt($('#singleType').val()),
                bookFormId: parseInt($('#singleForm').val()),
                bookGenreId: parseInt($('#singleGenre').val()),
                borrowed: $('#borrowedCheckbox').is(':checked') // zwraca true or false
            };

            addSpinner();
            app.models.book.createItem(book)
            .then(function() {
                removeSpinner();
                alert('BUKA SAYS: New book has been added, oh yeah!');
            })
            .then(app.actions.displayAllBooks);
        },
        updateBook: function() {
            var bookId = $('#inputBookId').val();
            var book = {
                title: $('#inputBookTitle').val(),
                author: $('#inputBookAuthor').val(),
                description: $('#inputBookDescription').val(),
                bookTypeId: parseInt($('#singleType').val()),
                bookFormId: parseInt($('#singleForm').val()),
                bookGenreId: parseInt($('#singleGenre').val()),
                borrowed: $('#borrowedCheckbox').is(':checked') // zwraca true or false
            };
            addSpinner();
            app.models.book.updateItem(bookId, book)
            .then(function() {
                removeSpinner();
                alert('BUKA SAYS: This book has been updated, oh yeah!');
            })
            .then(app.actions.displayAllBooks);
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
                    searchBookFilters.bookTypeIds.push(parseInt($(el).attr('data-book-type-id')));
                    filterLabels.push($(el).attr('data-book-type-type'));
                }
            });

            $('input.checkbox-book-form').each(function(index, el) {
                if (el.checked) {
                    searchBookFilters.bookFormIds.push(parseInt($(el).attr('data-book-form-id')));
                    filterLabels.push($(el).attr('data-book-form-type'));
                }
            });

            $('input.checkbox-book-genre').each(function(index, el) {
                if (el.checked) {
                    searchBookFilters.bookGenreIds.push(parseInt($(el).attr('data-book-genre-id')));
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
            app.models.book.getCollection(searchBookFilters)
            .then(function(response) {
                var bookListHeader = filterLabels.filter(function(el) {
                    return el.length > 0;
                });
                var header = (bookListHeader.length ? bookListHeader.join(', ') : 'all books');
                $('#container').html(app.templates.booksListPage({
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
        },
        displayGenreSelect: function() {
            if (parseInt($(this).val()) === 2) {
                $('#display-genre-select').show(600);
            } else {
                $('#display-genre-select').hide(600);
                $('#singleGenre').val(''); // zapobiega zachowaniu zaznaczonej opcji w przypadku zmiany rodzaju literackiego
                // na inny niż 'prose'
            }
        },
        displayGenreCheckboxes: function() {
            if ( $(this).is(':checked') ) { // alternatywny zapis: $(this).prop('checked')
                $('#display-genre-checkboxes').show(600);
            } else {
                $('#display-genre-checkboxes').hide(600);
                $('.checkbox-book-genre').prop('checked', false); // w .prop i .attr 1 parametr to GETter, jeśli są 2 - to SETter
            }
        },
    },
    eventHandlers: {
        registerOnInit: function() {
            $('#home-page').on('click', app.actions.displayHomepage);
            $('#add-book-form').on('click', app.actions.displayAddBookForm);
            $('#wish-list-page').on('click', app.actions.displayWishListPage);
            $('#paper-book-filter').on('click', app.actions.displayPaperBooks);
            $('#e-book-filter').on('click', app.actions.displayEbooks);
            $('#audiobook-filter').on('click', app.actions.displayAudiobooks);
            $('#all-books-filter').on('click', app.actions.displayAllBooks);
            $('#multi-filter').on('click', app.actions.displayAllFilters);
            $('#open-submenu-forms').on('click', '.book-form-link', app.actions.displayBooksFilteredByForm);
            $('#open-submenu-genres').on('click', '.book-genre-link', app.actions.displayBooksFilteredByGenre);
            $('.book-genre-link').on('click', app.actions.displayBooksFilteredByGenre);
            $('#container').on('click', '#delete-book-btn', app.actions.deleteBook);
            $('#container').on('click', '#add-book-btn', app.actions.validateAddBookForm);
            $('#container').on('click', '#edit-book-btn', app.actions.displayEditBookForm);
            $('#container').on('click', '#search-books-btn', app.actions.displayBookSearch);
            $('#container').on('click', '#cancel-btn-link', app.actions.displayHomepage);
            $('#container').on('change', '#singleType', app.actions.displayBorrowedCheckbox);
            $('#container').on('change', '#singleForm', app.actions.displayGenreSelect);
            $('#container').on('change', 'input.checkbox-book-form[data-book-form-type="prose"]', app.actions.displayGenreCheckboxes);
            $('.close').on('click', hideWarningPanel);
        },
        registerOnFormsGenresLoaded: function() {
            app.actions.displaySubmenuForms();
            app.actions.displaySubmenuGenres();
        },
        // https://github.com/biggora/bootstrap-ajax-typeahead
        registerAutocompleterForFiltersPage: function() {
            $('#title-autocomplete-on-filters-page').typeahead({
                onSelect: function(item) {
                    var bookId = item.value;
                    app.actions.displaySingleBook(bookId);
                },
                ajax: {
                    url: app.models.book._URL,
                    preProcess: app.models.book._mapResponse,
                    timeout: 100,
                    displayField: "title",
                    preDispatch: function(query) {
                        return {
                            title_like: query
                        }
                    }
                }
            });
        },
        registerAutocompleterForAllBooksList: function() {
            $('#title-autocomplete-on-books-list').typeahead({
                onSelect: function(item) {
                    var bookId = item.value;
                    app.actions.clearBooksList();
                    app.actions.displaySingleBook(bookId);
                },
                ajax: {
                    url: app.models.book._URL,
                    preProcess: app.models.book._mapResponse,
                    timeout: 100,
                    displayField: "title",
                    preDispatch: function(query) {
                        return {
                            title_like: query
                        }
                    }
                }
            });
        }
    },
    // wszystko uruchamiane w app.init ma zagwarantowane, że document jest już ready
    init: function() {
        app.eventHandlers.registerOnInit();
        app.helper.createUiSelectors();
        app.actions.displayHomepage();
        $('[data-submenu]').submenupicker();
        app.eventHandlers.registerOnFormsGenresLoaded();
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

function hideWarningPanel() {
    $('.panel').hide();
}

var API_URL = 'https://buka-test.firebaseio.com';

function mapToArray(inputObject) {
  return Object.entries(inputObject).map(function(pair){
    var id = pair[0], obj = pair[1];
    return Object.assign({id: id}, obj);
  });
}

function removeFirebaseNull(response){ // handle Firebase null in Array
    if(response[0] === null){
        response = response.slice(1)
    }
    return response;
}

app.models.book = {
    _URL: API_URL + '/books.json',
    _mapResponse: mapToArray,
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

        if (filterParams.borrowed) {
            queryStringParts.push('borrowed='+filterParams.borrowed);
        }

        if (queryStringParts.length) { // potrzebne jest .length, bo pusta lista jest truthy
            var queryString = queryStringParts.filter(function(el) {
                return el.length > 0;
            }).join('&');
            var ajax = $.get(API_URL + '/books.json?' + queryString);
        } else {
            var ajax = $.get(API_URL + '/books.json'); // w app.js muszę przekazać pusty obiekt jako argument funkcji (!)
        }
        return ajax.then(mapToArray).then(function filterClientSide(books){
            var result = books;
            // poniższy warunek MUSI sprawdzać aż 2 rzeczy:
            // że dana lista może nie istnieć w ogóle
            // oraz że dana lista może być pusta
            // czyli wchodzimy w IFa (filtrujemy) tylko wtedy gdy lista istnieje oraz ma jakieś elementy
            if (filterParams.bookTypeIds && filterParams.bookTypeIds.length){
                result = result.filter(function(book){
                    // indexOf zwraca indeks, pod którym element istnieje w tablicy
                    // 0 jeśli jest pod zerowym indeksem, itp.
                    // Jeśli nie ma, to -1 (stąd porównanie do -1)
                    return filterParams.bookTypeIds.indexOf(book.bookTypeId) > -1;
                })
            }
            if (filterParams.bookGenreIds && filterParams.bookGenreIds.length){
                result = result.filter(function(book){
                    return filterParams.bookGenreIds.indexOf(book.bookGenreId) > -1;
                })
            }
            if (filterParams.bookFormIds && filterParams.bookFormIds.length){
                result = result.filter(function(book){
                    return filterParams.bookFormIds.indexOf(book.bookFormId) > -1;
                })
            }
            if (filterParams.borrowed){
                result = result.filter(function(book){
                    return filterParams.borrowed.indexOf(book.borrowed + '') > -1;
                    // coś + '' - rzutowanie do stringa, alternatywa do (coś).toString();
                    // TODO - powinno być przekazywanie booleana, a nie stringa zawierającego booleana ("true")
                    // TODO bo teraz ID jest pobierane jQuery data attr jako string
                    // TODO i poniższy/powyższy filter nie działałby, bo string vs liczba - inny typ
                })
            }
            return result;
        });
    },
    getItem: function(id) {
        return $.get(API_URL + '/books/' + id + '.json')
        .then(function(book){ // handle Firebase lack of id passing
            book.id = id;
            return book;
        });
    },
    createItem: function(itemData) {
        // return $.post(API_URL + '/books.json', itemData);
        return $.ajax({
	        url: API_URL + '/books/' + '.json',
	        method: 'post',
	        data: JSON.stringify(itemData)
        });
    },
    // updateItem: function(id, itemData) {
    //     return $.ajax({
    //         url: API_URL + '/books/' + id,
    //         type: 'PUT',
    //         data: itemData
    //     });
    // },
    updateItem: function(id, itemData) {
        return $.ajax({
            url: API_URL + '/books/' + id + '.json',
            method: 'put',
            data: JSON.stringify(itemData)
        });
    },
    deleteItem: function(id) {
        return $.ajax({
            url: API_URL + '/books/' + id + '.json',
            type: 'DELETE'
        })
    }
};

app.models.bookTypes = {
    getCollection: function() {
        return $.get(API_URL + '/bookTypes.json')
        .then(removeFirebaseNull);
    }
};

(function(){ // IIFE czyli Immediately Invoked Function Expression
    // wszystkie var-y wewn. tego IIFE NIE są dostępne na zewn. (istnieją, są używane - ale są ukryte, niedostępne = są PRYWATNE)

    var cachedBookForms;
    app.models.bookForms = {
        getCollection: function() {
            if(!cachedBookForms) { // warunek w if-e zawsze zrzuca się do true/false (uwaga na tzw. falsy values);
                // jeśli false, to wykonywany jest else (o ile został określony)
                cachedBookForms = $.get(API_URL + '/bookForms.json')
                .then(removeFirebaseNull);
            }
            return cachedBookForms;
            // żaden kod po return nie zostanie nigdy wykonany
        }
    };

    var cachedBookGenres;
    app.models.bookGenres = {
        getCollection: function() {
            if(!cachedBookGenres) {
                cachedBookGenres = $.get(API_URL + '/bookGenres.json')
                .then(removeFirebaseNull);
            }
            return cachedBookGenres;
        }
    };

}());
