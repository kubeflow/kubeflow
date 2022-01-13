
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Time', function() {
    after(function() {
        numeral.reset();
    });

    it('should format to time', function() {
        var tests = [
                [0,'00:00:00','0:00:00'],
                [null,'00:00:00','0:00:00'],
                [25,'00:00:00','0:00:25'],
                [238,'00:00:00','0:03:58'],
                [63846,'00:00:00','17:44:06']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to time', function() {
        var tests = [
                ['0:00:00', 0],
                ['0:00:25', 25],
                ['0:03:58', 238],
                ['17:44:06', 63846]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });
});
