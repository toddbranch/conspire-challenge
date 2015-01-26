define([
    'backbone',
    'handlebars',
    'text!scripts/templates/editAffiliation.handlebars'
], function(
    Backbone,
    Handlebars,
    template
) {
    'use strict';

    return Backbone.View.extend({
        template: Handlebars.compile(template),

        events: {
            'click .save': 'save',
        },

        save: function() {
            this.model.set(this.getData(), {validate: true});

            if (this.model.validationError) {
                this.$('.error').html(this.model.validationError);
                this.$('.error').removeClass('hide');
            } else {
                this.$('.error').addClass('hide');
                this.trigger('save');
            }
        },

        getData: function() {
            var data = {};

            data.organization = this.$('.organization').val();
            data.title = this.$('.title').val();

            var startYear = this.$('.startYear').val();
            data.start_year = startYear ? parseInt(startYear): null;

            var endYear = this.$('.endYear').val();
            data.end_year = endYear ? parseInt(endYear): null;

            return data;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
});
