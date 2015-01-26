define([
    'backbone',
    'handlebars',
    'scripts/views/profile',
    'text!scripts/templates/profiles.handlebars'
], function(
    Backbone,
    Handlebars,
    ProfileView,
    template
) {
    'use strict';

    return Backbone.View.extend({
        className: 'profiles',

        template: Handlebars.compile(template),

        initialize: function() {
            this.listenTo(this.collection, 'sync', this.render);
        },

        render: function() {
            this.$el.html(this.template());

            this.collection.each(function(profile) {
                var view = new ProfileView({model: profile});
                this.$('ul').append(view.render().$el);
            }, this);

            return this;
        }
    });
});
