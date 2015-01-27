define([
    'backbone',
    'scripts/models/affiliation'
], function(
    Backbone,
    AffiliationModel
) {
    'use strict';

    return Backbone.Collection.extend({

        model: AffiliationModel,

        evaluate: function(a, b) {
            if (a === b) {
                return 0;
            }

            if (_.isNull(a)) {
                return -1;
            }

            if (_.isNull(b)) {
                return 1;
            }

            return a > b ? -1 : 1;
        },

        comparator: function(a, b) {
            var endResult = this.evaluate(a.get('end_year'), b.get('end_year'));
            if (endResult) {
                return endResult;
            }

            return this.evaluate(a.get('start_year'), b.get('start_year'));
        }
    });
});
