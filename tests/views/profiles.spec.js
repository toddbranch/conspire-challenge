define([
    'scripts/views/profiles',
    'backbone'
], function(
    ProfilesView,
    Backbone
) {
    'use strict';

    describe('Profiles View', function() {
        beforeEach(function() {
            this.view = new ProfilesView({
                collection: new Backbone.Collection()
            });
        });

        describe('initialize', function() {
            it('should throw if not passed a collection', function() {
                this.view.collection = null;

                expect(function() {
                    this.view.initialize();
                }).toThrow();
            });

            it('renders itself when its collection syncs', function() {
                spyOn(this.view, 'render');

                this.view.initialize();

                this.view.collection.trigger('sync');

                expect(this.view.render).toHaveBeenCalled();
            });
        });

        describe('render', function() {
            it('should return this for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });

            it('should put content in its $el', function() {
                this.view.render();

                expect(this.view.$el).not.toBeEmpty();
            });
        });
    });
});
