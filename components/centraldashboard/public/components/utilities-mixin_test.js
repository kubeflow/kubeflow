import utilitiesMixin from './utilities-mixin';
import {html} from '@polymer/polymer/polymer-element.js';


class TestClass extends utilitiesMixin(Object) {
}


describe('Utilities Mixin', () => {
    let testObject;

    beforeEach(() => {
        testObject = new TestClass();
    });

    it('Correct evaluates a logical or expression', () => {
        const {or} = testObject;
        expect(or()).toBe(false);
        expect(or(false, false, false, true)).toBe(true);
        expect(or(false, false, false)).toBe(false);
        expect(or(1, 0)).toBe(true);
        expect(or('', 0)).toBe(false);
    });

    it('Correct evaluates a logical equals expression', () => {
        const {equals} = testObject;
        expect(equals()).toBe(true);
        expect(equals(1, '1')).toBe(false);
        expect(equals(1, 1, 1)).toBe(true);
        expect(equals('abc', 'abc', 'abc')).toBe(true);
        expect(equals('abc', 'abc', 'ABC')).toBe(false);
    });

    it('Checks empty-ness on objects correctly', () => {
        const {empty} = testObject;
        expect(empty()).toBe(true);
        expect(empty(0)).toBe(true);
        expect(empty({})).toBe(true);
        expect(empty([])).toBe(true);
        expect(empty(new Set([]))).toBe(true);

        expect(empty(1)).toBe(false);
        expect(empty({a: 1})).toBe(false);
        expect(empty([1])).toBe(false);
        expect(empty(new Set([1]))).toBe(false);
        expect(empty(new Error())).toBe(false);
        expect(empty(new CustomEvent('test'))).toBe(false);
    });

    it('Builds links with valid query parameters', () => {
        const {buildHref} = testObject;
        expect(buildHref('/foo', null)).toBe('/foo');
        expect(buildHref('/foo?other_param=value', {}))
            .toBe('/foo?other_param=value');
        expect(buildHref('/foo?other_param=value', {ns: 'bar'}))
            .toBe('/foo?other_param=value&ns=bar');
    });

    it('FireEvent correctly fires Event-Obj or custom events', () => {
        const fireEvent = testObject.fireEvent.bind(testObject);
        let lastEvent;
        const _getLastEvent = () => {
            lastEvent = testObject.dispatchEvent.calls
                .mostRecent()
                .args[0];
        };
        testObject.dispatchEvent = jasmine.createSpy();

        fireEvent('foo');
        _getLastEvent();
        expect(lastEvent.type).toBe('foo');
        expect(lastEvent.detail).toEqual(null);

        fireEvent('bar', {ap: 1});
        _getLastEvent();
        expect(lastEvent.type).toBe('bar');
        expect(lastEvent.detail).toEqual({ap: 1});

        const ev = new Event('click');
        fireEvent(ev);
        _getLastEvent();
        expect(lastEvent).toBe(ev);
    });

    it('Close Toast can correctly scan ancestry to the toast element', () => {
        const {closeToast} = testObject;
        const dom = html`
            <paper-toast>
                <span id='s1'>
                    <span id='s2'>
                        <span id='s3'></span>
                    </span>
                </span>
            </paper-toast>
        `;
        const toast = dom.content.children[0];
        const [s1, s2, s3] = [1, 2, 3]
            .map((i) => toast.querySelector(`#s${i}`));
        [toast, s1, s2, s3].forEach((el) => {
            el.onclick = closeToast;
        });
        toast.close = () => {
            toast.closed = true;
        };
        toast.hasClosed = () => {
            const s = toast.closed;
            toast.closed = false;
            return s;
        };

        toast.click();
        expect(toast.hasClosed()).toBe(
            true,
            'Depth 0 should have worked (the element itself)',
        );
        s1.click();
        expect(toast.hasClosed()).toBe(
            true,
            'Depth 1 should have worked',
        );
        s2.click();
        expect(toast.hasClosed()).toBe(
            true,
            'Depth 2 should have worked',
        );
        s3.click();
        expect(toast.hasClosed()).toBe(
            false,
            'Depth 3 should NOT have worked (depth is now > 2)',
        );
    });
});
