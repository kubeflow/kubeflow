// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var locales = require('../../locales');
    var expect = require('chai').expect;
}

describe('Locale: th', function() {

    before(function() {
        numeral.locale('th');
    });

    after(function() {
        numeral.reset();
    });

    describe('Number', function() {
        it('should format a number', function() {
            var tests = [
                [10000,'0,0.0000','10,000.0000'],
                [10000.23,'0,0','10,000'],
                [-10000,'0,0.0','-10,000.0'],
                [10000.1234,'0.000','10000.123'],
                [-10000,'(0,0.0000)','(10,000.0000)'],
                [-0.23,'.00','-.23'],
                [-0.23,'(.00)','(.23)'],
                [0.23,'0.00000','0.23000'],
                [1230974,'0.0a','1.2ล้าน'],
                [1460,'0a','1พัน'],
                [-104000,'0a','-104พัน'],
                [1,'0o','1.'],
                [52,'0o','52.'],
                [23,'0o','23.'],
                [100,'0o','100.'],
                [1,'0[.]0','1']
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Currency', function() {
        it('should format a currency', function() {
            var tests = [
                [1000.234,'$0,0.00','฿1,000.23'],
                [-1000.234,'($0,0)','(฿1,000)'],
                [-1000.234,'$0.00','-฿1000.23'],
                [1230974,'($0.00a)','฿1.23ล้าน']
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Percentages', function() {
        it('should format a percentages', function() {
            var tests = [
                [1,'0%','100%'],
                [0.974878234,'0.000%','97.488%'],
                [-0.43,'0%','-43%'],
                [0.43,'(0.000%)','43.000%']
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Unformat', function() {
        it('should unformat', function() {
            var tests = [
                ['10,000.123',10000.123],
                ['(0.12345)',-0.12345],
                ['(฿1.23ล้าน)',-1230000],
                ['10พัน',10000],
                ['-10พัน',-10000],
                ['23.',23],
                ['฿10,000.00',10000],
                ['-76%',-0.76],
                ['2:23:57',8637]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
            }
        });
    });
});
