define([
    'backbone',
    'handlebars',
    'text!scripts/templates/profile.handlebars'
], function(
    Backbone,
    Handlebars,
    template
) {
    'use strict';

    return Backbone.View.extend({
        tagName: 'li',

        className: 'profile noselect',

        template: Handlebars.compile(template),

        events: {
            click: 'clicked'
        },

        clicked: function() {
            this.trigger('clicked', this.model);
        },

        initialize: function() {
            if (!(this.model instanceof Backbone.Model)) {
                throw new Error('must be initialized with a model');
            }

            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
