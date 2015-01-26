define([
    'backbone',
    'handlebars',
    'scripts/views/full',
    'text!scripts/templates/profile.handlebars'
], function(
    Backbone,
    Handlebars,
    FullProfileView,
    template
) {
    'use strict';

    return Backbone.View.extend({
        tagName: 'li',

        className: 'profile',

        template: Handlebars.compile(template),

        events: {
            click: 'clicked'
        },

        clicked: function(e) {
            var view = new FullProfileView({model: this.model});
            view.render();
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
