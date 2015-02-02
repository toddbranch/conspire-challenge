define([
    'backbone',
    'underscore'
], function(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        validate: function(attrs) {
            var errors = [];

            errors.push(this.validateOrganization(attrs.organization));
            errors.push(this.validateTitle(attrs.title));
            errors.push(this.validateStartYear(attrs.start_year));
            errors.push(this.validateEndYear(attrs.end_year));
            errors.push(this.validateEndFollowsStart(attrs.start_year, attrs.end_year));

            errors = _.compact(errors);

            if (errors.length > 0) {
                return errors;
            }

            // have to return undefined to ensure 'change' event is fired
        },

        validateEndFollowsStart: function(startYear, endYear) {
            if (startYear > endYear && !_.isNull(endYear)) {
                return 'end year can\'t be before start!';
            }
        },

        validateOrganization: function(organization) {
            if (!_.isString(organization) || organization.length === 0) {
                return 'organization can\'t be empty!';
            }
        },

        validateTitle: function(title) {
            if (!_.isString(title) || title.length === 0) {
                return 'title can\'t be empty!';
            }
        },

        validateStartYear: function(startYear) {
            if (!this.isInt(startYear)) {
                return 'start year must be a year!';
            }
        },

        validateEndYear: function(endYear) {
            if (!_.isNull(endYear) && !this.isInt(endYear)) {
                return 'end year must be a year or empty!';
            }
        },

        isInt: function(number) {
            return _.isNumber(number) && number % 1 === 0;
        }
    });
});
