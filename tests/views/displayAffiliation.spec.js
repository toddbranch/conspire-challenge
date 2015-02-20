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

                expect(this.view.initialize).toThrow();
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

        describe('render', function() {
            it('should return itself for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });

            it('should display organization, title, start date, end date', function() {
                this.view.model.set({
                    title: 'Barista',
                    organization: 'Starbucks',
                    start_year: 2000,
                    end_year: 2001
                });
                this.view.render();

                expect(this.view.$el).toHaveText(/Barista/);
                expect(this.view.$el).toHaveText(/Starbucks/);
                expect(this.view.$el).toHaveText(/2000/);
                expect(this.view.$el).toHaveText(/2001/);
            });

            it('should display \'present\' if end date isn\'t specified', function() {
                this.view.render();

                expect(this.view.$el).toHaveText(/present/);
            });
        });
    });
});
