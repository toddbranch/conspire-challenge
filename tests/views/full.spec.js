define([
    'scripts/views/full',
    'backbone'
], function(
    FullView,
    Backbone
) {
    'use strict';

    describe('Full View', function() {
        beforeEach(function() {
            this.view = new FullView({
                model: new Backbone.Model()
            });
        });

        describe('initialize', function() {
            it('should throw if not passed a model', function() {
                this.view.model = null;

                expect(function() {
                    this.view.initialize();
                }).toThrow();
            });

            it('should save the model when affiliations change', function() {
                spyOn(this.view.model, 'save');

                this.view.collection.trigger('change');

                expect(this.view.model.save).toHaveBeenCalled();
            });

            it('should save the model when affiliations are added', function() {
                spyOn(this.view.model, 'save');

                this.view.collection.trigger('add');

                expect(this.view.model.save).toHaveBeenCalled();
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
