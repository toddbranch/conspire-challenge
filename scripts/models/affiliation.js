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
            var errors = this.getAttributeErrors(attrs);

            if (errors) {
                return errors;
            }

            if (attrs.start_year > attrs.end_year && !_.isNull(attrs.end_year)) {
                return 'start year must be prior or equal to end year';
            }
        },

        getAttributeErrors: function(attrs) {
            return this.validateOrganization(attrs.organization) ||
                this.validateTitle(attrs.title) ||
                this.validateStartYear(attrs.start_year) ||
                this.validateEndYear(attrs.end_year);
        },

        validateOrganization: function(organization) {
            if (!_.isString(organization) || organization.length === 0) {
                return 'organization must be a non-empty string';
            }
        },

        validateTitle: function(title) {
            if (!_.isString(title) || title.length === 0) {
                return 'title must be a non-empty string';
            }
        },

        validateStartYear: function(startYear) {
            if (!this.isInt(startYear)) {
                return 'start year must be an integer';
            }
        },

        validateEndYear: function(endYear) {
            if (!_.isNull(endYear) && !this.isInt(endYear)) {
                return 'end year must either be empty or an integer';
            }
        },

        isInt: function(number) {
            return _.isNumber(number) && number % 1 === 0;
        }
    });
});
