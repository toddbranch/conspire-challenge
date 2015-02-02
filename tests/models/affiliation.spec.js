define([
    'scripts/models/affiliation',
    'backbone',
    'underscore'
], function(
    AffiliationModel,
    Backbone,
    _
) {
    'use strict';

    describe('Affiliation Model', function() {
        beforeEach(function() {
            this.model = new AffiliationModel();
        });

        describe('validate', function() {
            var goodAttrs;

            beforeEach(function() {
                goodAttrs = {
                    organization: 'Dunder Mifflin',
                    title: 'Salesman',
                    start_year: 2005,
                    end_year: 2013
                };
            });

            it('should return undefined on validation success', function() {
                expect(this.model.validate(goodAttrs)).toEqual();
            });

            it('should return an array of errors on validation failure', function() {
                var result = this.model.validate({});

                expect(_.isArray(result)).toBe(true);
                expect(result.length > 0).toBe(true);
            });
        });

        describe('validateEndFollowsStart', function() {
            it('should return nothing if end is after start', function() {
                expect(this.model.validateEndFollowsStart(2000, 2001)).toBe(undefined);
            });

            it('should return nothing if end is null', function() {
                expect(this.model.validateEndFollowsStart(2000, null)).toBe(undefined);
            });

            it('should return an error message otherwise', function() {
                expect(_.isString(this.model.validateEndFollowsStart(2000, 1999))).toBe(true);
            });
        });

        describe('isInt', function() {
            it('should return true if argument is an int', function() {
                expect(this.model.isInt(1234)).toBe(true);
            });

            it('should return false otherwise', function() {
                expect(this.model.isInt('abcd')).toBe(false);
                expect(this.model.isInt(1.234)).toBe(false);
                expect(this.model.isInt('1234')).toBe(false);
            });
        });

        describe('validateEndYear', function() {
            it('should return nothing if argument is null', function() {
                expect(this.model.validateEndYear(null)).toBe(undefined);
            });

            it('should return nothing if argument is an integer', function() {
                expect(this.model.validateEndYear(1234)).toBe(undefined);
            });

            it('should return an error message otherwise', function() {
                expect(_.isString(this.model.validateEndYear(1.234))).toBe(true);
            });
        });

        describe('validateStartYear', function() {
            it('should return nothing if argument is an integer', function() {
                expect(this.model.validateStartYear(1234)).toBe(undefined);
            });

            it('should return an error message otherwise', function() {
                expect(_.isString(this.model.validateStartYear(1.234))).toBe(true);
                expect(_.isString(this.model.validateStartYear(null))).toBe(true);
            });
        });

        describe('validateTitle', function() {
            it('should return nothing if argument is a non-empty string', function() {
                expect(this.model.validateTitle('Commander')).toBe(undefined);
            });

            it('should return an error message otherwise', function() {
                expect(_.isString(this.model.validateTitle(1234))).toBe(true);
                expect(_.isString(this.model.validateTitle(''))).toBe(true);
                expect(_.isString(this.model.validateTitle(null))).toBe(true);
            });
        });

        describe('validateOrganization', function() {
            it('should return nothing if argument is a non-empty string', function() {
                expect(this.model.validateOrganization('Fleet')).toBe(undefined);
            });

            it('should return an error message otherwise', function() {
                expect(_.isString(this.model.validateOrganization(1234))).toBe(true);
                expect(_.isString(this.model.validateOrganization(''))).toBe(true);
                expect(_.isString(this.model.validateOrganization(null))).toBe(true);
            });
        });
    });
});
