var loaderObj = {

    templates : [
    'application.hbs',
    'show.index.hbs',
]
};

loadTemplates(loaderObj.templates);
//This function loads all templates into the view
function loadTemplates(templates) {
    $(templates).each(function() {
        var tempObj = $('<script>');
        tempObj.attr('type', 'text/x-handlebars');
        var dataTemplateName = this.substring(0, this.indexOf('.'));
        tempObj.attr('data-template-name', dataTemplateName);
        tempObj.attr('id', dataTemplateName);
        $.ajax({
            async: false,
            type: 'GET',
            url: 'javascripts/templates/' + this,
            success: function(resp) {
                tempObj.html(resp);
                $('body').append(tempObj);                
            }
        });
    });
}