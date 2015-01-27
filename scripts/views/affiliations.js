define([
    'backbone',
    'handlebars',
    'scripts/views/affiliation',
    'scripts/collections/affiliations',
    'scripts/models/affiliation',
    'text!scripts/templates/affiliations.handlebars'
], function(
    Backbone,
    Handlebars,
    AffiliationView,
    AffiliationsCollection,
    AffiliationModel,
    template
) {
    'use strict';

    return Backbone.View.extend({
        template: Handlebars.compile(template),

        events: {
            'click .add-affiliation': 'create'
        },

        initialize: function() {
            if (!(this.collection instanceof AffiliationsCollection)) {
                throw new Error('must be initialized with a collection');
            }

            this.listenTo(this.collection, 'change:end_year', this.render);
            this.listenTo(this.collection, 'add', this.render);
        },

        create: function() {
            var model = new AffiliationModel();

            var view = new AffiliationView({model: model});

            this.listenToOnce(model, 'change', this.add);

            this.$('.affiliations-inner').prepend(view.render().$el);

            this.$('.add-affiliation').addClass('disabled');

            view.showEditView();
        },

        add: function(model) {
            this.collection.add(model);
        },

        render: function() {
            this.$el.html(this.template());

            this.collection.sort();

            this.collection.each(function(affiliation) {
                var view = new AffiliationView({model: affiliation});
                this.$('.affiliations-inner').append(view.render().$el);
            }, this);

            return this;
        }
    });
});
