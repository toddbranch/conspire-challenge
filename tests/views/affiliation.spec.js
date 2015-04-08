define([
    'scripts/views/affiliation',
    'backbone',
    'underscore'
], function(
    AffiliationView,
    Backbone,
    _
) {
    'use strict';

    describe('Affiliation View', function() {
        beforeEach(function() {
            this.view = new AffiliationView({
                model: new Backbone.Model()
            });
        });

        describe('#render', function() {
            it('should return itself for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });
        });
    });
});
