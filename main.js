require.config({
    paths: {
        jquery: [
            'bower_components/jquery/dist/jquery'
        ],

        backbone: [
            'bower_components/backbone/backbone'
        ],

        underscore: [
            'bower_components/underscore/underscore'
        ],

        bootstrap: [
            'bower_components/bootstrap/dist/js/bootstrap'
        ],

        handlebars: [
            'bower_components/handlebars/handlebars'
        ],

        text: [
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

    $('.container').prepend(profilesView.render().$el);
});
