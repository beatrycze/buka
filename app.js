var app = {
    //...
    helper: {
        compileHbsTemplate: function(selector) {

        },
        compileHbsTemplates: function() {

        }
    },
    init: function() {
        //...
    }
};

$(document).ready(function() {
    // app.init();
    var source = $("#home").html();
    var homepageTemplate = Handlebars.compile(source);
    var context = {title: "Hello, book lovers!", subtitle: "Work in progress..."};
    var homepageHtmlResult = homepageTemplate(context);

    $('#home-page').on('click', function() {
        $('#container').html(homepageHtmlResult);
    });

    var source = $("#add-book").html();
    var addBookFormTemplate = Handlebars.compile(source);
    var context = {title: "Here will be a form for adding books."};
    var addBookFormHtmlResult = addBookFormTemplate(context);

    $('#add-book-form').on('click', function() {
        $('#container').html(addBookFormHtmlResult);
    });

    var source = $("#wish-list").html();
    var wishListPageTemplate = Handlebars.compile(source);
    var context = {title: "Here will be a list of books that I want to have."};
    var wishListPageHtmlResult = wishListPageTemplate(context);

    $('#wish-list-page').on('click', function() {
        $('#container').html(wishListPageHtmlResult);
    });

});
