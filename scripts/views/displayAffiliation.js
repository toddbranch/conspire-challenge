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

        render: function() {
            this.$el.html(this.template({
                organization: this.model.get('organization'),
                title: this.model.get('title'),
                start: this.model.get('start_year'),
                end: this.model.get('end_year') || 'present'
            }));

            return this;
        }
    });
});
