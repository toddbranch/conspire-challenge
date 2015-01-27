define([
    'backbone',
    'scripts/models/profile'
], function(
    Backbone,
    ProfileModel
) {
    'use strict';

    return Backbone.Collection.extend({
        url: 'http://private-ff20e-conspirechallenge.apiary-mock.com/profiles',

        model: ProfileModel
    });
});
