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
            this.view = new DisplayView();
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

            it('should replace end_year with present if it isn\'t specified', function() {
                var model = new Backbone.Model({
                    start_year: 2000,
                    end_year: null
                });

                expect(this.view.getTemplateData(model).start_year).toEqual(2000);
                expect(this.view.getTemplateData(model).end_year).toEqual('present');
            });
        });
    });
});
