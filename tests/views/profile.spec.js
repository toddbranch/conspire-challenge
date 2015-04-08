define([
    'scripts/views/profile',
    'backbone',
    'underscore'
], function(
    ProfileView,
    Backbone,
    _
) {
    'use strict';

    describe('Profile View', function() {
        beforeEach(function() {
            this.view = new ProfileView({
                model: new Backbone.Model({
                    name: 'dwight schrute',
                    image: 'schrute-farms.com'
                })
            });
        });

        describe('initialize', function() {
            it('should throw if not passed a model', function() {
                this.view.model = null;

                expect(
                    _.bind(this.view.initialize, this)
                ).toThrowError('must be initialized with a model');
            });

            it('should re-render itself when its model changes', function() {
                expect(this.view.$el).not.toContainText('test-name');

                this.view.model.set({name: 'test-name'});

                expect(this.view.$el).toContainText('test-name');
            });
        });

        describe('render', function() {
            beforeEach(function() {
                expect(this.view.$el).toBeEmpty();
            });

            it('should return this for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });

            it('should display the model name', function() {
                this.view.render();

                expect(this.view.$el).toContainText('dwight schrute');
            });

            it('should display the model\'s image', function() {
                this.view.render();

                expect(this.view.$('img')).toHaveAttr('src', 'schrute-farms.com');
            });
        });
    });
});
