// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../../numeral');
    var locales = require('../../locales');
    var expect = require('chai').expect;
}

describe('Locale: pt-br', function() {

    before(function() {
        numeral.locale('pt-br');
    });

    after(function() {
        numeral.reset();
    });

    describe('Number', function() {
        it('should format a number', function() {
            var tests = [
                [10000,'0,0.0000','10.000,0000'],
                [10000.23,'0,0','10.000'],
                [-10000,'0,0.0','-10.000,0'],
                [10000.1234,'0.000','10000,123'],
                [-10000,'(0,0.0000)','(10.000,0000)'],
                [-0.23,'.00','-,23'],
                [-0.23,'(.00)','(,23)'],
                [0.23,'0.00000','0,23000'],
                [1230974,'0.0a','1,2milhões'],
                [1460,'0a','1mil'],
                [-104000,'0a','-104mil'],
                [1,'0o','1º'],
                [52,'0o','52º'],
                [23,'0o','23º'],
                [100,'0o','100º'],
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
                [1000.234,'$0,0.00','R$1.000,23'],
                [-1000.234,'($0,0)','(R$1.000)'],
                [-1000.234,'$0.00','-R$1000,23'],
                [1230974,'($0.00a)','R$1,23milhões']
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
                [0.974878234,'0.000%','97,488%'],
                [-0.43,'0%','-43%'],
                [0.43,'(0.000%)','43,000%']
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).format(tests[i][1])).to.equal(tests[i][2]);
            }
        });
    });

    describe('Unformat', function() {
        it('should unformat', function() {
            var tests = [
                ['10.000,123',10000.123],
                ['(0,12345)',-0.12345],
                ['(R$1,23milhões)',-1230000],
                ['10mil',10000],
                ['-10mil',-10000],
                ['23º',23],
                ['R$10.000,00',10000],
                ['-76%',-0.76],
                ['2:23:57',8637]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
            }
        });
    });
});
