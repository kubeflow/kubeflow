/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var k, goog = goog || {}, l = commonjsGlobal || self;
function aa() { }
function ba(a) { var b = typeof a; b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"; return "array" == b || "object" == b && "number" == typeof a.length; }
function p(a) { var b = typeof a; return "object" == b && null != a || "function" == b; }
function da(a) { return Object.prototype.hasOwnProperty.call(a, ea) && a[ea] || (a[ea] = ++fa); }
var ea = "closure_uid_" + (1E9 * Math.random() >>> 0), fa = 0;
function ha(a, b, c) { return a.call.apply(a.bind, arguments); }
function ia(a, b, c) { if (!a)
    throw Error(); if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function () { var e = Array.prototype.slice.call(arguments); Array.prototype.unshift.apply(e, d); return a.apply(b, e); };
} return function () { return a.apply(b, arguments); }; }
function q(a, b, c) { Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? q = ha : q = ia; return q.apply(null, arguments); }
function ja(a, b) { var c = Array.prototype.slice.call(arguments, 1); return function () { var d = c.slice(); d.push.apply(d, arguments); return a.apply(this, d); }; }
function t(a, b) { function c() { } c.prototype = b.prototype; a.Z = b.prototype; a.prototype = new c; a.prototype.constructor = a; a.Vb = function (d, e, f) { for (var h = Array(arguments.length - 2), n = 2; n < arguments.length; n++)
    h[n - 2] = arguments[n]; return b.prototype[e].apply(d, h); }; }
function v() { this.s = this.s; this.o = this.o; }
var ka = 0, la = {};
v.prototype.s = !1;
v.prototype.na = function () { if (!this.s && (this.s = !0, this.M(), 0 != ka)) {
    var a = da(this);
    delete la[a];
} };
v.prototype.M = function () { if (this.o)
    for (; this.o.length;)
        this.o.shift()(); };
var ma = Array.prototype.indexOf ? function (a, b) { return Array.prototype.indexOf.call(a, b, void 0); } : function (a, b) { if ("string" === typeof a)
    return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0); for (var c = 0; c < a.length; c++)
    if (c in a && a[c] === b)
        return c; return -1; }, na = Array.prototype.forEach ? function (a, b, c) { Array.prototype.forEach.call(a, b, c); } : function (a, b, c) { var d = a.length, e = "string" === typeof a ? a.split("") : a; for (var f = 0; f < d; f++)
    f in e && b.call(c, e[f], f, a); };
function oa(a) { a: {
    var b = pa;
    var c = a.length, d = "string" === typeof a ? a.split("") : a;
    for (var e = 0; e < c; e++)
        if (e in d && b.call(void 0, d[e], e, a)) {
            b = e;
            break a;
        }
    b = -1;
} return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]; }
function qa(a) { return Array.prototype.concat.apply([], arguments); }
function ra(a) { var b = a.length; if (0 < b) {
    var c = Array(b);
    for (var d = 0; d < b; d++)
        c[d] = a[d];
    return c;
} return []; }
function sa(a) { return /^[\s\xa0]*$/.test(a); }
var ta = String.prototype.trim ? function (a) { return a.trim(); } : function (a) { return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]; };
function w(a, b) { return -1 != a.indexOf(b); }
function ua(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
var x;
a: {
    var va = l.navigator;
    if (va) {
        var wa = va.userAgent;
        if (wa) {
            x = wa;
            break a;
        }
    }
    x = "";
}
function xa(a, b, c) { for (var d in a)
    b.call(c, a[d], d, a); }
function ya(a) { var b = {}; for (var c in a)
    b[c] = a[c]; return b; }
var za = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Aa(a, b) { var c, d; for (var e = 1; e < arguments.length; e++) {
    d = arguments[e];
    for (c in d)
        a[c] = d[c];
    for (var f = 0; f < za.length; f++)
        c = za[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
} }
function Ca(a) { Ca[" "](a); return a; }
Ca[" "] = aa;
function Fa(a) { var b = Ga; return Object.prototype.hasOwnProperty.call(b, 9) ? b[9] : b[9] = a(9); }
var Ha = w(x, "Opera"), y = w(x, "Trident") || w(x, "MSIE"), Ia = w(x, "Edge"), Ja = Ia || y, Ka = w(x, "Gecko") && !(w(x.toLowerCase(), "webkit") && !w(x, "Edge")) && !(w(x, "Trident") || w(x, "MSIE")) && !w(x, "Edge"), La = w(x.toLowerCase(), "webkit") && !w(x, "Edge");
function Ma() { var a = l.document; return a ? a.documentMode : void 0; }
var Na;
a: {
    var Oa = "", Pa = function () { var a = x; if (Ka)
        return /rv:([^\);]+)(\)|;)/.exec(a); if (Ia)
        return /Edge\/([\d\.]+)/.exec(a); if (y)
        return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a); if (La)
        return /WebKit\/(\S+)/.exec(a); if (Ha)
        return /(?:Version)[ \/]?(\S+)/.exec(a); }();
    Pa && (Oa = Pa ? Pa[1] : "");
    if (y) {
        var Qa = Ma();
        if (null != Qa && Qa > parseFloat(Oa)) {
            Na = String(Qa);
            break a;
        }
    }
    Na = Oa;
}
var Ga = {};
function Ra() { return Fa(function () { var a = 0; var b = ta(String(Na)).split("."), c = ta("9").split("."), d = Math.max(b.length, c.length); for (var h = 0; 0 == a && h < d; h++) {
    var e = b[h] || "", f = c[h] || "";
    do {
        e = /(\d*)(\D*)(.*)/.exec(e) || ["", "", "", ""];
        f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
        if (0 == e[0].length && 0 == f[0].length)
            break;
        a = ua(0 == e[1].length ? 0 : parseInt(e[1], 10), 0 == f[1].length ? 0 : parseInt(f[1], 10)) || ua(0 == e[2].length, 0 == f[2].length) || ua(e[2], f[2]);
        e = e[3];
        f = f[3];
    } while (0 == a);
} return 0 <= a; }); }
var Sa;
if (l.document && y) {
    var Ta = Ma();
    Sa = Ta ? Ta : parseInt(Na, 10) || void 0;
}
else
    Sa = void 0;
var Ua = Sa;
var Va = function () { if (!l.addEventListener || !Object.defineProperty)
    return !1; var a = !1, b = Object.defineProperty({}, "passive", { get: function () { a = !0; } }); try {
    l.addEventListener("test", aa, b), l.removeEventListener("test", aa, b);
}
catch (c) { } return a; }();
function z(a, b) { this.type = a; this.g = this.target = b; this.defaultPrevented = !1; }
z.prototype.h = function () { this.defaultPrevented = !0; };
function A(a, b) {
    z.call(this, a ? a.type : "");
    this.relatedTarget = this.g = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.i = null;
    if (a) {
        var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.g = b;
        if (b = a.relatedTarget) {
            if (Ka) {
                a: {
                    try {
                        Ca(b.nodeName);
                        var e = !0;
                        break a;
                    }
                    catch (f) { }
                    e =
                        !1;
                }
                e || (b = null);
            }
        }
        else
            "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
        this.button = a.button;
        this.key = a.key || "";
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey =
            a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Wa[a.pointerType] || "";
        this.state = a.state;
        this.i = a;
        a.defaultPrevented && A.Z.h.call(this);
    }
}
t(A, z);
var Wa = { 2: "touch", 3: "pen", 4: "mouse" };
A.prototype.h = function () { A.Z.h.call(this); var a = this.i; a.preventDefault ? a.preventDefault() : a.returnValue = !1; };
var B = "closure_listenable_" + (1E6 * Math.random() | 0);
var Xa = 0;
function Ya(a, b, c, d, e) { this.listener = a; this.proxy = null; this.src = b; this.type = c; this.capture = !!d; this.ia = e; this.key = ++Xa; this.ca = this.fa = !1; }
function Za(a) { a.ca = !0; a.listener = null; a.proxy = null; a.src = null; a.ia = null; }
function $a(a) { this.src = a; this.g = {}; this.h = 0; }
$a.prototype.add = function (a, b, c, d, e) { var f = a.toString(); a = this.g[f]; a || (a = this.g[f] = [], this.h++); var h = ab(a, b, d, e); -1 < h ? (b = a[h], c || (b.fa = !1)) : (b = new Ya(b, this.src, f, !!d, e), b.fa = c, a.push(b)); return b; };
function bb(a, b) { var c = b.type; if (c in a.g) {
    var d = a.g[c], e = ma(d, b), f;
    (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
    f && (Za(b), 0 == a.g[c].length && (delete a.g[c], a.h--));
} }
function ab(a, b, c, d) { for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (!f.ca && f.listener == b && f.capture == !!c && f.ia == d)
        return e;
} return -1; }
var cb = "closure_lm_" + (1E6 * Math.random() | 0), db = {};
function fb(a, b, c, d, e) { if (d && d.once)
    return gb(a, b, c, d, e); if (Array.isArray(b)) {
    for (var f = 0; f < b.length; f++)
        fb(a, b[f], c, d, e);
    return null;
} c = hb(c); return a && a[B] ? a.N(b, c, p(d) ? !!d.capture : !!d, e) : ib(a, b, c, !1, d, e); }
function ib(a, b, c, d, e, f) { if (!b)
    throw Error("Invalid event type"); var h = p(e) ? !!e.capture : !!e, n = jb(a); n || (a[cb] = n = new $a(a)); c = n.add(b, c, d, h, f); if (c.proxy)
    return c; d = kb(); c.proxy = d; d.src = a; d.listener = c; if (a.addEventListener)
    Va || (e = h), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
else if (a.attachEvent)
    a.attachEvent(lb(b.toString()), d);
else if (a.addListener && a.removeListener)
    a.addListener(d);
else
    throw Error("addEventListener and attachEvent are unavailable."); return c; }
