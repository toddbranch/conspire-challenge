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

            spyOn(this.view.model, 'save');
        });

        describe('initialize', function() {
            it('should throw if not passed a model', function() {
                this.view.model = null;

                expect(function() {
                    this.view.initialize();
                }).toThrow();
            });

            it('should save the model when affiliations are added', function() {
                this.view.collection.add({title: 'testTitle'});

                expect(this.view.model.save).toHaveBeenCalled();
            });

            it('should save the model when affiliations change', function() {
                this.view.collection.add({title: 'testTitle'});

                // I'm testing the change event, so want to clear the call that
                // was fired by add
                this.view.model.save.calls.reset();

                this.view.collection.at(0).set({title: 'anotherTitle'});

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
