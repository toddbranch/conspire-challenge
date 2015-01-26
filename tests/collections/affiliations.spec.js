define([
    'scripts/collections/affiliations'
], function(
    AffiliationsCollection
) {
    'use strict';

    describe('Affiliations Collection', function() {
        beforeEach(function() {
            this.collection = new AffiliationsCollection();
        });

        describe('evaluate', function() {
            it('should return 0 if both are null', function() {
                expect(this.collection.evaluate(null, null)).toBe(0);
            });

            it('should return -1 if a is null and b isn\'t', function() {
                expect(this.collection.evaluate(null, 1)).toBe(-1);
            });

            it('should return 1 if b is null and a isn\'t', function() {
                expect(this.collection.evaluate(1, null)).toBe(1);
            });

            it('should return 0 if equal', function() {
                expect(this.collection.evaluate(10, 10)).toBe(0);
            });

            it('should return 1 if b is higher', function() {
                expect(this.collection.evaluate(1, 10)).toBe(1);
            });

            it('should return -1 if a is higher', function() {
                expect(this.collection.evaluate(10, 1)).toBe(-1);
            });
        });

        describe('comparator', function() {
            it('should sort by end year', function() {
                var a = new Backbone.Model({end_year: 2014, start_year: 2000});
                var b = new Backbone.Model({end_year: 2013, start_year: 2000});

                expect(this.collection.comparator(a, b)).toBe(-1);
            });

            it('if end years are equal, should sort by start year', function() {
                var a = new Backbone.Model({end_year: 2014, start_year: 2000});
                var b = new Backbone.Model({end_year: 2014, start_year: 2001});

                expect(this.collection.comparator(a, b)).toBe(1);
            });

            it('should sort set of models correctly', function() {
                this.collection = new AffiliationsCollection([
                    {name: 'a', end_year: 2014, start_year: 2000},
                    {name: 'b', end_year: 2013, start_year: 2000},
                    {name: 'c', end_year: 2010, start_year: 2000},
                    {name: 'd', end_year: 2010, start_year: 2001},
                    {name: 'e', end_year: null, start_year: 2000},
                ]);

                expect(this.collection.at(0).get('name')).toBe('e');
                expect(this.collection.at(1).get('name')).toBe('a');
                expect(this.collection.at(2).get('name')).toBe('b');
                expect(this.collection.at(3).get('name')).toBe('d');
                expect(this.collection.at(4).get('name')).toBe('c');
            });
        });
    });
});
