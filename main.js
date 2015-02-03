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

        bootstrap: [
            '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.2/js/bootstrap.min',
            'bower_components/bootstrap/dist/js/bootstrap'
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
        'bootstrap': ['jquery']
    }
});

require([
    'scripts/collections/profiles',
    'scripts/views/profiles',
    'jquery'
], function(
    ProfilesCollection,
    ProfilesView,
    $
) {
    var profiles = new ProfilesCollection();
    profiles.fetch();

    var profilesView = new ProfilesView({collection: profiles});

    $('.container').html(profilesView.render().$el);
});
