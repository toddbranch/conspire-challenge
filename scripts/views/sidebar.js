define([
    'backbone',
    'scripts/views/full'
], function(
    Backbone,
    FullView
) {
    'use strict';

    return Backbone.View.extend({
        className: 'well col-sm-6',

        update: function(model) {
            this.model = model;
            this.render();
        },

        render: function() {
            this.$el.empty();

            if (this.model) {
                // render fullview
                var fullView = new FullView({model: this.model});
                this.$el.html(fullView.render().$el);
            }

            return this;
        }
    });
});
