
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Exponential', function() {
    after(function() {
        numeral.reset();
    });

    it('should format to exponential notation', function() {
        var tests = [
                [0,'0e+0','0e+0'],
                [null,'0e+0','0e+0'],
                [1,'0e+0','1e+0'],
                [77.1234,'0.0e+0','7.7e+1'],
                [0.000000771234,'0.0e-0','7.7e-7'],
                [-0.000000771234,'0.00e-0','-7.71e-7'],
                [77.1234,'0.000e+0','7.712e+1'],
                [-1000830298,'0.0[000]e+0','-1.0008e+9']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to exponential notation', function() {
        var tests = [
                ['0e+0', 0],
                ['1e+0', 1],
                ['7.712e+1', 77.12],
                ['7.7e-7', 0.00000077],
                ['-7.71e-6', -0.00000771],
                ['-1.0008e+9', -1000800000]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });
});
