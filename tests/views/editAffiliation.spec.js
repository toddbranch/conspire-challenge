define([
    'scripts/views/editAffiliation',
    'backbone'
], function(
    EditView,
    Backbone
) {
    'use strict';

    describe('Affiliation Edit View', function() {
        beforeEach(function() {
            this.view = new EditView({
                model: new Backbone.Model()    
            });
        });

        describe('initialize', function() {
            it('should throw if not initialized with a model', function() {
                this.view.model = null;

                expect(function() {
                    this.view.initialize();
                }).toThrow();
            });
        });

        describe('getData', function() {
        });

        describe('save', function() {
            it('', function() {
                //spyOn(this.view, 'getData')
            });
        });

        describe('render', function() {
            it('should return itself for chaining', function() {
                expect(this.view.render()).toBe(this.view);
            });

            it('should put content in its $el', function() {
                this.view.render();

                // maybe bring in jasmine-jquery to help with this
                expect(this.view.$el.html().length > 0).toBe(true);
            });
        });
    });
});
