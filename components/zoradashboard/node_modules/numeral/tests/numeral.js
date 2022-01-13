// Node
if (typeof module !== 'undefined' && module.exports) {
    var numeral = require('../numeral');
    var expect = require('chai').expect;
}

describe('Numeral', function() {
    afterEach(function() {
        numeral.reset();
    });

    describe('Default', function() {
        it('should set a default format', function() {
            numeral.defaultFormat('0,0');

            expect(numeral(10000).format()).to.equal('10,000');
        });
    });

    describe('Types', function() {
        it('should return a value as correct type', function() {
            var tests = [
                    [1234.56,'number'],
                    ['1234.56','number'],
                    [0,'number'],
                    [NaN,'object'],
                    [null,'object']
                ],
                i;

            for (i = 0; i < tests.length; i++) {
                expect(typeof numeral(tests[i][0]).value()).to.equal(tests[i][1]);
            }
        });
    });

    describe('Value', function() {
        it('should return a value', function() {
            var tests = [
                    [1000, 1000],
                    [0.5, 0.5],
                    [null, null],
                    ['1,000', 1000],
                    ['not a number', null]
                ],
                num;

            for (var i = 0; i < tests.length; i++) {
                num = numeral(tests[i][0]);

                expect(num.value()).to.equal(tests[i][1]);
            }
        });
    });

    describe('Set', function() {
        it('should set a value', function() {
            var tests = [
                    [1000,1000],
                    [-0.25,-0.25]
                ],
                num;

            for (var i = 0; i < tests.length; i++) {
                num = numeral().set(tests[i][0]);

                expect(num.value()).to.equal(tests[i][1]);
            }
        });
    });

    describe('Custom Zero', function() {
        it('should change zero value', function() {
            var tests = [
                    [0,null,'0','0'],
                    [0,'N/A','0','N/A'],
                    [0,'','','']
                ];

            for (var i = 0; i < tests.length; i++) {
                numeral.zeroFormat(tests[i][1]);

                expect(numeral(tests[i][0]).format(tests[i][2])).to.equal(tests[i][3]);
            }
        });
    });

    describe('Custom Null', function() {
        it('should change null value', function() {
            var tests = [
                    [null,null,'0','0'],
                    [null,'N/A','0','N/A'],
                    [null,'','','']
                ];

            for (var i = 0; i < tests.length; i++) {
                numeral.nullFormat(tests[i][1]);

                expect(numeral(tests[i][0]).format(tests[i][2])).to.equal(tests[i][3]);
            }
        });
    });

    describe('Clone', function() {
        it('should clone', function() {
            var a = numeral(1000),
                b = numeral(a),
                c = a.clone(),
                aVal = a.value(),
                aSet = a.set(2000).value(),
                bVal = b.value(),
                cVal = c.add(10).value();

            expect(aVal).to.equal(1000);
            expect(aSet).to.equal(2000);
            expect(bVal).to.equal(1000);
            expect(cVal).to.equal(1010);
        });
    });

    describe('isNumeral', function() {
        it('should return boolean', function() {
            var tests = [
                    [numeral(),true],
                    [1,false]
                ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral.isNumeral(tests[i][0])).to.equal(tests[i][1]);
            }
        });
    });

    describe('Format', function() {
        it('should format to a number', function() {
            var tests = [
                    [0, null, '0'],
                    [0, '0.00', '0.00'],
                    [null, null, '0'],
                    [NaN, '0.0', '0.0'],
                    [1.23,'0,0','1'],
                    [10000,'0,0.0000','10,000.0000'],
                    [10000.23,'0,0','10,000'],
                    [-10000,'0,0.0','-10,000.0'],
                    [10000.1234,'0.000','10000.123'],
                    [10000,'0[.]00','10000'],
                    [10000.1,'0[.]00','10000.10'],
                    [10000.123,'0[.]00','10000.12'],
                    [10000.456,'0[.]00','10000.46'],
                    [10000.001,'0[.]00','10000'],
                    [10000.45,'0[.]00[0]','10000.45'],
                    [10000.456,'0[.]00[0]','10000.456'],
                    [10000,'(0,0.0000)','10,000.0000'],
                    [-10000,'(0,0.0000)','(10,000.0000)'],
                    [-12300,'+0,0.0000','-12,300.0000'],
                    [1230,'+0,0','+1,230'],
                    [1230,'-0,0','1,230'],
                    [-1230,'-0,0','-1,230'],
                    [-1230.4,'0,0.0+','1,230.4-'],
                    [-1230.4,'0,0.0-','1,230.4-'],
                    [1230.4,'0,0.0-','1,230.4'],
                    [100.78, '0', '101'],
                    [100.28, '0', '100'],
                    [1.932,'0.0','1.9'],
                    [1.9687,'0','2'],
                    [1.9687,'0.0','2.0'],
                    [-0.23,'.00','-.23'],
                    [-0.23,'(.00)','(.23)'],
                    [0.23,'0.00000','0.23000'],
                    [0.67,'0.0[0000]','0.67'],
                    [3162.63,'0.0[00000000000000]','3162.63'],
                    [1.99,'0.[0]','2'],
                    [1.0501,'0.00[0]','1.05'],
                    [1.005,'0.00','1.01'],
                    // leading zero
                    [0, '00.0', '00.0'],
                    [0.23, '000.[00]', '000.23'],
                    [4, '000', '004'],
                    [10, '00000', '00010'],
                    [1000, '000,0', '1,000'],
                    [1000, '00000,0', '01,000'],
                    [1000, '0000000,0', '0,001,000'],
                    // abbreviations
                    [2000000000,'0.0a','2.0b'],
                    [1230974,'0.0a','1.2m'],
                    [1460,'0a','1k'],
                    [-104000,'0 a','-104 k'],
                    [999950,'0.0a','1.0m'],
                    [999999999,'0a','1b'],
                    // forced abbreviations
                    [-5444333222111, '0,0 ak', '-5,444,333,222 k'],
                    [5444333222111, '0,0 am', '5,444,333 m'],
                    [-5444333222111, '0,0 ab', '-5,444 b'],
                    [-5444333222111, '0,0 at', '-5 t'],
                    [123456, '0.0[0] ak', '123.46 k'],
                    [150,'0.0 ak','0.2 k']
                ],
                i,
                n,
                output;

            for (i = 0; i < tests.length; i++) {
                n = numeral(tests[i][0]);
                output = n.format(tests[i][1]);

                expect(output).to.equal(tests[i][2]);

                expect(typeof output).to.equal('string');
            }
        });
    });

    describe('Unformat', function() {
        before(function() {
            numeral.zeroFormat('N/A');
            numeral.nullFormat('N/A');
        });

        after(function() {
            numeral.reset();
        });

        it('should unformat a number', function() {
            var tests = [
                ['10,000.123', 10000.123],
                ['(0.12345)', -0.12345],
                ['((--0.12345))', 0.12345],
                ['1.23t', 1230000000000],
                ['N/A', 0],
                ['', null],
                // Pass Through for Numbers
                [0, 0],
                [1, 1],
                [1.1, 1.1],
                [-0, 0],
                [-1, -1],
                [-1.1, -1.1]
            ];

            for (var i = 0; i < tests.length; i++) {
                expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
            }
        });
    });

    describe('Validate', function() {
        var locale = 'en';

        describe('Numbers', function() {
            it('should validate numbers', function() {
                var tests = [
                    ['1000', true],
                    ['1,000', true],
                    ['10,0,0', true],
                    ['10.123', true],
                    ['1,000.123', true],
                    ['1000,123.123', true],
                    ['1000 ', true],
                    [' 1000 ', true],
                    [' 1000', true],
                    [' 1000,100.123', true],
                    ['1.0,00', false],
                    ['1.0.00', false],
                    ['1 000', false],
                    ['1.000,123', false],
                    ['1000.', false],
                    ['1000,', false],
                    ['10..00', false],
                    ['10,,00', false],
                    ['10, 00', false]
                ];

                for (var i = 0; i < tests.length; i++) {
                    expect(numeral.validate(tests[i][0], locale)).to.equal(tests[i][1]);
                }
            });
        });

        describe('Currency', function() {
            it('should validate currency', function() {
                var tests = [
                    ['$1000', true],
                    ['$1,000', true],
                    ['$10,0,0', true],
                    ['$10.123', true],
                    ['$1,000.123', true],
                    ['$1000 ', true],
                    [' $1000 ', true],
                    [' $1000', true],
                    [' $1000,100.123', true],
                    ['$100.123k', true],
                    ['$100.123m', true],
                    ['$100.123b', true],
                    ['$100.123t', true],
                    ['100,456.123k', true],
                    [' 100,456.123t ', true],
                    ['$1,00.123k', true],
                    ['%100', false],
                    [' %1.0.00', false],
                    [' ^1 000 ', false],
                    ['^1.000 ', false],
                    ['$ 1000.', false],
                    ['%1000', false],
                    ['100,456.123z', false],
                    ['$100$', false],
                    ['$100,213.456l', false],
                    ['aa100,213.456l', false],
                    ['$100,213.456kk', false]
                ];

                for (var i = 0; i < tests.length; i++) {
                    expect(numeral.validate(tests[i][0], locale)).to.equal(tests[i][1]);
                }
            });
        });
    });

    describe('Manipulate', function() {

        describe('Add', function() {
            it('should add', function() {
                var tests = [
                        [1000,10,1010],
                        [0.5,3,3.5],
                        [-100,200,100],
                        [0.1,0.2,0.3],
                        [0.28,0.01,0.29],
                        [0.289999,0.000001,0.29],
                        [0.29,0.01,0.3]
                    ],
                    num;

                for (var i = 0; i < tests.length; i++) {
                    num = numeral(tests[i][0]);

                    num.add(tests[i][1]);

                    expect(num.value()).to.equal(tests[i][2]);
                }
            });
        });

        describe('Subtract', function() {
            it('should subtract', function() {
                var tests = [
                        [1000,10,990],
                        [0.5,3,-2.5],
                        [-100,200,-300],
                        [0.3,0.1,0.2],
                        [0.28,0.01,0.27],
                        [0.29,0.01,0.28]
                    ],
                    num;

                for (var i = 0; i < tests.length; i++) {
                    num = numeral(tests[i][0]);

                    num.subtract(tests[i][1]);

                    expect(num.value()).to.equal(tests[i][2]);
                }
            });
        });


        describe('Add', function() {
            it('should add', function() {
            });
        });


        describe('Multiply', function() {
            it('should multiply', function() {
                var tests = [
                        [1000,10,10000],
                        [0.5,3,1.5],
                        [-100,200,-20000],
                        [0.1,0.2,0.02],
                        [0.28,0.01,0.0028],
                        [0.29,0.01,0.0029],
                        [0.00000231,10000000,23.1]
                    ],
                    num;

                for (var i = 0; i < tests.length; i++) {
                    num = numeral(tests[i][0]);

                    num.multiply(tests[i][1]);

                    expect(num.value()).to.equal(tests[i][2]);
                }
            });
        });

        describe('Divide', function() {
            it('should divide', function() {
                var tests = [
                        [1000,10,100],
                        [0.5,3,0.16666666666666666],
                        [-100,200,-0.5],
                        [5.3,0.1,53],
                        [0.28,0.01,28],
                        [0.29,0.01,29]
                    ],
                    num;

                for (var i = 0; i < tests.length; i++) {
                    num = numeral(tests[i][0]);

                    num.divide(tests[i][1]);

                    expect(num.value()).to.equal(tests[i][2]);
                }
            });
        });

        describe('Difference', function() {
            it('should find a difference', function() {
                var tests = [
                    [1000,10,990],
                    [0.5,3,2.5],
                    [-100,200,300],
                    [0.3,0.2,0.1],
                    [0.28,0.01,0.27],
                    [0.29,0.01,0.28]
                ],
                num;

                for (var i = 0; i < tests.length; i++) {
                    num = numeral(tests[i][0]);

                    expect(num.difference(tests[i][1])).to.equal(tests[i][2]);
                }
            });
        });

        describe('Rounding', function() {
            it('should format with rounding', function() {
                var tests = [
                        // value, format string, expected w/ floor, expected w/ ceil
                        [2280002, '0.00a', '2.28m', '2.29m'],
                        [10000.23,'0,0','10,000', '10,001'],
                        [1000.234,'0,0.00','1,000.23', '1,000.24'],
                        [0.97487823,'0.000','0.974','0.975'],
                        [-0.433,'0.0','-0.5', '-0.4']
                    ],
                    i;

                for (i = 0; i < tests.length; i++) {
                    // floor
                    expect(numeral(tests[i][0]).format(tests[i][1], Math.floor)).to.equal(tests[i][2]);

                    // ceil
                    expect(numeral(tests[i][0]).format(tests[i][1], Math.ceil)).to.equal(tests[i][3]);
                }
            });
        });
    });

    describe('Utilities', function() {
        describe('Insert', function() {
            it('should insert into string', function() {
                var tests = [
                        ['1000', '+', 0, '+1000'],
                        ['1000', '-', 4, '1000-']
                    ],
                    i;

                for (i = 0; i < tests.length; i++) {
                    expect(numeral._.insert(tests[i][0], tests[i][1], tests[i][2])).to.equal(tests[i][3]);
                }
            });
        });
    });
});
