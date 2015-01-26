define([
    'backbone',
    'handlebars',
    'text!scripts/templates/displayAffiliation.handlebars'
], function(
    Backbone,
    Handlebars,
    template
) {
    'use strict';

    return Backbone.View.extend({
        template: Handlebars.compile(template),

        events: {
            'click .edit': 'edit',
        },

        initialize: function() {
            if (!(this.model instanceof Backbone.Model)) {
                throw new Error('must be initialized with a model');
            }

            this.listenTo(this.model, 'change', this.render);
        },

        edit: function() {
            this.trigger('edit');
        },

        getTemplateData: function(model) {
            var json = model.toJSON();

            if (!json.end_year) {
                json.end_year = 'present';
            }

            return json;
        },

        render: function() {
            this.$el.html(this.template(this.getTemplateData(this.model)));

            return this;
        }
    });
});
