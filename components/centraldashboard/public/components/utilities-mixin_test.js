import utilitiesMixin from './utilities-mixin';

class TestClass extends utilitiesMixin(Object) {

}

describe('Utilities Mixin', () => {
    let testObject;

    beforeEach(() => {
        testObject = new TestClass();
    });

    it('Correct evaluates a logical or expression', () => {
        expect(testObject.or()).toBe(false);
        expect(testObject.or(false, false, false, true)).toBe(true);
        expect(testObject.or(false, false, false)).toBe(false);
        expect(testObject.or(1, 0)).toBe(true);
        expect(testObject.or('', 0)).toBe(false);
    });

    it('Correct evaluates a logical equals expression', () => {
        expect(testObject.equals()).toBe(true);
        expect(testObject.equals(1, '1')).toBe(false);
        expect(testObject.equals(1, 1, 1)).toBe(true);
        expect(testObject.equals('abc', 'abc', 'abc')).toBe(true);
        expect(testObject.equals('abc', 'abc', 'ABC')).toBe(false);
    });

    it('Builds links with valid query parameters', () => {
        expect(testObject.buildHref('/foo', null)).toBe('/foo');
        expect(testObject.buildHref('/foo?other_param=value', {}))
            .toBe('/foo?other_param=value');
        expect(testObject.buildHref('/foo?other_param=value', {ns: 'bar'}))
            .toBe('/foo?other_param=value&ns=bar');
    });
});
