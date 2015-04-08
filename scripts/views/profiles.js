define([
    'backbone',
    'handlebars',
    'scripts/views/profile'
], function(
    Backbone,
    Handlebars,
    ProfileView
) {
    'use strict';

    return Backbone.View.extend({
        className: 'profiles col-md-4',
        tagName: 'ul',

        initialize: function() {
            if (!(this.collection instanceof Backbone.Collection)) {
                throw new Error('must be initialized with a collection');
            }

            this.listenTo(this.collection, 'sync', this.render);
        },

        modelSelected: function(model) {
            this.trigger('selected', model);
        },

        render: function() {
            this.$el.empty();

            this.collection.each(
                function(profile) {
                    var view = new ProfileView({model: profile});
                    this.$el.append(view.render().$el);
                    this.listenTo(view, 'clicked', this.modelSelected);
                },
                this
            );

            return this;
        }
    });
});
