// numeral.js locale configuration
// locale : slovenian (sl)
// author : Boštjan Pišler : https://github.com/BostjanPisler

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('../numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function (numeral) {
    numeral.register('locale', 'sl', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mio',
            billion: 'mrd',
            trillion: 'trilijon'
        },
        ordinal: function () {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    });
}));