function kb() { function a(c) { return b.call(a.src, a.listener, c); } var b = mb; return a; }
function gb(a, b, c, d, e) { if (Array.isArray(b)) {
    for (var f = 0; f < b.length; f++)
        gb(a, b[f], c, d, e);
    return null;
} c = hb(c); return a && a[B] ? a.O(b, c, p(d) ? !!d.capture : !!d, e) : ib(a, b, c, !0, d, e); }
function nb(a, b, c, d, e) { if (Array.isArray(b))
    for (var f = 0; f < b.length; f++)
        nb(a, b[f], c, d, e);
else
    (d = p(d) ? !!d.capture : !!d, c = hb(c), a && a[B]) ? (a = a.i, b = String(b).toString(), b in a.g && (f = a.g[b], c = ab(f, c, d, e), -1 < c && (Za(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b], a.h--)))) : a && (a = jb(a)) && (b = a.g[b.toString()], a = -1, b && (a = ab(b, c, d, e)), (c = -1 < a ? b[a] : null) && ob(c)); }
function ob(a) { if ("number" !== typeof a && a && !a.ca) {
    var b = a.src;
    if (b && b[B])
        bb(b.i, a);
    else {
        var c = a.type, d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(lb(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        (c = jb(b)) ? (bb(c, a), 0 == c.h && (c.src = null, b[cb] = null)) : Za(a);
    }
} }
function lb(a) { return a in db ? db[a] : db[a] = "on" + a; }
function mb(a, b) { if (a.ca)
    a = !0;
else {
    b = new A(b, this);
    var c = a.listener, d = a.ia || a.src;
    a.fa && ob(a);
    a = c.call(d, b);
} return a; }
function jb(a) { a = a[cb]; return a instanceof $a ? a : null; }
var pb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
function hb(a) { if ("function" === typeof a)
    return a; a[pb] || (a[pb] = function (b) { return a.handleEvent(b); }); return a[pb]; }
function C() { v.call(this); this.i = new $a(this); this.P = this; this.I = null; }
t(C, v);
C.prototype[B] = !0;
C.prototype.removeEventListener = function (a, b, c, d) { nb(this, a, b, c, d); };
function D(a, b) { var c, d = a.I; if (d)
    for (c = []; d; d = d.I)
        c.push(d); a = a.P; d = b.type || b; if ("string" === typeof b)
    b = new z(b, a);
else if (b instanceof z)
    b.target = b.target || a;
else {
    var e = b;
    b = new z(d, a);
    Aa(b, e);
} e = !0; if (c)
    for (var f = c.length - 1; 0 <= f; f--) {
        var h = b.g = c[f];
        e = qb(h, d, !0, b) && e;
    } h = b.g = a; e = qb(h, d, !0, b) && e; e = qb(h, d, !1, b) && e; if (c)
    for (f = 0; f < c.length; f++)
        h = b.g = c[f], e = qb(h, d, !1, b) && e; }
C.prototype.M = function () { C.Z.M.call(this); if (this.i) {
    var a = this.i, c;
    for (c in a.g) {
        for (var d = a.g[c], e = 0; e < d.length; e++)
            Za(d[e]);
        delete a.g[c];
        a.h--;
    }
} this.I = null; };
C.prototype.N = function (a, b, c, d) { return this.i.add(String(a), b, !1, c, d); };
C.prototype.O = function (a, b, c, d) { return this.i.add(String(a), b, !0, c, d); };
function qb(a, b, c, d) { b = a.i.g[String(b)]; if (!b)
    return !0; b = b.concat(); for (var e = !0, f = 0; f < b.length; ++f) {
    var h = b[f];
    if (h && !h.ca && h.capture == c) {
        var n = h.listener, u = h.ia || h.src;
        h.fa && bb(a.i, h);
        e = !1 !== n.call(u, d) && e;
    }
} return e && !d.defaultPrevented; }
var rb = l.JSON.stringify;
function sb() { var a = tb; var b = null; a.g && (b = a.g, a.g = a.g.next, a.g || (a.h = null), b.next = null); return b; }
var ub = /** @class */ (function () {
    function ub() {
        this.h = this.g = null;
    }
    ub.prototype.add = function (a, b) { var c = vb.get(); c.set(a, b); this.h ? this.h.next = c : this.g = c; this.h = c; };
    return ub;
}());
var vb = new /** @class */ (function () {
    function class_2(a, b) {
        this.i = a;
        this.j = b;
        this.h = 0;
        this.g = null;
    }
    class_2.prototype.get = function () { var a; 0 < this.h ? (this.h--, a = this.g, this.g = a.next, a.next = null) : a = this.i(); return a; };
    return class_2;
}())(function () { return new wb; }, function (a) { return a.reset(); });
var wb = /** @class */ (function () {
    function wb() {
        this.next = this.g = this.h = null;
    }
    wb.prototype.set = function (a, b) { this.h = a; this.g = b; this.next = null; };
    wb.prototype.reset = function () { this.next = this.g = this.h = null; };
    return wb;
}());
function yb(a) { l.setTimeout(function () { throw a; }, 0); }
function zb(a, b) { Ab || Bb(); Cb || (Ab(), Cb = !0); tb.add(a, b); }
var Ab;
function Bb() { var a = l.Promise.resolve(void 0); Ab = function () { a.then(Db); }; }
var Cb = !1, tb = new ub;
function Db() { for (var a; a = sb();) {
    try {
        a.h.call(a.g);
    }
    catch (c) {
        yb(c);
    }
    var b = vb;
    b.j(a);
    100 > b.h && (b.h++, a.next = b.g, b.g = a);
} Cb = !1; }
function Eb(a, b) { C.call(this); this.h = a || 1; this.g = b || l; this.j = q(this.kb, this); this.l = Date.now(); }
t(Eb, C);
k = Eb.prototype;
k.da = !1;
k.S = null;
k.kb = function () { if (this.da) {
    var a = Date.now() - this.l;
    0 < a && a < .8 * this.h ? this.S = this.g.setTimeout(this.j, this.h - a) : (this.S && (this.g.clearTimeout(this.S), this.S = null), D(this, "tick"), this.da && (Fb(this), this.start()));
} };
k.start = function () { this.da = !0; this.S || (this.S = this.g.setTimeout(this.j, this.h), this.l = Date.now()); };
function Fb(a) { a.da = !1; a.S && (a.g.clearTimeout(a.S), a.S = null); }
k.M = function () { Eb.Z.M.call(this); Fb(this); delete this.g; };
function Gb(a, b, c) { if ("function" === typeof a)
    c && (a = q(a, c));
else if (a && "function" == typeof a.handleEvent)
    a = q(a.handleEvent, a);
else
    throw Error("Invalid listener argument"); return 2147483647 < Number(b) ? -1 : l.setTimeout(a, b || 0); }
function Hb(a) { a.g = Gb(function () { a.g = null; a.i && (a.i = !1, Hb(a)); }, a.j); var b = a.h; a.h = null; a.m.apply(null, b); }
var Ib = /** @class */ (function (_super) {
    __extends(Ib, _super);
    function Ib(a, b) {
        var _this = _super.call(this) || this;
        _this.m = a;
        _this.j = b;
        _this.h = null;
        _this.i = !1;
        _this.g = null;
        return _this;
    }
    Ib.prototype.l = function (a) { this.h = arguments; this.g ? this.i = !0 : Hb(this); };
    Ib.prototype.M = function () { _super.prototype.M.call(this); this.g && (l.clearTimeout(this.g), this.g = null, this.i = !1, this.h = null); };
    return Ib;
}(v));
function E(a) { v.call(this); this.h = a; this.g = {}; }
t(E, v);
var Jb = [];
function Kb(a, b, c, d) { Array.isArray(c) || (c && (Jb[0] = c.toString()), c = Jb); for (var e = 0; e < c.length; e++) {
    var f = fb(b, c[e], d || a.handleEvent, !1, a.h || a);
    if (!f)
        break;
    a.g[f.key] = f;
} }
function Lb(a) { xa(a.g, function (b, c) { this.g.hasOwnProperty(c) && ob(b); }, a); a.g = {}; }
E.prototype.M = function () { E.Z.M.call(this); Lb(this); };
E.prototype.handleEvent = function () { throw Error("EventHandler.handleEvent not implemented"); };
function Mb() { this.g = !0; }
Mb.prototype.Aa = function () { this.g = !1; };
function Nb(a, b, c, d, e, f) { a.info(function () { if (a.g)
    if (f) {
        var h = "";
        for (var n = f.split("&"), u = 0; u < n.length; u++) {
            var m = n[u].split("=");
            if (1 < m.length) {
                var r = m[0];
                m = m[1];
                var G = r.split("_");
                h = 2 <= G.length && "type" == G[1] ? h + (r + "=" + m + "&") : h + (r + "=redacted&");
            }
        }
    }
    else
        h = null;
else
    h = f; return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b + "\n" + c + "\n" + h; }); }
function Ob(a, b, c, d, e, f, h) { a.info(function () { return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b + "\n" + c + "\n" + f + " " + h; }); }
function F(a, b, c, d) { a.info(function () { return "XMLHTTP TEXT (" + b + "): " + Pb(a, c) + (d ? " " + d : ""); }); }
function Qb(a, b) { a.info(function () { return "TIMEOUT: " + b; }); }
Mb.prototype.info = function () { };
function Pb(a, b) { if (!a.g)
    return b; if (!b)
    return null; try {
    var c = JSON.parse(b);
    if (c)
        for (a = 0; a < c.length; a++)
            if (Array.isArray(c[a])) {
                var d = c[a];
                if (!(2 > d.length)) {
                    var e = d[1];
                    if (Array.isArray(e) && !(1 > e.length)) {
                        var f = e[0];
                        if ("noop" != f && "stop" != f && "close" != f)
                            for (var h = 1; h < e.length; h++)
                                e[h] = "";
                    }
                }
            }
    return rb(c);
}
catch (n) {
    return b;
} }
var H = {}, Rb = null;
function Sb() { return Rb = Rb || new C; }
H.Ma = "serverreachability";
function Tb(a) { z.call(this, H.Ma, a); }
t(Tb, z);
function I(a) { var b = Sb(); D(b, new Tb(b, a)); }
H.STAT_EVENT = "statevent";
function Ub(a, b) { z.call(this, H.STAT_EVENT, a); this.stat = b; }
t(Ub, z);
function J(a) { var b = Sb(); D(b, new Ub(b, a)); }
H.Na = "timingevent";
function Vb(a, b) { z.call(this, H.Na, a); this.size = b; }
t(Vb, z);
function K(a, b) { if ("function" !== typeof a)
    throw Error("Fn must not be null and must be a function"); return l.setTimeout(function () { a(); }, b); }
var Wb = { NO_ERROR: 0, lb: 1, yb: 2, xb: 3, sb: 4, wb: 5, zb: 6, Ja: 7, TIMEOUT: 8, Cb: 9 };
var Xb = { qb: "complete", Mb: "success", Ka: "error", Ja: "abort", Eb: "ready", Fb: "readystatechange", TIMEOUT: "timeout", Ab: "incrementaldata", Db: "progress", tb: "downloadprogress", Ub: "uploadprogress" };
function Yb() { }
Yb.prototype.h = null;
function Zb(a) { return a.h || (a.h = a.i()); }
function $b() { }
var L = { OPEN: "a", pb: "b", Ka: "c", Bb: "d" };
function ac() { z.call(this, "d"); }
t(ac, z);
function bc() { z.call(this, "c"); }
t(bc, z);
var cc;
function dc() { }
t(dc, Yb);
dc.prototype.g = function () { return new XMLHttpRequest; };
dc.prototype.i = function () { return {}; };
cc = new dc;
function M(a, b, c, d) { this.l = a; this.j = b; this.m = c; this.X = d || 1; this.V = new E(this); this.P = ec; a = Ja ? 125 : void 0; this.W = new Eb(a); this.H = null; this.i = !1; this.s = this.A = this.v = this.K = this.F = this.Y = this.B = null; this.D = []; this.g = null; this.C = 0; this.o = this.u = null; this.N = -1; this.I = !1; this.O = 0; this.L = null; this.aa = this.J = this.$ = this.U = !1; this.h = new fc; }
function fc() { this.i = null; this.g = ""; this.h = !1; }
var ec = 45E3, gc = {}, hc = {};
k = M.prototype;
k.setTimeout = function (a) { this.P = a; };
function ic(a, b, c) { a.K = 1; a.v = jc(N(b)); a.s = c; a.U = !0; kc(a, null); }
function kc(a, b) { a.F = Date.now(); lc(a); a.A = N(a.v); var c = a.A, d = a.X; Array.isArray(d) || (d = [String(d)]); mc(c.h, "t", d); a.C = 0; c = a.l.H; a.h = new fc; a.g = nc(a.l, c ? b : null, !a.s); 0 < a.O && (a.L = new Ib(q(a.Ia, a, a.g), a.O)); Kb(a.V, a.g, "readystatechange", a.gb); b = a.H ? ya(a.H) : {}; a.s ? (a.u || (a.u = "POST"), b["Content-Type"] = "application/x-www-form-urlencoded", a.g.ea(a.A, a.u, a.s, b)) : (a.u = "GET", a.g.ea(a.A, a.u, null, b)); I(1); Nb(a.j, a.u, a.A, a.m, a.X, a.s); }
k.gb = function (a) { a = a.target; var b = this.L; b && 3 == O(a) ? b.l() : this.Ia(a); };
k.Ia = function (a) {
    try {
        if (a == this.g)
            a: {
                var r = O(this.g);
                var b = this.g.Da();
                var G = this.g.ba();
                if (!(3 > r) && (3 != r || Ja || this.g && (this.h.h || this.g.ga() || oc(this.g)))) {
                    this.I || 4 != r || 7 == b || (8 == b || 0 >= G ? I(3) : I(2));
                    pc(this);
                    var c = this.g.ba();
                    this.N = c;
                    b: if (qc(this)) {
                        var d = oc(this.g);
                        a = "";
                        var e = d.length, f = 4 == O(this.g);
                        if (!this.h.i) {
                            if ("undefined" === typeof TextDecoder) {
                                P(this);
                                rc(this);
                                var h = "";
                                break b;
                            }
                            this.h.i = new l.TextDecoder;
                        }
                        for (b = 0; b < e; b++)
                            this.h.h = !0, a += this.h.i.decode(d[b], { stream: f && b == e - 1 });
                        d.splice(0, e);
                        this.h.g += a;
                        this.C = 0;
                        h = this.h.g;
                    }
                    else
                        h = this.g.ga();
                    this.i = 200 == c;
                    Ob(this.j, this.u, this.A, this.m, this.X, r, c);
                    if (this.i) {
                        if (this.$ && !this.J) {
                            b: {
                                if (this.g) {
                                    var n, u = this.g;
                                    if ((n = u.g ? u.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !sa(n)) {
                                        var m = n;
                                        break b;
                                    }
                                }
                                m = null;
                            }
                            if (c = m)
                                F(this.j, this.m, c, "Initial handshake response via X-HTTP-Initial-Response"), this.J = !0, sc(this, c);
                            else {
                                this.i = !1;
                                this.o = 3;
                                J(12);
                                P(this);
                                rc(this);
                                break a;
                            }
                        }
                        this.U ? (tc(this, r, h), Ja && this.i && 3 == r && (Kb(this.V, this.W, "tick", this.fb),
                            this.W.start())) : (F(this.j, this.m, h, null), sc(this, h));
                        4 == r && P(this);
                        this.i && !this.I && (4 == r ? uc(this.l, this) : (this.i = !1, lc(this)));
                    }
                    else
                        400 == c && 0 < h.indexOf("Unknown SID") ? (this.o = 3, J(12)) : (this.o = 0, J(13)), P(this), rc(this);
                }
            }
    }
    catch (r) { }
    finally { }
};
function qc(a) { return a.g ? "GET" == a.u && 2 != a.K && a.l.Ba : !1; }
function tc(a, b, c) {
    var d = !0, e;
    for (; !a.I && a.C < c.length;)
        if (e = vc(a, c), e == hc) {
            4 == b && (a.o = 4, J(14), d = !1);
            F(a.j, a.m, null, "[Incomplete Response]");
            break;
        }
        else if (e == gc) {
            a.o = 4;
            J(15);
            F(a.j, a.m, c, "[Invalid Chunk]");
            d = !1;
            break;
        }
        else
            F(a.j, a.m, e, null), sc(a, e);
    qc(a) && e != hc && e != gc && (a.h.g = "", a.C = 0);
    4 != b || 0 != c.length || a.h.h || (a.o = 1, J(16), d = !1);
    a.i = a.i && d;
    d ? 0 < c.length && !a.aa && (a.aa = !0, b = a.l, b.g == a && b.$ && !b.L && (b.h.info("Great, no buffering proxy detected. Bytes received: " + c.length), wc(b), b.L = !0, J(11))) : (F(a.j, a.m, c, "[Invalid Chunked Response]"), P(a), rc(a));
}
k.fb = function () { if (this.g) {
    var a = O(this.g), b = this.g.ga();
    this.C < b.length && (pc(this), tc(this, a, b), this.i && 4 != a && lc(this));
} };
function vc(a, b) { var c = a.C, d = b.indexOf("\n", c); if (-1 == d)
    return hc; c = Number(b.substring(c, d)); if (isNaN(c))
    return gc; d += 1; if (d + c > b.length)
    return hc; b = b.substr(d, c); a.C = d + c; return b; }
k.cancel = function () { this.I = !0; P(this); };
function lc(a) { a.Y = Date.now() + a.P; xc(a, a.P); }
function xc(a, b) { if (null != a.B)
    throw Error("WatchDog timer not null"); a.B = K(q(a.eb, a), b); }
function pc(a) { a.B && (l.clearTimeout(a.B), a.B = null); }
k.eb = function () { this.B = null; var a = Date.now(); 0 <= a - this.Y ? (Qb(this.j, this.A), 2 != this.K && (I(3), J(17)), P(this), this.o = 2, rc(this)) : xc(this, this.Y - a); };
function rc(a) { 0 == a.l.G || a.I || uc(a.l, a); }
function P(a) { pc(a); var b = a.L; b && "function" == typeof b.na && b.na(); a.L = null; Fb(a.W); Lb(a.V); a.g && (b = a.g, a.g = null, b.abort(), b.na()); }
function sc(a, b) {
    try {
        var c = a.l;
        if (0 != c.G && (c.g == a || yc(c.i, a)))
            if (c.I = a.N, !a.J && yc(c.i, a) && 3 == c.G) {
                try {
                    var d = c.Ca.g.parse(b);
                }
                catch (m) {
                    d = null;
                }
                if (Array.isArray(d) && 3 == d.length) {
                    var e = d;
                    if (0 == e[0])
                        a: {
                            if (!c.u) {
                                if (c.g)
                                    if (c.g.F + 3E3 < a.F)
                                        zc(c), Ac(c);
                                    else
                                        break a;
                                Bc(c);
                                J(18);
                            }
                        }
                    else
                        c.ta = e[1], 0 < c.ta - c.U && 37500 > e[2] && c.N && 0 == c.A && !c.v && (c.v = K(q(c.ab, c), 6E3));
                    if (1 >= Cc(c.i) && c.ka) {
                        try {
                            c.ka();
                        }
                        catch (m) { }
                        c.ka = void 0;
                    }
                }
                else
                    Q(c, 11);
            }
            else if ((a.J || c.g == a) && zc(c), !sa(b))
                for (e = c.Ca.g.parse(b), b = 0; b < e.length; b++) {
                    var m = e[b];
                    c.U = m[0];
                    m = m[1];
                    if (2 == c.G)
                        if ("c" == m[0]) {
                            c.J = m[1];
                            c.la = m[2];
                            var r = m[3];
                            null != r && (c.ma = r, c.h.info("VER=" + c.ma));
                            var G = m[4];
                            null != G && (c.za = G, c.h.info("SVER=" + c.za));
                            var Da = m[5];
                            null != Da && "number" === typeof Da && 0 < Da && (d = 1.5 * Da, c.K = d, c.h.info("backChannelRequestTimeoutMs_=" + d));
                            d = c;
                            var ca = a.g;
                            if (ca) {
                                var Ea = ca.g ? ca.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                                if (Ea) {
                                    var f = d.i;
                                    !f.g && (w(Ea, "spdy") || w(Ea, "quic") || w(Ea, "h2")) && (f.j = f.l, f.g = new Set, f.h && (Dc(f, f.h), f.h = null));
                                }
                                if (d.D) {
                                    var xb = ca.g ? ca.g.getResponseHeader("X-HTTP-Session-Id") : null;
                                    xb && (d.sa = xb, R(d.F, d.D, xb));
                                }
                            }
                            c.G = 3;
                            c.j && c.j.xa();
                            c.$ && (c.O = Date.now() - a.F, c.h.info("Handshake RTT: " + c.O + "ms"));
                            d = c;
                            var h = a;
                            d.oa = Ec(d, d.H ? d.la : null, d.W);
                            if (h.J) {
                                Fc(d.i, h);
                                var n = h, u = d.K;
                                u && n.setTimeout(u);
                                n.B && (pc(n), lc(n));
                                d.g = h;
                            }
                            else
                                Gc(d);
                            0 < c.l.length && Hc(c);
                        }
                        else
                            "stop" != m[0] && "close" != m[0] || Q(c, 7);
                    else
                        3 == c.G && ("stop" == m[0] || "close" == m[0] ? "stop" == m[0] ? Q(c, 7) : Ic(c) : "noop" != m[0] && c.j && c.j.wa(m), c.A = 0);
                }
        I(4);
    }
    catch (m) { }
}
function Jc(a) { if (a.R && "function" == typeof a.R)
    return a.R(); if ("string" === typeof a)
    return a.split(""); if (ba(a)) {
    for (var b = [], c = a.length, d = 0; d < c; d++)
        b.push(a[d]);
    return b;
} b = []; c = 0; for (d in a)
    b[c++] = a[d]; return b; }
function Kc(a, b) { if (a.forEach && "function" == typeof a.forEach)
    a.forEach(b, void 0);
else if (ba(a) || "string" === typeof a)
    na(a, b, void 0);
else {
    if (a.T && "function" == typeof a.T)
        var c = a.T();
    else if (a.R && "function" == typeof a.R)
        c = void 0;
    else if (ba(a) || "string" === typeof a) {
        c = [];
        for (var d = a.length, e = 0; e < d; e++)
            c.push(e);
    }
    else
        for (e in c = [], d = 0, a)
            c[d++] = e;
    d = Jc(a);
    e = d.length;
    for (var f = 0; f < e; f++)
        b.call(void 0, d[f], c && c[f], a);
} }
function S(a, b) { this.h = {}; this.g = []; this.i = 0; var c = arguments.length; if (1 < c) {
    if (c % 2)
        throw Error("Uneven number of arguments");
    for (var d = 0; d < c; d += 2)
        this.set(arguments[d], arguments[d + 1]);
}
else if (a)
    if (a instanceof S)
        for (c = a.T(), d = 0; d < c.length; d++)
            this.set(c[d], a.get(c[d]));
    else
        for (d in a)
            this.set(d, a[d]); }
k = S.prototype;
k.R = function () { Lc(this); for (var a = [], b = 0; b < this.g.length; b++)
    a.push(this.h[this.g[b]]); return a; };
k.T = function () { Lc(this); return this.g.concat(); };
function Lc(a) { if (a.i != a.g.length) {
    for (var b = 0, c = 0; b < a.g.length;) {
        var d = a.g[b];
        T(a.h, d) && (a.g[c++] = d);
        b++;
    }
    a.g.length = c;
} if (a.i != a.g.length) {
    var e = {};
    for (c = b = 0; b < a.g.length;)
        d = a.g[b], T(e, d) || (a.g[c++] = d, e[d] = 1), b++;
    a.g.length = c;
} }
k.get = function (a, b) { return T(this.h, a) ? this.h[a] : b; };
k.set = function (a, b) { T(this.h, a) || (this.i++, this.g.push(a)); this.h[a] = b; };
k.forEach = function (a, b) { for (var c = this.T(), d = 0; d < c.length; d++) {
    var e = c[d], f = this.get(e);
    a.call(b, f, e, this);
} };
function T(a, b) { return Object.prototype.hasOwnProperty.call(a, b); }
var Mc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
function Nc(a, b) { if (a) {
    a = a.split("&");
    for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf("="), e = null;
        if (0 <= d) {
            var f = a[c].substring(0, d);
            e = a[c].substring(d + 1);
        }
        else
            f = a[c];
        b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
    }
} }
function U(a, b) { this.i = this.s = this.j = ""; this.m = null; this.o = this.l = ""; this.g = !1; if (a instanceof U) {
    this.g = void 0 !== b ? b : a.g;
    Oc(this, a.j);
    this.s = a.s;
    Pc(this, a.i);
    Qc(this, a.m);
    this.l = a.l;
    b = a.h;
    var c = new Rc;
    c.i = b.i;
    b.g && (c.g = new S(b.g), c.h = b.h);
    Sc(this, c);
    this.o = a.o;
}
else
    a && (c = String(a).match(Mc)) ? (this.g = !!b, Oc(this, c[1] || "", !0), this.s = Tc(c[2] || ""), Pc(this, c[3] || "", !0), Qc(this, c[4]), this.l = Tc(c[5] || "", !0), Sc(this, c[6] || "", !0), this.o = Tc(c[7] || "")) : (this.g = !!b, this.h = new Rc(null, this.g)); }
U.prototype.toString = function () { var a = [], b = this.j; b && a.push(Uc(b, Vc, !0), ":"); var c = this.i; if (c || "file" == b)
    a.push("//"), (b = this.s) && a.push(Uc(b, Vc, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.m, null != c && a.push(":", String(c)); if (c = this.l)
    this.i && "/" != c.charAt(0) && a.push("/"), a.push(Uc(c, "/" == c.charAt(0) ? Wc : Xc, !0)); (c = this.h.toString()) && a.push("?", c); (c = this.o) && a.push("#", Uc(c, Yc)); return a.join(""); };
function N(a) { return new U(a); }
function Oc(a, b, c) { a.j = c ? Tc(b, !0) : b; a.j && (a.j = a.j.replace(/:$/, "")); }
function Pc(a, b, c) { a.i = c ? Tc(b, !0) : b; }
function Qc(a, b) { if (b) {
    b = Number(b);
    if (isNaN(b) || 0 > b)
        throw Error("Bad port number " + b);
    a.m = b;
}
else
    a.m = null; }
function Sc(a, b, c) { b instanceof Rc ? (a.h = b, Zc(a.h, a.g)) : (c || (b = Uc(b, $c)), a.h = new Rc(b, a.g)); }
function R(a, b, c) { a.h.set(b, c); }
function jc(a) { R(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)); return a; }
function ad(a) { return a instanceof U ? N(a) : new U(a, void 0); }
function bd(a, b, c, d) { var e = new U(null, void 0); a && Oc(e, a); b && Pc(e, b); c && Qc(e, c); d && (e.l = d); return e; }
function Tc(a, b) { return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""; }
function Uc(a, b, c) { return "string" === typeof a ? (a = encodeURI(a).replace(b, cd), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null; }
function cd(a) { a = a.charCodeAt(0); return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16); }
var Vc = /[#\/\?@]/g, Xc = /[#\?:]/g, Wc = /[#\?]/g, $c = /[#\?@]/g, Yc = /#/g;
function Rc(a, b) { this.h = this.g = null; this.i = a || null; this.j = !!b; }
function V(a) { a.g || (a.g = new S, a.h = 0, a.i && Nc(a.i, function (b, c) { a.add(decodeURIComponent(b.replace(/\+/g, " ")), c); })); }
k = Rc.prototype;
k.add = function (a, b) { V(this); this.i = null; a = W(this, a); var c = this.g.get(a); c || this.g.set(a, c = []); c.push(b); this.h += 1; return this; };
function dd(a, b) { V(a); b = W(a, b); T(a.g.h, b) && (a.i = null, a.h -= a.g.get(b).length, a = a.g, T(a.h, b) && (delete a.h[b], a.i--, a.g.length > 2 * a.i && Lc(a))); }
function ed(a, b) { V(a); b = W(a, b); return T(a.g.h, b); }
k.forEach = function (a, b) { V(this); this.g.forEach(function (c, d) { na(c, function (e) { a.call(b, e, d, this); }, this); }, this); };
k.T = function () { V(this); for (var a = this.g.R(), b = this.g.T(), c = [], d = 0; d < b.length; d++)
    for (var e = a[d], f = 0; f < e.length; f++)
        c.push(b[d]); return c; };
k.R = function (a) { V(this); var b = []; if ("string" === typeof a)
    ed(this, a) && (b = qa(b, this.g.get(W(this, a))));
else {
    a = this.g.R();
    for (var c = 0; c < a.length; c++)
        b = qa(b, a[c]);
} return b; };
k.set = function (a, b) { V(this); this.i = null; a = W(this, a); ed(this, a) && (this.h -= this.g.get(a).length); this.g.set(a, [b]); this.h += 1; return this; };
k.get = function (a, b) { if (!a)
    return b; a = this.R(a); return 0 < a.length ? String(a[0]) : b; };
function mc(a, b, c) { dd(a, b); 0 < c.length && (a.i = null, a.g.set(W(a, b), ra(c)), a.h += c.length); }
k.toString = function () { if (this.i)
    return this.i; if (!this.g)
    return ""; for (var a = [], b = this.g.T(), c = 0; c < b.length; c++) {
    var d = b[c], e = encodeURIComponent(String(d));
    d = this.R(d);
    for (var f = 0; f < d.length; f++) {
        var h = e;
        "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
        a.push(h);
    }
} return this.i = a.join("&"); };
function W(a, b) { b = String(b); a.j && (b = b.toLowerCase()); return b; }
function Zc(a, b) { b && !a.j && (V(a), a.i = null, a.g.forEach(function (c, d) { var e = d.toLowerCase(); d != e && (dd(this, d), mc(this, e, c)); }, a)); a.j = b; }
var fd = /** @class */ (function () {
    function fd(a, b) {
        this.h = a;
        this.g = b;
    }
    return fd;
}());
function gd(a) { this.l = a || hd; l.PerformanceNavigationTiming ? (a = l.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(l.g && l.g.Ea && l.g.Ea() && l.g.Ea().Zb); this.j = a ? this.l : 1; this.g = null; 1 < this.j && (this.g = new Set); this.h = null; this.i = []; }
var hd = 10;
function id(a) { return a.h ? !0 : a.g ? a.g.size >= a.j : !1; }
function Cc(a) { return a.h ? 1 : a.g ? a.g.size : 0; }
function yc(a, b) { return a.h ? a.h == b : a.g ? a.g.has(b) : !1; }
function Dc(a, b) { a.g ? a.g.add(b) : a.h = b; }
function Fc(a, b) { a.h && a.h == b ? a.h = null : a.g && a.g.has(b) && a.g.delete(b); }
gd.prototype.cancel = function () {
    var e_1, _a;
    this.i = jd(this);
    if (this.h)
        this.h.cancel(), this.h = null;
    else if (this.g && 0 !== this.g.size) {
        try {
            for (var _b = __values(this.g.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var a = _c.value;
                a.cancel();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.g.clear();
    }
};
function jd(a) {
    var e_2, _a;
    if (null != a.h)
        return a.i.concat(a.h.D);
    if (null != a.g && 0 !== a.g.size) {
        var b = a.i;
        try {
            for (var _b = __values(a.g.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var c = _c.value;
                b = b.concat(c.D);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return b;
    }
    return ra(a.i);
}
function kd() { }
kd.prototype.stringify = function (a) { return l.JSON.stringify(a, void 0); };
kd.prototype.parse = function (a) { return l.JSON.parse(a, void 0); };
function ld() { this.g = new kd; }
function md(a, b, c) { var d = c || ""; try {
    Kc(a, function (e, f) { var h = e; p(e) && (h = rb(e)); b.push(d + f + "=" + encodeURIComponent(h)); });
}
catch (e) {
    throw b.push(d + "type=" + encodeURIComponent("_badmap")), e;
} }
function nd(a, b) { var c = new Mb; if (l.Image) {
    var d_1 = new Image;
    d_1.onload = ja(od, c, d_1, "TestLoadImage: loaded", !0, b);
    d_1.onerror = ja(od, c, d_1, "TestLoadImage: error", !1, b);
    d_1.onabort = ja(od, c, d_1, "TestLoadImage: abort", !1, b);
    d_1.ontimeout = ja(od, c, d_1, "TestLoadImage: timeout", !1, b);
    l.setTimeout(function () { if (d_1.ontimeout)
        d_1.ontimeout(); }, 1E4);
    d_1.src = a;
}
else
    b(!1); }
function od(a, b, c, d, e) { try {
    b.onload = null, b.onerror = null, b.onabort = null, b.ontimeout = null, e(d);
}
catch (f) { } }
function pd(a) { this.l = a.$b || null; this.j = a.ib || !1; }
t(pd, Yb);
pd.prototype.g = function () { return new qd(this.l, this.j); };
pd.prototype.i = function (a) { return function () { return a; }; }({});
function qd(a, b) { C.call(this); this.D = a; this.u = b; this.m = void 0; this.readyState = rd; this.status = 0; this.responseType = this.responseText = this.response = this.statusText = ""; this.onreadystatechange = null; this.v = new Headers; this.h = null; this.C = "GET"; this.B = ""; this.g = !1; this.A = this.j = this.l = null; }
t(qd, C);
var rd = 0;
k = qd.prototype;
k.open = function (a, b) { if (this.readyState != rd)
    throw this.abort(), Error("Error reopening a connection"); this.C = a; this.B = b; this.readyState = 1; sd(this); };
k.send = function (a) { if (1 != this.readyState)
    throw this.abort(), Error("need to call open() first. "); this.g = !0; var b = { headers: this.v, method: this.C, credentials: this.m, cache: void 0 }; a && (b.body = a); (this.D || l).fetch(new Request(this.B, b)).then(this.Va.bind(this), this.ha.bind(this)); };
k.abort = function () { this.response = this.responseText = ""; this.v = new Headers; this.status = 0; this.j && this.j.cancel("Request was aborted."); 1 <= this.readyState && this.g && 4 != this.readyState && (this.g = !1, td(this)); this.readyState = rd; };
k.Va = function (a) {
    if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, sd(this)), this.g && (this.readyState = 3, sd(this), this.g)))
        if ("arraybuffer" === this.responseType)
            a.arrayBuffer().then(this.Ta.bind(this), this.ha.bind(this));
        else if ("undefined" !== typeof l.ReadableStream && "body" in a) {
            this.j = a.body.getReader();
            if (this.u) {
                if (this.responseType)
                    throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
                this.response =
                    [];
            }
            else
                this.response = this.responseText = "", this.A = new TextDecoder;
            ud(this);
        }
        else
            a.text().then(this.Ua.bind(this), this.ha.bind(this));
};
function ud(a) { a.j.read().then(a.Sa.bind(a)).catch(a.ha.bind(a)); }
k.Sa = function (a) { if (this.g) {
    if (this.u && a.value)
        this.response.push(a.value);
    else if (!this.u) {
        var b = a.value ? a.value : new Uint8Array(0);
        if (b = this.A.decode(b, { stream: !a.done }))
            this.response = this.responseText += b;
    }
    a.done ? td(this) : sd(this);
    3 == this.readyState && ud(this);
} };
k.Ua = function (a) { this.g && (this.response = this.responseText = a, td(this)); };
k.Ta = function (a) { this.g && (this.response = a, td(this)); };
k.ha = function () { this.g && td(this); };
function td(a) { a.readyState = 4; a.l = null; a.j = null; a.A = null; sd(a); }
k.setRequestHeader = function (a, b) { this.v.append(a, b); };
k.getResponseHeader = function (a) { return this.h ? this.h.get(a.toLowerCase()) || "" : ""; };
k.getAllResponseHeaders = function () { if (!this.h)
    return ""; var a = [], b = this.h.entries(); for (var c = b.next(); !c.done;)
    c = c.value, a.push(c[0] + ": " + c[1]), c = b.next(); return a.join("\r\n"); };
function sd(a) { a.onreadystatechange && a.onreadystatechange.call(a); }
Object.defineProperty(qd.prototype, "withCredentials", { get: function () { return "include" === this.m; }, set: function (a) { this.m = a ? "include" : "same-origin"; } });
var vd = l.JSON.parse;
function X(a) { C.call(this); this.headers = new S; this.u = a || null; this.h = !1; this.C = this.g = null; this.H = ""; this.m = 0; this.j = ""; this.l = this.F = this.v = this.D = !1; this.B = 0; this.A = null; this.J = wd; this.K = this.L = !1; }
t(X, C);
var wd = "", xd = /^https?$/i, yd = ["POST", "PUT"];
k = X.prototype;
k.ea = function (a, b, c, d) {
    if (this.g)
        throw Error("[goog.net.XhrIo] Object is active with another request=" + this.H + "; newUri=" + a);
    b = b ? b.toUpperCase() : "GET";
    this.H = a;
    this.j = "";
    this.m = 0;
    this.D = !1;
    this.h = !0;
    this.g = this.u ? this.u.g() : cc.g();
    this.C = this.u ? Zb(this.u) : Zb(cc);
    this.g.onreadystatechange = q(this.Fa, this);
    try {
        this.F = !0, this.g.open(b, String(a), !0), this.F = !1;
    }
    catch (f) {
        zd(this, f);
        return;
    }
    a = c || "";
    var e = new S(this.headers);
    d && Kc(d, function (f, h) { e.set(h, f); });
    d = oa(e.T());
    c = l.FormData && a instanceof l.FormData;
    !(0 <= ma(yd, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    e.forEach(function (f, h) { this.g.setRequestHeader(h, f); }, this);
    this.J && (this.g.responseType = this.J);
    "withCredentials" in this.g && this.g.withCredentials !== this.L && (this.g.withCredentials = this.L);
    try {
        Ad(this), 0 < this.B && ((this.K = Bd(this.g)) ? (this.g.timeout = this.B, this.g.ontimeout = q(this.pa, this)) : this.A = Gb(this.pa, this.B, this)), this.v = !0, this.g.send(a), this.v = !1;
    }
    catch (f) {
        zd(this, f);
    }
};
function Bd(a) { return y && Ra() && "number" === typeof a.timeout && void 0 !== a.ontimeout; }
function pa(a) { return "content-type" == a.toLowerCase(); }
k.pa = function () { "undefined" != typeof goog && this.g && (this.j = "Timed out after " + this.B + "ms, aborting", this.m = 8, D(this, "timeout"), this.abort(8)); };
function zd(a, b) { a.h = !1; a.g && (a.l = !0, a.g.abort(), a.l = !1); a.j = b; a.m = 5; Cd(a); Dd(a); }
function Cd(a) { a.D || (a.D = !0, D(a, "complete"), D(a, "error")); }
k.abort = function (a) { this.g && this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1, this.m = a || 7, D(this, "complete"), D(this, "abort"), Dd(this)); };
k.M = function () { this.g && (this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1), Dd(this, !0)); X.Z.M.call(this); };
k.Fa = function () { this.s || (this.F || this.v || this.l ? Ed(this) : this.cb()); };
k.cb = function () { Ed(this); };
function Ed(a) {
    if (a.h && "undefined" != typeof goog && (!a.C[1] || 4 != O(a) || 2 != a.ba()))
        if (a.v && 4 == O(a))
            Gb(a.Fa, 0, a);
        else if (D(a, "readystatechange"), 4 == O(a)) {
            a.h = !1;
            try {
                var n = a.ba();
                a: switch (n) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var b = !0;
                        break a;
                    default: b = !1;
                }
                var c;
                if (!(c = b)) {
                    var d;
                    if (d = 0 === n) {
                        var e = String(a.H).match(Mc)[1] || null;
                        if (!e && l.self && l.self.location) {
                            var f = l.self.location.protocol;
                            e = f.substr(0, f.length - 1);
                        }
                        d = !xd.test(e ? e.toLowerCase() : "");
                    }
                    c = d;
                }
                if (c)
                    D(a, "complete"), D(a, "success");
                else {
                    a.m = 6;
                    try {
                        var h = 2 < O(a) ? a.g.statusText : "";
                    }
                    catch (u) {
                        h = "";
                    }
                    a.j = h + " [" + a.ba() + "]";
                    Cd(a);
                }
            }
            finally {
                Dd(a);
            }
        }
}
function Dd(a, b) { if (a.g) {
    Ad(a);
    var c = a.g, d = a.C[0] ? aa : null;
    a.g = null;
    a.C = null;
    b || D(a, "ready");
    try {
        c.onreadystatechange = d;
    }
    catch (e) { }
} }
function Ad(a) { a.g && a.K && (a.g.ontimeout = null); a.A && (l.clearTimeout(a.A), a.A = null); }
function O(a) { return a.g ? a.g.readyState : 0; }
k.ba = function () { try {
    return 2 < O(this) ? this.g.status : -1;
}
catch (a) {
    return -1;
} };
k.ga = function () { try {
    return this.g ? this.g.responseText : "";
}
catch (a) {
    return "";
} };
k.Qa = function (a) { if (this.g) {
    var b = this.g.responseText;
    a && 0 == b.indexOf(a) && (b = b.substring(a.length));
    return vd(b);
} };
function oc(a) { try {
    if (!a.g)
        return null;
    if ("response" in a.g)
        return a.g.response;
    switch (a.J) {
        case wd:
        case "text": return a.g.responseText;
        case "arraybuffer": if ("mozResponseArrayBuffer" in a.g)
            return a.g.mozResponseArrayBuffer;
    }
    return null;
}
catch (b) {
    return null;
} }
k.Da = function () { return this.m; };
k.La = function () { return "string" === typeof this.j ? this.j : String(this.j); };
function Fd(a) { var b = ""; xa(a, function (c, d) { b += d; b += ":"; b += c; b += "\r\n"; }); return b; }
function Gd(a, b, c) { a: {
    for (d in c) {
        var d = !1;
        break a;
    }
    d = !0;
} d || (c = Fd(c), "string" === typeof a ? (null != c && encodeURIComponent(String(c))) : R(a, b, c)); }
function Hd(a, b, c) { return c && c.internalChannelParams ? c.internalChannelParams[a] || b : b; }
function Id(a) {
    this.za = 0;
    this.l = [];
    this.h = new Mb;
    this.la = this.oa = this.F = this.W = this.g = this.sa = this.D = this.aa = this.o = this.P = this.s = null;
    this.Za = this.V = 0;
    this.Xa = Hd("failFast", !1, a);
    this.N = this.v = this.u = this.m = this.j = null;
    this.X = !0;
    this.I = this.ta = this.U = -1;
    this.Y = this.A = this.C = 0;
    this.Pa = Hd("baseRetryDelayMs", 5E3, a);
    this.$a = Hd("retryDelaySeedMs", 1E4, a);
    this.Ya = Hd("forwardChannelMaxRetries", 2, a);
    this.ra = Hd("forwardChannelRequestTimeoutMs", 2E4, a);
    this.qa = a && a.xmlHttpFactory || void 0;
    this.Ba = a && a.Yb || !1;
    this.K = void 0;
    this.H = a && a.supportsCrossDomainXhr || !1;
    this.J = "";
    this.i = new gd(a && a.concurrentRequestLimit);
    this.Ca = new ld;
    this.ja = a && a.fastHandshake || !1;
    this.Ra = a && a.Wb || !1;
    a && a.Aa && this.h.Aa();
    a && a.forceLongPolling && (this.X = !1);
    this.$ = !this.ja && this.X && a && a.detectBufferingProxy || !1;
    this.ka = void 0;
    this.O = 0;
    this.L = !1;
    this.B = null;
    this.Wa = !a || !1 !== a.Xb;
}
k = Id.prototype;
k.ma = 8;
k.G = 1;
function Ic(a) { Jd(a); if (3 == a.G) {
    var b = a.V++, c = N(a.F);
    R(c, "SID", a.J);
    R(c, "RID", b);
    R(c, "TYPE", "terminate");
    Kd(a, c);
    b = new M(a, a.h, b, void 0);
    b.K = 2;
    b.v = jc(N(c));
    c = !1;
    l.navigator && l.navigator.sendBeacon && (c = l.navigator.sendBeacon(b.v.toString(), ""));
    !c && l.Image && ((new Image).src = b.v, c = !0);
    c || (b.g = nc(b.l, null), b.g.ea(b.v));
    b.F = Date.now();
    lc(b);
} Ld(a); }
k.hb = function (a) { try {
    this.h.info("Origin Trials invoked: " + a);
}
catch (b) { } };
function Ac(a) { a.g && (wc(a), a.g.cancel(), a.g = null); }
function Jd(a) { Ac(a); a.u && (l.clearTimeout(a.u), a.u = null); zc(a); a.i.cancel(); a.m && ("number" === typeof a.m && l.clearTimeout(a.m), a.m = null); }
function Md(a, b) { a.l.push(new fd(a.Za++, b)); 3 == a.G && Hc(a); }
function Hc(a) { id(a.i) || a.m || (a.m = !0, zb(a.Ha, a), a.C = 0); }
function Nd(a, b) { if (Cc(a.i) >= a.i.j - (a.m ? 1 : 0))
    return !1; if (a.m)
    return a.l = b.D.concat(a.l), !0; if (1 == a.G || 2 == a.G || a.C >= (a.Xa ? 0 : a.Ya))
    return !1; a.m = K(q(a.Ha, a, b), Od(a, a.C)); a.C++; return !0; }
k.Ha = function (a) {
    if (this.m)
        if (this.m = null, 1 == this.G) {
            if (!a) {
                this.V = Math.floor(1E5 * Math.random());
                a = this.V++;
                var e = new M(this, this.h, a, void 0);
                var f = this.s;
                this.P && (f ? (f = ya(f), Aa(f, this.P)) : f = this.P);
                null === this.o && (e.H = f);
                if (this.ja)
                    a: {
                        var b = 0;
                        for (var c = 0; c < this.l.length; c++) {
                            b: {
                                var d = this.l[c];
                                if ("__data__" in d.g && (d = d.g.__data__, "string" === typeof d)) {
                                    d = d.length;
                                    break b;
                                }
                                d = void 0;
                            }
                            if (void 0 === d)
                                break;
                            b += d;
                            if (4096 < b) {
                                b = c;
                                break a;
                            }
                            if (4096 === b || c === this.l.length - 1) {
                                b = c + 1;
                                break a;
                            }
                        }
                        b = 1E3;
                    }
                else
                    b = 1E3;
                b =
                    Pd(this, e, b);
                c = N(this.F);
                R(c, "RID", a);
                R(c, "CVER", 22);
                this.D && R(c, "X-HTTP-Session-Id", this.D);
                Kd(this, c);
                this.o && f && Gd(c, this.o, f);
                Dc(this.i, e);
                this.Ra && R(c, "TYPE", "init");
                this.ja ? (R(c, "$req", b), R(c, "SID", "null"), e.$ = !0, ic(e, c, null)) : ic(e, c, b);
                this.G = 2;
            }
        }
        else
            3 == this.G && (a ? Qd(this, a) : 0 == this.l.length || id(this.i) || Qd(this));
};
function Qd(a, b) { var c; b ? c = b.m : c = a.V++; var d = N(a.F); R(d, "SID", a.J); R(d, "RID", c); R(d, "AID", a.U); Kd(a, d); a.o && a.s && Gd(d, a.o, a.s); c = new M(a, a.h, c, a.C + 1); null === a.o && (c.H = a.s); b && (a.l = b.D.concat(a.l)); b = Pd(a, c, 1E3); c.setTimeout(Math.round(.5 * a.ra) + Math.round(.5 * a.ra * Math.random())); Dc(a.i, c); ic(c, d, b); }
function Kd(a, b) { a.j && Kc({}, function (c, d) { R(b, d, c); }); }
function Pd(a, b, c) { c = Math.min(a.l.length, c); var d = a.j ? q(a.j.Oa, a.j, a) : null; a: {
    var e = a.l;
    var f = -1;
    for (;;) {
        var h = ["count=" + c];
        -1 == f ? 0 < c ? (f = e[0].h, h.push("ofs=" + f)) : f = 0 : h.push("ofs=" + f);
        var n = !0;
        for (var u = 0; u < c; u++) {
            var m = e[u].h;
            var r = e[u].g;
            m -= f;
            if (0 > m)
                f = Math.max(0, e[u].h - 100), n = !1;
            else
                try {
                    md(r, h, "req" + m + "_");
                }
                catch (G) {
                    d && d(r);
                }
        }
        if (n) {
            d = h.join("&");
            break a;
        }
    }
} a = a.l.splice(0, c); b.D = a; return d; }
function Gc(a) { a.g || a.u || (a.Y = 1, zb(a.Ga, a), a.A = 0); }
function Bc(a) { if (a.g || a.u || 3 <= a.A)
    return !1; a.Y++; a.u = K(q(a.Ga, a), Od(a, a.A)); a.A++; return !0; }
k.Ga = function () { this.u = null; Rd(this); if (this.$ && !(this.L || null == this.g || 0 >= this.O)) {
    var a = 2 * this.O;
    this.h.info("BP detection timer enabled: " + a);
    this.B = K(q(this.bb, this), a);
} };
k.bb = function () { this.B && (this.B = null, this.h.info("BP detection timeout reached."), this.h.info("Buffering proxy detected and switch to long-polling!"), this.N = !1, this.L = !0, J(10), Ac(this), Rd(this)); };
function wc(a) { null != a.B && (l.clearTimeout(a.B), a.B = null); }
function Rd(a) { a.g = new M(a, a.h, "rpc", a.Y); null === a.o && (a.g.H = a.s); a.g.O = 0; var b = N(a.oa); R(b, "RID", "rpc"); R(b, "SID", a.J); R(b, "CI", a.N ? "0" : "1"); R(b, "AID", a.U); Kd(a, b); R(b, "TYPE", "xmlhttp"); a.o && a.s && Gd(b, a.o, a.s); a.K && a.g.setTimeout(a.K); var c = a.g; a = a.la; c.K = 1; c.v = jc(N(b)); c.s = null; c.U = !0; kc(c, a); }
k.ab = function () { null != this.v && (this.v = null, Ac(this), Bc(this), J(19)); };
function zc(a) { null != a.v && (l.clearTimeout(a.v), a.v = null); }
function uc(a, b) { var c = null; if (a.g == b) {
    zc(a);
    wc(a);
    a.g = null;
    var d = 2;
}
else if (yc(a.i, b))
    c = b.D, Fc(a.i, b), d = 1;
else
    return; a.I = b.N; if (0 != a.G)
    if (b.i)
        if (1 == d) {
            c = b.s ? b.s.length : 0;
            b = Date.now() - b.F;
            var e = a.C;
            d = Sb();
            D(d, new Vb(d, c, b, e));
            Hc(a);
        }
        else
            Gc(a);
    else if (e = b.o, 3 == e || 0 == e && 0 < a.I || !(1 == d && Nd(a, b) || 2 == d && Bc(a)))
        switch (c && 0 < c.length && (b = a.i, b.i = b.i.concat(c)), e) {
            case 1:
                Q(a, 5);
                break;
            case 4:
                Q(a, 10);
                break;
            case 3:
                Q(a, 6);
                break;
            default: Q(a, 2);
        } }
function Od(a, b) { var c = a.Pa + Math.floor(Math.random() * a.$a); a.j || (c *= 2); return c * b; }
function Q(a, b) { a.h.info("Error code " + b); if (2 == b) {
    var c = null;
    a.j && (c = null);
    var d = q(a.jb, a);
    c || (c = new U("//www.google.com/images/cleardot.gif"), l.location && "http" == l.location.protocol || Oc(c, "https"), jc(c));
    nd(c.toString(), d);
}
else
    J(2); a.G = 0; a.j && a.j.va(b); Ld(a); Jd(a); }
k.jb = function (a) { a ? (this.h.info("Successfully pinged google.com"), J(2)) : (this.h.info("Failed to ping google.com"), J(1)); };
function Ld(a) { a.G = 0; a.I = -1; if (a.j) {
    if (0 != jd(a.i).length || 0 != a.l.length)
        a.i.i.length = 0, ra(a.l), a.l.length = 0;
    a.j.ua();
} }
function Ec(a, b, c) { var d = ad(c); if ("" != d.i)
    b && Pc(d, b + "." + d.i), Qc(d, d.m);
else {
    var e = l.location;
    d = bd(e.protocol, b ? b + "." + e.hostname : e.hostname, +e.port, c);
} a.aa && xa(a.aa, function (e, f) { R(d, f, e); }); b = a.D; c = a.sa; b && c && R(d, b, c); R(d, "VER", a.ma); Kd(a, d); return d; }
function nc(a, b, c) { if (b && !a.H)
    throw Error("Can't create secondary domain capable XhrIo object."); b = c && a.Ba && !a.qa ? new X(new pd({ ib: !0 })) : new X(a.qa); b.L = a.H; return b; }
function Sd() { }
k = Sd.prototype;
k.xa = function () { };
k.wa = function () { };
k.va = function () { };
k.ua = function () { };
k.Oa = function () { };
function Td() { if (y && !(10 <= Number(Ua)))
    throw Error("Environmental error: no available transport."); }
Td.prototype.g = function (a, b) { return new Y(a, b); };
function Y(a, b) {
    C.call(this);
    this.g = new Id(b);
    this.l = a;
    this.h = b && b.messageUrlParams || null;
    a = b && b.messageHeaders || null;
    b && b.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
    this.g.s = a;
    a = b && b.initMessageHeaders || null;
    b && b.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b.messageContentType : a = { "X-WebChannel-Content-Type": b.messageContentType });
    b && b.ya && (a ? a["X-WebChannel-Client-Profile"] = b.ya : a = { "X-WebChannel-Client-Profile": b.ya });
    this.g.P =
        a;
    (a = b && b.httpHeadersOverwriteParam) && !sa(a) && (this.g.o = a);
    this.A = b && b.supportsCrossDomainXhr || !1;
    this.v = b && b.sendRawJson || !1;
    (b = b && b.httpSessionIdParam) && !sa(b) && (this.g.D = b, a = this.h, null !== a && b in a && (a = this.h, b in a && delete a[b]));
    this.j = new Z(this);
}
t(Y, C);
Y.prototype.m = function () { this.g.j = this.j; this.A && (this.g.H = !0); var a = this.g, b = this.l, c = this.h || void 0; a.Wa && (a.h.info("Origin Trials enabled."), zb(q(a.hb, a, b))); J(0); a.W = b; a.aa = c || {}; a.N = a.X; a.F = Ec(a, null, a.W); Hc(a); };
Y.prototype.close = function () { Ic(this.g); };
Y.prototype.u = function (a) { if ("string" === typeof a) {
    var b = {};
    b.__data__ = a;
    Md(this.g, b);
}
else
    this.v ? (b = {}, b.__data__ = rb(a), Md(this.g, b)) : Md(this.g, a); };
Y.prototype.M = function () { this.g.j = null; delete this.j; Ic(this.g); delete this.g; Y.Z.M.call(this); };
function Ud(a) { ac.call(this); var b = a.__sm__; if (b) {
    a: {
        for (var c in b) {
            a = c;
            break a;
        }
        a = void 0;
    }
    if (this.i = a)
        a = this.i, b = null !== b && a in b ? b[a] : void 0;
    this.data = b;
}
else
    this.data = a; }
t(Ud, ac);
function Vd() { bc.call(this); this.status = 1; }
t(Vd, bc);
function Z(a) { this.g = a; }
t(Z, Sd);
Z.prototype.xa = function () { D(this.g, "a"); };
Z.prototype.wa = function (a) { D(this.g, new Ud(a)); };
Z.prototype.va = function (a) { D(this.g, new Vd(a)); };
Z.prototype.ua = function () { D(this.g, "b"); }; /*

 Copyright 2017 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
Td.prototype.createWebChannel = Td.prototype.g;
Y.prototype.send = Y.prototype.u;
Y.prototype.open = Y.prototype.m;
Y.prototype.close = Y.prototype.close;
Wb.NO_ERROR = 0;
Wb.TIMEOUT = 8;
Wb.HTTP_ERROR = 6;
Xb.COMPLETE = "complete";
$b.EventType = L;
L.OPEN = "a";
L.CLOSE = "b";
L.ERROR = "c";
L.MESSAGE = "d";
C.prototype.listen = C.prototype.N;
X.prototype.listenOnce = X.prototype.O;
X.prototype.getLastError = X.prototype.La;
X.prototype.getLastErrorCode = X.prototype.Da;
X.prototype.getStatus = X.prototype.ba;
X.prototype.getResponseJson = X.prototype.Qa;
X.prototype.getResponseText = X.prototype.ga;
X.prototype.send = X.prototype.ea;
var createWebChannelTransport = function () { return new Td; };
var getStatEventTarget = function () { return Sb(); };
var ErrorCode = Wb;
var EventType = Xb;
var Event = H;
var Stat = { rb: 0, ub: 1, vb: 2, Ob: 3, Tb: 4, Qb: 5, Rb: 6, Pb: 7, Nb: 8, Sb: 9, PROXY: 10, NOPROXY: 11, Lb: 12, Hb: 13, Ib: 14, Gb: 15, Jb: 16, Kb: 17, nb: 18, mb: 19, ob: 20 };
var FetchXmlHttpFactory = pd;
var WebChannel = $b;
var XhrIo = X;

var esm = {
    createWebChannelTransport: createWebChannelTransport,
    getStatEventTarget: getStatEventTarget,
    ErrorCode: ErrorCode,
    EventType: EventType,
    Event: Event,
    Stat: Stat,
    FetchXmlHttpFactory: FetchXmlHttpFactory,
    WebChannel: WebChannel,
    XhrIo: XhrIo
};

export default esm;
export { ErrorCode, Event, EventType, FetchXmlHttpFactory, Stat, WebChannel, XhrIo, createWebChannelTransport, getStatEventTarget };
//# sourceMappingURL=index.esm.js.map
