define([
    'scripts/models/profile'
], function(
    ProfileModel
) {
    'use strict';

    describe('Profile Model', function() {
        describe('toJSON', function() {
            it('should exclude the id property', function() {
                var model = new ProfileModel({
                    id: 10,
                    organization: 'Conspire',
                    title: 'Challenger'
                });

                expect(model.toJSON()).toEqual({
                    organization: 'Conspire',
                    title: 'Challenger'
                });
            });
        });
    });
});
