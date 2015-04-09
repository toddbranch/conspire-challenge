define([
    'backbone',
    'handlebars',
    'scripts/collections/affiliations',
    'scripts/views/affiliations',
    'text!scripts/templates/full.handlebars',
    'scripts/views/editableText'
], function(
    Backbone,
    Handlebars,
    AffiliationsCollection,
    AffiliationsView,
    template,
    EditableTextView
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

            this.nameView = new EditableTextView({text: this.model.get('name')});
            this.listenTo(this.nameView, 'update', this.updateName);
        },

        updateName: function(name) {
            this.model.save({name: name});
        },

        updateAffiliations: function() {
            this.model.save({affiliations: this.collection.toJSON()});
        },

        render: function() {
            this.$el.html(this.template({
                image: this.model.get('image'),
                addresses: this.model.get('addresses')
            }));

            this.$('.name').append(this.nameView.render().$el);

            var affiliationsView = new AffiliationsView({collection: this.collection});
            this.$('.addresses').after(affiliationsView.render().$el);

            return this;
        }
    });
});
