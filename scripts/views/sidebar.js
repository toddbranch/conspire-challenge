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
            this.childView = new FullView({model: model});
            this.render();
        },

        render: function() {
            this.$el.hide();

            if (this.childView) {
                this.$el.html(this.childView.render().$el);
                this.$el.show();
            }

            return this;
        }
    });
});
