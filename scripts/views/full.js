define([
    'backbone',
    'handlebars',
    'scripts/collections/affiliations',
    'scripts/views/affiliations',
    'text!scripts/templates/full.handlebars',
], function(
    Backbone,
    Handlebars,
    AffiliationsCollection,
    AffiliationsView,
    template
) {
    'use strict';

    return Backbone.View.extend({
        template: Handlebars.compile(template),

        initialize: function() {
            if (!(this.model instanceof Backbone.Model)) {
                throw new Error('must be initialized with a model');
            }

            this.collection = new AffiliationsCollection(this.model.get('affiliations'));

            this.listenTo(this.collection, 'change', this.updateAffiliations);
            this.listenTo(this.collection, 'add', this.updateAffiliations);
        },

        updateAffiliations: function() {
            this.model.save({affiliations: this.collection.toJSON()});
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            var affiliationsView = new AffiliationsView({collection: this.collection});
            this.$('ul').after(affiliationsView.render().$el);

            return this;
        }
    });
});
