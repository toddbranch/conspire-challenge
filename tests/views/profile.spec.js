define([
    'scripts/views/profile',
    'backbone'
], function(
    ProfileView,
    Backbone
) {
    'use strict';

    describe('Profile View', function() {
        beforeEach(function() {
            this.view = new ProfileView({
                model: new Backbone.Model()
            });
        });

        describe('initialize', function() {
            it('should throw if not passed a model', function() {
                this.view.model = null;

                expect(this.view.initialize).toThrow();
            });

            it('renders itself when its model changes', function() {
                spyOn(this.view, 'render');

                this.view.initialize();

                this.view.model.set({name: 'test'});

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
