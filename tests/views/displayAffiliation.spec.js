define([
    'scripts/views/displayAffiliation',
    'backbone'
], function(
    DisplayView,
    Backbone
) {
    'use strict';

    describe('Affiliation Display View', function() {
        beforeEach(function() {
            this.view = new DisplayView({
                model: new Backbone.Model()
            });
        });

        describe('initialize', function() {
            it('should throw if not initialized with a model', function() {
                this.view.model = null;

                expect(function() {
                    this.view.initialize();
                }).toThrow();
            });

            it('should re-render itself when its model changes', function() {
                spyOn(this.view, 'render');

                this.view.initialize();

                this.view.model.set({test: 1});

                expect(this.view.render).toHaveBeenCalled();
            });
        });

        describe('edit', function() {
            it('should trigger an \'edit\' event for external monitors', function() {
                var mockView = new Backbone.View();

                spyOn(mockView, 'render');

                mockView.listenTo(this.view, 'edit', mockView.render);

                this.view.edit();

                expect(mockView.render).toHaveBeenCalled();
            });
        });

        describe('getTemplateData', function() {
            it('should return JSON of model if end_year is specified', function() {
                var model = new Backbone.Model({
                    start_year: 2000,
                    end_year: 2010
                });

                expect(this.view.getTemplateData(model).start_year).toEqual(2000);
                expect(this.view.getTemplateData(model).end_year).toEqual(2010);
            });

            it('should replace end_year with \'present\' if it isn\'t specified', function() {
                var model = new Backbone.Model({
                    start_year: 2000,
                    end_year: null
                });

                expect(this.view.getTemplateData(model).start_year).toEqual(2000);
                expect(this.view.getTemplateData(model).end_year).toEqual('present');
            });
        });

        describe('render', function() {
            it('should return itself for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });

            it('should put content in its $el', function() {
                this.view.render();

                expect(this.view.$el).not.toBeEmpty();
            });
        });
    });
});
