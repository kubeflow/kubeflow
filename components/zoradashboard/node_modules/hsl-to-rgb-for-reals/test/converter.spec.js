const sample = require('./sample');
const hslToRgb = require('../converter');
const expect = require('chai').expect;

describe('hslToRgb', function () {
    sample.forEach(v => {
        it(`converts hsl(${v.hsl.h}, ${v.hsl.s}%, ${v.hsl.l}%) to rgb(${v.rgb.r}, ${v.rgb.g}, ${v.rgb.b})`, () => {
            const converted = hslToRgb(Number(v.hsl.h), Number(v.hsl.s)/100, Number(v.hsl.l)/100);
            expect(converted).to.eql([Number(v.rgb.r), Number(v.rgb.g), Number(v.rgb.b)]);
        })
    });
});
