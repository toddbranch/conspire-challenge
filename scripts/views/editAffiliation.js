define([
    'backbone',
    'handlebars',
    'underscore',
    'text!scripts/templates/editAffiliation.handlebars'
], function(
    Backbone,
    Handlebars,
    _,
    template
) {
    'use strict';

    return Backbone.View.extend({
        template: Handlebars.compile(template),

        events: {
            'click .save': 'save',
        },

        initialize: function() {
            if (!(this.model instanceof Backbone.Model)) {
                throw new Error('must be initialized with a model');
            }
        },

        save: function() {
            this.model.set(this.getData(), {validate: true});

            var errors = this.model.validationError;

            if (errors.length > 0) {
                this.$('.error').html(_.first(errors));
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
