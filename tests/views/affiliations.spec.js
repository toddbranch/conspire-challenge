define([
    'scripts/views/affiliations',
    'scripts/collections/affiliations',
    'backbone'
], function(
    AffiliationsView,
    AffiliationsCollection,
    Backbone
) {
    'use strict';

    describe('Affiliations View', function() {
        beforeEach(function() {
            this.view = new AffiliationsView({
                collection: new AffiliationsCollection([
                    {end_year: 2000}
                ])
            });
        });

        describe('initialize', function() {
            it('should throw if not passed a collection', function() {
                this.view.collection = null;
                expect(function() {
                    this.view.initialize();
                }).toThrow();
            });

            it('should re-render itself when any end_year changes', function() {
                spyOn(this.view, 'render');

                this.view.initialize();
                this.view.collection.at(0).set({end_year: 2001});

                expect(this.view.render).toHaveBeenCalled();
            });
        });

        describe('render', function() {
            it('should return itself for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });

            it('should ensure the affiliations are sorted', function() {
                spyOn(this.view.collection, 'sort');

                this.view.render();

                expect(this.view.collection.sort).toHaveBeenCalled();
            });

            it('should put content in its $el', function() {
                this.view.render();

                expect(this.view.$el).not.toBeEmpty();
            });
        });
    });
});
