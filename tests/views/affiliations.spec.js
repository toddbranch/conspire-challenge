define([
    'scripts/views/affiliations',
    'scripts/collections/affiliations',
    'backbone',
    'underscore'
], function(
    AffiliationsView,
    AffiliationsCollection,
    Backbone,
    _
) {
    'use strict';

    describe('Affiliations View', function() {
        beforeEach(function() {
            this.view = new AffiliationsView({
                collection: new AffiliationsCollection([
                    {end_year: 2000},
                    {end_year: 2001},
                    {end_year: 2002}
                ])
            });
        });

        describe('initialize', function() {
            it('should throw if not passed a collection', function() {
                this.view.collection = null;

                expect(_.bind(this.view.initialize, this))
                    .toThrowError('must be initialized with a collection');
            });

            it('should re-render itself when any end_year changes', function() {
                expect(this.view.$el).toBeEmpty();

                this.view.collection.at(0).set({end_year: 2001});

                expect(this.view.$el).not.toBeEmpty();
            });
        });

        describe('render', function() {
            it('should return itself for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });

            it('should display all the affiliations in the collection', function() {
                this.view.render();

                expect(this.view.$('div.affiliation').length).toBe(3);
            });

            it('should ensure the affiliations are sorted', function() {
                this.view.render();

                expect(this.view.$('div.affiliation')[0]).toContainText('2002');
                expect(this.view.$('div.affiliation')[1]).toContainText('2001');
                expect(this.view.$('div.affiliation')[2]).toContainText('2000');
            });
        });
    });
});
