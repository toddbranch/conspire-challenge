define([
    'scripts/views/full',
    'backbone',
    'underscore'
], function(
    FullView,
    Backbone,
    _
) {
    'use strict';

    describe('Full View', function() {
        beforeEach(function() {
            this.view = new FullView({
                model: new Backbone.Model({
                    name: 'Jim Halpert',
                    addresses: [
                        'jim@dunder-mifflin.com',
                        'paperguy@gmail.com'
                    ],
                    affiliations: [
                        {title: 'Salesman'}
                    ]
                })
            });

            spyOn(this.view.model, 'save');
        });

        describe('initialize', function() {
            it('should throw if not passed a model', function() {
                this.view.model = null;

                expect(_.bind(this.view.initialize, this))
                    .toThrowError('must be initialized with a model');
            });

            it('should save the model when affiliations are added', function() {
                this.view.collection.add({title: 'Programmer'});

                expect(this.view.model.save).toHaveBeenCalled();
            });

            it('should save the model when affiliations change', function() {
                this.view.collection.at(0).set({title: 'Program Manager'});

                expect(this.view.model.save).toHaveBeenCalled();
            });
        });

        describe('render', function() {
            beforeEach(function() {
                expect(this.view.$el).toBeEmpty();
            });

            it('should return this for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });

            it('should display name', function() {
                this.view.render();

                expect(this.view.$el).toContainText('Jim Halpert');
            });

            it('should display each email address', function() {
                this.view.render();

                expect(this.view.$el).toContainText('jim@dunder-mifflin.com');
                expect(this.view.$el).toContainText('paperguy@gmail.com');
            });
        });
    });
});
