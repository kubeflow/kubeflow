
// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var expect = require('chai').expect;
}

describe('Bytes', function() {
    after(function() {
        numeral.reset();
    });

    it('should format to bytes', function() {
        var decimal = 1000;
        var binary = 1024;
        var tests = [
                [0,'0b','0B'],
                [null,'0 b','0 B'],
                [100,'0b','100B'],
                [binary * 2,'0 ib','2 KiB'],
                [Math.pow(binary, 2) * 5,'0ib','5MiB'],
                [Math.pow(binary, 3) * 7.343,'0.[0] ib','7.3 GiB'],
                [Math.pow(binary, 4) * 3.1536544,'0.000ib','3.154TiB'],
                [Math.pow(binary, 5) * 2.953454534534,'0ib','3PiB'],
                [decimal * 2,'0 b','2 KB'],
                [Math.pow(decimal, 2) * 5,'0b','5MB'],
                [Math.pow(decimal, 3) * 7.343,'0.[0] b','7.3 GB'],
                [Math.pow(decimal, 4) * 3.1536544,'0.000b','3.154TB'],
                [Math.pow(decimal, 5) * 2.953454534534,'0b','3PB']
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
        }
    });

    it('should unformat to number', function() {
        var decimal = 1000;
        var binary = 1024;
        var tests = [
                ['0B', 0],
                ['0 B', 0],
                ['100B', 100],
                ['2 KiB', binary * 2],
                ['5MiB', Math.pow(binary, 2) * 5],
                ['7.3 GiB', Math.pow(binary, 3) * 7.3],
                ['3.154TiB', Math.pow(binary, 4) * 3.154],
                ['3PiB', Math.pow(binary, 5) * 3],
                ['2 KB', decimal * 2],
                ['5MB', Math.pow(decimal, 2) * 5],
                ['7.3 GB', Math.pow(decimal, 3) * 7.3],
                ['3.154TB', Math.pow(decimal, 4) * 3.154],
                ['3PB', Math.pow(decimal, 5) * 3]
            ],
            i;

        for (i = 0; i < tests.length; i++) {
            expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        }
    });
});
