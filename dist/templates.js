this["app"] = this["app"] || {};
this["app"]["templates"] = this["app"]["templates"] || {};
this["app"]["templates"]["addAndEditBookForm"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4((helpers.selected || (depth0 && depth0.selected) || alias2).call(alias1,(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].book : depths[1])) != null ? stack1.bookTypeId : stack1),{"name":"selected","hash":{},"data":data}))
    + ">"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4((helpers.selected || (depth0 && depth0.selected) || alias2).call(alias1,(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].book : depths[1])) != null ? stack1.bookFormId : stack1),{"name":"selected","hash":{},"data":data}))
    + ">"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "style=\"display: none\"";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4((helpers.selected || (depth0 && depth0.selected) || alias2).call(alias1,(depth0 != null ? depth0.id : depth0),((stack1 = (depths[1] != null ? depths[1].book : depths[1])) != null ? stack1.bookGenreId : stack1),{"name":"selected","hash":{},"data":data}))
    + ">"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "checked";
},"11":function(container,depth0,helpers,partials,data) {
    return "    <button type=\"submit\" class=\"btn btn-success\">Save</button>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "    <button type=\"submit\" id=\"add-book-btn\" class=\"btn btn-success\">Add</button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=container.escapeExpression, alias3=container.lambda;

  return "<div class=\"spacer\">\r\n    <h2>"
    + alias2(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n</div>\r\n<form class=\"form-horizontal\" id=\"add-and-edit-book\">\r\n    <input type=\"hidden\" class=\"form-control\" id=\"inputBookId\" value=\""
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\r\n<div class=\"form-group\">\r\n    <label for=\"inputBookTitle\" class=\"col-sm-2 control-label\">Title</label>\r\n    <div class=\"col-sm-10\">\r\n    <input type=\"text\" class=\"form-control\" id=\"inputBookTitle\" placeholder=\"Title\" value=\""
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.title : stack1), depth0))
    + "\" data-validation=\"required\"\r\n        data-validation-ignore=\"!, @, #, $, %, ^, *, (, ), |, <, >, ?, +, -, =, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0\"\r\n        data-validation-error-msg=\"Don't make BUKA sad. Enter a correct book's title.\">\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label for=\"inputBookAuthor\" class=\"col-sm-2 control-label\">Author</label>\r\n    <div class=\"col-sm-10\">\r\n    <input type=\"text\" class=\"form-control\" id=\"inputBookAuthor\" placeholder=\"Author\" value=\""
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.author : stack1), depth0))
    + "\" data-validation=\"required\"\r\n        data-validation-ignore=\"!, @, #, $, %, ^, *, (, ), |, <, >, ?, +, -, =, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0\"\r\n        data-validation-error-msg=\"Don't make BUKA sad. Enter a correct book's author.\">\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label for=\"inputBookDescription\" class=\"col-sm-2 control-label\">Description</label>\r\n    <div class=\"col-sm-10\">\r\n    <textarea class=\"form-control\" rows=\"3\" id=\"inputBookDescription\" placeholder=\"Description\">"
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.description : stack1), depth0))
    + "</textarea>\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label for=\"singleType\" class=\"col-sm-2 control-label\">Type</label>\r\n    <div class=\"col-sm-10\">\r\n    <select name=\"singleType\" id=\"singleType\" class=\"form-control\" data-validation=\"required\">\r\n        <option value=\"\">-- choose type --</option>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.bookTypes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </select>\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label for=\"singleForm\" class=\"col-sm-2 control-label\">Form</label>\r\n    <div class=\"col-sm-10\">\r\n    <select name=\"singleForm\" id=\"singleForm\" class=\"form-control\" data-validation=\"required\">\r\n        <option value=\"\">-- choose form --</option>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.bookForms : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </select>\r\n    </div>\r\n</div>\r\n<div id=\"display-genre-select\" class=\"form-group\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.displayGenreSelect : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n    <label for=\"singleGenre\" class=\"col-sm-2 control-label\">Genre</label>\r\n    <div class=\"col-sm-10\">\r\n    <select name=\"singleGenre\" id=\"singleGenre\" class=\"form-control\" data-validation=\"required\"\r\n        data-validation-depends-on=\"singleForm\"\r\n        data-validation-depends-on-value=\"2\">\r\n        <option value=\"\">-- choose genre --</option>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.bookGenres : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </select>\r\n    </div>\r\n</div>\r\n<div id=\"display-borrowed-checkbox\" class=\"form-group\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.displayBorrowedCheckbox : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n    <div class=\"col-sm-offset-2 col-sm-10\">\r\n    <div class=\"checkbox\">\r\n        <label>\r\n        <input type=\"checkbox\" id=\"borrowedCheckbox\" "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.borrowed : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> Is borrowed?\r\n        <!-- Handlebars if helper:\r\n        http://stackoverflow.com/questions/16797095/handlebars-conditional-checked-property-from-jade-template\r\n        book.borrowed - wskazuje na odpowiedni klucz obiektu book, kt wartość jest sprawdzana -->\r\n        </label>\r\n    </div>\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <div class=\"col-sm-offset-2 col-sm-10\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.id : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "    <button id=\"cancel-btn-link\" type=\"button\" class=\"btn btn-link\">Cancel</button>\r\n    </div>\r\n</div>\r\n</form>\r\n";
},"useData":true,"useDepths":true});
this["app"]["templates"]["booksListPage"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n    <div class=\"row-separator-top spacer\">\r\n        <label for=\"title-autocomplete-on-books-list\">Enter a book title to display a specific book</label>\r\n        <input type=\"text\" class=\"form-control half-width\" id=\"title-autocomplete-on-books-list\" placeholder=\"Book title\" value=\"\">\r\n    </div>\r\n    <div class=\"spinner-autocomplete\" style=\"position: relative; top: 20px\">\r\n    </div>\r\n\r\n    <div id=\"single-book-container\">\r\n    </div>\r\n</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li>\r\n        <div class=\"row-separator\">\r\n            <i>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</i>, <strong>"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</strong>\r\n            <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n        </div>\r\n    </li>\r\n<button id=\"delete-book-btn\" data-book-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " type=\"button\" class=\"btn btn-default-delete btn-sm\">\r\n    <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span> Delete\r\n</button>\r\n<button id=\"edit-book-btn\" data-book-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " type=\"button\" class=\"btn btn-default-edit btn-sm\">\r\n    <span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span> Edit\r\n</button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=container.escapeExpression;

  return "<p>\r\n    <h2>"
    + alias2(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"header","hash":{},"data":data}) : helper)))
    + "</h2>\r\n    <p>Total: <kbd><strong>"
    + alias2(container.lambda(((stack1 = (depth0 != null ? depth0.books : depth0)) != null ? stack1.length : stack1), depth0))
    + "</strong></kbd></p>\r\n</p>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.displayAutocomplete : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n<ol id=\"all-books-list\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.books : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ol>\r\n";
},"useData":true});
this["app"]["templates"]["filtersPage"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <label class=\"checkbox-inline\">\r\n        <input type=\"checkbox\" class=\"checkbox-book-type\" data-book-type-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " data-book-type-type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "> "
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\r\n    </label>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <label class=\"checkbox-inline\">\r\n        <input type=\"checkbox\" class=\"checkbox-book-form\" data-book-form-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " data-book-form-type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "> "
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\r\n    </label>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "style=\"display: none;\"";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <label class=\"checkbox-inline\">\r\n        <input type=\"checkbox\" class=\"checkbox-book-genre\" data-book-genre-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " data-book-genre-type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "> "
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\r\n    </label>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"spacer\">\r\n    <h2>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n</div>\r\n\r\n<div>\r\n    <label class=\"block text-uppercase\">Book types</label>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.types : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<hr>\r\n</div>\r\n\r\n<div>\r\n    <label class=\"block text-uppercase\">Book forms</label>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.forms : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<hr>\r\n</div>\r\n\r\n<div id=\"display-genre-checkboxes\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.displayGenreCheckboxes : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n    <label class=\"block text-uppercase\">Book genres</label>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.genres : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<hr>\r\n</div>\r\n\r\n<div>\r\n    <label class=\"block text-uppercase\">Is borrowed?</label>\r\n    <label class=\"radio-inline\">\r\n        <input type=\"radio\" name=\"inlineRadioIsBorrowed\" id=\"inlineRadioTrue\" value=\"true\"> Yes\r\n    </label>\r\n    <label class=\"radio-inline\">\r\n        <input type=\"radio\" name=\"inlineRadioIsBorrowed\" id=\"inlineRadioFalse\" value=\"false\"> No\r\n    </label>\r\n    <label class=\"radio-inline\">\r\n        <input type=\"radio\" name=\"inlineRadioIsBorrowed\" id=\"inlineRadioAll\" value=\"\"> I don't care\r\n    </label>\r\n</div>\r\n<div class=\"row-separator-top\">\r\n    <button type=\"button\" id=\"search-books-btn\" class=\"btn btn-primary\">Search</button>\r\n<hr>\r\n</div>\r\n\r\n<div class=\"row-separator-top spacer\">\r\n    <label for=\"title-autocomplete-on-filters-page\"><h3>Enter a book title to display a specific book</h3></label>\r\n    <input type=\"text\" class=\"form-control half-width\" id=\"title-autocomplete-on-filters-page\" placeholder=\"Book title\" value=\"\">\r\n</div>\r\n<div class=\"spinner-autocomplete\" style=\"position: relative; top: 20px\">\r\n</div>\r\n\r\n<div id=\"single-book-container\">\r\n</div>\r\n";
},"useData":true});
this["app"]["templates"]["formsSubmenu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li><a class=\"book-form-link\" data-book-form-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " data-book-form-type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " href=\"#\">"
    + alias4((helpers.capitalize || (depth0 && depth0.capitalize) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"capitalize","hash":{},"data":data}))
    + "</a></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"dropdown-menu\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.forms : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\r\n";
},"useData":true});
this["app"]["templates"]["genresSubmenu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li><a class=\"book-genre-link\" data-book-genre-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " data-book-genre-type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " href=\"#\">"
    + alias4((helpers.capitalize || (depth0 && depth0.capitalize) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"capitalize","hash":{},"data":data}))
    + "</a></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"dropdown-menu\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.genres : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul> \r\n";
},"useData":true});
this["app"]["templates"]["homePage"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"starter-template\">\r\n    <h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n    <p class=\"lead\">"
    + alias4(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</p>\r\n    <img src=\"img/buka-hatifnaty.png\" />\r\n</div>\r\n";
},"useData":true});
this["app"]["templates"]["singleBook"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div id=\"single-book\" >\r\n    <div class=\"row-separator\">\r\n        <i>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.title : stack1), depth0))
    + "</i>, <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.author : stack1), depth0))
    + "</strong>\r\n        <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.description : stack1), depth0))
    + "</p>\r\n    </div>\r\n    <button id=\"delete-book-btn\" data-book-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.id : stack1), depth0))
    + " type=\"button\" class=\"btn btn-default-delete btn-sm\">\r\n        <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span> Delete\r\n    </button>\r\n    <button id=\"edit-book-btn\" data-book-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.book : depth0)) != null ? stack1.id : stack1), depth0))
    + " type=\"button\" class=\"btn btn-default-edit btn-sm\">\r\n        <span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span> Edit\r\n    </button>\r\n</div>\r\n";
},"useData":true});
this["app"]["templates"]["wishListPage"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\r\n    <h2>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n</div>\r\n";
},"useData":true});