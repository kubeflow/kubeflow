/**
 * @fileoverview Mixin with utility functions applicable across components.
 */

const VALID_QUERY_PARAMS = ['ns'];
/**
 * Mixin class is the default export
 * @param {class} superClass - Class being extended
 * @return {Function}
 */
export default (superClass) => class extends superClass {
    /**
     * Provide a logical OR functionality for the Polymer DOM
     * @param {...boolean} e
     * @return {boolean}
     */
    or(...e) {
        return e.some((i) => Boolean(i));
    }

    /**
     * Provide a logical equals functionality for the Polymer DOM
     * @param {...any} e
     * @return {boolean}
     */
    equals(...e) {
        const crit = e.shift();
        if (!e.length) return true;
        return e.every((e) => e === crit);
    }

    /**
     * Return if the object passed is empty or undefined
     * @param {any} o
     * @return {boolean}
     */
    empty(o) {
        if (o instanceof Array || typeof o === 'string') return !o.length;
        if (o instanceof Set) return !o.size;
        if (o instanceof Event || o instanceof Error) return !!0;
        if (typeof o === 'object') return !Object.keys(o).length;
        return !o;
    }

    /**
     * Allows an async block to sleep for a specified amount of time.
     * @param {number} time
     * @return {Promise}
     */
    sleep(time) {
        return new Promise((res) => setTimeout(res, time));
    }

    /**
     * Builds and returns an href value preserving the current query string.
     * @param {string} href
     * @param {Object} queryParams
     * @return {string}
     */
    buildHref(href, queryParams) {
        const url = new URL(href, window.location.origin);
        if (queryParams) {
            VALID_QUERY_PARAMS.forEach((qp) => {
                if (queryParams[qp]) {
                    url.searchParams.set(qp, queryParams[qp]);
                }
            });
        }
        return url.href.slice(url.origin.length);
    }

    /**
     * Fire a custom event from an element
     * @param {string|event} name Event Name
     * @param {object|undefined} detail Event Details
     */
    fireEvent(name, detail) {
        const ev = name instanceof Event
            ? name
            : new CustomEvent(name, {detail});
        this.dispatchEvent(ev);
    }

    /**
     * Allows the parent toast to be closed from that level or
     * elements 2-levels deep
     * @param {event} ev Event
     */
    closeToast(ev) {
        const t = ev.target;
        const el = [t, t.parentNode, t.parentNode.parentNode]
            .find((e) => e.tagName == 'PAPER-TOAST');
        el && el.close();
    }
};
