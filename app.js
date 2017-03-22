var app = {
    //...
    templates: {},
    helper: {
        compileSingleHbsTemplate: function(selector) {
            var source = $(selector).html();
            return Handlebars.compile(source);
        },
        compileHbsTemplates: function() {
            app.templates.homepageTemplate = app.helper.compileSingleHbsTemplate("#home");
            app.templates.addBookFormTemplate = app.helper.compileSingleHbsTemplate("#add-book");
            app.templates.wishListPageTemplate = app.helper.compileSingleHbsTemplate("#wish-list");
            app.templates.paperBooksTemplate = app.helper.compileSingleHbsTemplate('#paper-books');
            app.templates.eBooksTemplate = app.helper.compileSingleHbsTemplate('#e-books');
            app.templates.audiobooksTemplate = app.helper.compileSingleHbsTemplate('#audiobooks');
        }
    },
    actions: {
        displayHomepage: function() {
            var context = {title: "Hello, book lovers!", subtitle: "Work in progress..."};
            var homepageHtmlResult = app.templates.homepageTemplate(context);
            $('#container').html(homepageHtmlResult);
        },
        displayAddBookForm: function() {
            var context = {title: "Here will be a form for adding books."};
            var addBookFormHtmlResult = app.templates.addBookFormTemplate(context);
            $('#container').html(addBookFormHtmlResult);
        },
        displayWishListPage: function() {
            var context = {title: "Here will be a list of books that I want to have."};
            var wishListPageHtmlResult = app.templates.wishListPageTemplate(context);
            $('#container').html(wishListPageHtmlResult);
        },
        displayPaperBooks: function() {
            $.get('http://localhost:3000/books?bookTypeId=1').then(function(response) {
                $('#container').html(app.templates.paperBooksTemplate({
                    paperBooks: response
                }));
            });
        },
        displayEbooks: function() {
            $.get('http://localhost:3000/books?bookTypeId=2').then(function(response) {
                $('#container').html(app.templates.eBooksTemplate({
                    eBooks: response
                }));
            });
        },
        displayAudiobooks: function() {
            $.get('http://localhost:3000/books?bookTypeId=3').then(function(response) {
                $('#container').html(app.templates.audiobooksTemplate({
                    audiobooks: response
                }));
            });
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
        }
    },
    init: function() {
        app.helper.compileHbsTemplates();
        app.eventHandlers.registerEventHandlers();
    }
};

$(document).ready(function() {
    app.init();
});