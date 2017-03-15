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
    var source = $("#wish-list").html();
    var template = Handlebars.compile(source);
    var context = {title: "Here will be a list of books that I want to have."};
    var htmlResult = template(context);

    $('#wish-list-page').on('click', function() {
        $('#container').html(htmlResult);
    });

    var source = $("#home").html();
    var homePagetemplate = Handlebars.compile(source);
    var context = {title: "Hello, book lovers!", subtitle: "Work in progress..."};
    var homePageHtmlResult = homePagetemplate(context);

    $('#home-page').on('click', function() {
        $('#container').html(homePageHtmlResult);
    });
});
