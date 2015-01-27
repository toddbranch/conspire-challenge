define([
    'backbone',
    'handlebars',
    'scripts/views/displayAffiliation',
    'scripts/views/editAffiliation'
], function(
    Backbone,
    Handlebars,
    DisplayView,
    EditView
) {
    'use strict';

    return Backbone.View.extend({
        className: 'row affiliation',

        initialize: function() {
            this.displayView = new DisplayView({model: this.model});
            this.listenTo(this.displayView, 'edit', this.showEditView);

            this.editView = new EditView({model: this.model});
            this.listenTo(this.editView, 'save', this.showDisplayView);
        },

        showEditView: function() {
            this.displayView.$el.addClass('hide');
            this.editView.$el.removeClass('hide');
        },

        showDisplayView: function() {
            this.editView.$el.addClass('hide');
            this.displayView.$el.removeClass('hide');
        },

        render: function() {
            this.$el.html(this.displayView.render().$el);
            this.$el.append(this.editView.render().$el);

            this.showDisplayView();

            return this;
        }
    });
});
