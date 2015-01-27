define([
    'scripts/views/editAffiliation',
    'backbone',
    'scripts/models/affiliation'
], function(
    EditView,
    Backbone,
    AffiliationModel
) {
    'use strict';

    describe('Affiliation Edit View', function() {
        beforeEach(function() {
            this.view = new EditView({
                model: new AffiliationModel()
            });
        });

        describe('initialize', function() {
            it('should throw if not initialized with a model', function() {
                this.view.model = null;

                expect(function() {
                    this.view.initialize();
                }).toThrow();
            });
        });

        describe('getData', function() {
            beforeEach(function() {
                this.view.render();
            });

            it('should return null for start_year and end_year if they aren\'t set', function() {
                var result = this.view.getData();

                expect(result.start_year).toBe(null);
                expect(result.end_year).toBe(null);
            });

            it('should return integer values for start_year and end_year', function() {
                var year = 2000;
                
                this.view.$('.startYear').val(year);
                this.view.$('.endYear').val(year);

                var result = this.view.getData();

                expect(result.start_year).toBe(year);
                expect(result.end_year).toBe(year);
            });

            it('should retrieve string values for title and organization', function() {
                this.view.$('.organization').val('organization');
                this.view.$('.title').val('title');

                var result = this.view.getData();

                expect(result.organization).toBe('organization');
                expect(result.title).toBe('title');
            });
        });

        describe('save', function() {
            var getDataSpy;
            var badData;
            var goodData;

            beforeEach(function() {
                this.view.render();
                getDataSpy = spyOn(this.view, 'getData');

                badData = {title: 1};
                goodData = {
                    organization: 'organization',
                    title: 'title',
                    start_year: 2000,
                    end_year: 2010
                };
            });

            it('shows the error element on error', function() {
                getDataSpy.and.returnValue(badData);

                this.view.save();

                expect(this.view.$('.error')).not.toHaveClass('hide');
            });

            it('populates the error element on error', function() {
                getDataSpy.and.returnValue(badData);

                this.view.save();

                expect(this.view.$('.error')).not.toBeEmpty();
            });

            it('hides the error element on successful validation', function() {
                getDataSpy.and.returnValue(goodData);

                this.view.save();

                expect(this.view.$('.error')).toHaveClass('hide');
            });

            it('should trigger a save event on successful validation for external monitors', function() {
                getDataSpy.and.returnValue(goodData);

                var mockView = new Backbone.View();

                spyOn(mockView, 'render');

                mockView.listenTo(this.view, 'save', mockView.render);

                this.view.save();

                expect(mockView.render).toHaveBeenCalled();
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
