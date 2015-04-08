require.config({
    paths: {
        jquery: [
            '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
            'bower_components/jquery/dist/jquery'
        ],

        backbone: [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
            'bower_components/backbone/backbone'
        ],

        underscore: [
            '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
            'bower_components/underscore/underscore'
        ],

        handlebars: [
            '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.min',
            'bower_components/handlebars/handlebars'
        ],

        text: [
            '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text',
            'bower_components/requirejs-text/text'
        ]
    },

    shim: {
        'backbone': ['jquery', 'underscore'],
    }
});

require([
    'scripts/views/app',
    'jquery'
], function(
    AppView,
    $
) {
    var app = new AppView();

    $('.container').html(app.render().$el);
});
