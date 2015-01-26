define([
    'backbone'
], function(
    Backbone
) {
    'use strict';

    return Backbone.Collection.extend({
        url: 'http://private-ff20e-conspirechallenge.apiary-mock.com/profiles'
    });
});
