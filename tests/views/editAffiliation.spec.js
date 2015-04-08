define([
    'scripts/views/editAffiliation',
    'backbone',
    'scripts/models/affiliation',
    'underscore'
], function(
    EditView,
    Backbone,
    AffiliationModel,
    _
) {
    'use strict';

    describe('Affiliation Edit View', function() {
        beforeEach(function() {
            this.view = new EditView({
                model: new AffiliationModel()
            });
        });

        describe('#initialize', function() {
            it('should throw if not initialized with a model', function() {
                this.view.model = null;

                expect(_.bind(this.view.initialize, this))
                    .toThrowError('must be initialized with a model');
            });
        });

        describe('#save', function() {
            beforeEach(function() {
                this.view.render();
            });

            it('shows the error element on error', function() {
                expect(this.view.$('.error')).toHaveClass('hide');
                expect(this.view.$('.error')).toBeEmpty();

                // blank values for all elements will fail multiple validations
                this.view.save();

                expect(this.view.$('.error')).not.toHaveClass('hide');
                expect(this.view.$('.error')).not.toBeEmpty();
            });

            function populateWithData(view) {
                view.$(view.selectors.startYear).val(2000);
                view.$(view.selectors.endYear).val(2001);
                view.$(view.selectors.organization).val('organization');
                view.$(view.selectors.title).val('title');
            }

            it('hides the error element on successful validation', function() {
                populateWithData(this.view);

                this.view.save();

                expect(this.view.$('.error')).toHaveClass('hide');
            });

            it('should trigger a save event on successful validation for external monitors', function() {
                populateWithData(this.view);

                var mockView = new Backbone.View();

                spyOn(mockView, 'render');

                mockView.listenTo(this.view, 'save', mockView.render);

                this.view.save();

                expect(mockView.render).toHaveBeenCalled();
            });

            it('should put the entered values into the model', function() {
                populateWithData(this.view);

                this.view.save();

                expect(this.view.model.get('title')).toBe('title');
                expect(this.view.model.get('organization')).toBe('organization');
            });
        });

        describe('#render', function() {
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

                expect(this.view.$(this.view.selectors.title)).toHaveValue('Barista');
                expect(this.view.$(this.view.selectors.organization)).toHaveValue('Starbucks');
                expect(this.view.$(this.view.selectors.startYear)).toHaveValue('2000');
                expect(this.view.$(this.view.selectors.endYear)).toHaveValue('2001');
            });
        });
    });
});
