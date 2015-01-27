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
                return 'end year can\'t be before start!';
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
