define([
    'scripts/views/profiles',
    'backbone',
    'underscore'
], function(
    ProfilesView,
    Backbone,
    _
) {
    'use strict';

    describe('Profiles View', function() {
        beforeEach(function() {
            this.view = new ProfilesView({
                collection: new Backbone.Collection([
                    {}, {}, {}
                ])
            });
        });

        describe('initialize', function() {
            it('should throw if not passed a collection', function() {
                this.view.collection = null;

                expect(
                    _.bind(this.view.initialize, this)
                ).toThrowError('must be initialized with a collection');
            });

            it('should render itself when its collection syncs', function() {
                expect(this.view.$el).toBeEmpty();

                this.view.collection.trigger('sync');

                expect(this.view.$el).not.toBeEmpty();
            });
        });

        describe('render', function() {
            it('should return this for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });

            it('should render it\'s constituent models', function() {
                expect(this.view.$el).toBeEmpty();

                this.view.render();

                expect(this.view.$el.children().length).toBe(3);
            });
        });
    });
});
