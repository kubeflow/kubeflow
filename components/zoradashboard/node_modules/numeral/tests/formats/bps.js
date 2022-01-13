
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('BPS', function() {
    after(function() {
        numeral.reset();
    });

    it('should format to bps', function() {
        var tests = [
                [0,'0 BPS','0 BPS'],
                [0.0001, '0 BPS', '1 BPS'],
                [.0056, '0 BPS', '56 BPS'],
                [.25, '0BPS', '2500BPS'],
                [.000001, '0.00 BPS', '0.01 BPS']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to number', function() {
        var tests = [
                ['0 BPS', 0],
                ['1 BPS', 0.0001],
                ['56 BPS', .0056],
                ['2500BPS', .25],
                ['0.01 BPS', .000001]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });
});
