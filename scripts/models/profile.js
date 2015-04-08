define([
   'backbone',
   'underscore'
], function(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        // gotta override to prevent sending id in the PUT body
        toJSON: function() {
            return _.omit(this.attributes, 'id');
        }
    });
});
