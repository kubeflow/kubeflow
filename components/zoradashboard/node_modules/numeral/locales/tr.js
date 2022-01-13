// numeral.js locale configuration
// locale : turkish (tr)
// author : Ecmel Ercan : https://github.com/ecmel, Erhan Gundogan : https://github.com/erhangundogan, Burak Yiğit Kaya: https://github.com/BYK

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    var suffixes = {
            1: '\'inci',
            5: '\'inci',
            8: '\'inci',
            70: '\'inci',
            80: '\'inci',

            2: '\'nci',
            7: '\'nci',
            20: '\'nci',
            50: '\'nci',

            3: '\'üncü',
            4: '\'üncü',
            100: '\'üncü',

            6: '\'ncı',

            9: '\'uncu',
            10: '\'uncu',
            30: '\'uncu',

            60: '\'ıncı',
            90: '\'ıncı'
        };

    numeral.register('locale', 'tr', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'bin',
            million: 'milyon',
            billion: 'milyar',
            trillion: 'trilyon'
        },
        ordinal: function (number) {
            if (number === 0) {  // special case for zero
                return '\'ıncı';
            }

            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;

          return suffixes[a] || suffixes[b] || suffixes[c];
        },
        currency: {
            symbol: '\u20BA'
        }
    });
}));
