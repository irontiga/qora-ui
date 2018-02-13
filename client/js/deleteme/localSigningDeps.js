! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [],
        d = c.slice,
        e = c.concat,
        f = c.push,
        g = c.indexOf,
        h = {},
        i = h.toString,
        j = h.hasOwnProperty,
        k = {},
        l = "1.11.2",
        m = function(a, b) {
            return new m.fn.init(a, b)
        },
        n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        o = /^-ms-/,
        p = /-([\da-z])/gi,
        q = function(a, b) {
            return b.toUpperCase()
        };
    m.fn = m.prototype = {
        jquery: l,
        constructor: m,
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
        },
        pushStack: function(a) {
            var b = m.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return m.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(m.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: c.sort,
        splice: c.splice
    }, m.extend = m.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (e = arguments[h]))
                for (d in e) a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }, m.extend({
        expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === m.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === m.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !m.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
            try {
                if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (c) {
                        return !1
                    }
            if (k.ownLast)
                for (b in a) return j.call(a, b);
            for (b in a);
            return void 0 === b || j.call(a, b)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        },
        globalEval: function(b) {
            b && m.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b)
            })(b)
        },
        camelCase: function(a) {
            return a.replace(o, "ms-").replace(p, q)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, c) {
            var d, e = 0,
                f = a.length,
                g = r(a);
            if (c) {
                if (g) {
                    for (; f > e; e++)
                        if (d = b.apply(a[e], c), d === !1) break
                            } else
                                for (e in a)
                                    if (d = b.apply(a[e], c), d === !1) break
                                        } else if (g) {
                                            for (; f > e; e++)
                                                if (d = b.call(a[e], e, a[e]), d === !1) break
                                                    } else
                                                        for (e in a)
                                                            if (d = b.call(a[e], e, a[e]), d === !1) break; return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(n, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (g) return g.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a) return c
                        }
            return -1
        },
        merge: function(a, b) {
            var c = +b.length,
                d = 0,
                e = a.length;
            while (c > d) a[e++] = b[d++];
            if (c !== c)
                while (void 0 !== b[d]) a[e++] = b[d++];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var d, f = 0,
                g = a.length,
                h = r(a),
                i = [];
            if (h)
                for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
            else
                for (f in a) d = b(a[f], f, c), null != d && i.push(d);
            return e.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, e, f;
            return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function() {
                return a.apply(b || this, c.concat(d.call(arguments)))
            }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
        },
        now: function() {
            return +new Date
        },
        support: k
    }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });

    function r(a) {
        var b = a.length,
            c = m.type(a);
        return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    var s = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
            v = a.document,
            w = 0,
            x = 0,
            y = hb(),
            z = hb(),
            A = hb(),
            B = function(a, b) {
                return a === b && (l = !0), 0
            },
            C = 1 << 31,
            D = {}.hasOwnProperty,
            E = [],
            F = E.pop,
            G = E.push,
            H = E.push,
            I = E.slice,
            J = function(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            },
            K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            L = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            N = M.replace("w", "w#"),
            O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
            P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
            Q = new RegExp(L + "+", "g"),
            R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
            S = new RegExp("^" + L + "*," + L + "*"),
            T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
            U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
            V = new RegExp(P),
            W = new RegExp("^" + N + "$"),
            X = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + O),
                PSEUDO: new RegExp("^" + P),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + K + ")$", "i"),
                needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            $ = /^[^{]+\{\s*\[native \w/,
            _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ab = /[+~]/,
            bb = /'|\\/g,
            cb = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
            db = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            },
            eb = function() {
                m()
            };
        try {
            H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
        } catch (fb) {
            H = {
                apply: E.length ? function(a, b) {
                    G.apply(a, I.call(b))
                } : function(a, b) {
                    var c = a.length,
                        d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1
                }
            }
        }

        function gb(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w, x;
            if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;
            if (!e && p) {
                if (11 !== k && (f = _.exec(a)))
                    if (j = f[1]) {
                        if (9 === k) {
                            if (h = b.getElementById(j), !h || !h.parentNode) return d;
                            if (h.id === j) return d.push(h), d
                                } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d
                                    } else {
                                        if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;
                                        if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)), d
                                            }
                if (c.qsa && (!q || !q.test(a))) {
                    if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                        o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                        while (l--) o[l] = s + rb(o[l]);
                        w = ab.test(a) && pb(b.parentNode) || b, x = o.join(",")
                    }
                    if (x) try {
                        return H.apply(d, w.querySelectorAll(x)), d
                    } catch (y) {} finally {
                        r || b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(R, "$1"), b, d, e)
        }

        function hb() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }
            return b
        }

        function ib(a) {
            return a[u] = !0, a
        }

        function jb(a) {
            var b = n.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function kb(a, b) {
            var c = a.split("|"),
                e = a.length;
            while (e--) d.attrHandle[c[e]] = b
                }

        function lb(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c)
                while (c = c.nextSibling)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function mb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function nb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function ob(a) {
            return ib(function(b) {
                return b = +b, ib(function(c, d) {
                    var e, f = a([], c.length, b),
                        g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                        })
            })
        }

        function pb(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }
        c = gb.support = {}, f = gb.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, m = gb.setDocument = function(a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", eb, !1) : e.attachEvent && e.attachEvent("onunload", eb)), p = !f(g), c.attributes = jb(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = jb(function(a) {
                return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = jb(function(a) {
                return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length
            }), c.getById ? (d.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, d.filter.ID = function(a) {
                var b = a.replace(cb, db);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function(a) {
                var b = a.replace(cb, db);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                return p ? b.getElementsByClassName(a) : void 0
            }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (jb(function(a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
            }), jb(function(a) {
                var b = g.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && jb(function(a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    while (b = b.parentNode)
                        if (b === a) return !0;
                return !1
            }, B = b ? function(a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
            } : function(a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    h = [a],
                    i = [b];
                if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                if (e === f) return lb(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) i.unshift(c);
                while (h[d] === i[d]) d++;
                return d ? lb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
            }, g) : n
        }, gb.matches = function(a, b) {
            return gb(a, null, null, b)
        }, gb.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                    } catch (e) {}
            return gb(b, n, null, [a]).length > 0
        }, gb.contains = function(a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, gb.attr = function(a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, gb.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, gb.uniqueSort = function(a) {
            var b, d = [],
                e = 0,
                f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
                    }
            return k = null, a
        }, e = gb.getText = function(a) {
            var b, c = "",
                d = 0,
                f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                        } else if (3 === f || 4 === f) return a.nodeValue
                            } else
                                while (b = a[d++]) c += e(b);
            return c
        }, d = gb.selectors = {
            cacheLength: 50,
            createPseudo: ib,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || gb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && gb.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(cb, db).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = gb.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p])
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [w, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
                            else
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break; return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || gb.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ib(function(a, c) {
                        var d, f = e(a, b),
                            g = f.length;
                        while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
                            }) : function(a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: ib(function(a) {
                    var b = [],
                        c = [],
                        d = h(a.replace(R, "$1"));
                    return d[u] ? ib(function(a, b, c, e) {
                        var f, g = d(a, null, e, []),
                            h = a.length;
                        while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
                            }) : function(a, e, f) {
                                return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                            }
                    }),
                        has: ib(function(a) {
                        return function(b) {
                            return gb(a, b).length > 0
                        }
                    }),
                        contains: ib(function(a) {
                            return a = a.replace(cb, db),
                                function(b) {
                                return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                            }
                        }),
                            lang: ib(function(a) {
                                return W.test(a || "") || gb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(),
                                    function(b) {
                                    var c;
                                    do
                                        if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                                    while ((b = b.parentNode) && 1 === b.nodeType);
                                    return !1
                                }
                            }),
                                target: function(b) {
                                    var c = a.location && a.location.hash;
                                    return c && c.slice(1) === b.id
                                },
                                    root: function(a) {
                                        return a === o
                                    },
                                        focus: function(a) {
                                            return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                                        },
                                            enabled: function(a) {
                                                return a.disabled === !1
                                            },
                                                disabled: function(a) {
                                                    return a.disabled === !0
                                                },
                                                    checked: function(a) {
                                                        var b = a.nodeName.toLowerCase();
                                                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                                                    },
                                                        selected: function(a) {
                                                            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                                                        },
                                                            empty: function(a) {
                                                                for (a = a.firstChild; a; a = a.nextSibling)
                                                                    if (a.nodeType < 6) return !1;
                                                                return !0
                                                            },
                                                                parent: function(a) {
                                                                    return !d.pseudos.empty(a)
                                                                },
                                                                    header: function(a) {
                                                                        return Z.test(a.nodeName)
                                                                    },
                                                                        input: function(a) {
                                                                            return Y.test(a.nodeName)
                                                                        },
                                                                            button: function(a) {
                                                                                var b = a.nodeName.toLowerCase();
                                                                                return "input" === b && "button" === a.type || "button" === b
                                                                            },
                                                                                text: function(a) {
                                                                                    var b;
                                                                                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                                                                                },
                                                                                    first: ob(function() {
                                                                                        return [0]
                                                                                    }),
                                                                                        last: ob(function(a, b) {
                                                                                            return [b - 1]
                                                                                        }),
                                                                                            eq: ob(function(a, b, c) {
                                                                                                return [0 > c ? c + b : c]
                                                                                            }),
                                                                                                even: ob(function(a, b) {
                                                                                                    for (var c = 0; b > c; c += 2) a.push(c);
                                                                                                    return a
                                                                                                }),
                                                                                                    odd: ob(function(a, b) {
                                                                                                        for (var c = 1; b > c; c += 2) a.push(c);
                                                                                                        return a
                                                                                                    }),
                                                                                                        lt: ob(function(a, b, c) {
                                                                                                            for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                                                                                                            return a
                                                                                                        }),
                                                                                                            gt: ob(function(a, b, c) {
                                                                                                                for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                                                                                                                return a
                                                                                                            })
                }
                        }, d.pseudos.nth = d.pseudos.eq;
                        for (b in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                        }) d.pseudos[b] = mb(b);
                for (b in {
                submit: !0,
                reset: !0
            }) d.pseudos[b] = nb(b);

            function qb() {}
        qb.prototype = d.filters = d.pseudos, d.setFilters = new qb, g = gb.tokenize = function(a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(R, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
                    }
            return b ? h.length : h ? gb.error(a) : z(a, i).slice(0)
        };

        function rb(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function sb(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;
            return b.first ? function(b, c, f) {
                while (b = b[d])
                    if (1 === b.nodeType || e) return a(b, c, f)
                        } : function(b, c, g) {
                var h, i, j = [w, f];
                if (g) {
                    while (b = b[d])
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                            } else
                                while (b = b[d])
                                    if (1 === b.nodeType || e) {
                                        if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
                                        if (i[d] = j, j[2] = a(b, c, g)) return !0
                                            }
            }
        }

        function tb(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function ub(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) gb(a, b[d], c);
            return c
        }

        function vb(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function wb(a, b, c, d, e, f) {
            return d && !d[u] && (d = wb(d)), e && !e[u] && (e = wb(e, f)), ib(function(f, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = f || ub(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : vb(p, m, a, h, i),
                    r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = vb(r, n), d(j, [], h, i), k = j.length;
                    while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                        }
                        if (f) {
                            if (e || a) {
                                if (e) {
                                    j = [], k = r.length;
                                    while (k--)(l = r[k]) && j.push(q[k] = l);
                                    e(null, r = [], j, i)
                                }
                                k = r.length;
                                while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                                    }
                                    } else r = vb(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
                                        })
                }

                function xb(a) {
                    for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sb(function(a) {
                        return a === b
                    }, h, !0), l = sb(function(a) {
                        return J(b, a) > -1
                    }, h, !0), m = [function(a, c, d) {
                        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                        return b = null, e
                    }]; f > i; i++)
                        if (c = d.relative[a[i].type]) m = [sb(tb(m), c)];
                        else {
                            if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                                for (e = ++i; f > e; e++)
                                    if (d.relative[a[e].type]) break;
                                return wb(i > 1 && tb(m), i > 1 && rb(a.slice(0, i - 1).concat({
                                    value: " " === a[i - 2].type ? "*" : ""
                                })).replace(R, "$1"), c, e > i && xb(a.slice(i, e)), f > e && xb(a = a.slice(e)), f > e && rb(a))
                            }
                            m.push(c)
                        }
                    return tb(m)
                }

                function yb(a, b) {
                    var c = b.length > 0,
                        e = a.length > 0,
                        f = function(f, g, h, i, k) {
                            var l, m, o, p = 0,
                                q = "0",
                                r = f && [],
                                s = [],
                                t = j,
                                u = f || e && d.find.TAG("*", k),
                                v = w += null == t ? 1 : Math.random() || .1,
                                x = u.length;
                            for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                                if (e && l) {
                                    m = 0;
                                    while (o = a[m++])
                                        if (o(l, g, h)) {
                                            i.push(l);
                                            break
                                        }
                                    k && (w = v)
                                }
                                c && ((l = !o && l) && p--, f && r.push(l))
                            }
                            if (p += q, c && q !== p) {
                                m = 0;
                                while (o = b[m++]) o(r, s, g, h);
                                if (f) {
                                    if (p > 0)
                                        while (q--) r[q] || s[q] || (s[q] = F.call(i));
                                    s = vb(s)
                                }
                                H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && gb.uniqueSort(i)
                            }
                            return k && (w = v, j = t), r
                        };
                    return c ? ib(f) : f
                }
                return h = gb.compile = function(a, b) {
                    var c, d = [],
                        e = [],
                        f = A[a + " "];
                    if (!f) {
                        b || (b = g(a)), c = b.length;
                        while (c--) f = xb(b[c]), f[u] ? d.push(f) : e.push(f);
                        f = A(a, yb(e, d)), f.selector = a
                    }
                    return f
                }, i = gb.select = function(a, b, e, f) {
                    var i, j, k, l, m, n = "function" == typeof a && a,
                        o = !f && g(a = n.selector || a);
                    if (e = e || [], 1 === o.length) {
                        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                            if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b) return e;
                            n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                        }
                        i = X.needsContext.test(a) ? 0 : j.length;
                        while (i--) {
                            if (k = j[i], d.relative[l = k.type]) break;
                            if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && pb(b.parentNode) || b))) {
                                if (j.splice(i, 1), a = f.length && rb(j), !a) return H.apply(e, f), e;
                                break
                            }
                        }
                    }
                    return (n || h(a, o))(f, b, !p, e, ab.test(a) && pb(b.parentNode) || b), e
                }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = jb(function(a) {
                    return 1 & a.compareDocumentPosition(n.createElement("div"))
                }), jb(function(a) {
                    return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
                }) || kb("type|href|height|width", function(a, b, c) {
                    return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
                }), c.attributes && jb(function(a) {
                    return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
                }) || kb("value", function(a, b, c) {
                    return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
                }), jb(function(a) {
                    return null == a.getAttribute("disabled")
                }) || kb(K, function(a, b, c) {
                    var d;
                    return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                }), gb
            }(a);
                                                                               m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;
                                                                               var t = m.expr.match.needsContext,
                                                                               u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                                                                               v = /^.[^:#\[\.,]*$/;

                                                                               function w(a, b, c) {
                if (m.isFunction(b)) return m.grep(a, function(a, d) {
                    return !!b.call(a, d, a) !== c
                });
                if (b.nodeType) return m.grep(a, function(a) {
                    return a === b !== c
                });
                if ("string" == typeof b) {
                    if (v.test(b)) return m.filter(b, a, c);
                    b = m.filter(b, a)
                }
                return m.grep(a, function(a) {
                    return m.inArray(a, b) >= 0 !== c
                })
            }
            m.filter = function(a, b, c) {
                var d = b[0];
                return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function(a) {
                    return 1 === a.nodeType
                }))
            }, m.fn.extend({
                find: function(a) {
                    var b, c = [],
                        d = this,
                        e = d.length;
                    if ("string" != typeof a) return this.pushStack(m(a).filter(function() {
                        for (b = 0; e > b; b++)
                            if (m.contains(d[b], this)) return !0
                                }));
                    for (b = 0; e > b; b++) m.find(a, d[b], c);
                    return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
                },
                filter: function(a) {
                    return this.pushStack(w(this, a || [], !1))
                },
                not: function(a) {
                    return this.pushStack(w(this, a || [], !0))
                },
                is: function(a) {
                    return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
                }
            });
            var x, y = a.document,
                z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                A = m.fn.init = function(a, b) {
                    var c, d;
                    if (!a) return this;
                    if ("string" == typeof a) {
                        if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
                        if (c[1]) {
                            if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b))
                                for (c in b) m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                            return this
                        }
                        if (d = y.getElementById(c[2]), d && d.parentNode) {
                            if (d.id !== c[2]) return x.find(a);
                            this.length = 1, this[0] = d
                        }
                        return this.context = y, this.selector = a, this
                    }
                    return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
                };
            A.prototype = m.fn, x = m(y);
            var B = /^(?:parents|prev(?:Until|All))/,
                C = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            m.extend({
                dir: function(a, b, c) {
                    var d = [],
                        e = a[b];
                    while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c))) 1 === e.nodeType && d.push(e), e = e[b];
                    return d
                },
                sibling: function(a, b) {
                    for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                    return c
                }
            }), m.fn.extend({
                has: function(a) {
                    var b, c = m(a, this),
                        d = c.length;
                    return this.filter(function() {
                        for (b = 0; d > b; b++)
                            if (m.contains(this, c[b])) return !0
                                })
                },
                closest: function(a, b) {
                    for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++)
                        for (c = this[d]; c && c !== b; c = c.parentNode)
                            if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
                                f.push(c);
                                break
                            }
                    return this.pushStack(f.length > 1 ? m.unique(f) : f)
                },
                index: function(a) {
                    return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(a, b) {
                    return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
                },
                addBack: function(a) {
                    return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                }
            });

            function D(a, b) {
                do a = a[b]; while (a && 1 !== a.nodeType);
                return a
            }
            m.each({
                parent: function(a) {
                    var b = a.parentNode;
                    return b && 11 !== b.nodeType ? b : null
                },
                parents: function(a) {
                    return m.dir(a, "parentNode")
                },
                parentsUntil: function(a, b, c) {
                    return m.dir(a, "parentNode", c)
                },
                next: function(a) {
                    return D(a, "nextSibling")
                },
                prev: function(a) {
                    return D(a, "previousSibling")
                },
                nextAll: function(a) {
                    return m.dir(a, "nextSibling")
                },
                prevAll: function(a) {
                    return m.dir(a, "previousSibling")
                },
                nextUntil: function(a, b, c) {
                    return m.dir(a, "nextSibling", c)
                },
                prevUntil: function(a, b, c) {
                    return m.dir(a, "previousSibling", c)
                },
                siblings: function(a) {
                    return m.sibling((a.parentNode || {}).firstChild, a)
                },
                children: function(a) {
                    return m.sibling(a.firstChild)
                },
                contents: function(a) {
                    return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
                }
            }, function(a, b) {
                m.fn[a] = function(c, d) {
                    var e = m.map(this, b, c);
                    return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
                }
            });
            var E = /\S+/g,
                F = {};

            function G(a) {
                var b = F[a] = {};
                return m.each(a.match(E) || [], function(a, c) {
                    b[c] = !0
                }), b
            }
            m.Callbacks = function(a) {
                a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
                var b, c, d, e, f, g, h = [],
                    i = !a.once && [],
                    j = function(l) {
                        for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)
                            if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                                c = !1;
                                break
                            }
                        b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
                    },
                    k = {
                        add: function() {
                            if (h) {
                                var d = h.length;
                                ! function f(b) {
                                    m.each(b, function(b, c) {
                                        var d = m.type(c);
                                        "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
                                    })
                                }(arguments), b ? e = h.length : c && (g = d, j(c))
                            }
                            return this
                        },
                        remove: function() {
                            return h && m.each(arguments, function(a, c) {
                                var d;
                                while ((d = m.inArray(c, h, d)) > -1) h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
                                    }), this
                        },
                        has: function(a) {
                            return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
                        },
                        empty: function() {
                            return h = [], e = 0, this
                        },
                        disable: function() {
                            return h = i = c = void 0, this
                        },
                        disabled: function() {
                            return !h
                        },
                        lock: function() {
                            return i = void 0, c || k.disable(), this
                        },
                        locked: function() {
                            return !i
                        },
                        fireWith: function(a, c) {
                            return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
                        },
                        fire: function() {
                            return k.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!d
                        }
                    };
                return k
            }, m.extend({
                Deferred: function(a) {
                    var b = [
                        ["resolve", "done", m.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", m.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", m.Callbacks("memory")]
                    ],
                        c = "pending",
                        d = {
                            state: function() {
                                return c
                            },
                            always: function() {
                                return e.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var a = arguments;
                                return m.Deferred(function(c) {
                                    m.each(b, function(b, f) {
                                        var g = m.isFunction(a[b]) && a[b];
                                        e[f[1]](function() {
                                            var a = g && g.apply(this, arguments);
                                            a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                        })
                                    }), a = null
                                }).promise()
                            },
                            promise: function(a) {
                                return null != a ? m.extend(a, d) : d
                            }
                        },
                        e = {};
                    return d.pipe = d.then, m.each(b, function(a, f) {
                        var g = f[2],
                            h = f[3];
                        d[f[1]] = g.add, h && g.add(function() {
                            c = h
                        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                            return e[f[0] + "With"](this === e ? d : this, arguments), this
                        }, e[f[0] + "With"] = g.fireWith
                    }), d.promise(e), a && a.call(e, e), e
                },
                when: function(a) {
                    var b = 0,
                        c = d.call(arguments),
                        e = c.length,
                        f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
                        g = 1 === f ? a : m.Deferred(),
                        h = function(a, b, c) {
                            return function(e) {
                                b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                            }
                        },
                        i, j, k;
                    if (e > 1)
                        for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
                    return f || g.resolveWith(k, c), g.promise()
                }
            });
            var H;
            m.fn.ready = function(a) {
                return m.ready.promise().done(a), this
            }, m.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(a) {
                    a ? m.readyWait++ : m.ready(!0)
                },
                ready: function(a) {
                    if (a === !0 ? !--m.readyWait : !m.isReady) {
                        if (!y.body) return setTimeout(m.ready);
                        m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")))
                    }
                }
            });

            function I() {
                y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
            }

            function J() {
                (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
            }
            m.ready.promise = function(b) {
                if (!H)
                    if (H = m.Deferred(), "complete" === y.readyState) setTimeout(m.ready);
                    else if (y.addEventListener) y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1);
                    else {
                        y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
                        var c = !1;
                        try {
                            c = null == a.frameElement && y.documentElement
                        } catch (d) {}
                        c && c.doScroll && ! function e() {
                            if (!m.isReady) {
                                try {
                                    c.doScroll("left")
                                } catch (a) {
                                    return setTimeout(e, 50)
                                }
                                I(), m.ready()
                            }
                        }()
                    }
                return H.promise(b)
            };
            var K = "undefined",
                L;
            for (L in m(k)) break;
            k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function() {
                var a, b, c, d;
                c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
            }),
                function() {
                var a = y.createElement("div");
                if (null == k.deleteExpando) {
                    k.deleteExpando = !0;
                    try {
                        delete a.test
                    } catch (b) {
                        k.deleteExpando = !1
                    }
                }
                a = null
            }(), m.acceptData = function(a) {
                var b = m.noData[(a.nodeName + " ").toLowerCase()],
                    c = +a.nodeType || 1;
                return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
            };
            var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                N = /([A-Z])/g;

            function O(a, b, c) {
                if (void 0 === c && 1 === a.nodeType) {
                    var d = "data-" + b.replace(N, "-$1").toLowerCase();
                    if (c = a.getAttribute(d), "string" == typeof c) {
                        try {
                            c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c
                        } catch (e) {}
                        m.data(a, b, c)
                    } else c = void 0
                }
                return c
            }

            function P(a) {
                var b;
                for (b in a)
                    if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
                return !0
            }

            function Q(a, b, d, e) {
                if (m.acceptData(a)) {
                    var f, g, h = m.expando,
                        i = a.nodeType,
                        j = i ? m.cache : a,
                        k = i ? a[h] : a[h] && h;
                    if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {
                        toJSON: m.noop
                    }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
                }
            }

            function R(a, b, c) {
                if (m.acceptData(a)) {
                    var d, e, f = a.nodeType,
                        g = f ? m.cache : a,
                        h = f ? a[m.expando] : m.expando;
                    if (g[h]) {
                        if (b && (d = c ? g[h] : g[h].data)) {
                            m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                            while (e--) delete d[b[e]];
                            if (c ? !P(d) : !m.isEmptyObject(d)) return
                                }(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
                    }
                }
            }
            m.extend({
                cache: {},
                noData: {
                    "applet ": !0,
                    "embed ": !0,
                    "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                },
                hasData: function(a) {
                    return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a)
                },
                data: function(a, b, c) {
                    return Q(a, b, c)
                },
                removeData: function(a, b) {
                    return R(a, b)
                },
                _data: function(a, b, c) {
                    return Q(a, b, c, !0)
                },
                _removeData: function(a, b) {
                    return R(a, b, !0)
                }
            }), m.fn.extend({
                data: function(a, b) {
                    var c, d, e, f = this[0],
                        g = f && f.attributes;
                    if (void 0 === a) {
                        if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
                            c = g.length;
                            while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
                            m._data(f, "parsedAttrs", !0)
                        }
                        return e
                    }
                    return "object" == typeof a ? this.each(function() {
                        m.data(this, a)
                    }) : arguments.length > 1 ? this.each(function() {
                        m.data(this, a, b)
                    }) : f ? O(f, a, m.data(f, a)) : void 0
                },
                removeData: function(a) {
                    return this.each(function() {
                        m.removeData(this, a)
                    })
                }
            }), m.extend({
                queue: function(a, b, c) {
                    var d;
                    return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0
                },
                dequeue: function(a, b) {
                    b = b || "fx";
                    var c = m.queue(a, b),
                        d = c.length,
                        e = c.shift(),
                        f = m._queueHooks(a, b),
                        g = function() {
                            m.dequeue(a, b)
                        };
                    "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
                },
                _queueHooks: function(a, b) {
                    var c = b + "queueHooks";
                    return m._data(a, c) || m._data(a, c, {
                        empty: m.Callbacks("once memory").add(function() {
                            m._removeData(a, b + "queue"), m._removeData(a, c)
                        })
                    })
                }
            }), m.fn.extend({
                queue: function(a, b) {
                    var c = 2;
                    return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                        var c = m.queue(this, a, b);
                        m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
                    })
                },
                dequeue: function(a) {
                    return this.each(function() {
                        m.dequeue(this, a)
                    })
                },
                clearQueue: function(a) {
                    return this.queue(a || "fx", [])
                },
                promise: function(a, b) {
                    var c, d = 1,
                        e = m.Deferred(),
                        f = this,
                        g = this.length,
                        h = function() {
                            --d || e.resolveWith(f, [f])
                        };
                    "string" != typeof a && (b = a, a = void 0), a = a || "fx";
                    while (g--) c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                    return h(), e.promise(b)
                }
            });
            var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                T = ["Top", "Right", "Bottom", "Left"],
                U = function(a, b) {
                    return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
                },
                V = m.access = function(a, b, c, d, e, f, g) {
                    var h = 0,
                        i = a.length,
                        j = null == c;
                    if ("object" === m.type(c)) {
                        e = !0;
                        for (h in c) m.access(a, b, h, c[h], !0, f, g)
                            } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                                return j.call(m(a), c)
                            })), b))
                            for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                    return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
                },
                W = /^(?:checkbox|radio)$/i;
            ! function() {
                var a = y.createElement("input"),
                    b = y.createElement("div"),
                    c = y.createDocumentFragment();
                if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
                    k.noCloneEvent = !1
                }), b.cloneNode(!0).click()), null == k.deleteExpando) {
                    k.deleteExpando = !0;
                    try {
                        delete b.test
                    } catch (d) {
                        k.deleteExpando = !1
                    }
                }
            }(),
                function() {
                var b, c, d = y.createElement("div");
                for (b in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
                d = null
            }();
            var X = /^(?:input|select|textarea)$/i,
                Y = /^key/,
                Z = /^(?:mouse|pointer|contextmenu)|click/,
                $ = /^(?:focusinfocus|focusoutblur)$/,
                _ = /^([^.]*)(?:\.(.+)|)$/;

            function ab() {
                return !0
            }

            function bb() {
                return !1
            }

            function cb() {
                try {
                    return y.activeElement
                } catch (a) {}
            }
            m.event = {
                global: {},
                add: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a);
                    if (r) {
                        c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function(a) {
                            return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
                        }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
                        while (h--) f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({
                            type: o,
                            origType: q,
                            data: d,
                            handler: c,
                            guid: c.guid,
                            selector: e,
                            needsContext: e && m.expr.match.needsContext.test(e),
                            namespace: p.join(".")
                        }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
                        a = null
                    }
                },
                remove: function(a, b, c, d, e) {
                    var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a);
                    if (r && (k = r.events)) {
                        b = (b || "").match(E) || [""], j = b.length;
                        while (j--)
                            if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                                l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
                                while (f--) g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
                                i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
                            } else
                                for (o in k) m.event.remove(a, o + b[j], c, d, !0);
                        m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
                    }
                },
                trigger: function(b, c, d, e) {
                    var f, g, h, i, k, l, n, o = [d || y],
                        p = j.call(b, "type") ? b.type : b,
                        q = j.call(b, "namespace") ? b.namespace.split(".") : [];
                    if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                        if (!e && !k.noBubble && !m.isWindow(d)) {
                            for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), l = h;
                            l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
                        }
                        n = 0;
                        while ((h = o[n++]) && !b.isPropagationStopped()) b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                        if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                            l = d[g], l && (d[g] = null), m.event.triggered = p;
                            try {
                                d[p]()
                            } catch (r) {}
                            m.event.triggered = void 0, l && (d[g] = l)
                        }
                        return b.result
                    }
                },
                dispatch: function(a) {
                    a = m.event.fix(a);
                    var b, c, e, f, g, h = [],
                        i = d.call(arguments),
                        j = (m._data(this, "events") || {})[a.type] || [],
                        k = m.event.special[a.type] || {};
                    if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                        h = m.event.handlers.call(this, a, j), b = 0;
                        while ((f = h[b++]) && !a.isPropagationStopped()) {
                            a.currentTarget = f.elem, g = 0;
                            while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
                                }
                        return k.postDispatch && k.postDispatch.call(this, a), a.result
                    }
                },
                handlers: function(a, b) {
                    var c, d, e, f, g = [],
                        h = b.delegateCount,
                        i = a.target;
                    if (h && i.nodeType && (!a.button || "click" !== a.type))
                        for (; i != this; i = i.parentNode || this)
                            if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                                for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
                                e.length && g.push({
                                    elem: i,
                                    handlers: e
                                })
                            }
                    return h < b.length && g.push({
                        elem: this,
                        handlers: b.slice(h)
                    }), g
                },
                fix: function(a) {
                    if (a[m.expando]) return a;
                    var b, c, d, e = a.type,
                        f = a,
                        g = this.fixHooks[e];
                    g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;
                    while (b--) c = d[b], a[c] = f[c];
                    return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(a, b) {
                        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(a, b) {
                        var c, d, e, f = b.button,
                            g = b.fromElement;
                        return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== cb() && this.focus) try {
                                return this.focus(), !1
                            } catch (a) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === cb() && this.blur ? (this.blur(), !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                        },
                        _default: function(a) {
                            return m.nodeName(a.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(a) {
                            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                        }
                    }
                },
                simulate: function(a, b, c, d) {
                    var e = m.extend(new m.Event, c, {
                        type: a,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
                }
            }, m.removeEvent = y.removeEventListener ? function(a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c, !1)
            } : function(a, b, c) {
                var d = "on" + b;
                a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
            }, m.Event = function(a, b) {
                return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ab : bb) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m.Event(a, b)
            }, m.Event.prototype = {
                isDefaultPrevented: bb,
                isPropagationStopped: bb,
                isImmediatePropagationStopped: bb,
                preventDefault: function() {
                    var a = this.originalEvent;
                    this.isDefaultPrevented = ab, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                },
                stopPropagation: function() {
                    var a = this.originalEvent;
                    this.isPropagationStopped = ab, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    var a = this.originalEvent;
                    this.isImmediatePropagationStopped = ab, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
                }
            }, m.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(a, b) {
                m.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function(a) {
                        var c, d = this,
                            e = a.relatedTarget,
                            f = a.handleObj;
                        return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                    }
                }
            }), k.submitBubbles || (m.event.special.submit = {
                setup: function() {
                    return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function(a) {
                        var b = a.target,
                            c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
                        c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function(a) {
                            a._submit_bubble = !0
                        }), m._data(c, "submitBubbles", !0))
                    })
                },
                postDispatch: function(a) {
                    a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
                },
                teardown: function() {
                    return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
                }
            }), k.changeBubbles || (m.event.special.change = {
                setup: function() {
                    return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function(a) {
                        "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                    }), m.event.add(this, "click._change", function(a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0)
                    })), !1) : void m.event.add(this, "beforeactivate._change", function(a) {
                        var b = a.target;
                        X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function(a) {
                            !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
                        }), m._data(b, "changeBubbles", !0))
                    })
                },
                handle: function(a) {
                    var b = a.target;
                    return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
                },
                teardown: function() {
                    return m.event.remove(this, "._change"), !X.test(this.nodeName)
                }
            }), k.focusinBubbles || m.each({
                focus: "focusin",
                blur: "focusout"
            }, function(a, b) {
                var c = function(a) {
                    m.event.simulate(b, a.target, m.event.fix(a), !0)
                };
                m.event.special[b] = {
                    setup: function() {
                        var d = this.ownerDocument || this,
                            e = m._data(d, b);
                        e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1)
                    },
                    teardown: function() {
                        var d = this.ownerDocument || this,
                            e = m._data(d, b) - 1;
                        e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
                    }
                }
            }), m.fn.extend({
                on: function(a, b, c, d, e) {
                    var f, g;
                    if ("object" == typeof a) {
                        "string" != typeof b && (c = c || b, b = void 0);
                        for (f in a) this.on(f, b, c, a[f], e);
                        return this
                    }
                    if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = bb;
                    else if (!d) return this;
                    return 1 === e && (g = d, d = function(a) {
                        return m().off(a), g.apply(this, arguments)
                    }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function() {
                        m.event.add(this, a, d, c, b)
                    })
                },
                one: function(a, b, c, d) {
                    return this.on(a, b, c, d, 1)
                },
                off: function(a, b, c) {
                    var d, e;
                    if (a && a.preventDefault && a.handleObj) return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                    if ("object" == typeof a) {
                        for (e in a) this.off(e, b, a[e]);
                        return this
                    }
                    return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = bb), this.each(function() {
                        m.event.remove(this, a, c, b)
                    })
                },
                trigger: function(a, b) {
                    return this.each(function() {
                        m.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function(a, b) {
                    var c = this[0];
                    return c ? m.event.trigger(a, b, c, !0) : void 0
                }
            });

            function db(a) {
                var b = eb.split("|"),
                    c = a.createDocumentFragment();
                if (c.createElement)
                    while (b.length) c.createElement(b.pop());
                return c
            }
            var eb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                fb = / jQuery\d+="(?:null|\d+)"/g,
                gb = new RegExp("<(?:" + eb + ")[\\s/>]", "i"),
                hb = /^\s+/,
                ib = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                jb = /<([\w:]+)/,
                kb = /<tbody/i,
                lb = /<|&#?\w+;/,
                mb = /<(?:script|style|link)/i,
                nb = /checked\s*(?:[^=]|=\s*.checked.)/i,
                ob = /^$|\/(?:java|ecma)script/i,
                pb = /^true\/(.*)/,
                qb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                rb = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    legend: [1, "<fieldset>", "</fieldset>"],
                    area: [1, "<map>", "</map>"],
                    param: [1, "<object>", "</object>"],
                    thead: [1, "<table>", "</table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                },
                sb = db(y),
                tb = sb.appendChild(y.createElement("div"));
            rb.optgroup = rb.option, rb.tbody = rb.tfoot = rb.colgroup = rb.caption = rb.thead, rb.th = rb.td;

            function ub(a, b) {
                var c, d, e = 0,
                    f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0;
                if (!f)
                    for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ub(d, b));
                return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
            }

            function vb(a) {
                W.test(a.type) && (a.defaultChecked = a.checked)
            }

            function wb(a, b) {
                return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
            }

            function xb(a) {
                return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
            }

            function yb(a) {
                var b = pb.exec(a.type);
                return b ? a.type = b[1] : a.removeAttribute("type"), a
            }

            function zb(a, b) {
                for (var c, d = 0; null != (c = a[d]); d++) m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
                    }

            function Ab(a, b) {
                if (1 === b.nodeType && m.hasData(a)) {
                    var c, d, e, f = m._data(a),
                        g = m._data(b, f),
                        h = f.events;
                    if (h) {
                        delete g.handle, g.events = {};
                        for (c in h)
                            for (d = 0, e = h[c].length; e > d; d++) m.event.add(b, c, h[c][d])
                                }
                    g.data && (g.data = m.extend({}, g.data))
                }
            }

            function Bb(a, b) {
                var c, d, e;
                if (1 === b.nodeType) {
                    if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
                        e = m._data(b);
                        for (d in e.events) m.removeEvent(b, d, e.handle);
                        b.removeAttribute(m.expando)
                    }
                    "script" === c && b.text !== a.text ? (xb(b).text = a.text, yb(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
                }
            }
            m.extend({
                clone: function(a, b, c) {
                    var d, e, f, g, h, i = m.contains(a.ownerDocument, a);
                    if (k.html5Clone || m.isXMLDoc(a) || !gb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (tb.innerHTML = a.outerHTML, tb.removeChild(f = tb.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))
                        for (d = ub(f), h = ub(a), g = 0; null != (e = h[g]); ++g) d[g] && Bb(e, d[g]);
                    if (b)
                        if (c)
                            for (h = h || ub(a), d = d || ub(f), g = 0; null != (e = h[g]); g++) Ab(e, d[g]);
                        else Ab(a, f);
                    return d = ub(f, "script"), d.length > 0 && zb(d, !i && ub(a, "script")), d = h = e = null, f
                },
                buildFragment: function(a, b, c, d) {
                    for (var e, f, g, h, i, j, l, n = a.length, o = db(b), p = [], q = 0; n > q; q++)
                        if (f = a[q], f || 0 === f)
                            if ("object" === m.type(f)) m.merge(p, f.nodeType ? [f] : f);
                            else if (lb.test(f)) {
                                h = h || o.appendChild(b.createElement("div")), i = (jb.exec(f) || ["", ""])[1].toLowerCase(), l = rb[i] || rb._default, h.innerHTML = l[1] + f.replace(ib, "<$1></$2>") + l[2], e = l[0];
                                while (e--) h = h.lastChild;
                                if (!k.leadingWhitespace && hb.test(f) && p.push(b.createTextNode(hb.exec(f)[0])), !k.tbody) {
                                    f = "table" !== i || kb.test(f) ? "<table>" !== l[1] || kb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
                                    while (e--) m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
                                        }
                                m.merge(p, h.childNodes), h.textContent = "";
                                while (h.firstChild) h.removeChild(h.firstChild);
                                h = o.lastChild
                            } else p.push(b.createTextNode(f));
                    h && o.removeChild(h), k.appendChecked || m.grep(ub(p, "input"), vb), q = 0;
                    while (f = p[q++])
                        if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ub(o.appendChild(f), "script"), g && zb(h), c)) {
                            e = 0;
                            while (f = h[e++]) ob.test(f.type || "") && c.push(f)
                                }
                    return h = null, o
                },
                cleanData: function(a, b) {
                    for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++)
                        if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
                            if (g.events)
                                for (e in g.events) n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
                            j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f))
                        }
                }
            }), m.fn.extend({
                text: function(a) {
                    return V(this, function(a) {
                        return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
                    }, null, a, arguments.length)
                },
                append: function() {
                    return this.domManip(arguments, function(a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var b = wb(this, a);
                            b.appendChild(a)
                        }
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, function(a) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var b = wb(this, a);
                            b.insertBefore(a, b.firstChild)
                        }
                    })
                },
                before: function() {
                    return this.domManip(arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this)
                    })
                },
                after: function() {
                    return this.domManip(arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                    })
                },
                remove: function(a, b) {
                    for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || m.cleanData(ub(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && zb(ub(c, "script")), c.parentNode.removeChild(c));
                    return this
                },
                empty: function() {
                    for (var a, b = 0; null != (a = this[b]); b++) {
                        1 === a.nodeType && m.cleanData(ub(a, !1));
                        while (a.firstChild) a.removeChild(a.firstChild);
                        a.options && m.nodeName(a, "select") && (a.options.length = 0)
                    }
                    return this
                },
                clone: function(a, b) {
                    return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                        return m.clone(this, a, b)
                    })
                },
                html: function(a) {
                    return V(this, function(a) {
                        var b = this[0] || {},
                            c = 0,
                            d = this.length;
                        if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fb, "") : void 0;
                        if (!("string" != typeof a || mb.test(a) || !k.htmlSerialize && gb.test(a) || !k.leadingWhitespace && hb.test(a) || rb[(jb.exec(a) || ["", ""])[1].toLowerCase()])) {
                            a = a.replace(ib, "<$1></$2>");
                            try {
                                for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ub(b, !1)), b.innerHTML = a);
                                b = 0
                            } catch (e) {}
                        }
                        b && this.empty().append(a)
                    }, null, a, arguments.length)
                },
                replaceWith: function() {
                    var a = arguments[0];
                    return this.domManip(arguments, function(b) {
                        a = this.parentNode, m.cleanData(ub(this)), a && a.replaceChild(b, this)
                    }), a && (a.length || a.nodeType) ? this : this.remove()
                },
                detach: function(a) {
                    return this.remove(a, !0)
                },
                domManip: function(a, b) {
                    a = e.apply([], a);
                    var c, d, f, g, h, i, j = 0,
                        l = this.length,
                        n = this,
                        o = l - 1,
                        p = a[0],
                        q = m.isFunction(p);
                    if (q || l > 1 && "string" == typeof p && !k.checkClone && nb.test(p)) return this.each(function(c) {
                        var d = n.eq(c);
                        q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
                    });
                    if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
                        for (g = m.map(ub(i, "script"), xb), f = g.length; l > j; j++) d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ub(d, "script"))), b.call(this[j], d, j);
                        if (f)
                            for (h = g[g.length - 1].ownerDocument, m.map(g, yb), j = 0; f > j; j++) d = g[j], ob.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qb, "")));
                        i = c = null
                    }
                    return this
                }
            }), m.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(a, b) {
                m.fn[a] = function(a) {
                    for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get());
                    return this.pushStack(e)
                }
            });
            var Cb, Db = {};

            function Eb(b, c) {
                var d, e = m(c.createElement(b)).appendTo(c.body),
                    f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");
                return e.detach(), f
            }

            function Fb(a) {
                var b = y,
                    c = Db[a];
                return c || (c = Eb(a, b), "none" !== c && c || (Cb = (Cb || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Cb[0].contentWindow || Cb[0].contentDocument).document, b.write(), b.close(), c = Eb(a, b), Cb.detach()), Db[a] = c), c
            }! function() {
                var a;
                k.shrinkWrapBlocks = function() {
                    if (null != a) return a;
                    a = !1;
                    var b, c, d;
                    return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
                }
            }();
            var Gb = /^margin/,
                Hb = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
                Ib, Jb, Kb = /^(top|right|bottom|left)$/;
            a.getComputedStyle ? (Ib = function(b) {
                return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
            }, Jb = function(a, b, c) {
                var d, e, f, g, h = a.style;
                return c = c || Ib(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Hb.test(g) && Gb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
            }) : y.documentElement.currentStyle && (Ib = function(a) {
                return a.currentStyle
            }, Jb = function(a, b, c) {
                var d, e, f, g, h = a.style;
                return c = c || Ib(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Hb.test(g) && !Kb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
            });

            function Lb(a, b) {
                return {
                    get: function() {
                        var c = a();
                        if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
                            }
                }
            }! function() {
                var b, c, d, e, f, g, h;
                if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
                    c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !!c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, {
                        reliableHiddenOffsets: function() {
                            return null == g && i(), g
                        },
                        boxSizingReliable: function() {
                            return null == f && i(), f
                        },
                        pixelPosition: function() {
                            return null == e && i(), e
                        },
                        reliableMarginRight: function() {
                            return null == h && i(), h
                        }
                    });

                    function i() {
                        var b, c, d, i;
                        c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || {
                            width: "4px"
                        }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight), b.removeChild(i)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
                    }
                }
            }(), m.swap = function(a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            };
            var Mb = /alpha\([^)]*\)/i,
                Nb = /opacity\s*=\s*([^)]*)/,
                Ob = /^(none|table(?!-c[ea]).+)/,
                Pb = new RegExp("^(" + S + ")(.*)$", "i"),
                Qb = new RegExp("^([+-])=(" + S + ")", "i"),
                Rb = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                Sb = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                Tb = ["Webkit", "O", "Moz", "ms"];

            function Ub(a, b) {
                if (b in a) return b;
                var c = b.charAt(0).toUpperCase() + b.slice(1),
                    d = b,
                    e = Tb.length;
                while (e--)
                    if (b = Tb[e] + c, b in a) return b;
                return d
            }

            function Vb(a, b) {
                for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fb(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
                for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
                return a
            }

            function Wb(a, b, c) {
                var d = Pb.exec(b);
                return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
            }

            function Xb(a, b, c, d, e) {
                for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
                return g
            }

            function Yb(a, b, c) {
                var d = !0,
                    e = "width" === b ? a.offsetWidth : a.offsetHeight,
                    f = Ib(a),
                    g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
                if (0 >= e || null == e) {
                    if (e = Jb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Hb.test(e)) return e;
                    d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
                }
                return e + Xb(a, b, c || (g ? "border" : "content"), d, f) + "px"
            }
            m.extend({
                cssHooks: {
                    opacity: {
                        get: function(a, b) {
                            if (b) {
                                var c = Jb(a, "opacity");
                                return "" === c ? "1" : c
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": k.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function(a, b, c, d) {
                    if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                        var e, f, g, h = m.camelCase(b),
                            i = a.style;
                        if (b = m.cssProps[h] || (m.cssProps[h] = Ub(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                        if (f = typeof c, "string" === f && (e = Qb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                            i[b] = c
                        } catch (j) {}
                    }
                },
                css: function(a, b, c, d) {
                    var e, f, g, h = m.camelCase(b);
                    return b = m.cssProps[h] || (m.cssProps[h] = Ub(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Jb(a, b, d)), "normal" === f && b in Sb && (f = Sb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
                }
            }), m.each(["height", "width"], function(a, b) {
                m.cssHooks[b] = {
                    get: function(a, c, d) {
                        return c ? Ob.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Rb, function() {
                            return Yb(a, b, d)
                        }) : Yb(a, b, d) : void 0
                    },
                    set: function(a, c, d) {
                        var e = d && Ib(a);
                        return Wb(a, c, d ? Xb(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0)
                    }
                }
            }), k.opacity || (m.cssHooks.opacity = {
                get: function(a, b) {
                    return Nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
                },
                set: function(a, b) {
                    var c = a.style,
                        d = a.currentStyle,
                        e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                        f = d && d.filter || c.filter || "";
                    c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Mb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Mb.test(f) ? f.replace(Mb, e) : f + " " + e)
                }
            }), m.cssHooks.marginRight = Lb(k.reliableMarginRight, function(a, b) {
                return b ? m.swap(a, {
                    display: "inline-block"
                }, Jb, [a, "marginRight"]) : void 0
            }), m.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(a, b) {
                m.cssHooks[a + b] = {
                    expand: function(c) {
                        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
                        return e
                    }
                }, Gb.test(a) || (m.cssHooks[a + b].set = Wb)
            }), m.fn.extend({
                css: function(a, b) {
                    return V(this, function(a, b, c) {
                        var d, e, f = {},
                            g = 0;
                        if (m.isArray(b)) {
                            for (d = Ib(a), e = b.length; e > g; g++) f[b[g]] = m.css(a, b[g], !1, d);
                            return f
                        }
                        return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
                    }, a, b, arguments.length > 1)
                },
                show: function() {
                    return Vb(this, !0)
                },
                hide: function() {
                    return Vb(this)
                },
                toggle: function(a) {
                    return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                        U(this) ? m(this).show() : m(this).hide()
                    })
                }
            });

            function Zb(a, b, c, d, e) {
                return new Zb.prototype.init(a, b, c, d, e)
            }
            m.Tween = Zb, Zb.prototype = {
                constructor: Zb,
                init: function(a, b, c, d, e, f) {
                    this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px")
                },
                cur: function() {
                    var a = Zb.propHooks[this.prop];
                    return a && a.get ? a.get(this) : Zb.propHooks._default.get(this)
                },
                run: function(a) {
                    var b, c = Zb.propHooks[this.prop];
                    return this.pos = b = this.options.duration ? m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Zb.propHooks._default.set(this), this
                }
            }, Zb.prototype.init.prototype = Zb.prototype, Zb.propHooks = {
                _default: {
                    get: function(a) {
                        var b;
                        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
                    },
                    set: function(a) {
                        m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                    }
                }
            }, Zb.propHooks.scrollTop = Zb.propHooks.scrollLeft = {
                set: function(a) {
                    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                }
            }, m.easing = {
                linear: function(a) {
                    return a
                },
                swing: function(a) {
                    return .5 - Math.cos(a * Math.PI) / 2
                }
            }, m.fx = Zb.prototype.init, m.fx.step = {};
            var $b, _b, ac = /^(?:toggle|show|hide)$/,
                bc = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
                cc = /queueHooks$/,
                dc = [ic],
                ec = {
                    "*": [function(a, b) {
                        var c = this.createTween(a, b),
                            d = c.cur(),
                            e = bc.exec(b),
                            f = e && e[3] || (m.cssNumber[a] ? "" : "px"),
                            g = (m.cssNumber[a] || "px" !== f && +d) && bc.exec(m.css(c.elem, a)),
                            h = 1,
                            i = 20;
                        if (g && g[3] !== f) {
                            f = f || g[3], e = e || [], g = +d || 1;
                            do h = h || ".5", g /= h, m.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                                }
                                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
                        }]
                    };

                          function fc() {
                          return setTimeout(function() {
                          $b = void 0
                          }), $b = m.now()
                          }

                          function gc(a, b) {
                          var c, d = {
                          height: a
                          },
                          e = 0;
                          for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = T[e], d["margin" + c] = d["padding" + c] = a;
                    return b && (d.opacity = d.width = a), d
                }

            function hc(a, b, c) {
                for (var d, e = (ec[b] || []).concat(ec["*"]), f = 0, g = e.length; g > f; f++)
                    if (d = e[f].call(c, b, a)) return d
                        }

            function ic(a, b, c) {
                var d, e, f, g, h, i, j, l, n = this,
                    o = {},
                    p = a.style,
                    q = a.nodeType && U(a),
                    r = m._data(a, "fxshow");
                c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
                    h.unqueued || i()
                }), h.unqueued++, n.always(function() {
                    n.always(function() {
                        h.unqueued--, m.queue(a, "fx").length || h.empty.fire()
                    })
                })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fb(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fb(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function() {
                    p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
                }));
                for (d in b)
                    if (e = b[d], ac.exec(e)) {
                        if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                            if ("show" !== e || !r || void 0 === r[d]) continue;
                            q = !0
                        }
                        o[d] = r && r[d] || m.style(a, d)
                    } else j = void 0;
                if (m.isEmptyObject(o)) "inline" === ("none" === j ? Fb(a.nodeName) : j) && (p.display = j);
                else {
                    r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function() {
                        m(a).hide()
                    }), n.done(function() {
                        var b;
                        m._removeData(a, "fxshow");
                        for (b in o) m.style(a, b, o[b])
                            });
                    for (d in o) g = hc(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
                        }
            }

            function jc(a, b) {
                var c, d, e, f, g;
                for (c in a)
                    if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
                        f = g.expand(f), delete a[d];
                        for (c in f) c in a || (a[c] = f[c], b[c] = e)
                            } else b[d] = e
                                }

            function kc(a, b, c) {
                var d, e, f = 0,
                    g = dc.length,
                    h = m.Deferred().always(function() {
                        delete i.elem
                    }),
                    i = function() {
                        if (e) return !1;
                        for (var b = $b || fc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
                    },
                    j = h.promise({
                        elem: a,
                        props: m.extend({}, b),
                        opts: m.extend(!0, {
                            specialEasing: {}
                        }, c),
                        originalProperties: b,
                        originalOptions: c,
                        startTime: $b || fc(),
                        duration: c.duration,
                        tweens: [],
                        createTween: function(b, c) {
                            var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                            return j.tweens.push(d), d
                        },
                        stop: function(b) {
                            var c = 0,
                                d = b ? j.tweens.length : 0;
                            if (e) return this;
                            for (e = !0; d > c; c++) j.tweens[c].run(1);
                            return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                        }
                    }),
                    k = j.props;
                for (jc(k, j.opts.specialEasing); g > f; f++)
                if (d = dc[f].call(j, a, k, j.opts)) return d;
                return m.map(k, hc, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {
                    elem: a,
                    anim: j,
                    queue: j.opts.queue
                })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
            }
            m.Animation = m.extend(kc, {
                tweener: function(a, b) {
                    m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                    for (var c, d = 0, e = a.length; e > d; d++) c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b)
                        },
                prefilter: function(a, b) {
                    b ? dc.unshift(a) : dc.push(a)
                }
            }), m.speed = function(a, b, c) {
                var d = a && "object" == typeof a ? m.extend({}, a) : {
                    complete: c || !c && b || m.isFunction(a) && a,
                    duration: a,
                    easing: c && b || b && !m.isFunction(b) && b
                };
                return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                    m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue)
                }, d
            }, m.fn.extend({
                fadeTo: function(a, b, c, d) {
                    return this.filter(U).css("opacity", 0).show().end().animate({
                        opacity: b
                    }, a, c, d)
                },
                animate: function(a, b, c, d) {
                    var e = m.isEmptyObject(a),
                        f = m.speed(b, c, d),
                        g = function() {
                            var b = kc(this, m.extend({}, a), f);
                            (e || m._data(this, "finish")) && b.stop(!0)
                        };
                    return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                },
                stop: function(a, b, c) {
                    var d = function(a) {
                        var b = a.stop;
                        delete a.stop, b(c)
                    };
                    return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = m.timers,
                            g = m._data(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g) g[e] && g[e].stop && cc.test(e) && d(g[e]);
                        for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                        (b || !c) && m.dequeue(this, a)
                    })
                },
                finish: function(a) {
                    return a !== !1 && (a = a || "fx"), this.each(function() {
                        var b, c = m._data(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = m.timers,
                            g = d ? d.length : 0;
                        for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish
                    })
                }
            }), m.each(["toggle", "show", "hide"], function(a, b) {
                var c = m.fn[b];
                m.fn[b] = function(a, d, e) {
                    return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gc(b, !0), a, d, e)
                }
            }), m.each({
                slideDown: gc("show"),
                slideUp: gc("hide"),
                slideToggle: gc("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(a, b) {
                m.fn[a] = function(a, c, d) {
                    return this.animate(b, a, c, d)
                }
            }), m.timers = [], m.fx.tick = function() {
                var a, b = m.timers,
                    c = 0;
                for ($b = m.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
                b.length || m.fx.stop(), $b = void 0
            }, m.fx.timer = function(a) {
                m.timers.push(a), a() ? m.fx.start() : m.timers.pop()
            }, m.fx.interval = 13, m.fx.start = function() {
                _b || (_b = setInterval(m.fx.tick, m.fx.interval))
            }, m.fx.stop = function() {
                clearInterval(_b), _b = null
            }, m.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, m.fn.delay = function(a, b) {
                return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                    var d = setTimeout(b, a);
                    c.stop = function() {
                        clearTimeout(d)
                    }
                })
            },
                function() {
                var a, b, c, d, e;
                b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value
            }();
            var lc = /\r/g;
            m.fn.extend({
                val: function(a) {
                    var b, c, d, e = this[0]; {
                        if (arguments.length) return d = m.isFunction(a), this.each(function(c) {
                            var e;
                            1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function(a) {
                                return null == a ? "" : a + ""
                            })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                        });
                        if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lc, "") : null == c ? "" : c)
                    }
                }
            }), m.extend({
                valHooks: {
                    option: {
                        get: function(a) {
                            var b = m.find.attr(a, "value");
                            return null != b ? b : m.trim(m.text(a))
                        }
                    },
                    select: {
                        get: function(a) {
                            for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                                if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
                                    if (b = m(c).val(), f) return b;
                                    g.push(b)
                                }
                            return g
                        },
                        set: function(a, b) {
                            var c, d, e = a.options,
                                f = m.makeArray(b),
                                g = e.length;
                            while (g--)
                                if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try {
                                    d.selected = c = !0
                                } catch (h) {
                                    d.scrollHeight
                                } else d.selected = !1;
                            return c || (a.selectedIndex = -1), e
                        }
                    }
                }
            }), m.each(["radio", "checkbox"], function() {
                m.valHooks[this] = {
                    set: function(a, b) {
                        return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
                    }
                }, k.checkOn || (m.valHooks[this].get = function(a) {
                    return null === a.getAttribute("value") ? "on" : a.value
                })
            });
            var mc, nc, oc = m.expr.attrHandle,
                pc = /^(?:checked|selected)$/i,
                qc = k.getSetAttribute,
                rc = k.input;
            m.fn.extend({
                attr: function(a, b) {
                    return V(this, m.attr, a, b, arguments.length > 1)
                },
                removeAttr: function(a) {
                    return this.each(function() {
                        m.removeAttr(this, a)
                    })
                }
            }), m.extend({
                attr: function(a, b, c) {
                    var d, e, f = a.nodeType;
                    if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nc : mc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
                },
                removeAttr: function(a, b) {
                    var c, d, e = 0,
                        f = b && b.match(E);
                    if (f && 1 === a.nodeType)
                        while (c = f[e++]) d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rc && qc || !pc.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qc ? c : d)
                            },
                attrHooks: {
                    type: {
                        set: function(a, b) {
                            if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
                                var c = a.value;
                                return a.setAttribute("type", b), c && (a.value = c), b
                            }
                        }
                    }
                }
            }), nc = {
                set: function(a, b, c) {
                    return b === !1 ? m.removeAttr(a, c) : rc && qc || !pc.test(c) ? a.setAttribute(!qc && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
                }
            }, m.each(m.expr.match.bool.source.match(/\w+/g), function(a, b) {
                var c = oc[b] || m.find.attr;
                oc[b] = rc && qc || !pc.test(b) ? function(a, b, d) {
                    var e, f;
                    return d || (f = oc[b], oc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, oc[b] = f), e
                } : function(a, b, c) {
                    return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
                }
            }), rc && qc || (m.attrHooks.value = {
                set: function(a, b, c) {
                    return m.nodeName(a, "input") ? void(a.defaultValue = b) : mc && mc.set(a, b, c)
                }
            }), qc || (mc = {
                set: function(a, b, c) {
                    var d = a.getAttributeNode(c);
                    return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
                }
            }, oc.id = oc.name = oc.coords = function(a, b, c) {
                var d;
                return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
            }, m.valHooks.button = {
                get: function(a, b) {
                    var c = a.getAttributeNode(b);
                    return c && c.specified ? c.value : void 0
                },
                set: mc.set
            }, m.attrHooks.contenteditable = {
                set: function(a, b, c) {
                    mc.set(a, "" === b ? !1 : b, c)
                }
            }, m.each(["width", "height"], function(a, b) {
                m.attrHooks[b] = {
                    set: function(a, c) {
                        return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
                    }
                }
            })), k.style || (m.attrHooks.style = {
                get: function(a) {
                    return a.style.cssText || void 0
                },
                set: function(a, b) {
                    return a.style.cssText = b + ""
                }
            });
            var sc = /^(?:input|select|textarea|button|object)$/i,
                tc = /^(?:a|area)$/i;
            m.fn.extend({
                prop: function(a, b) {
                    return V(this, m.prop, a, b, arguments.length > 1)
                },
                removeProp: function(a) {
                    return a = m.propFix[a] || a, this.each(function() {
                        try {
                            this[a] = void 0, delete this[a]
                        } catch (b) {}
                    })
                }
            }), m.extend({
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                },
                prop: function(a, b, c) {
                    var d, e, f, g = a.nodeType;
                    if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
                },
                propHooks: {
                    tabIndex: {
                        get: function(a) {
                            var b = m.find.attr(a, "tabindex");
                            return b ? parseInt(b, 10) : sc.test(a.nodeName) || tc.test(a.nodeName) && a.href ? 0 : -1
                        }
                    }
                }
            }), k.hrefNormalized || m.each(["href", "src"], function(a, b) {
                m.propHooks[b] = {
                    get: function(a) {
                        return a.getAttribute(b, 4)
                    }
                }
            }), k.optSelected || (m.propHooks.selected = {
                get: function(a) {
                    var b = a.parentNode;
                    return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
                }
            }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                m.propFix[this.toLowerCase()] = this
            }), k.enctype || (m.propFix.enctype = "encoding");
            var uc = /[\t\r\n\f]/g;
            m.fn.extend({
                addClass: function(a) {
                    var b, c, d, e, f, g, h = 0,
                        i = this.length,
                        j = "string" == typeof a && a;
                    if (m.isFunction(a)) return this.each(function(b) {
                        m(this).addClass(a.call(this, b, this.className))
                    });
                    if (j)
                        for (b = (a || "").match(E) || []; i > h; h++)
                            if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : " ")) {
                                f = 0;
                                while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                                g = m.trim(d), c.className !== g && (c.className = g)
                            }
                    return this
                },
                removeClass: function(a) {
                    var b, c, d, e, f, g, h = 0,
                        i = this.length,
                        j = 0 === arguments.length || "string" == typeof a && a;
                    if (m.isFunction(a)) return this.each(function(b) {
                        m(this).removeClass(a.call(this, b, this.className))
                    });
                    if (j)
                        for (b = (a || "").match(E) || []; i > h; h++)
                            if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : "")) {
                                f = 0;
                                while (e = b[f++])
                                    while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                                g = a ? m.trim(d) : "", c.className !== g && (c.className = g)
                            }
                    return this
                },
                toggleClass: function(a, b) {
                    var c = typeof a;
                    return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function(c) {
                        m(this).toggleClass(a.call(this, c, this.className, b), b)
                    } : function() {
                        if ("string" === c) {
                            var b, d = 0,
                                e = m(this),
                                f = a.match(E) || [];
                            while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                                } else(c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
                                    })
                },
                hasClass: function(a) {
                    for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(uc, " ").indexOf(b) >= 0) return !0;
                    return !1
                }
            }), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
                m.fn[b] = function(a, c) {
                    return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                }
            }), m.fn.extend({
                hover: function(a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                },
                bind: function(a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function(a, b) {
                    return this.off(a, null, b)
                },
                delegate: function(a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function(a, b, c) {
                    return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                }
            });
            var vc = m.now(),
                wc = /\?/,
                xc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            m.parseJSON = function(b) {
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
                var c, d = null,
                    e = m.trim(b + "");
                return e && !m.trim(e.replace(xc, function(a, b, e, f) {
                    return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
                })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
            }, m.parseXML = function(b) {
                var c, d;
                if (!b || "string" != typeof b) return null;
                try {
                    a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
                } catch (e) {
                    c = void 0
                }
                return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c
            };
            var yc, zc, Ac = /#.*$/,
                Bc = /([?&])_=[^&]*/,
                Cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
                Dc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                Ec = /^(?:GET|HEAD)$/,
                Fc = /^\/\//,
                Gc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                Hc = {},
                Ic = {},
                Jc = "*/".concat("*");
            try {
                zc = location.href
            } catch (Kc) {
                zc = y.createElement("a"), zc.href = "", zc = zc.href
            }
            yc = Gc.exec(zc.toLowerCase()) || [];

            function Lc(a) {
                return function(b, c) {
                    "string" != typeof b && (c = b, b = "*");
                    var d, e = 0,
                        f = b.toLowerCase().match(E) || [];
                    if (m.isFunction(c))
                        while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
                            }
            }

            function Mc(a, b, c, d) {
                var e = {},
                    f = a === Ic;

                function g(h) {
                    var i;
                    return e[h] = !0, m.each(a[h] || [], function(a, h) {
                        var j = h(b, c, d);
                        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
                    }), i
                }
                return g(b.dataTypes[0]) || !e["*"] && g("*")
            }

            function Nc(a, b) {
                var c, d, e = m.ajaxSettings.flatOptions || {};
                for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
                return c && m.extend(!0, a, c), a
            }

            function Oc(a, b, c) {
                var d, e, f, g, h = a.contents,
                    i = a.dataTypes;
                while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
                if (e)
                    for (g in h)
                        if (h[g] && h[g].test(e)) {
                            i.unshift(g);
                            break
                        }
                if (i[0] in c) f = i[0];
                else {
                    for (g in c) {
                        if (!i[0] || a.converters[g + " " + i[0]]) {
                            f = g;
                            break
                        }
                        d || (d = g)
                    }
                    f = f || d
                }
                return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
            }

            function Pc(a, b, c, d) {
                var e, f, g, h, i, j = {},
                    k = a.dataTypes.slice();
                if (k[1])
                    for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
                f = k.shift();
                while (f)
                    if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                        if ("*" === f) f = i;
                        else if ("*" !== i && i !== f) {
                            if (g = j[i + " " + f] || j["* " + f], !g)
                                for (e in j)
                                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                                        break
                                    }
                            if (g !== !0)
                                if (g && a["throws"]) b = g(b);
                                else try {
                                    b = g(b)
                                } catch (l) {
                                    return {
                                        state: "parsererror",
                                        error: g ? l : "No conversion from " + i + " to " + f
                                    }
                                }
                        }
                return {
                    state: "success",
                    data: b
                }
            }
            m.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: zc,
                    type: "GET",
                    isLocal: Dc.test(yc[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Jc,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": m.parseJSON,
                        "text xml": m.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(a, b) {
                    return b ? Nc(Nc(a, m.ajaxSettings), b) : Nc(m.ajaxSettings, a)
                },
                ajaxPrefilter: Lc(Hc),
                ajaxTransport: Lc(Ic),
                ajax: function(a, b) {
                    "object" == typeof a && (b = a, a = void 0), b = b || {};
                    var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b),
                        l = k.context || k,
                        n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
                        o = m.Deferred(),
                        p = m.Callbacks("once memory"),
                        q = k.statusCode || {},
                        r = {},
                        s = {},
                        t = 0,
                        u = "canceled",
                        v = {
                            readyState: 0,
                            getResponseHeader: function(a) {
                                var b;
                                if (2 === t) {
                                    if (!j) {
                                        j = {};
                                        while (b = Cc.exec(f)) j[b[1].toLowerCase()] = b[2]
                                            }
                                    b = j[a.toLowerCase()]
                                }
                                return null == b ? null : b
                            },
                            getAllResponseHeaders: function() {
                                return 2 === t ? f : null
                            },
                            setRequestHeader: function(a, b) {
                                var c = a.toLowerCase();
                                return t || (a = s[c] = s[c] || a, r[a] = b), this
                            },
                            overrideMimeType: function(a) {
                                return t || (k.mimeType = a), this
                            },
                            statusCode: function(a) {
                                var b;
                                if (a)
                                    if (2 > t)
                                        for (b in a) q[b] = [q[b], a[b]];
                                    else v.always(a[v.status]);
                                return this
                            },
                            abort: function(a) {
                                var b = a || u;
                                return i && i.abort(b), x(0, b), this
                            }
                        };
                    if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zc) + "").replace(Ac, "").replace(Fc, yc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yc[1] && c[2] === yc[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yc[3] || ("http:" === yc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mc(Hc, k, b, v), 2 === t) return v;
                    h = m.event && k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Ec.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wc.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bc.test(e) ? e.replace(Bc, "$1_=" + vc++) : e + (wc.test(e) ? "&" : "?") + "_=" + vc++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jc + "; q=0.01" : "") : k.accepts["*"]);
                    for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
                    if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
                    u = "abort";
                    for (d in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) v[d](k[d]);
                    if (i = Mc(Ic, k, b, v)) {
                        v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                            v.abort("timeout")
                        }, k.timeout));
                        try {
                            t = 1, i.send(r, x)
                        } catch (w) {
                            if (!(2 > t)) throw w;
                            x(-1, w)
                        }
                    } else x(-1, "No Transport");

                    function x(a, b, c, d) {
                        var j, r, s, u, w, x = b;
                        2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Oc(k, v, c)), u = Pc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
                    }
                    return v
                },
                getJSON: function(a, b, c) {
                    return m.get(a, b, c, "json")
                },
                getScript: function(a, b) {
                    return m.get(a, void 0, b, "script")
                }
            }), m.each(["get", "post"], function(a, b) {
                m[b] = function(a, c, d, e) {
                    return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
                        url: a,
                        type: b,
                        dataType: e,
                        data: c,
                        success: d
                    })
                }
            }), m._evalUrl = function(a) {
                return m.ajax({
                    url: a,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }, m.fn.extend({
                wrapAll: function(a) {
                    if (m.isFunction(a)) return this.each(function(b) {
                        m(this).wrapAll(a.call(this, b))
                    });
                    if (this[0]) {
                        var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                            var a = this;
                            while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                            return a
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(a) {
                    return this.each(m.isFunction(a) ? function(b) {
                        m(this).wrapInner(a.call(this, b))
                    } : function() {
                        var b = m(this),
                            c = b.contents();
                        c.length ? c.wrapAll(a) : b.append(a)
                    })
                },
                wrap: function(a) {
                    var b = m.isFunction(a);
                    return this.each(function(c) {
                        m(this).wrapAll(b ? a.call(this, c) : a)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), m.expr.filters.hidden = function(a) {
                return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"))
            }, m.expr.filters.visible = function(a) {
                return !m.expr.filters.hidden(a)
            };
            var Qc = /%20/g,
                Rc = /\[\]$/,
                Sc = /\r?\n/g,
                Tc = /^(?:submit|button|image|reset|file)$/i,
                Uc = /^(?:input|select|textarea|keygen)/i;

            function Vc(a, b, c, d) {
                var e;
                if (m.isArray(b)) m.each(b, function(b, e) {
                    c || Rc.test(a) ? d(a, e) : Vc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
                });
                else if (c || "object" !== m.type(b)) d(a, b);
                else
                    for (e in b) Vc(a + "[" + e + "]", b[e], c, d)
                        }
            m.param = function(a, b) {
                var c, d = [],
                    e = function(a, b) {
                        b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                    };
                if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a)) m.each(a, function() {
                    e(this.name, this.value)
                });
                else
                    for (c in a) Vc(c, a[c], b, e);
                return d.join("&").replace(Qc, "+")
            }, m.fn.extend({
                serialize: function() {
                    return m.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var a = m.prop(this, "elements");
                        return a ? m.makeArray(a) : this
                    }).filter(function() {
                        var a = this.type;
                        return this.name && !m(this).is(":disabled") && Uc.test(this.nodeName) && !Tc.test(a) && (this.checked || !W.test(a))
                    }).map(function(a, b) {
                        var c = m(this).val();
                        return null == c ? null : m.isArray(c) ? m.map(c, function(a) {
                            return {
                                name: b.name,
                                value: a.replace(Sc, "\r\n")
                            }
                        }) : {
                            name: b.name,
                            value: c.replace(Sc, "\r\n")
                        }
                    }).get()
                }
            }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
                return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zc() || $c()
            } : Zc;
            var Wc = 0,
                Xc = {},
                Yc = m.ajaxSettings.xhr();
            a.attachEvent && a.attachEvent("onunload", function() {
                for (var a in Xc) Xc[a](void 0, !0)
                    }), k.cors = !!Yc && "withCredentials" in Yc, Yc = k.ajax = !!Yc, Yc && m.ajaxTransport(function(a) {
                if (!a.crossDomain || k.cors) {
                    var b;
                    return {
                        send: function(c, d) {
                            var e, f = a.xhr(),
                                g = ++Wc;
                            if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                                for (e in a.xhrFields) f[e] = a.xhrFields[e];
                            a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                            for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                            f.send(a.hasContent && a.data || null), b = function(c, e) {
                                var h, i, j;
                                if (b && (e || 4 === f.readyState))
                                    if (delete Xc[g], b = void 0, f.onreadystatechange = m.noop, e) 4 !== f.readyState && f.abort();
                                    else {
                                        j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                                        try {
                                            i = f.statusText
                                        } catch (k) {
                                            i = ""
                                        }
                                        h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                                    }
                                j && d(h, i, j, f.getAllResponseHeaders())
                            }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xc[g] = b : b()
                        },
                        abort: function() {
                            b && b(void 0, !0)
                        }
                    }
                }
            });

            function Zc() {
                try {
                    return new a.XMLHttpRequest
                } catch (b) {}
            }

            function $c() {
                try {
                    return new a.ActiveXObject("Microsoft.XMLHTTP")
                } catch (b) {}
            }
            m.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function(a) {
                        return m.globalEval(a), a
                    }
                }
            }), m.ajaxPrefilter("script", function(a) {
                void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
            }), m.ajaxTransport("script", function(a) {
                if (a.crossDomain) {
                    var b, c = y.head || m("head")[0] || y.documentElement;
                    return {
                        send: function(d, e) {
                            b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                                (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                            }, c.insertBefore(b, c.firstChild)
                        },
                        abort: function() {
                            b && b.onload(void 0, !0)
                        }
                    }
                }
            });
            var _c = [],
                ad = /(=)\?(?=&|$)|\?\?/;
            m.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var a = _c.pop() || m.expando + "_" + vc++;
                    return this[a] = !0, a
                }
            }), m.ajaxPrefilter("json jsonp", function(b, c, d) {
                var e, f, g, h = b.jsonp !== !1 && (ad.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ad.test(b.data) && "data");
                return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ad, "$1" + e) : b.jsonp !== !1 && (b.url += (wc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
                    return g || m.error(e + " was not called"), g[0]
                }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
                    g = arguments
                }, d.always(function() {
                    a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _c.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0
                }), "script") : void 0
            }), m.parseHTML = function(a, b, c) {
                if (!a || "string" != typeof a) return null;
                "boolean" == typeof b && (c = b, b = !1), b = b || y;
                var d = u.exec(a),
                    e = !c && [];
                return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
            };
            var bd = m.fn.load;
            m.fn.load = function(a, b, c) {
                if ("string" != typeof a && bd) return bd.apply(this, arguments);
                var d, e, f, g = this,
                    h = a.indexOf(" ");
                return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
                    url: a,
                    type: f,
                    dataType: "html",
                    data: b
                }).done(function(a) {
                    e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
                }).complete(c && function(a, b) {
                    g.each(c, e || [a.responseText, b, a])
                }), this
            }, m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
                m.fn[b] = function(a) {
                    return this.on(b, a)
                }
            }), m.expr.filters.animated = function(a) {
                return m.grep(m.timers, function(b) {
                    return a === b.elem
                }).length
            };
            var cd = a.document.documentElement;

            function dd(a) {
                return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
            }
            m.offset = {
                setOffset: function(a, b, c) {
                    var d, e, f, g, h, i, j, k = m.css(a, "position"),
                        l = m(a),
                        n = {};
                    "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using" in b ? b.using.call(a, n) : l.css(n)
                }
            }, m.fn.extend({
                offset: function(a) {
                    if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                        m.offset.setOffset(this, a, b)
                    });
                    var b, c, d = {
                        top: 0,
                        left: 0
                    },
                        e = this[0],
                        f = e && e.ownerDocument;
                    if (f) return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dd(f), {
                        top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                        left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                    }) : d
                        },
                position: function() {
                    if (this[0]) {
                        var a, b, c = {
                            top: 0,
                            left: 0
                        },
                            d = this[0];
                        return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {
                            top: b.top - c.top - m.css(d, "marginTop", !0),
                            left: b.left - c.left - m.css(d, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        var a = this.offsetParent || cd;
                        while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position")) a = a.offsetParent;
                        return a || cd
                    })
                }
            }), m.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(a, b) {
                var c = /Y/.test(b);
                m.fn[a] = function(d) {
                    return V(this, function(a, d, e) {
                        var f = dd(a);
                        return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
                    }, a, d, arguments.length, null)
                }
            }), m.each(["top", "left"], function(a, b) {
                m.cssHooks[b] = Lb(k.pixelPosition, function(a, c) {
                    return c ? (c = Jb(a, b), Hb.test(c) ? m(a).position()[b] + "px" : c) : void 0
                })
            }), m.each({
                Height: "height",
                Width: "width"
            }, function(a, b) {
                m.each({
                    padding: "inner" + a,
                    content: b,
                    "": "outer" + a
                }, function(c, d) {
                    m.fn[d] = function(d, e) {
                        var f = arguments.length && (c || "boolean" != typeof d),
                            g = c || (d === !0 || e === !0 ? "margin" : "border");
                        return V(this, function(b, c, d) {
                            var e;
                            return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
                        }, b, f ? d : void 0, f, null)
                    }
                })
            }), m.fn.size = function() {
                return this.length
            }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return m
            });
            var ed = a.jQuery,
                fd = a.$;
            return m.noConflict = function(b) {
                return a.$ === m && (a.$ = fd), b && a.jQuery === m && (a.jQuery = ed), m
            }, typeof b === K && (a.jQuery = a.$ = m), m
        });

        if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
            "use strict";
            var b = a.fn.jquery.split(" ")[0].split(".");
            if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
                }(jQuery), + function(a) {
            "use strict";

            function b() {
                var a = document.createElement("bootstrap"),
                    b = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                for (var c in b)
                    if (void 0 !== a.style[c]) return {
                        end: b[c]
                    };
                return !1
            }
            a.fn.emulateTransitionEnd = function(b) {
                var c = !1,
                    d = this;
                a(this).one("bsTransitionEnd", function() {
                    c = !0
                });
                var e = function() {
                    c || a(d).trigger(a.support.transition.end)
                };
                return setTimeout(e, b), this
            }, a(function() {
                a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
                    bindType: a.support.transition.end,
                    delegateType: a.support.transition.end,
                    handle: function(b) {
                        return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
                    }
                })
            })
        }(jQuery), + function(a) {
            "use strict";

            function b(b) {
                return this.each(function() {
                    var c = a(this),
                        e = c.data("bs.alert");
                    e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
                })
            }
            var c = '[data-dismiss="alert"]',
                d = function(b) {
                    a(b).on("click", c, this.close)
                };
            d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
                function c() {
                    g.detach().trigger("closed.bs.alert").remove()
                }
                var e = a(this),
                    f = e.attr("data-target");
                f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
                var g = a(f);
                b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
            };
            var e = a.fn.alert;
            a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
                return a.fn.alert = e, this
            }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
        }(jQuery), + function(a) {
            "use strict";

            function b(b) {
                return this.each(function() {
                    var d = a(this),
                        e = d.data("bs.button"),
                        f = "object" == typeof b && b;
                    e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
                })
            }
            var c = function(b, d) {
                this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
            };
            c.VERSION = "3.3.4", c.DEFAULTS = {
                loadingText: "loading..."
            }, c.prototype.setState = function(b) {
                var c = "disabled",
                    d = this.$element,
                    e = d.is("input") ? "val" : "html",
                    f = d.data();
                b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
                    d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
                }, this), 0)
            }, c.prototype.toggle = function() {
                var a = !0,
                    b = this.$element.closest('[data-toggle="buttons"]');
                if (b.length) {
                    var c = this.$element.find("input");
                    "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
                } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
                a && this.$element.toggleClass("active")
            };
            var d = a.fn.button;
            a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
                return a.fn.button = d, this
            }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
                var d = a(c.target);
                d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
            }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
                a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
            })
        }(jQuery), + function(a) {
            "use strict";

            function b(b) {
                return this.each(function() {
                    var d = a(this),
                        e = d.data("bs.carousel"),
                        f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                        g = "string" == typeof b ? b : f.slide;
                    e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
                })
            }
            var c = function(b, c) {
                this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
            };
            c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
                interval: 5e3,
                pause: "hover",
                wrap: !0,
                keyboard: !0
            }, c.prototype.keydown = function(a) {
                if (!/input|textarea/i.test(a.target.tagName)) {
                    switch (a.which) {
                        case 37:
                            this.prev();
                            break;
                        case 39:
                            this.next();
                            break;
                        default:
                            return
                    }
                    a.preventDefault()
                }
            }, c.prototype.cycle = function(b) {
                return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
            }, c.prototype.getItemIndex = function(a) {
                return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
            }, c.prototype.getItemForDirection = function(a, b) {
                var c = this.getItemIndex(b),
                    d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
                if (d && !this.options.wrap) return b;
                var e = "prev" == a ? -1 : 1,
                    f = (c + e) % this.$items.length;
                return this.$items.eq(f)
            }, c.prototype.to = function(a) {
                var b = this,
                    c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
                return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
                    b.to(a)
                }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
            }, c.prototype.pause = function(b) {
                return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
            }, c.prototype.next = function() {
                return this.sliding ? void 0 : this.slide("next")
            }, c.prototype.prev = function() {
                return this.sliding ? void 0 : this.slide("prev")
            }, c.prototype.slide = function(b, d) {
                var e = this.$element.find(".item.active"),
                    f = d || this.getItemForDirection(b, e),
                    g = this.interval,
                    h = "next" == b ? "left" : "right",
                    i = this;
                if (f.hasClass("active")) return this.sliding = !1;
                var j = f[0],
                    k = a.Event("slide.bs.carousel", {
                        relatedTarget: j,
                        direction: h
                    });
                if (this.$element.trigger(k), !k.isDefaultPrevented()) {
                    if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                        this.$indicators.find(".active").removeClass("active");
                        var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                        l && l.addClass("active")
                    }
                    var m = a.Event("slid.bs.carousel", {
                        relatedTarget: j,
                        direction: h
                    });
                    return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                            i.$element.trigger(m)
                        }, 0)
                    }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
                }
            };
            var d = a.fn.carousel;
            a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
                return a.fn.carousel = d, this
            };
            var e = function(c) {
                var d, e = a(this),
                    f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
                if (f.hasClass("carousel")) {
                    var g = a.extend({}, f.data(), e.data()),
                        h = e.attr("data-slide-to");
                    h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
                }
            };
            a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
                a('[data-ride="carousel"]').each(function() {
                    var c = a(this);
                    b.call(c, c.data())
                })
            })
        }(jQuery), + function(a) {
            "use strict";

            function b(b) {
                var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
                return a(d)
            }

            function c(b) {
                return this.each(function() {
                    var c = a(this),
                        e = c.data("bs.collapse"),
                        f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
                    !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
                })
            }
            var d = function(b, c) {
                this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
            };
            d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
                toggle: !0
            }, d.prototype.dimension = function() {
                var a = this.$element.hasClass("width");
                return a ? "width" : "height"
            }, d.prototype.show = function() {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                    if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                        var f = a.Event("show.bs.collapse");
                        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                            e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                            var g = this.dimension();
                            this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                            var h = function() {
                                this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                            };
                            if (!a.support.transition) return h.call(this);
                            var i = a.camelCase(["scroll", g].join("-"));
                            this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                        }
                    }
                }
            }, d.prototype.hide = function() {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var b = a.Event("hide.bs.collapse");
                    if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                        var c = this.dimension();
                        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                        var e = function() {
                            this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                        };
                        return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
                    }
                }
            }, d.prototype.toggle = function() {
                this[this.$element.hasClass("in") ? "hide" : "show"]()
            }, d.prototype.getParent = function() {
                return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
                    var e = a(d);
                    this.addAriaAndCollapsedClass(b(e), e)
                }, this)).end()
            }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
                var c = a.hasClass("in");
                a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
            };
            var e = a.fn.collapse;
            a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
                return a.fn.collapse = e, this
            }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
                var e = a(this);
                e.attr("data-target") || d.preventDefault();
                var f = b(e),
                    g = f.data("bs.collapse"),
                    h = g ? "toggle" : e.data();
                c.call(f, h)
            })
        }(jQuery), + function(a) {
            "use strict";

            function b(b) {
                b && 3 === b.which || (a(e).remove(), a(f).each(function() {
                    var d = a(this),
                        e = c(d),
                        f = {
                            relatedTarget: this
                        };
                    e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
                }))
            }

            function c(b) {
                var c = b.attr("data-target");
                c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
                var d = c && a(c);
                return d && d.length ? d : b.parent()
            }

            function d(b) {
                return this.each(function() {
                    var c = a(this),
                        d = c.data("bs.dropdown");
                    d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
                })
            }
            var e = ".dropdown-backdrop",
                f = '[data-toggle="dropdown"]',
                g = function(b) {
                    a(b).on("click.bs.dropdown", this.toggle)
                };
            g.VERSION = "3.3.4", g.prototype.toggle = function(d) {
                var e = a(this);
                if (!e.is(".disabled, :disabled")) {
                    var f = c(e),
                        g = f.hasClass("open");
                    if (b(), !g) {
                        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                        var h = {
                            relatedTarget: this
                        };
                        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
                    }
                    return !1
                }
            }, g.prototype.keydown = function(b) {
                if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
                    var d = a(this);
                    if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                        var e = c(d),
                            g = e.hasClass("open");
                        if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                        var h = " li:not(.disabled):visible a",
                            i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                        if (i.length) {
                            var j = i.index(b.target);
                            38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                        }
                    }
                }
            };
            var h = a.fn.dropdown;
            a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
                return a.fn.dropdown = h, this
            }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
                a.stopPropagation()
            }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown)
        }(jQuery), + function(a) {
            "use strict";

            function b(b, d) {
                return this.each(function() {
                    var e = a(this),
                        f = e.data("bs.modal"),
                        g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
                    f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
                })
            }
            var c = function(b, c) {
                this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
                    this.$element.trigger("loaded.bs.modal")
                }, this))
            };
            c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
                backdrop: !0,
                keyboard: !0,
                show: !0
            }, c.prototype.toggle = function(a) {
                return this.isShown ? this.hide() : this.show(a)
            }, c.prototype.show = function(b) {
                var d = this,
                    e = a.Event("show.bs.modal", {
                        relatedTarget: b
                    });
                this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                    d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
                    })
                }), this.backdrop(function() {
                    var e = a.support.transition && d.$element.hasClass("fade");
                    d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();
                    var f = a.Event("shown.bs.modal", {
                        relatedTarget: b
                    });
                    e ? d.$dialog.one("bsTransitionEnd", function() {
                        d.$element.trigger("focus").trigger(f)
                    }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
                }))
            }, c.prototype.hide = function(b) {
                b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
            }, c.prototype.enforceFocus = function() {
                a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
                    this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
                }, this))
            }, c.prototype.escape = function() {
                this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
                    27 == a.which && this.hide()
                }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
            }, c.prototype.resize = function() {
                this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
            }, c.prototype.hideModal = function() {
                var a = this;
                this.$element.hide(), this.backdrop(function() {
                    a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
                })
            }, c.prototype.removeBackdrop = function() {
                this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
            }, c.prototype.backdrop = function(b) {
                var d = this,
                    e = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var f = a.support.transition && e;
                    if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                        return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                    }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
                    f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
                } else if (!this.isShown && this.$backdrop) {
                    this.$backdrop.removeClass("in");
                    var g = function() {
                        d.removeBackdrop(), b && b()
                    };
                    a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
                } else b && b()
                    }, c.prototype.handleUpdate = function() {
                this.adjustDialog()
            }, c.prototype.adjustDialog = function() {
                var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
                this.$element.css({
                    paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
                    paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
                })
            }, c.prototype.resetAdjustments = function() {
                this.$element.css({
                    paddingLeft: "",
                    paddingRight: ""
                })
            }, c.prototype.checkScrollbar = function() {
                var a = window.innerWidth;
                if (!a) {
                    var b = document.documentElement.getBoundingClientRect();
                    a = b.right - Math.abs(b.left)
                }
                this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
            }, c.prototype.setScrollbar = function() {
                var a = parseInt(this.$body.css("padding-right") || 0, 10);
                this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
            }, c.prototype.resetScrollbar = function() {
                this.$body.css("padding-right", this.originalBodyPad)
            }, c.prototype.measureScrollbar = function() {
                var a = document.createElement("div");
                a.className = "modal-scrollbar-measure", this.$body.append(a);
                var b = a.offsetWidth - a.clientWidth;
                return this.$body[0].removeChild(a), b
            };
            var d = a.fn.modal;
            a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
                return a.fn.modal = d, this
            }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
                var d = a(this),
                    e = d.attr("href"),
                    f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
                    g = f.data("bs.modal") ? "toggle" : a.extend({
                        remote: !/#/.test(e) && e
                    }, f.data(), d.data());
                d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
                    a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                        d.is(":visible") && d.trigger("focus")
                    })
                }), b.call(f, g, this)
            })
        }(jQuery), + function(a) {
            "use strict";

            function b(b) {
                return this.each(function() {
                    var d = a(this),
                        e = d.data("bs.tooltip"),
                        f = "object" == typeof b && b;
                    (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
                })
            }
            var c = function(a, b) {
                this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b)
            };
            c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1,
                viewport: {
                    selector: "body",
                    padding: 0
                }
            }, c.prototype.init = function(b, c, d) {
                if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
                    var g = e[f];
                    if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
                    else if ("manual" != g) {
                        var h = "hover" == g ? "mouseenter" : "focusin",
                            i = "hover" == g ? "mouseleave" : "focusout";
                        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
                    }
                }
                this.options.selector ? this._options = a.extend({}, this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle()
            }, c.prototype.getDefaults = function() {
                return c.DEFAULTS
            }, c.prototype.getOptions = function(b) {
                return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
                    show: b.delay,
                    hide: b.delay
                }), b
            }, c.prototype.getDelegateOptions = function() {
                var b = {},
                    c = this.getDefaults();
                return this._options && a.each(this._options, function(a, d) {
                    c[a] != d && (b[a] = d)
                }), b
            }, c.prototype.enter = function(b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
                return c && c.$tip && c.$tip.is(":visible") ? void(c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
                    "in" == c.hoverState && c.show()
                }, c.options.delay.show)) : c.show())
            }, c.prototype.leave = function(b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
                return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
                    "out" == c.hoverState && c.hide()
                }, c.options.delay.hide)) : c.hide()
            }, c.prototype.show = function() {
                var b = a.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    this.$element.trigger(b);
                    var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                    if (b.isDefaultPrevented() || !d) return;
                    var e = this,
                        f = this.tip(),
                        g = this.getUID(this.type);
                    this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
                    var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                        i = /\s?auto?\s?/i,
                        j = i.test(h);
                    j && (h = h.replace(i, "") || "top"), f.detach().css({
                        top: 0,
                        left: 0,
                        display: "block"
                    }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
                    var k = this.getPosition(),
                        l = f[0].offsetWidth,
                        m = f[0].offsetHeight;
                    if (j) {
                        var n = h,
                            o = this.options.container ? a(this.options.container) : this.$element.parent(),
                            p = this.getPosition(o);
                        h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h)
                    }
                    var q = this.getCalculatedOffset(h, k, l, m);
                    this.applyPlacement(q, h);
                    var r = function() {
                        var a = e.hoverState;
                        e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
                    };
                    a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r()
                }
            }, c.prototype.applyPlacement = function(b, c) {
                var d = this.tip(),
                    e = d[0].offsetWidth,
                    f = d[0].offsetHeight,
                    g = parseInt(d.css("margin-top"), 10),
                    h = parseInt(d.css("margin-left"), 10);
                isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
                    using: function(a) {
                        d.css({
                            top: Math.round(a.top),
                            left: Math.round(a.left)
                        })
                    }
                }, b), 0), d.addClass("in");
                var i = d[0].offsetWidth,
                    j = d[0].offsetHeight;
                "top" == c && j != f && (b.top = b.top + f - j);
                var k = this.getViewportAdjustedDelta(c, b, i, j);
                k.left ? b.left += k.left : b.top += k.top;
                var l = /top|bottom/.test(c),
                    m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
                    n = l ? "offsetWidth" : "offsetHeight";
                d.offset(b), this.replaceArrow(m, d[0][n], l)
            }, c.prototype.replaceArrow = function(a, b, c) {
                this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
            }, c.prototype.setContent = function() {
                var a = this.tip(),
                    b = this.getTitle();
                a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
            }, c.prototype.hide = function(b) {
                function d() {
                    "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
                }
                var e = this,
                    f = a(this.$tip),
                    g = a.Event("hide.bs." + this.type);
                return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
            }, c.prototype.fixTitle = function() {
                var a = this.$element;
                (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
            }, c.prototype.hasContent = function() {
                return this.getTitle()
            }, c.prototype.getPosition = function(b) {
                b = b || this.$element;
                var c = b[0],
                    d = "BODY" == c.tagName,
                    e = c.getBoundingClientRect();
                null == e.width && (e = a.extend({}, e, {
                    width: e.right - e.left,
                    height: e.bottom - e.top
                }));
                var f = d ? {
                    top: 0,
                    left: 0
                } : b.offset(),
                    g = {
                        scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
                    },
                    h = d ? {
                        width: a(window).width(),
                        height: a(window).height()
                    } : null;
                return a.extend({}, e, g, h, f)
            }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
                return "bottom" == a ? {
                    top: b.top + b.height,
                    left: b.left + b.width / 2 - c / 2
                } : "top" == a ? {
                    top: b.top - d,
                    left: b.left + b.width / 2 - c / 2
                } : "left" == a ? {
                    top: b.top + b.height / 2 - d / 2,
                    left: b.left - c
                } : {
                    top: b.top + b.height / 2 - d / 2,
                    left: b.left + b.width
                }
            }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
                var e = {
                    top: 0,
                    left: 0
                };
                if (!this.$viewport) return e;
                var f = this.options.viewport && this.options.viewport.padding || 0,
                    g = this.getPosition(this.$viewport);
                if (/right|left/.test(a)) {
                    var h = b.top - f - g.scroll,
                        i = b.top + f - g.scroll + d;
                    h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
                } else {
                    var j = b.left - f,
                        k = b.left + f + c;
                    j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
                }
                return e
            }, c.prototype.getTitle = function() {
                var a, b = this.$element,
                    c = this.options;
                return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
            }, c.prototype.getUID = function(a) {
                do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
                return a
            }, c.prototype.tip = function() {
                return this.$tip = this.$tip || a(this.options.template)
            }, c.prototype.arrow = function() {
                return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
            }, c.prototype.enable = function() {
                this.enabled = !0
            }, c.prototype.disable = function() {
                this.enabled = !1
            }, c.prototype.toggleEnabled = function() {
                this.enabled = !this.enabled
            }, c.prototype.toggle = function(b) {
                var c = this;
                b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
            }, c.prototype.destroy = function() {
                var a = this;
                clearTimeout(this.timeout), this.hide(function() {
                    a.$element.off("." + a.type).removeData("bs." + a.type)
                })
            };
            var d = a.fn.tooltip;
            a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
                return a.fn.tooltip = d, this
            }
        }(jQuery), + function(a) {
            "use strict";

            function b(b) {
                return this.each(function() {
                    var d = a(this),
                        e = d.data("bs.popover"),
                        f = "object" == typeof b && b;
                    (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
                })
            }
            var c = function(a, b) {
                this.init("popover", a, b)
            };
            if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
            c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
                return c.DEFAULTS
            }, c.prototype.setContent = function() {
                var a = this.tip(),
                    b = this.getTitle(),
                    c = this.getContent();
                a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
            }, c.prototype.hasContent = function() {
                return this.getTitle() || this.getContent()
            }, c.prototype.getContent = function() {
                var a = this.$element,
                    b = this.options;
                return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
            }, c.prototype.arrow = function() {
                return this.$arrow = this.$arrow || this.tip().find(".arrow")
            };
            var d = a.fn.popover;
            a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
                return a.fn.popover = d, this
            }
        }(jQuery), + function(a) {
            "use strict";

            function b(c, d) {
                this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
            }

            function c(c) {
                return this.each(function() {
                    var d = a(this),
                        e = d.data("bs.scrollspy"),
                        f = "object" == typeof c && c;
                    e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
                })
            }
            b.VERSION = "3.3.4", b.DEFAULTS = {
                offset: 10
            }, b.prototype.getScrollHeight = function() {
                return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
            }, b.prototype.refresh = function() {
                var b = this,
                    c = "offset",
                    d = 0;
                this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
                    var b = a(this),
                        e = b.data("target") || b.attr("href"),
                        f = /^#./.test(e) && a(e);
                    return f && f.length && f.is(":visible") && [
                        [f[c]().top + d, e]
                    ] || null
                }).sort(function(a, b) {
                    return a[0] - b[0]
                }).each(function() {
                    b.offsets.push(this[0]), b.targets.push(this[1])
                })
            }, b.prototype.process = function() {
                var a, b = this.$scrollElement.scrollTop() + this.options.offset,
                    c = this.getScrollHeight(),
                    d = this.options.offset + c - this.$scrollElement.height(),
                    e = this.offsets,
                    f = this.targets,
                    g = this.activeTarget;
                if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
                if (g && b < e[0]) return this.activeTarget = null, this.clear();
                for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
                    }, b.prototype.activate = function(b) {
                this.activeTarget = b, this.clear();
                var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
                    d = a(c).parents("li").addClass("active");
                d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
            }, b.prototype.clear = function() {
                a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
            };
            var d = a.fn.scrollspy;
            a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
                return a.fn.scrollspy = d, this
            }, a(window).on("load.bs.scrollspy.data-api", function() {
                a('[data-spy="scroll"]').each(function() {
                    var b = a(this);
                    c.call(b, b.data())
                })
            })
        }(jQuery), + function(a) {
            "use strict";

            function b(b) {
                return this.each(function() {
                    var d = a(this),
                        e = d.data("bs.tab");
                    e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
                })
            }
            var c = function(b) {
                this.element = a(b)
            };
            c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
                var b = this.element,
                    c = b.closest("ul:not(.dropdown-menu)"),
                    d = b.data("target");
                if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
                    var e = c.find(".active:last a"),
                        f = a.Event("hide.bs.tab", {
                            relatedTarget: b[0]
                        }),
                        g = a.Event("show.bs.tab", {
                            relatedTarget: e[0]
                        });
                    if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                        var h = a(d);
                        this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                            e.trigger({
                                type: "hidden.bs.tab",
                                relatedTarget: b[0]
                            }), b.trigger({
                                type: "shown.bs.tab",
                                relatedTarget: e[0]
                            })
                        })
                    }
                }
            }, c.prototype.activate = function(b, d, e) {
                function f() {
                    g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
                }
                var g = d.find("> .active"),
                    h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
                g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
            };
            var d = a.fn.tab;
            a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
                return a.fn.tab = d, this
            };
            var e = function(c) {
                c.preventDefault(), b.call(a(this), "show")
            };
            a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
        }(jQuery), + function(a) {
            "use strict";

            function b(b) {
                return this.each(function() {
                    var d = a(this),
                        e = d.data("bs.affix"),
                        f = "object" == typeof b && b;
                    e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
                })
            }
            var c = function(b, d) {
                this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
            };
            c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
                offset: 0,
                target: window
            }, c.prototype.getState = function(a, b, c, d) {
                var e = this.$target.scrollTop(),
                    f = this.$element.offset(),
                    g = this.$target.height();
                if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
                if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
                var h = null == this.affixed,
                    i = h ? e : f.top,
                    j = h ? g : b;
                return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
            }, c.prototype.getPinnedOffset = function() {
                if (this.pinnedOffset) return this.pinnedOffset;
                this.$element.removeClass(c.RESET).addClass("affix");
                var a = this.$target.scrollTop(),
                    b = this.$element.offset();
                return this.pinnedOffset = b.top - a
            }, c.prototype.checkPositionWithEventLoop = function() {
                setTimeout(a.proxy(this.checkPosition, this), 1)
            }, c.prototype.checkPosition = function() {
                if (this.$element.is(":visible")) {
                    var b = this.$element.height(),
                        d = this.options.offset,
                        e = d.top,
                        f = d.bottom,
                        g = a(document.body).height();
                    "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
                    var h = this.getState(g, b, e, f);
                    if (this.affixed != h) {
                        null != this.unpin && this.$element.css("top", "");
                        var i = "affix" + (h ? "-" + h : ""),
                            j = a.Event(i + ".bs.affix");
                        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                        this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
                    }
                    "bottom" == h && this.$element.offset({
                        top: g - b - f
                    })
                }
            };
            var d = a.fn.affix;
            a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
                return a.fn.affix = d, this
            }, a(window).on("load", function() {
                a('[data-spy="affix"]').each(function() {
                    var c = a(this),
                        d = c.data();
                    d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
                })
            })
        }(jQuery);

        function BigInteger(t, i, r) {
            null != t && ("number" == typeof t ? this.fromNumber(t, i, r) : null == i && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, i))
        }

        function nbi() {
            return new BigInteger(null)
        }

        function am1(t, i, r, n, e, o) {
            for (; --o >= 0;) {
                var s = i * this[t++] + r[n] + e;
                e = Math.floor(s / 67108864), r[n++] = 67108863 & s
            }
            return e
        }

        function am2(t, i, r, n, e, o) {
            for (var s = 32767 & i, h = i >> 15; --o >= 0;) {
                var p = 32767 & this[t],
                    u = this[t++] >> 15,
                    f = h * p + u * s;
                p = s * p + ((32767 & f) << 15) + r[n] + (1073741823 & e), e = (p >>> 30) + (f >>> 15) + h * u + (e >>> 30), r[n++] = 1073741823 & p
            }
            return e
        }

        function am3(t, i, r, n, e, o) {
            for (var s = 16383 & i, h = i >> 14; --o >= 0;) {
                var p = 16383 & this[t],
                    u = this[t++] >> 14,
                    f = h * p + u * s;
                p = s * p + ((16383 & f) << 14) + r[n] + e, e = (p >> 28) + (f >> 14) + h * u, r[n++] = 268435455 & p
            }
            return e
        }

        function int2char(t) {
            return BI_RM.charAt(t)
        }

        function intAt(t, i) {
            var r = BI_RC[t.charCodeAt(i)];
            return null == r ? -1 : r
        }

        function bnpCopyTo(t) {
            for (var i = this.t - 1; i >= 0; --i) t[i] = this[i];
            t.t = this.t, t.s = this.s
        }

        function bnpFromInt(t) {
            this.t = 1, this.s = 0 > t ? -1 : 0, t > 0 ? this[0] = t : -1 > t ? this[0] = t + this.DV : this.t = 0
        }

        function nbv(t) {
            var i = nbi();
            return i.fromInt(t), i
        }

        function bnpFromString(t, i) {
            var r;
            if (16 == i) r = 4;
            else if (8 == i) r = 3;
            else if (256 == i) r = 8;
            else if (2 == i) r = 1;
            else if (32 == i) r = 5;
            else {
                if (4 != i) return void this.fromRadix(t, i);
                r = 2
            }
            this.t = 0, this.s = 0;
            for (var n = t.length, e = !1, o = 0; --n >= 0;) {
                var s = 8 == r ? 255 & t[n] : intAt(t, n);
                0 > s ? "-" == t.charAt(n) && (e = !0) : (e = !1, 0 == o ? this[this.t++] = s : o + r > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - o) - 1) << o, this[this.t++] = s >> this.DB - o) : this[this.t - 1] |= s << o, o += r, o >= this.DB && (o -= this.DB))
            }
            8 == r && 0 != (128 & t[0]) && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)), this.clamp(), e && BigInteger.ZERO.subTo(this, this)
        }

        function bnpClamp() {
            for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
                }

        function bnToString(t) {
            if (this.s < 0) return "-" + this.negate().toString(t);
            var i;
            if (16 == t) i = 4;
            else if (8 == t) i = 3;
            else if (2 == t) i = 1;
            else if (32 == t) i = 5;
            else {
                if (4 != t) return this.toRadix(t);
                i = 2
            }
            var r, n = (1 << i) - 1,
                e = !1,
                o = "",
                s = this.t,
                h = this.DB - s * this.DB % i;
            if (s-- > 0)
                for (h < this.DB && (r = this[s] >> h) > 0 && (e = !0, o = int2char(r)); s >= 0;) i > h ? (r = (this[s] & (1 << h) - 1) << i - h, r |= this[--s] >> (h += this.DB - i)) : (r = this[s] >> (h -= i) & n, 0 >= h && (h += this.DB, --s)), r > 0 && (e = !0), e && (o += int2char(r));
            return e ? o : "0"
        }

        function bnNegate() {
            var t = nbi();
            return BigInteger.ZERO.subTo(this, t), t
        }

        function bnAbs() {
            return this.s < 0 ? this.negate() : this
        }

        function bnCompareTo(t) {
            var i = this.s - t.s;
            if (0 != i) return i;
            var r = this.t;
            if (i = r - t.t, 0 != i) return this.s < 0 ? -i : i;
            for (; --r >= 0;)
                if (0 != (i = this[r] - t[r])) return i;
            return 0
        }

        function nbits(t) {
            var i, r = 1;
            return 0 != (i = t >>> 16) && (t = i, r += 16), 0 != (i = t >> 8) && (t = i, r += 8), 0 != (i = t >> 4) && (t = i, r += 4), 0 != (i = t >> 2) && (t = i, r += 2), 0 != (i = t >> 1) && (t = i, r += 1), r
        }

        function bnBitLength() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
        }

        function bnpDLShiftTo(t, i) {
            var r;
            for (r = this.t - 1; r >= 0; --r) i[r + t] = this[r];
            for (r = t - 1; r >= 0; --r) i[r] = 0;
            i.t = this.t + t, i.s = this.s
        }

        function bnpDRShiftTo(t, i) {
            for (var r = t; r < this.t; ++r) i[r - t] = this[r];
            i.t = Math.max(this.t - t, 0), i.s = this.s
        }

        function bnpLShiftTo(t, i) {
            var r, n = t % this.DB,
                e = this.DB - n,
                o = (1 << e) - 1,
                s = Math.floor(t / this.DB),
                h = this.s << n & this.DM;
            for (r = this.t - 1; r >= 0; --r) i[r + s + 1] = this[r] >> e | h, h = (this[r] & o) << n;
            for (r = s - 1; r >= 0; --r) i[r] = 0;
            i[s] = h, i.t = this.t + s + 1, i.s = this.s, i.clamp()
        }

        function bnpRShiftTo(t, i) {
            i.s = this.s;
            var r = Math.floor(t / this.DB);
            if (r >= this.t) return void(i.t = 0);
            var n = t % this.DB,
                e = this.DB - n,
                o = (1 << n) - 1;
            i[0] = this[r] >> n;
            for (var s = r + 1; s < this.t; ++s) i[s - r - 1] |= (this[s] & o) << e, i[s - r] = this[s] >> n;
            n > 0 && (i[this.t - r - 1] |= (this.s & o) << e), i.t = this.t - r, i.clamp()
        }

        function bnpSubTo(t, i) {
            for (var r = 0, n = 0, e = Math.min(t.t, this.t); e > r;) n += this[r] - t[r], i[r++] = n & this.DM, n >>= this.DB;
            if (t.t < this.t) {
                for (n -= t.s; r < this.t;) n += this[r], i[r++] = n & this.DM, n >>= this.DB;
                n += this.s
            } else {
                for (n += this.s; r < t.t;) n -= t[r], i[r++] = n & this.DM, n >>= this.DB;
                n -= t.s
            }
            i.s = 0 > n ? -1 : 0, -1 > n ? i[r++] = this.DV + n : n > 0 && (i[r++] = n), i.t = r, i.clamp()
        }

        function bnpMultiplyTo(t, i) {
            var r = this.abs(),
                n = t.abs(),
                e = r.t;
            for (i.t = e + n.t; --e >= 0;) i[e] = 0;
            for (e = 0; e < n.t; ++e) i[e + r.t] = r.am(0, n[e], i, e, 0, r.t);
            i.s = 0, i.clamp(), this.s != t.s && BigInteger.ZERO.subTo(i, i)
        }

        function bnpSquareTo(t) {
            for (var i = this.abs(), r = t.t = 2 * i.t; --r >= 0;) t[r] = 0;
            for (r = 0; r < i.t - 1; ++r) {
                var n = i.am(r, i[r], t, 2 * r, 0, 1);
                (t[r + i.t] += i.am(r + 1, 2 * i[r], t, 2 * r + 1, n, i.t - r - 1)) >= i.DV && (t[r + i.t] -= i.DV, t[r + i.t + 1] = 1)
            }
            t.t > 0 && (t[t.t - 1] += i.am(r, i[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp()
        }

        function bnpDivRemTo(t, i, r) {
            var n = t.abs();
            if (!(n.t <= 0)) {
                var e = this.abs();
                if (e.t < n.t) return null != i && i.fromInt(0), void(null != r && this.copyTo(r));
                null == r && (r = nbi());
                var o = nbi(),
                    s = this.s,
                    h = t.s,
                    p = this.DB - nbits(n[n.t - 1]);
                p > 0 ? (n.lShiftTo(p, o), e.lShiftTo(p, r)) : (n.copyTo(o), e.copyTo(r));
                var u = o.t,
                    f = o[u - 1];
                if (0 != f) {
                    var a = f * (1 << this.F1) + (u > 1 ? o[u - 2] >> this.F2 : 0),
                        b = this.FV / a,
                        g = (1 << this.F1) / a,
                        l = 1 << this.F2,
                        m = r.t,
                        c = m - u,
                        v = null == i ? nbi() : i;
                    for (o.dlShiftTo(c, v), r.compareTo(v) >= 0 && (r[r.t++] = 1, r.subTo(v, r)), BigInteger.ONE.dlShiftTo(u, v), v.subTo(o, o); o.t < u;) o[o.t++] = 0;
                    for (; --c >= 0;) {
                        var B = r[--m] == f ? this.DM : Math.floor(r[m] * b + (r[m - 1] + l) * g);
                        if ((r[m] += o.am(0, B, r, c, 0, u)) < B)
                            for (o.dlShiftTo(c, v), r.subTo(v, r); r[m] < --B;) r.subTo(v, r)
                                }
                    null != i && (r.drShiftTo(u, i), s != h && BigInteger.ZERO.subTo(i, i)), r.t = u, r.clamp(), p > 0 && r.rShiftTo(p, r), 0 > s && BigInteger.ZERO.subTo(r, r)
                }
            }
        }

        function bnMod(t) {
            var i = nbi();
            return this.abs().divRemTo(t, null, i), this.s < 0 && i.compareTo(BigInteger.ZERO) > 0 && t.subTo(i, i), i
        }

        function Classic(t) {
            this.m = t
        }

        function cConvert(t) {
            return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
        }

        function cRevert(t) {
            return t
        }

        function cReduce(t) {
            t.divRemTo(this.m, null, t)
        }

        function cMulTo(t, i, r) {
            t.multiplyTo(i, r), this.reduce(r)
        }

        function cSqrTo(t, i) {
            t.squareTo(i), this.reduce(i)
        }

        function bnpInvDigit() {
            if (this.t < 1) return 0;
            var t = this[0];
            if (0 == (1 & t)) return 0;
            var i = 3 & t;
            return i = i * (2 - (15 & t) * i) & 15, i = i * (2 - (255 & t) * i) & 255, i = i * (2 - ((65535 & t) * i & 65535)) & 65535, i = i * (2 - t * i % this.DV) % this.DV, i > 0 ? this.DV - i : -i
        }

        function Montgomery(t) {
            this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
        }

        function montConvert(t) {
            var i = nbi();
            return t.abs().dlShiftTo(this.m.t, i), i.divRemTo(this.m, null, i), t.s < 0 && i.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(i, i), i
        }

        function montRevert(t) {
            var i = nbi();
            return t.copyTo(i), this.reduce(i), i
        }

        function montReduce(t) {
            for (; t.t <= this.mt2;) t[t.t++] = 0;
            for (var i = 0; i < this.m.t; ++i) {
                var r = 32767 & t[i],
                    n = r * this.mpl + ((r * this.mph + (t[i] >> 15) * this.mpl & this.um) << 15) & t.DM;
                for (r = i + this.m.t, t[r] += this.m.am(0, n, t, i, 0, this.m.t); t[r] >= t.DV;) t[r] -= t.DV, t[++r]++
                    }
            t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
        }

        function montSqrTo(t, i) {
            t.squareTo(i), this.reduce(i)
        }

        function montMulTo(t, i, r) {
            t.multiplyTo(i, r), this.reduce(r)
        }

        function bnpIsEven() {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
        }

        function bnpExp(t, i) {
            if (t > 4294967295 || 1 > t) return BigInteger.ONE;
            var r = nbi(),
                n = nbi(),
                e = i.convert(this),
                o = nbits(t) - 1;
            for (e.copyTo(r); --o >= 0;)
                if (i.sqrTo(r, n), (t & 1 << o) > 0) i.mulTo(n, e, r);
                else {
                    var s = r;
                    r = n, n = s
                }
            return i.revert(r)
        }

        function bnModPowInt(t, i) {
            var r;
            return r = 256 > t || i.isEven() ? new Classic(i) : new Montgomery(i), this.exp(t, r)
        }

        function bnClone() {
            var t = nbi();
            return this.copyTo(t), t
        }

        function bnIntValue() {
            if (this.s < 0) {
                if (1 == this.t) return this[0] - this.DV;
                if (0 == this.t) return -1
                    } else {
                        if (1 == this.t) return this[0];
                        if (0 == this.t) return 0
                            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
        }

        function bnByteValue() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
        }

        function bnShortValue() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
        }

        function bnpChunkSize(t) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t))
        }

        function bnSigNum() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
        }

        function bnpToRadix(t) {
            if (null == t && (t = 10), 0 == this.signum() || 2 > t || t > 36) return "0";
            var i = this.chunkSize(t),
                r = Math.pow(t, i),
                n = nbv(r),
                e = nbi(),
                o = nbi(),
                s = "";
            for (this.divRemTo(n, e, o); e.signum() > 0;) s = (r + o.intValue()).toString(t).substr(1) + s, e.divRemTo(n, e, o);
            return o.intValue().toString(t) + s
        }

        function bnpFromRadix(t, i) {
            this.fromInt(0), null == i && (i = 10);
            for (var r = this.chunkSize(i), n = Math.pow(i, r), e = !1, o = 0, s = 0, h = 0; h < t.length; ++h) {
                var p = intAt(t, h);
                0 > p ? "-" == t.charAt(h) && 0 == this.signum() && (e = !0) : (s = i * s + p, ++o >= r && (this.dMultiply(n), this.dAddOffset(s, 0), o = 0, s = 0))
            }
            o > 0 && (this.dMultiply(Math.pow(i, o)), this.dAddOffset(s, 0)), e && BigInteger.ZERO.subTo(this, this)
        }

        function bnpFromNumber(t, i, r) {
            if ("number" == typeof i)
                if (2 > t) this.fromInt(1);
                else
                    for (this.fromNumber(t, r), this.testBit(t - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(t - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(i);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(BigInteger.ONE.shiftLeft(t - 1), this);
            else {
                var n = new Array,
                    e = 7 & t;
                n.length = (t >> 3) + 1, i.nextBytes(n), e > 0 ? n[0] &= (1 << e) - 1 : n[0] = 0, this.fromString(n, 256)
            }
        }

        function bnToByteArray() {
            var t = this.t,
                i = new Array;
            i[0] = this.s;
            var r, n = this.DB - t * this.DB % 8,
                e = 0;
            if (t-- > 0)
                for (n < this.DB && (r = this[t] >> n) != (this.s & this.DM) >> n && (i[e++] = r | this.s << this.DB - n); t >= 0;) 8 > n ? (r = (this[t] & (1 << n) - 1) << 8 - n, r |= this[--t] >> (n += this.DB - 8)) : (r = this[t] >> (n -= 8) & 255, 0 >= n && (n += this.DB, --t)), 0 != (128 & r) && (r |= -256), 0 == e && (128 & this.s) != (128 & r) && ++e, (e > 0 || r != this.s) && (i[e++] = r);
            return i
        }

        function bnEquals(t) {
            return 0 == this.compareTo(t)
        }

        function bnMin(t) {
            return this.compareTo(t) < 0 ? this : t
        }

        function bnMax(t) {
            return this.compareTo(t) > 0 ? this : t
        }

        function bnpBitwiseTo(t, i, r) {
            var n, e, o = Math.min(t.t, this.t);
            for (n = 0; o > n; ++n) r[n] = i(this[n], t[n]);
            if (t.t < this.t) {
                for (e = t.s & this.DM, n = o; n < this.t; ++n) r[n] = i(this[n], e);
                r.t = this.t
            } else {
                for (e = this.s & this.DM, n = o; n < t.t; ++n) r[n] = i(e, t[n]);
                r.t = t.t
            }
            r.s = i(this.s, t.s), r.clamp()
        }

        function op_and(t, i) {
            return t & i
        }

        function bnAnd(t) {
            var i = nbi();
            return this.bitwiseTo(t, op_and, i), i
        }

        function op_or(t, i) {
            return t | i
        }

        function bnOr(t) {
            var i = nbi();
            return this.bitwiseTo(t, op_or, i), i
        }

        function op_xor(t, i) {
            return t ^ i
        }

        function bnXor(t) {
            var i = nbi();
            return this.bitwiseTo(t, op_xor, i), i
        }

        function op_andnot(t, i) {
            return t & ~i
        }

        function bnAndNot(t) {
            var i = nbi();
            return this.bitwiseTo(t, op_andnot, i), i
        }

        function bnNot() {
            for (var t = nbi(), i = 0; i < this.t; ++i) t[i] = this.DM & ~this[i];
            return t.t = this.t, t.s = ~this.s, t
        }

        function bnShiftLeft(t) {
            var i = nbi();
            return 0 > t ? this.rShiftTo(-t, i) : this.lShiftTo(t, i), i
        }

        function bnShiftRight(t) {
            var i = nbi();
            return 0 > t ? this.lShiftTo(-t, i) : this.rShiftTo(t, i), i
        }

        function lbit(t) {
            if (0 == t) return -1;
            var i = 0;
            return 0 == (65535 & t) && (t >>= 16, i += 16), 0 == (255 & t) && (t >>= 8, i += 8), 0 == (15 & t) && (t >>= 4, i += 4), 0 == (3 & t) && (t >>= 2, i += 2), 0 == (1 & t) && ++i, i
        }

        function bnGetLowestSetBit() {
            for (var t = 0; t < this.t; ++t)
                if (0 != this[t]) return t * this.DB + lbit(this[t]);
            return this.s < 0 ? this.t * this.DB : -1
        }

        function cbit(t) {
            for (var i = 0; 0 != t;) t &= t - 1, ++i;
            return i
        }

        function bnBitCount() {
            for (var t = 0, i = this.s & this.DM, r = 0; r < this.t; ++r) t += cbit(this[r] ^ i);
            return t
        }

        function bnTestBit(t) {
            var i = Math.floor(t / this.DB);
            return i >= this.t ? 0 != this.s : 0 != (this[i] & 1 << t % this.DB)
        }

        function bnpChangeBit(t, i) {
            var r = BigInteger.ONE.shiftLeft(t);
            return this.bitwiseTo(r, i, r), r
        }

        function bnSetBit(t) {
            return this.changeBit(t, op_or)
        }

        function bnClearBit(t) {
            return this.changeBit(t, op_andnot)
        }

        function bnFlipBit(t) {
            return this.changeBit(t, op_xor)
        }

        function bnpAddTo(t, i) {
            for (var r = 0, n = 0, e = Math.min(t.t, this.t); e > r;) n += this[r] + t[r], i[r++] = n & this.DM, n >>= this.DB;
            if (t.t < this.t) {
                for (n += t.s; r < this.t;) n += this[r], i[r++] = n & this.DM, n >>= this.DB;
                n += this.s
            } else {
                for (n += this.s; r < t.t;) n += t[r], i[r++] = n & this.DM, n >>= this.DB;
                n += t.s
            }
            i.s = 0 > n ? -1 : 0, n > 0 ? i[r++] = n : -1 > n && (i[r++] = this.DV + n), i.t = r, i.clamp()
        }

        function bnAdd(t) {
            var i = nbi();
            return this.addTo(t, i), i
        }

        function bnSubtract(t) {
            var i = nbi();
            return this.subTo(t, i), i
        }

        function bnMultiply(t) {
            var i = nbi();
            return this.multiplyTo(t, i), i
        }

        function bnSquare() {
            var t = nbi();
            return this.squareTo(t), t
        }

        function bnDivide(t) {
            var i = nbi();
            return this.divRemTo(t, i, null), i
        }

        function bnRemainder(t) {
            var i = nbi();
            return this.divRemTo(t, null, i), i
        }

        function bnDivideAndRemainder(t) {
            var i = nbi(),
                r = nbi();
            return this.divRemTo(t, i, r), new Array(i, r)
        }

        function bnpDMultiply(t) {
            this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
        }

        function bnpDAddOffset(t, i) {
            if (0 != t) {
                for (; this.t <= i;) this[this.t++] = 0;
                for (this[i] += t; this[i] >= this.DV;) this[i] -= this.DV, ++i >= this.t && (this[this.t++] = 0), ++this[i]
                    }
        }

        function NullExp() {}

        function nNop(t) {
            return t
        }

        function nMulTo(t, i, r) {
            t.multiplyTo(i, r)
        }

        function nSqrTo(t, i) {
            t.squareTo(i)
        }

        function bnPow(t) {
            return this.exp(t, new NullExp)
        }

        function bnpMultiplyLowerTo(t, i, r) {
            var n = Math.min(this.t + t.t, i);
            for (r.s = 0, r.t = n; n > 0;) r[--n] = 0;
            var e;
            for (e = r.t - this.t; e > n; ++n) r[n + this.t] = this.am(0, t[n], r, n, 0, this.t);
            for (e = Math.min(t.t, i); e > n; ++n) this.am(0, t[n], r, n, 0, i - n);
            r.clamp()
        }

        function bnpMultiplyUpperTo(t, i, r) {
            --i;
            var n = r.t = this.t + t.t - i;
            for (r.s = 0; --n >= 0;) r[n] = 0;
            for (n = Math.max(i - this.t, 0); n < t.t; ++n) r[this.t + n - i] = this.am(i - n, t[n], r, 0, 0, this.t + n - i);
            r.clamp(), r.drShiftTo(1, r)
        }

        function Barrett(t) {
            this.r2 = nbi(), this.q3 = nbi(), BigInteger.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t
        }

        function barrettConvert(t) {
            if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
            if (t.compareTo(this.m) < 0) return t;
            var i = nbi();
            return t.copyTo(i), this.reduce(i), i
        }

        function barrettRevert(t) {
            return t
        }

        function barrettReduce(t) {
            for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
            for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;) t.subTo(this.m, t)
                }

        function barrettSqrTo(t, i) {
            t.squareTo(i), this.reduce(i)
        }

        function barrettMulTo(t, i, r) {
            t.multiplyTo(i, r), this.reduce(r)
        }

        function bnModPow(t, i) {
            var r, n, e = t.bitLength(),
                o = nbv(1);
            if (0 >= e) return o;
            r = 18 > e ? 1 : 48 > e ? 3 : 144 > e ? 4 : 768 > e ? 5 : 6, n = 8 > e ? new Classic(i) : i.isEven() ? new Barrett(i) : new Montgomery(i);
            var s = new Array,
                h = 3,
                p = r - 1,
                u = (1 << r) - 1;
            if (s[1] = n.convert(this), r > 1) {
                var f = nbi();
                for (n.sqrTo(s[1], f); u >= h;) s[h] = nbi(), n.mulTo(f, s[h - 2], s[h]), h += 2
                    }
            var a, b, g = t.t - 1,
                l = !0,
                m = nbi();
            for (e = nbits(t[g]) - 1; g >= 0;) {
                for (e >= p ? a = t[g] >> e - p & u : (a = (t[g] & (1 << e + 1) - 1) << p - e, g > 0 && (a |= t[g - 1] >> this.DB + e - p)), h = r; 0 == (1 & a);) a >>= 1, --h;
                if ((e -= h) < 0 && (e += this.DB, --g), l) s[a].copyTo(o), l = !1;
                else {
                    for (; h > 1;) n.sqrTo(o, m), n.sqrTo(m, o), h -= 2;
                    h > 0 ? n.sqrTo(o, m) : (b = o, o = m, m = b), n.mulTo(m, s[a], o)
                }
                for (; g >= 0 && 0 == (t[g] & 1 << e);) n.sqrTo(o, m), b = o, o = m, m = b, --e < 0 && (e = this.DB - 1, --g)
                    }
            return n.revert(o)
        }

        function bnGCD(t) {
            var i = this.s < 0 ? this.negate() : this.clone(),
                r = t.s < 0 ? t.negate() : t.clone();
            if (i.compareTo(r) < 0) {
                var n = i;
                i = r, r = n
            }
            var e = i.getLowestSetBit(),
                o = r.getLowestSetBit();
            if (0 > o) return i;
            for (o > e && (o = e), o > 0 && (i.rShiftTo(o, i), r.rShiftTo(o, r)); i.signum() > 0;)(e = i.getLowestSetBit()) > 0 && i.rShiftTo(e, i), (e = r.getLowestSetBit()) > 0 && r.rShiftTo(e, r), i.compareTo(r) >= 0 ? (i.subTo(r, i), i.rShiftTo(1, i)) : (r.subTo(i, r), r.rShiftTo(1, r));
            return o > 0 && r.lShiftTo(o, r), r
        }

        function bnpModInt(t) {
            if (0 >= t) return 0;
            var i = this.DV % t,
                r = this.s < 0 ? t - 1 : 0;
            if (this.t > 0)
                if (0 == i) r = this[0] % t;
                else
                    for (var n = this.t - 1; n >= 0; --n) r = (i * r + this[n]) % t;
            return r
        }

        function bnModInverse(t) {
            var i = t.isEven();
            if (this.isEven() && i || 0 == t.signum()) return BigInteger.ZERO;
            for (var r = t.clone(), n = this.clone(), e = nbv(1), o = nbv(0), s = nbv(0), h = nbv(1); 0 != r.signum();) {
                for (; r.isEven();) r.rShiftTo(1, r), i ? (e.isEven() && o.isEven() || (e.addTo(this, e), o.subTo(t, o)), e.rShiftTo(1, e)) : o.isEven() || o.subTo(t, o), o.rShiftTo(1, o);
                for (; n.isEven();) n.rShiftTo(1, n), i ? (s.isEven() && h.isEven() || (s.addTo(this, s), h.subTo(t, h)), s.rShiftTo(1, s)) : h.isEven() || h.subTo(t, h), h.rShiftTo(1, h);
                r.compareTo(n) >= 0 ? (r.subTo(n, r), i && e.subTo(s, e), o.subTo(h, o)) : (n.subTo(r, n), i && s.subTo(e, s), h.subTo(o, h))
            }
            return 0 != n.compareTo(BigInteger.ONE) ? BigInteger.ZERO : h.compareTo(t) >= 0 ? h.subtract(t) : h.signum() < 0 ? (h.addTo(t, h), h.signum() < 0 ? h.add(t) : h) : h
        }

        function bnIsProbablePrime(t) {
            var i, r = this.abs();
            if (1 == r.t && r[0] <= lowprimes[lowprimes.length - 1]) {
                for (i = 0; i < lowprimes.length; ++i)
                    if (r[0] == lowprimes[i]) return !0;
                return !1
            }
            if (r.isEven()) return !1;
            for (i = 1; i < lowprimes.length;) {
                for (var n = lowprimes[i], e = i + 1; e < lowprimes.length && lplim > n;) n *= lowprimes[e++];
                for (n = r.modInt(n); e > i;)
                    if (n % lowprimes[i++] == 0) return !1
                        }
            return r.millerRabin(t)
        }

        function bnpMillerRabin(t) {
            var i = this.subtract(BigInteger.ONE),
                r = i.getLowestSetBit();
            if (0 >= r) return !1;
            var n = i.shiftRight(r);
            t = t + 1 >> 1, t > lowprimes.length && (t = lowprimes.length);
            for (var e = nbi(), o = 0; t > o; ++o) {
                e.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
                var s = e.modPow(n, this);
                if (0 != s.compareTo(BigInteger.ONE) && 0 != s.compareTo(i)) {
                    for (var h = 1; h++ < r && 0 != s.compareTo(i);)
                        if (s = s.modPowInt(2, this), 0 == s.compareTo(BigInteger.ONE)) return !1;
                    if (0 != s.compareTo(i)) return !1
                        }
            }
            return !0
        }
        var dbits, canary = 0xdeadbeefcafe,
            j_lm = 15715070 == (16777215 & canary);
        j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
        var BI_FP = 52;
        BigInteger.prototype.FV = Math.pow(2, BI_FP), BigInteger.prototype.F1 = BI_FP - dbits, BigInteger.prototype.F2 = 2 * dbits - BI_FP;
        var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
            BI_RC = new Array,
            rr, vv;
        for (rr = "0".charCodeAt(0), vv = 0; 9 >= vv; ++vv) BI_RC[rr++] = vv;
        for (rr = "a".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
        for (rr = "A".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
        Classic.prototype.convert = cConvert, Classic.prototype.revert = cRevert, Classic.prototype.reduce = cReduce, Classic.prototype.mulTo = cMulTo, Classic.prototype.sqrTo = cSqrTo, Montgomery.prototype.convert = montConvert, Montgomery.prototype.revert = montRevert, Montgomery.prototype.reduce = montReduce, Montgomery.prototype.mulTo = montMulTo, Montgomery.prototype.sqrTo = montSqrTo, BigInteger.prototype.copyTo = bnpCopyTo, BigInteger.prototype.fromInt = bnpFromInt, BigInteger.prototype.fromString = bnpFromString, BigInteger.prototype.clamp = bnpClamp, BigInteger.prototype.dlShiftTo = bnpDLShiftTo, BigInteger.prototype.drShiftTo = bnpDRShiftTo, BigInteger.prototype.lShiftTo = bnpLShiftTo, BigInteger.prototype.rShiftTo = bnpRShiftTo, BigInteger.prototype.subTo = bnpSubTo, BigInteger.prototype.multiplyTo = bnpMultiplyTo, BigInteger.prototype.squareTo = bnpSquareTo, BigInteger.prototype.divRemTo = bnpDivRemTo, BigInteger.prototype.invDigit = bnpInvDigit, BigInteger.prototype.isEven = bnpIsEven, BigInteger.prototype.exp = bnpExp, BigInteger.prototype.toString = bnToString, BigInteger.prototype.negate = bnNegate, BigInteger.prototype.abs = bnAbs, BigInteger.prototype.compareTo = bnCompareTo, BigInteger.prototype.bitLength = bnBitLength, BigInteger.prototype.mod = bnMod, BigInteger.prototype.modPowInt = bnModPowInt, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), NullExp.prototype.convert = nNop, NullExp.prototype.revert = nNop, NullExp.prototype.mulTo = nMulTo, NullExp.prototype.sqrTo = nSqrTo, Barrett.prototype.convert = barrettConvert, Barrett.prototype.revert = barrettRevert, Barrett.prototype.reduce = barrettReduce, Barrett.prototype.mulTo = barrettMulTo, Barrett.prototype.sqrTo = barrettSqrTo;
        var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
            lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
        BigInteger.prototype.chunkSize = bnpChunkSize, BigInteger.prototype.toRadix = bnpToRadix, BigInteger.prototype.fromRadix = bnpFromRadix, BigInteger.prototype.fromNumber = bnpFromNumber, BigInteger.prototype.bitwiseTo = bnpBitwiseTo, BigInteger.prototype.changeBit = bnpChangeBit, BigInteger.prototype.addTo = bnpAddTo, BigInteger.prototype.dMultiply = bnpDMultiply, BigInteger.prototype.dAddOffset = bnpDAddOffset, BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo, BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo, BigInteger.prototype.modInt = bnpModInt, BigInteger.prototype.millerRabin = bnpMillerRabin, BigInteger.prototype.clone = bnClone, BigInteger.prototype.intValue = bnIntValue, BigInteger.prototype.byteValue = bnByteValue, BigInteger.prototype.shortValue = bnShortValue, BigInteger.prototype.signum = bnSigNum, BigInteger.prototype.toByteArray = bnToByteArray, BigInteger.prototype.equals = bnEquals, BigInteger.prototype.min = bnMin, BigInteger.prototype.max = bnMax, BigInteger.prototype.and = bnAnd, BigInteger.prototype.or = bnOr, BigInteger.prototype.xor = bnXor, BigInteger.prototype.andNot = bnAndNot, BigInteger.prototype.not = bnNot, BigInteger.prototype.shiftLeft = bnShiftLeft, BigInteger.prototype.shiftRight = bnShiftRight, BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit, BigInteger.prototype.bitCount = bnBitCount, BigInteger.prototype.testBit = bnTestBit, BigInteger.prototype.setBit = bnSetBit, BigInteger.prototype.clearBit = bnClearBit, BigInteger.prototype.flipBit = bnFlipBit, BigInteger.prototype.add = bnAdd, BigInteger.prototype.subtract = bnSubtract, BigInteger.prototype.multiply = bnMultiply, BigInteger.prototype.divide = bnDivide, BigInteger.prototype.remainder = bnRemainder, BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder, BigInteger.prototype.modPow = bnModPow, BigInteger.prototype.modInverse = bnModInverse, BigInteger.prototype.pow = bnPow, BigInteger.prototype.gcd = bnGCD, BigInteger.prototype.isProbablePrime = bnIsProbablePrime, BigInteger.prototype.square = bnSquare;

        var converters = function() {
            var r, t = {},
                n = [];
            for (r = 0; 9 >= r; ++r) {
                var e = r.toString();
                t[e] = r, n.push(e)
            }
            for (r = 10; 15 >= r; ++r) {
                var o = String.fromCharCode("a".charCodeAt(0) + r - 10),
                    a = String.fromCharCode("A".charCodeAt(0) + r - 10);
                t[o] = r, t[a] = r, n.push(o)
            }
            return {
                byteArrayToHexString: function(r) {
                    for (var t = "", e = 0; e < r.length; ++e) r[e] < 0 && (r[e] += 256), t += n[r[e] >> 4] + n[15 & r[e]];
                    return t
                },
                stringToByteArray: function(r) {
                    r = unescape(encodeURIComponent(r));
                    for (var t = new Array(r.length), n = 0; n < r.length; ++n) t[n] = r.charCodeAt(n);
                    return t
                },
                hexStringToByteArray: function(r) {
                    var n = [],
                        e = 0;
                    for (0 !== r.length % 2 && (n.push(t[r.charAt(0)]), ++e); e < r.length - 1; e += 2) n.push((t[r.charAt(e)] << 4) + t[r.charAt(e + 1)]);
                    return n
                },
                stringToHexString: function(r) {
                    return this.byteArrayToHexString(this.stringToByteArray(r))
                },
                hexStringToString: function(r) {
                    return this.byteArrayToString(this.hexStringToByteArray(r))
                },
                checkBytesToIntInput: function(r, t, n) {
                    var e = n || 0;
                    if (0 > e) throw new Error("Start index should not be negative");
                    if (r.length < e + t) throw new Error("Need at least " + t + " bytes to convert to an integer");
                    return e
                },
                byteArrayToSignedShort: function(r, t) {
                    var n = this.checkBytesToIntInput(r, 2, t),
                        e = r[n];
                    return e += r[n + 1] << 8
                },
                byteArrayToSignedInt32: function(r, t) {
                    var n = this.checkBytesToIntInput(r, 4, t);
                    return value = r[n], value += r[n + 1] << 8, value += r[n + 2] << 16, value += r[n + 3] << 24, value
                },
                byteArrayToBigInteger: function(r, t) {
                    for (var n, e, o = (this.checkBytesToIntInput(r, 8, t), new BigInteger("0", 10)), a = 7; a >= 0; a--) n = o.multiply(new BigInteger("256", 10)), e = n.add(new BigInteger(r[t + a].toString(10), 10)), o = e;
                    return o
                },
                byteArrayToWordArray: function(r) {
                    for (var t = 0, n = 0, e = 0, o = r.length, a = new Uint32Array((o / 4 | 0) + (o % 4 == 0 ? 0 : 1)); o - o % 4 > t;) a[n++] = r[t++] << 24 | r[t++] << 16 | r[t++] << 8 | r[t++];
                    o % 4 != 0 && (e = r[t++] << 24, o % 4 > 1 && (e |= r[t++] << 16), o % 4 > 2 && (e |= r[t++] << 8), a[n] = e);
                    var i = new Object;
                    return i.sigBytes = o, i.words = a, i
                },
                wordArrayToByteArray: function(r) {
                    var t = r.words.length;
                    if (0 == t) return new Array(0);
                    var n, e, o = new Array(r.sigBytes),
                        a = 0;
                    for (e = 0; t - 1 > e; e++) n = r.words[e], o[a++] = n >> 24, o[a++] = n >> 16 & 255, o[a++] = n >> 8 & 255, o[a++] = 255 & n;
                    return n = r.words[t - 1], o[a++] = n >> 24, r.sigBytes % 4 == 0 && (o[a++] = n >> 16 & 255, o[a++] = n >> 8 & 255, o[a++] = 255 & n), r.sigBytes % 4 > 1 && (o[a++] = n >> 16 & 255), r.sigBytes % 4 > 2 && (o[a++] = n >> 8 & 255), o
                },
                byteArrayToString: function(r, t, n) {
                    if (0 == n) return "";
                    if (t && n) {
                        {
                            this.checkBytesToIntInput(r, parseInt(n, 10), parseInt(t, 10))
                        }
                        r = r.slice(t, t + n)
                    }
                    return decodeURIComponent(escape(String.fromCharCode.apply(null, r)))
                },
                byteArrayToShortArray: function(r) {
                    var t, n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (t = 0; 16 > t; t++) n[t] = r[2 * t] | r[2 * t + 1] << 8;
                    return n
                },
                shortArrayToByteArray: function(r) {
                    var t, n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (t = 0; 16 > t; t++) n[2 * t] = 255 & r[t], n[2 * t + 1] = r[t] >> 8;
                    return n
                },
                shortArrayToHexString: function(r) {
                    for (var t = "", e = 0; e < r.length; e++) t += n[r[e] >> 4 & 15] + n[15 & r[e]] + n[r[e] >> 12 & 15] + n[r[e] >> 8 & 15];
                    return t
                },
                intToBytes_: function(r, t, n, e) {
                    var o = Math.floor(n / 2),
                        a = -1 * (o + 1);
                    if (r != Math.floor(r) || a > r || r > n) throw new Error(r + " is not a " + 8 * t + " bit integer");
                    var i, u = [],
                        y = r >= 0 && o >= r ? 0 : r > o && n >= r ? 1 : 2;
                    2 == y && (r = -1 * r - 1);
                    for (var s = 0; t > s; s++) i = 2 == y ? 255 - r % 256 : r % 256, e ? u.unshift(i) : u.push(i), 1 == y ? r = Math.floor(r / 256) : r >>= 8;
                    return u
                },
                int32ToBytes: function(r, t) {
                    return converters.intToBytes_(r, 4, 4294967295, t)
                }
            }
        }();

        var curve25519 = function() {
            function r(r) {
                r[31] &= 127, r[31] |= 64, r[0] &= 248
            }

            function n(r, n) {
                for (var f = 0; 32 > f; f++) r[f] = n[f]
                    }

            function f(r, n, f, o, a, u) {
                f = 0 | f, a = 0 | a, u = 0 | u;
                for (var t = 0, v = 0; a > v; ++v) t += (255 & n[v + f]) + u * (255 & o[v]), r[v + f] = 255 & t, t >>= 8;
                return t
            }

            function o(r, n, o, a, u) {
                a = 0 | a, u = 0 | u;
                for (var t = 31, v = 0, i = 0; a > i; i++) {
                    var c = u * (255 & o[i]);
                    v += f(r, r, i, n, t, c) + (255 & r[i + t]) + c * (255 & n[t]), r[i + t] = 255 & v, v >>= 8
                }
                return r[i + t] = v + (255 & r[i + t]) & 255, v >> 8
            }

            function a(r, n, o, a, u) {
                o = 0 | o, u = 0 | u;
                var t = 0,
                    v = (255 & a[u - 1]) << 8;
                for (u > 1 && (v |= 255 & a[u - 2]); o-- >= u;) {
                    var i = t << 16 | (255 & n[o]) << 8;
                    o > 0 && (i |= 255 & n[o - 1]);
                    var c = o - u + 1;
                    i /= v, t += f(n, n, c, a, u, -i), r[c] = i + t & 255, f(n, n, c, a, u, -t), t = 255 & n[o], n[o] = 0
                }
                n[u - 1] = 255 & t
            }

            function u(r, n) {
                for (; 0 !== n-- && 0 === r[n];);
                return n + 1
            }

            function t(r, n, f, t) {
                var v, i, c, e = 32;
                for (c = 0; 32 > c; c++) r[c] = n[c] = 0;
                if (r[0] = 1, v = u(f, 32), 0 === v) return n;
                for (var y = new Array(32);;) {
                    if (i = e - v + 1, a(y, t, e, f, v), e = u(t, e), 0 === e) return r;
                    if (o(n, r, y, i, -1), i = v - e + 1, a(y, f, v, t, e), v = u(f, v), 0 === v) return n;
                    o(r, n, y, i, -1)
                }
            }

            function v(r, n) {
                for (var f = 0; F > f; f += 2) r[f / 2] = 255 & n[f] | (255 & n[f + 1]) << 8
                    }

            function i(r) {
                return r[0] > Q - 19 && (r[1] & r[3] & r[5] & r[7] & r[9]) === P && (r[2] & r[4] & r[6] & r[8]) === Q || r[9] > P
            }

            function c(r, n) {
                for (var f = 0; G > f; ++f) n[2 * f] = 255 & r[f], n[2 * f + 1] = (65280 & r[f]) >> 8
                    }

            function e() {
                return new Uint16Array(G)
            }

            function y(r, n) {
                for (var f = 0; G > f; ++f) r[f] = n[f]
                    }

            function w(r, n) {
                r[0] = n;
                for (var f = 1; G > f; ++f) r[f] = 0
                    }

            function A(r, n, f) {
                var o, a = e(),
                    u = e(),
                    t = e(),
                    v = e(),
                    i = e();
                for (W(u, n), W(t, u), W(a, t), V(t, a, n), V(a, t, u), W(u, a), V(v, u, t), W(u, v), W(t, u), W(u, t), W(t, u), W(u, t), V(t, u, v), W(u, t), W(v, u), o = 1; 5 > o; o++) W(u, v), W(v, u);
                for (V(u, v, t), W(v, u), W(i, v), o = 1; 10 > o; o++) W(v, i), W(i, v);
                for (V(v, i, u), o = 0; 5 > o; o++) W(u, v), W(v, u);
                for (V(u, v, t), W(t, u), W(v, t), o = 1; 25 > o; o++) W(t, v), W(v, t);
                for (V(t, v, u), W(v, t), W(i, v), o = 1; 50 > o; o++) W(v, i), W(i, v);
                for (V(v, i, t), o = 0; 25 > o; o++) W(i, v), W(v, i);
                V(t, v, u), W(u, t), W(t, u), 0 !== f ? V(r, n, t) : (W(u, t), W(t, u), W(u, t), V(r, u, a))
            }

            function l(r) {
                var n = i(r) || r[9] < 0,
                    f = 1 & r[0];
                return 4294967295 & ((n ? 1 : 0) ^ f)
            }

            function g(r, n) {
                var f = e(),
                    o = e(),
                    a = e();
                R(o, n, n), A(f, o, 1), W(r, f), V(a, o, r), S(a, a, L), V(o, f, a), V(r, n, o)
            }

            function k(r, n, f, o, a, u, t, v) {
                var i, c = [];
                return c[0] = 65535 & (i = v * v), c[1] = 65535 & (i = (i / 65536 | 0) + 2 * v * t), c[2] = 65535 & (i = (i / 65536 | 0) + 2 * v * u + t * t), c[3] = 65535 & (i = (i / 65536 | 0) + 2 * v * a + 2 * t * u), c[4] = 65535 & (i = (i / 65536 | 0) + 2 * v * o + 2 * t * a + u * u), c[5] = 65535 & (i = (i / 65536 | 0) + 2 * v * f + 2 * t * o + 2 * u * a), c[6] = 65535 & (i = (i / 65536 | 0) + 2 * v * n + 2 * t * f + 2 * u * o + a * a), c[7] = 65535 & (i = (i / 65536 | 0) + 2 * v * r + 2 * t * n + 2 * u * f + 2 * a * o), c[8] = 65535 & (i = (i / 65536 | 0) + 2 * t * r + 2 * u * n + 2 * a * f + o * o), c[9] = 65535 & (i = (i / 65536 | 0) + 2 * u * r + 2 * a * n + 2 * o * f), c[10] = 65535 & (i = (i / 65536 | 0) + 2 * a * r + 2 * o * n + f * f), c[11] = 65535 & (i = (i / 65536 | 0) + 2 * o * r + 2 * f * n), c[12] = 65535 & (i = (i / 65536 | 0) + 2 * f * r + n * n), c[13] = 65535 & (i = (i / 65536 | 0) + 2 * n * r), c[14] = 65535 & (i = (i / 65536 | 0) + r * r), c[15] = i / 65536 | 0, c
            }

            function s(r, n) {
                var f, o = k(n[15], n[14], n[13], n[12], n[11], n[10], n[9], n[8]),
                    a = k(n[7], n[6], n[5], n[4], n[3], n[2], n[1], n[0]),
                    u = k(n[15] + n[7], n[14] + n[6], n[13] + n[5], n[12] + n[4], n[11] + n[3], n[10] + n[2], n[9] + n[1], n[8] + n[0]);
                r[0] = 65535 & (f = 8388608 + a[0] + 38 * (u[8] - o[8] - a[8] + o[0] - 128)), r[1] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[1] + 38 * (u[9] - o[9] - a[9] + o[1])), r[2] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[2] + 38 * (u[10] - o[10] - a[10] + o[2])), r[3] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[3] + 38 * (u[11] - o[11] - a[11] + o[3])), r[4] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[4] + 38 * (u[12] - o[12] - a[12] + o[4])), r[5] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[5] + 38 * (u[13] - o[13] - a[13] + o[5])), r[6] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[6] + 38 * (u[14] - o[14] - a[14] + o[6])), r[7] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[7] + 38 * (u[15] - o[15] - a[15] + o[7])), r[8] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[8] + u[0] - o[0] - a[0] + 38 * o[8]), r[9] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[9] + u[1] - o[1] - a[1] + 38 * o[9]), r[10] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[10] + u[2] - o[2] - a[2] + 38 * o[10]), r[11] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[11] + u[3] - o[3] - a[3] + 38 * o[11]), r[12] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[12] + u[4] - o[4] - a[4] + 38 * o[12]), r[13] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[13] + u[5] - o[5] - a[5] + 38 * o[13]), r[14] = 65535 & (f = 8388480 + (f / 65536 | 0) + a[14] + u[6] - o[6] - a[6] + 38 * o[14]);
                var t = 8388480 + (f / 65536 | 0) + a[15] + u[7] - o[7] - a[7] + 38 * o[15];
                U(r, t)
            }

            function d(r, n, f, o, a, u, t, v, i, c, e, y, w, A, l, g) {
                var k, s = [];
                return s[0] = 65535 & (k = v * g), s[1] = 65535 & (k = (k / 65536 | 0) + v * l + t * g), s[2] = 65535 & (k = (k / 65536 | 0) + v * A + t * l + u * g), s[3] = 65535 & (k = (k / 65536 | 0) + v * w + t * A + u * l + a * g), s[4] = 65535 & (k = (k / 65536 | 0) + v * y + t * w + u * A + a * l + o * g), s[5] = 65535 & (k = (k / 65536 | 0) + v * e + t * y + u * w + a * A + o * l + f * g), s[6] = 65535 & (k = (k / 65536 | 0) + v * c + t * e + u * y + a * w + o * A + f * l + n * g), s[7] = 65535 & (k = (k / 65536 | 0) + v * i + t * c + u * e + a * y + o * w + f * A + n * l + r * g), s[8] = 65535 & (k = (k / 65536 | 0) + t * i + u * c + a * e + o * y + f * w + n * A + r * l), s[9] = 65535 & (k = (k / 65536 | 0) + u * i + a * c + o * e + f * y + n * w + r * A), s[10] = 65535 & (k = (k / 65536 | 0) + a * i + o * c + f * e + n * y + r * w), s[11] = 65535 & (k = (k / 65536 | 0) + o * i + f * c + n * e + r * y), s[12] = 65535 & (k = (k / 65536 | 0) + f * i + n * c + r * e), s[13] = 65535 & (k = (k / 65536 | 0) + n * i + r * c), s[14] = 65535 & (k = (k / 65536 | 0) + r * i), s[15] = k / 65536 | 0, s
            }

            function p(r, n, f) {
                var o, a = d(n[15], n[14], n[13], n[12], n[11], n[10], n[9], n[8], f[15], f[14], f[13], f[12], f[11], f[10], f[9], f[8]),
                    u = d(n[7], n[6], n[5], n[4], n[3], n[2], n[1], n[0], f[7], f[6], f[5], f[4], f[3], f[2], f[1], f[0]),
                    t = d(n[15] + n[7], n[14] + n[6], n[13] + n[5], n[12] + n[4], n[11] + n[3], n[10] + n[2], n[9] + n[1], n[8] + n[0], f[15] + f[7], f[14] + f[6], f[13] + f[5], f[12] + f[4], f[11] + f[3], f[10] + f[2], f[9] + f[1], f[8] + f[0]);
                r[0] = 65535 & (o = 8388608 + u[0] + 38 * (t[8] - a[8] - u[8] + a[0] - 128)), r[1] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[1] + 38 * (t[9] - a[9] - u[9] + a[1])), r[2] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[2] + 38 * (t[10] - a[10] - u[10] + a[2])), r[3] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[3] + 38 * (t[11] - a[11] - u[11] + a[3])), r[4] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[4] + 38 * (t[12] - a[12] - u[12] + a[4])), r[5] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[5] + 38 * (t[13] - a[13] - u[13] + a[5])), r[6] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[6] + 38 * (t[14] - a[14] - u[14] + a[6])), r[7] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[7] + 38 * (t[15] - a[15] - u[15] + a[7])), r[8] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[8] + t[0] - a[0] - u[0] + 38 * a[8]), r[9] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[9] + t[1] - a[1] - u[1] + 38 * a[9]), r[10] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[10] + t[2] - a[2] - u[2] + 38 * a[10]), r[11] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[11] + t[3] - a[3] - u[3] + 38 * a[11]), r[12] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[12] + t[4] - a[4] - u[4] + 38 * a[12]), r[13] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[13] + t[5] - a[5] - u[5] + 38 * a[13]), r[14] = 65535 & (o = 8388480 + (o / 65536 | 0) + u[14] + t[6] - a[6] - u[6] + 38 * a[14]);
                var v = 8388480 + (o / 65536 | 0) + u[15] + t[7] - a[7] - u[7] + 38 * a[15];
                U(r, v)
            }

            function U(r, n) {
                var f = n;
                r[15] = 32767 & f, f = 19 * (f / 32768 | 0);
                for (var o = 0; 14 >= o; ++o) r[o] = 65535 & (f += r[o]), f = f / 65536 | 0;
                r[15] += f
            }

            function b(r, n, f) {
                var o;
                r[0] = 65535 & (o = 19 * ((n[15] / 32768 | 0) + (f[15] / 32768 | 0)) + n[0] + f[0]);
                for (var a = 1; 14 >= a; ++a) r[a] = 65535 & (o = (o / 65536 | 0) + n[a] + f[a]);
                r[15] = (o / 65536 | 0) + (32767 & n[15]) + (32767 & f[15])
            }

            function h(r, n, f) {
                var o;
                r[0] = 65535 & (o = 524288 + 19 * ((n[15] / 32768 | 0) - (f[15] / 32768 | 0) - 1) + n[0] - f[0]);
                for (var a = 1; 14 >= a; ++a) r[a] = 65535 & (o = (o / 65536 | 0) + 524280 + n[a] - f[a]);
                r[15] = (o / 65536 | 0) + 32760 + (32767 & n[15]) - (32767 & f[15])
            }

            function j(r, n, f) {
                var o;
                r[0] = 65535 & (o = n[0] * f);
                for (var a = 1; 14 >= a; ++a) r[a] = 65535 & (o = (o / 65536 | 0) + n[a] * f);
                var u = (o / 65536 | 0) + n[15] * f;
                U(r, u)
            }

            function m(r, n, f, o) {
                R(r, f, o), S(n, f, o)
            }

            function q(r, n, f, o, a, u, t) {
                V(a, n, f), V(u, r, o), R(r, a, u), S(n, a, u), W(a, r), W(r, n), V(u, r, t)
            }

            function x(r, n, f, o, a, u) {
                W(r, f), W(n, o), V(a, r, n), S(n, r, n), T(u, n, 121665), R(r, r, u), V(u, r, n)
            }

            function z(r, n, f) {
                W(r, f), T(n, f, 486662), R(r, r, n), R(r, r, L), V(n, r, f)
            }

            function B(r, o, a, u) {
                var i, g, k = e(),
                    s = e(),
                    d = e(),
                    p = e(),
                    U = e(),
                    b = [e(), e()],
                    h = [e(), e()];
                for (null !== u ? v(k, u) : w(k, 9), w(b[0], 1), w(h[0], 0), y(b[1], k), w(h[1], 1), i = 32; 0 !== i--;)
                    for (g = 8; 0 !== g--;) {
                        var j = (255 & a[i]) >> g & 1,
                            B = ~(255 & a[i]) >> g & 1,
                            C = b[B],
                            D = h[B],
                            E = b[j],
                            F = h[j];
                        m(s, d, C, D), m(p, U, E, F), q(s, d, p, U, C, D, k), x(s, d, p, U, E, F)
                    }
                if (A(s, h[0], 0), V(k, b[0], s), c(k, r), null !== o) {
                    z(d, s, k), A(p, h[1], 0), V(d, b[1], p), R(d, d, k), R(d, d, N), S(k, k, M), W(p, k), V(k, d, p), S(k, k, s), S(k, k, O), V(s, k, K), 0 !== l(s) ? n(o, a) : f(o, I, 0, a, 32, -1);
                    var G = new Array(32),
                        J = new Array(64),
                        L = new Array(64);
                    n(G, H), n(o, t(J, L, o, G)), 0 !== (128 & o[31]) && f(o, o, 0, H, 32, 1)
                }
            }

            function C(r, u, t) {
                var v, i, c = new Array(32),
                    e = new Array(32),
                    y = new Array(64),
                    w = new Array(64);
                n(c, r), n(e, u);
                var A = new Array(32);
                a(A, c, 32, H, 32), a(A, e, 32, H, 32);
                var l = new Array(32);
                for (f(l, e, 0, c, 32, -1), f(l, l, 0, H, 32, 1), o(y, l, t, 32, 1), a(w, y, 64, H, 32), v = 0, i = 0; 32 > i; i++) v |= l[i] = y[i];
                return 0 !== v ? l : void 0
            }

            function D(r, n, f) {
                var o, a, u, t = new Array(32),
                    i = [e(), e()],
                    k = [e(), e()],
                    s = [e(), e(), e()],
                    d = [e(), e(), e()],
                    p = [e(), e(), e()],
                    U = [e(), e(), e()],
                    b = 0,
                    h = 0,
                    j = 0,
                    B = 0;
                for (w(i[0], 9), v(i[1], f), z(p[0], U[0], i[1]), g(p[0], U[0]), a = l(p[0]), R(U[0], U[0], O), V(U[1], J, p[0]), S(p[a], U[0], U[1]), R(p[1 - a], U[0], U[1]), y(U[0], i[1]), S(U[0], U[0], M), W(U[1], U[0]), A(U[0], U[1], 0), V(k[0], p[0], U[0]), S(k[0], k[0], i[1]), S(k[0], k[0], N), V(k[1], p[1], U[0]), S(k[1], k[1], i[1]), S(k[1], k[1], N), T(k[0], k[0], 1), T(k[1], k[1], 1), o = 0; 32 > o; o++) b = b >> 8 ^ 255 & r[o] ^ (255 & r[o]) << 1, h = h >> 8 ^ 255 & n[o] ^ (255 & n[o]) << 1, B = ~(b ^ h), j = B & (128 & j) >> 7 ^ b, j ^= B & (1 & j) << 1, j ^= B & (2 & j) << 1, j ^= B & (4 & j) << 1, j ^= B & (8 & j) << 1, j ^= B & (16 & j) << 1, j ^= B & (32 & j) << 1, j ^= B & (64 & j) << 1, t[o] = 255 & j;
                for (j = (B & (128 & j) << 1 ^ b) >> 8, w(s[0], 1), y(s[1], i[j]), y(s[2], k[0]), w(d[0], 0), w(d[1], 1), w(d[2], 1), b = 0, h = 0, o = 32; 0 !== o--;)
                    for (b = b << 8 | 255 & r[o], h = h << 8 | 255 & n[o], j = j << 8 | 255 & t[o], a = 8; 0 !== a--;) m(p[0], U[0], s[0], d[0]), m(p[1], U[1], s[1], d[1]), m(p[2], U[2], s[2], d[2]), u = ((b ^ b >> 1) >> a & 1) + ((h ^ h >> 1) >> a & 1), x(s[2], d[2], p[u], U[u], s[0], d[0]), u = j >> a & 2 ^ (j >> a & 1) << 1, q(p[1], U[1], p[u], U[u], s[1], d[1], i[j >> a & 1]), q(p[2], U[2], p[0], U[0], s[2], d[2], k[((b ^ h) >> a & 2) >> 1]);
                u = (1 & b) + (1 & h), A(p[0], d[u], 0), V(p[1], s[u], p[0]);
                var C = [];
                return c(p[1], C), C
            }

            function E(n) {
                var f = [],
                    o = [];
                return n = n || [], r(n), B(f, o, n, null), {
                    p: f,
                    s: o,
                    k: n
                }
            }
            var F = 32,
                G = 16,
                H = [237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16],
                I = [104, 159, 174, 231, 210, 24, 147, 192, 178, 230, 188, 23, 245, 206, 247, 166, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128],
                J = [22587, 610, 29883, 44076, 15515, 9479, 25859, 56197, 23910, 4462, 17831, 16322, 62102, 36542, 52412, 16035],
                K = [5744, 16384, 61977, 54121, 8776, 18501, 26522, 34893, 23833, 5823, 55924, 58749, 24147, 14085, 13606, 6080],
                L = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                M = [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                N = [27919, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                O = [33224, 601, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                P = 33554431,
                Q = 67108863,
                R = b,
                S = h,
                T = j,
                V = p,
                W = s;
            return {
                sign: C,
                verify: D,
                keygen: E
            }
        }();

        function string_to_array(_) {
            for (var H = _.length, A = new Array(H), r = 0; H > r; r++) A[r] = _.charCodeAt(r);
            return A
        }

        function array_to_hex_string(_) {
            for (var H = "", A = 0; A < _.length; A++) H += SHA256_hexchars[_[A] >> 4] + SHA256_hexchars[15 & _[A]];
            return H
        }

        function SHA256_init() {
            SHA256_H = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), SHA256_buf = new Array, SHA256_len = 0
        }

        function SHA256_write(_) {
            SHA256_buf = SHA256_buf.concat("string" == typeof _ ? string_to_array(_) : _);
            for (var H = 0; H + 64 <= SHA256_buf.length; H += 64) SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf.slice(H, H + 64));
            SHA256_buf = SHA256_buf.slice(H), SHA256_len += _.length
        }

        function SHA256_finalize() {
            if (SHA256_buf[SHA256_buf.length] = 128, SHA256_buf.length > 56) {
                for (var _ = SHA256_buf.length; 64 > _; _++) SHA256_buf[_] = 0;
                SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf), SHA256_buf.length = 0
            }
            for (var _ = SHA256_buf.length; 59 > _; _++) SHA256_buf[_] = 0;
            SHA256_buf[59] = SHA256_len >>> 29 & 255, SHA256_buf[60] = SHA256_len >>> 21 & 255, SHA256_buf[61] = SHA256_len >>> 13 & 255, SHA256_buf[62] = SHA256_len >>> 5 & 255, SHA256_buf[63] = SHA256_len << 3 & 255, SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf);
            for (var H = new Array(32), _ = 0; 8 > _; _++) H[4 * _ + 0] = SHA256_H[_] >>> 24, H[4 * _ + 1] = SHA256_H[_] >> 16 & 255, H[4 * _ + 2] = SHA256_H[_] >> 8 & 255, H[4 * _ + 3] = 255 & SHA256_H[_];
            return delete SHA256_H, delete SHA256_buf, delete SHA256_len, H
        }

        function SHA256_hash(_, H) {
            var A;
            return SHA256_init(), SHA256_write(_), A = SHA256_finalize(), H ? A : array_to_hex_string(A)
        }

        function HMAC_SHA256_init(_) {
            HMAC_SHA256_key = "string" == typeof _ ? string_to_array(_) : (new Array).concat(_), HMAC_SHA256_key.length > 64 && (SHA256_init(), SHA256_write(HMAC_SHA256_key), HMAC_SHA256_key = SHA256_finalize());
            for (var H = HMAC_SHA256_key.length; 64 > H; H++) HMAC_SHA256_key[H] = 0;
            for (var H = 0; 64 > H; H++) HMAC_SHA256_key[H] ^= 54;
            SHA256_init(), SHA256_write(HMAC_SHA256_key)
        }

        function HMAC_SHA256_write(_) {
            SHA256_write(_)
        }

        function HMAC_SHA256_finalize() {
            for (var _ = SHA256_finalize(), H = 0; 64 > H; H++) HMAC_SHA256_key[H] ^= 106;
            SHA256_init(), SHA256_write(HMAC_SHA256_key), SHA256_write(_);
            for (var H = 0; 64 > H; H++) HMAC_SHA256_key[H] = 0;
            return delete HMAC_SHA256_key, SHA256_finalize()
        }

        function HMAC_SHA256_MAC(_, H) {
            var A;
            return HMAC_SHA256_init(_), HMAC_SHA256_write(H), A = HMAC_SHA256_finalize(), array_to_hex_string(A)
        }

        function SHA256_sigma0(_) {
            return (_ >>> 7 | _ << 25) ^ (_ >>> 18 | _ << 14) ^ _ >>> 3
        }

        function SHA256_sigma1(_) {
            return (_ >>> 17 | _ << 15) ^ (_ >>> 19 | _ << 13) ^ _ >>> 10
        }

        function SHA256_Sigma0(_) {
            return (_ >>> 2 | _ << 30) ^ (_ >>> 13 | _ << 19) ^ (_ >>> 22 | _ << 10)
        }

        function SHA256_Sigma1(_) {
            return (_ >>> 6 | _ << 26) ^ (_ >>> 11 | _ << 21) ^ (_ >>> 25 | _ << 7)
        }

        function SHA256_Ch(_, H, A) {
            return A ^ _ & (H ^ A)
        }

        function SHA256_Maj(_, H, A) {
            return _ & H ^ A & (_ ^ H)
        }

        function SHA256_Hash_Word_Block(_, H) {
            for (var A = 16; 64 > A; A++) H[A] = SHA256_sigma1(H[A - 2]) + H[A - 7] + SHA256_sigma0(H[A - 15]) + H[A - 16] & 4294967295;
            for (var r = (new Array).concat(_), A = 0; 64 > A; A++) {
                var S = r[7] + SHA256_Sigma1(r[4]) + SHA256_Ch(r[4], r[5], r[6]) + SHA256_K[A] + H[A],
                    n = SHA256_Sigma0(r[0]) + SHA256_Maj(r[0], r[1], r[2]);
                r.pop(), r.unshift(S + n & 4294967295), r[4] = r[4] + S & 4294967295
            }
            for (var A = 0; 8 > A; A++) _[A] = _[A] + r[A] & 4294967295
                }

        function SHA256_Hash_Byte_Block(_, H) {
            for (var A = new Array(16), r = 0; 16 > r; r++) A[r] = H[4 * r + 0] << 24 | H[4 * r + 1] << 16 | H[4 * r + 2] << 8 | H[4 * r + 3];
            SHA256_Hash_Word_Block(_, A)
        }
        var SHA256_buf = new Array,
            SHA256_len = 0,
            SHA256_H = new Array;
        SHA256_hexchars = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"), SHA256_K = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298);

        function BurstAddress() {
            function r(r) {
                return v[31 - c[r]]
            }

            function t(r, t) {
                if (0 == r || 0 == t) return 0;
                var e = (c[r] + c[t]) % 31;
                return v[e]
            }

            function e(r, e) {
                for (var f = 0, n = 0; e > n; n++) f ^= t(r[n], h[e - n]);
                return f
            }

            function f(r) {
                for (var e = [], f = 1; 31 >= f; f++) {
                    for (var n = 0, i = 0; 5 > i; i++) n ^= t(v[i * f % 31], r[i]);
                    if (0 == n) {
                        var o = 31 - f;
                        if (o > 12 && 27 > o) return [];
                        e[e.length] = o
                    }
                }
                return e
            }

            function n() {
                for (var n = 0, i = [0, 0, 0, 0, 0], o = [], a = 0, s = [1, 0, 0, 0, 0], c = 0; 4 > c; c++) {
                    var d = e(s, c + 1);
                    if (0 != d) {
                        a = 0;
                        for (var g = 0; 5 > g; g++) o[g] = s[g] ^ t(d, i[g]), o[g] && (a = g);
                        if (c >= 2 * n)
                            for (n = c + 1 - n, g = 0; 5 > g; g++) i[g] = t(s[g], r(d));
                        s = o.slice()
                    }
                    i.unshift(0)
                }
                var l = f(s),
                    p = l.length;
                if (1 > p || p > 2) return !1;
                if (a != p) return !1;
                for (var C = [0, 0, 0, 0, 0], g = 0; 4 > g; g++) {
                    for (var o = 0, A = 0; g > A; A++) o ^= t(h[g + 1 - A], s[A]);
                    C[g] = o
                }
                for (c = 0; p > c; c++) {
                    var o = 0,
                        b = l[c],
                        k = 31 - b;
                    for (g = 0; 4 > g; g++) o ^= t(C[g], v[k * g % 31]);
                    if (o) {
                        var _ = t(s[1], 1) ^ t(s[3], v[2 * k % 31]);
                        if (0 == _) return !1;
                        b > 12 && (b -= 14), u[b] ^= t(o, r(_))
                    }
                }
                return !0
            }

            function i() {
                for (var r = [0, 0, 0, 0], e = 12; e >= 0; e--) {
                    var f = u[e] ^ r[3];
                    r[3] = r[2] ^ t(30, f), r[2] = r[1] ^ t(6, f), r[1] = r[0] ^ t(9, f), r[0] = t(17, f)
                }
                u[13] = r[0], u[14] = r[1], u[15] = r[2], u[16] = r[3]
            }

            function o() {
                for (var r = 0; 17 > r; r++) u[r] = 1
                    }

            function a(r, t, e) {
                "undefined" == typeof t && (t = 17), "undefined" == typeof e && (e = -1);
                for (var f = 0, n = 0; t > f; f++) f != e && (u[d[n++]] = r[f])
                    }

            function s(r) {
                var t = [],
                    e = [],
                    f = 0,
                    n = r.length;
                if (20 == n && "1" != r.charAt(0)) return !1;
                for (var o = 0; n > o; o++) t[o] = r.charCodeAt(o) - "0".charCodeAt(0);
                do {
                    var a = 0,
                        s = 0;
                    for (o = 0; n > o; o++) a = 10 * a + t[o], a >= 32 ? (t[s++] = a >> 5, a &= 31) : s > 0 && (t[s++] = 0);
                    n = s, e[f++] = a
                } while (s);
                for (o = 0; 13 > o; o++) u[o] = --f >= 0 ? e[o] : 0;
                return i(), !0
            }
            var u = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                h = [0, 0, 0, 0, 0],
                v = [1, 2, 4, 8, 16, 5, 10, 20, 13, 26, 17, 7, 14, 28, 29, 31, 27, 19, 3, 6, 12, 24, 21, 15, 30, 25, 23, 11, 22, 9, 18, 1],
                c = [0, 0, 1, 18, 2, 5, 19, 11, 3, 29, 6, 27, 20, 8, 12, 23, 4, 10, 30, 17, 7, 22, 28, 26, 21, 25, 9, 16, 13, 14, 24, 15],
                d = [3, 2, 1, 0, 7, 6, 5, 4, 13, 14, 15, 16, 12, 8, 9, 10, 11],
                g = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
            this.guess = [], this.add_guess = function() {
                var r = this.toString(),
                    t = this.guess.length;
                if (!(t > 2)) {
                    for (var e = 0; t > e; e++)
                        if (this.guess[e] == r) return;
                    this.guess[t] = r
                }
            }, this.ok = function() {
                for (var r = 0, e = 1; 5 > e; e++) {
                    for (var f = 0, n = 0; 31 > f; f++)
                        if (!(f > 12 && 27 > f)) {
                            var i = f;
                            f > 26 && (i -= 14), n ^= t(u[i], v[e * f % 31])
                        }
                    r |= n, h[e] = n
                }
                return 0 == r
            }, this.toString = function() {
                for (var r = "BURST-", t = 0; 17 > t; t++) r += g[u[d[t]]], 3 == (3 & t) && 13 > t && (r += "-");
                return r
            }, this.account_id = function() {
                for (var r = "", t = [], e = 13, f = 0; 13 > f; f++) t[f] = u[12 - f];
                do {
                    var n = 0,
                        i = 0;
                    for (f = 0; e > f; f++) n = 32 * n + t[f], n >= 10 ? (t[i++] = Math.floor(n / 10), n %= 10) : i > 0 && (t[i++] = 0);
                    e = i, r += String.fromCharCode(n + "0".charCodeAt(0))
                } while (i);
                return r.split("").reverse().join("")
            }, this.set = function(r, t) {
                "undefined" == typeof t && (t = !0);
                var e = 0;
                if (this.guess = [], o(), r = String(r), r = r.replace(/(^\s+)|(\s+$)/g, "").toUpperCase(), 0 == r.indexOf("BURST-") && (r = r.substr(4)), r.match(/^\d{1,20}$/g)) {
                    if (t) return s(r)
                        } else
                            for (var f = [], i = 0; i < r.length; i++) {
                                var u = g.indexOf(r[i]);
                                if (u >= 0 && (f[e++] = u, e > 18)) return !1
                                    }
                if (16 == e)
                    for (var i = 16; i >= 0; i--) {
                        for (var h = 0; 32 > h; h++) f[i] = h, a(f), this.ok() && this.add_guess();
                        if (i > 0) {
                            var v = f[i - 1];
                            f[i - 1] = f[i], f[i] = v
                        }
                    }
                if (18 == e)
                    for (var i = 0; 18 > i; i++) a(f, 18, i), this.ok() && this.add_guess();
                if (17 == e) {
                    if (a(f), this.ok()) return !0;
                    n() && this.ok() && this.add_guess()
                }
                return o(), !1
            }, this.format_guess = function(r, t) {
                var e = "",
                    f = [];
                r = r.toUpperCase(), t = t.toUpperCase();
                for (var n = 0; n < r.length;) {
                    for (var i = 0, o = 1; o < r.length; o++) {
                        var a = t.indexOf(r.substr(n, o));
                        if (-1 == a) break;
                        Math.abs(a - n) < 3 && (i = o)
                    }
                    i ? (f[f.length] = {
                        s: n,
                        e: n + i
                    }, n += i) : n++
                }
                if (0 == f.length) return r;
                for (var n = 0, o = 0; n < r.length; n++) {
                    if (n >= f[o].e)
                        for (var s; o < f.length - 1 && (s = f[o++].s, !(n < f[o].e || f[o].s >= s)););
                    e += n >= f[o].s && n < f[o].e ? r.charAt(n) : '<b style="color:red">' + r.charAt(n) + "</b>"
                }
                return e
            }
        }

        var CryptoJS = CryptoJS || function(t, e) {
            var r = {},
                i = r.lib = {},
                n = function() {},
                s = i.Base = {
                    extend: function(t) {
                        n.prototype = this;
                        var e = new n;
                        return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function() {
                            e.$super.init.apply(this, arguments)
                        }), e.init.prototype = e, e.$super = this, e
                    },
                    create: function() {
                        var t = this.extend();
                        return t.init.apply(t, arguments), t
                    },
                    init: function() {},
                    mixIn: function(t) {
                        for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                        t.hasOwnProperty("toString") && (this.toString = t.toString)
                    },
                    clone: function() {
                        return this.init.prototype.extend(this)
                    }
                },
                o = i.WordArray = s.extend({
                    init: function(t, r) {
                        t = this.words = t || [], this.sigBytes = r != e ? r : 4 * t.length
                    },
                    toString: function(t) {
                        return (t || a).stringify(this)
                    },
                    concat: function(t) {
                        var e = this.words,
                            r = t.words,
                            i = this.sigBytes;
                        if (t = t.sigBytes, this.clamp(), i % 4)
                            for (var n = 0; t > n; n++) e[i + n >>> 2] |= (r[n >>> 2] >>> 24 - 8 * (n % 4) & 255) << 24 - 8 * ((i + n) % 4);
                        else if (65535 < r.length)
                            for (n = 0; t > n; n += 4) e[i + n >>> 2] = r[n >>> 2];
                        else e.push.apply(e, r);
                        return this.sigBytes += t, this
                    },
                    clamp: function() {
                        var e = this.words,
                            r = this.sigBytes;
                        e[r >>> 2] &= 4294967295 << 32 - 8 * (r % 4), e.length = t.ceil(r / 4)
                    },
                    clone: function() {
                        var t = s.clone.call(this);
                        return t.words = this.words.slice(0), t
                    },
                    random: function(e) {
                        for (var r = [], i = 0; e > i; i += 4) r.push(4294967296 * t.random() | 0);
                        return new o.init(r, e)
                    }
                }),
                c = r.enc = {},
                a = c.Hex = {
                    stringify: function(t) {
                        var e = t.words;
                        t = t.sigBytes;
                        for (var r = [], i = 0; t > i; i++) {
                            var n = e[i >>> 2] >>> 24 - 8 * (i % 4) & 255;
                            r.push((n >>> 4).toString(16)), r.push((15 & n).toString(16))
                        }
                        return r.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length, r = [], i = 0; e > i; i += 2) r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - 4 * (i % 8);
                        return new o.init(r, e / 2)
                    }
                },
                f = c.Latin1 = {
                    stringify: function(t) {
                        var e = t.words;
                        t = t.sigBytes;
                        for (var r = [], i = 0; t > i; i++) r.push(String.fromCharCode(e[i >>> 2] >>> 24 - 8 * (i % 4) & 255));
                        return r.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length, r = [], i = 0; e > i; i++) r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - 8 * (i % 4);
                        return new o.init(r, e)
                    }
                },
                h = c.Utf8 = {
                    stringify: function(t) {
                        try {
                            return decodeURIComponent(escape(f.stringify(t)))
                        } catch (e) {
                            throw Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function(t) {
                        return f.parse(unescape(encodeURIComponent(t)))
                    }
                },
                u = i.BufferedBlockAlgorithm = s.extend({
                    reset: function() {
                        this._data = new o.init, this._nDataBytes = 0
                    },
                    _append: function(t) {
                        "string" == typeof t && (t = h.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
                    },
                    _process: function(e) {
                        var r = this._data,
                            i = r.words,
                            n = r.sigBytes,
                            s = this.blockSize,
                            c = n / (4 * s),
                            c = e ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0);
                        if (e = c * s, n = t.min(4 * e, n), e) {
                            for (var a = 0; e > a; a += s) this._doProcessBlock(i, a);
                            a = i.splice(0, e), r.sigBytes -= n
                        }
                        return new o.init(a, n)
                    },
                    clone: function() {
                        var t = s.clone.call(this);
                        return t._data = this._data.clone(), t
                    },
                    _minBufferSize: 0
                });
            i.Hasher = u.extend({
                cfg: s.extend(),
                init: function(t) {
                    this.cfg = this.cfg.extend(t), this.reset()
                },
                reset: function() {
                    u.reset.call(this), this._doReset()
                },
                update: function(t) {
                    return this._append(t), this._process(), this
                },
                finalize: function(t) {
                    return t && this._append(t), this._doFinalize()
                },
                blockSize: 16,
                _createHelper: function(t) {
                    return function(e, r) {
                        return new t.init(r).finalize(e)
                    }
                },
                _createHmacHelper: function(t) {
                    return function(e, r) {
                        return new p.HMAC.init(t, r).finalize(e)
                    }
                }
            });
            var p = r.algo = {};
            return r
        }(Math);
        ! function() {
            var t = CryptoJS,
                e = t.lib.WordArray;
            t.enc.Base64 = {
                stringify: function(t) {
                    var e = t.words,
                        r = t.sigBytes,
                        i = this._map;
                    t.clamp(), t = [];
                    for (var n = 0; r > n; n += 3)
                        for (var s = (e[n >>> 2] >>> 24 - 8 * (n % 4) & 255) << 16 | (e[n + 1 >>> 2] >>> 24 - 8 * ((n + 1) % 4) & 255) << 8 | e[n + 2 >>> 2] >>> 24 - 8 * ((n + 2) % 4) & 255, o = 0; 4 > o && r > n + .75 * o; o++) t.push(i.charAt(s >>> 6 * (3 - o) & 63));
                    if (e = i.charAt(64))
                        for (; t.length % 4;) t.push(e);
                    return t.join("")
                },
                parse: function(t) {
                    var r = t.length,
                        i = this._map,
                        n = i.charAt(64);
                    n && (n = t.indexOf(n), -1 != n && (r = n));
                    for (var n = [], s = 0, o = 0; r > o; o++)
                        if (o % 4) {
                            var c = i.indexOf(t.charAt(o - 1)) << 2 * (o % 4),
                                a = i.indexOf(t.charAt(o)) >>> 6 - 2 * (o % 4);
                            n[s >>> 2] |= (c | a) << 24 - 8 * (s % 4), s++
                        }
                    return e.create(n, s)
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            }
        }(),
            function(t) {
            function e(t, e, r, i, n, s, o) {
                return t = t + (e & r | ~e & i) + n + o, (t << s | t >>> 32 - s) + e
            }

            function r(t, e, r, i, n, s, o) {
                return t = t + (e & i | r & ~i) + n + o, (t << s | t >>> 32 - s) + e
            }

            function i(t, e, r, i, n, s, o) {
                return t = t + (e ^ r ^ i) + n + o, (t << s | t >>> 32 - s) + e
            }

            function n(t, e, r, i, n, s, o) {
                return t = t + (r ^ (e | ~i)) + n + o, (t << s | t >>> 32 - s) + e
            }
            for (var s = CryptoJS, o = s.lib, c = o.WordArray, a = o.Hasher, o = s.algo, f = [], h = 0; 64 > h; h++) f[h] = 4294967296 * t.abs(t.sin(h + 1)) | 0;
            o = o.MD5 = a.extend({
                _doReset: function() {
                    this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
                },
                _doProcessBlock: function(t, s) {
                    for (var o = 0; 16 > o; o++) {
                        var c = s + o,
                            a = t[c];
                        t[c] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
                    }
                    var o = this._hash.words,
                        c = t[s + 0],
                        a = t[s + 1],
                        h = t[s + 2],
                        u = t[s + 3],
                        p = t[s + 4],
                        d = t[s + 5],
                        l = t[s + 6],
                        y = t[s + 7],
                        _ = t[s + 8],
                        v = t[s + 9],
                        g = t[s + 10],
                        B = t[s + 11],
                        m = t[s + 12],
                        x = t[s + 13],
                        S = t[s + 14],
                        k = t[s + 15],
                        z = o[0],
                        C = o[1],
                        w = o[2],
                        D = o[3],
                        z = e(z, C, w, D, c, 7, f[0]),
                        D = e(D, z, C, w, a, 12, f[1]),
                        w = e(w, D, z, C, h, 17, f[2]),
                        C = e(C, w, D, z, u, 22, f[3]),
                        z = e(z, C, w, D, p, 7, f[4]),
                        D = e(D, z, C, w, d, 12, f[5]),
                        w = e(w, D, z, C, l, 17, f[6]),
                        C = e(C, w, D, z, y, 22, f[7]),
                        z = e(z, C, w, D, _, 7, f[8]),
                        D = e(D, z, C, w, v, 12, f[9]),
                        w = e(w, D, z, C, g, 17, f[10]),
                        C = e(C, w, D, z, B, 22, f[11]),
                        z = e(z, C, w, D, m, 7, f[12]),
                        D = e(D, z, C, w, x, 12, f[13]),
                        w = e(w, D, z, C, S, 17, f[14]),
                        C = e(C, w, D, z, k, 22, f[15]),
                        z = r(z, C, w, D, a, 5, f[16]),
                        D = r(D, z, C, w, l, 9, f[17]),
                        w = r(w, D, z, C, B, 14, f[18]),
                        C = r(C, w, D, z, c, 20, f[19]),
                        z = r(z, C, w, D, d, 5, f[20]),
                        D = r(D, z, C, w, g, 9, f[21]),
                        w = r(w, D, z, C, k, 14, f[22]),
                        C = r(C, w, D, z, p, 20, f[23]),
                        z = r(z, C, w, D, v, 5, f[24]),
                        D = r(D, z, C, w, S, 9, f[25]),
                        w = r(w, D, z, C, u, 14, f[26]),
                        C = r(C, w, D, z, _, 20, f[27]),
                        z = r(z, C, w, D, x, 5, f[28]),
                        D = r(D, z, C, w, h, 9, f[29]),
                        w = r(w, D, z, C, y, 14, f[30]),
                        C = r(C, w, D, z, m, 20, f[31]),
                        z = i(z, C, w, D, d, 4, f[32]),
                        D = i(D, z, C, w, _, 11, f[33]),
                        w = i(w, D, z, C, B, 16, f[34]),
                        C = i(C, w, D, z, S, 23, f[35]),
                        z = i(z, C, w, D, a, 4, f[36]),
                        D = i(D, z, C, w, p, 11, f[37]),
                        w = i(w, D, z, C, y, 16, f[38]),
                        C = i(C, w, D, z, g, 23, f[39]),
                        z = i(z, C, w, D, x, 4, f[40]),
                        D = i(D, z, C, w, c, 11, f[41]),
                        w = i(w, D, z, C, u, 16, f[42]),
                        C = i(C, w, D, z, l, 23, f[43]),
                        z = i(z, C, w, D, v, 4, f[44]),
                        D = i(D, z, C, w, m, 11, f[45]),
                        w = i(w, D, z, C, k, 16, f[46]),
                        C = i(C, w, D, z, h, 23, f[47]),
                        z = n(z, C, w, D, c, 6, f[48]),
                        D = n(D, z, C, w, y, 10, f[49]),
                        w = n(w, D, z, C, S, 15, f[50]),
                        C = n(C, w, D, z, d, 21, f[51]),
                        z = n(z, C, w, D, m, 6, f[52]),
                        D = n(D, z, C, w, u, 10, f[53]),
                        w = n(w, D, z, C, g, 15, f[54]),
                        C = n(C, w, D, z, a, 21, f[55]),
                        z = n(z, C, w, D, _, 6, f[56]),
                        D = n(D, z, C, w, k, 10, f[57]),
                        w = n(w, D, z, C, l, 15, f[58]),
                        C = n(C, w, D, z, x, 21, f[59]),
                        z = n(z, C, w, D, p, 6, f[60]),
                        D = n(D, z, C, w, B, 10, f[61]),
                        w = n(w, D, z, C, h, 15, f[62]),
                        C = n(C, w, D, z, v, 21, f[63]);
                    o[0] = o[0] + z | 0, o[1] = o[1] + C | 0, o[2] = o[2] + w | 0, o[3] = o[3] + D | 0
                },
                _doFinalize: function() {
                    var e = this._data,
                        r = e.words,
                        i = 8 * this._nDataBytes,
                        n = 8 * e.sigBytes;
                    r[n >>> 5] |= 128 << 24 - n % 32;
                    var s = t.floor(i / 4294967296);
                    for (r[(n + 64 >>> 9 << 4) + 15] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), r[(n + 64 >>> 9 << 4) + 14] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), e.sigBytes = 4 * (r.length + 1), this._process(), e = this._hash, r = e.words, i = 0; 4 > i; i++) n = r[i], r[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8);
                    return e
                },
                clone: function() {
                    var t = a.clone.call(this);
                    return t._hash = this._hash.clone(), t
                }
            }), s.MD5 = a._createHelper(o), s.HmacMD5 = a._createHmacHelper(o)
        }(Math),
            function() {
            var t = CryptoJS,
                e = t.lib,
                r = e.Base,
                i = e.WordArray,
                e = t.algo,
                n = e.EvpKDF = r.extend({
                    cfg: r.extend({
                        keySize: 4,
                        hasher: e.MD5,
                        iterations: 1
                    }),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t)
                    },
                    compute: function(t, e) {
                        for (var r = this.cfg, n = r.hasher.create(), s = i.create(), o = s.words, c = r.keySize, r = r.iterations; o.length < c;) {
                            a && n.update(a);
                            var a = n.update(t).finalize(e);
                            n.reset();
                            for (var f = 1; r > f; f++) a = n.finalize(a), n.reset();
                            s.concat(a)
                        }
                        return s.sigBytes = 4 * c, s
                    }
                });
            t.EvpKDF = function(t, e, r) {
                return n.create(r).compute(t, e)
            }
        }(), CryptoJS.lib.Cipher || function(t) {
            var e = CryptoJS,
                r = e.lib,
                i = r.Base,
                n = r.WordArray,
                s = r.BufferedBlockAlgorithm,
                o = e.enc.Base64,
                c = e.algo.EvpKDF,
                a = r.Cipher = s.extend({
                    cfg: i.extend(),
                    createEncryptor: function(t, e) {
                        return this.create(this._ENC_XFORM_MODE, t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.create(this._DEC_XFORM_MODE, t, e)
                    },
                    init: function(t, e, r) {
                        this.cfg = this.cfg.extend(r), this._xformMode = t, this._key = e, this.reset()
                    },
                    reset: function() {
                        s.reset.call(this), this._doReset()
                    },
                    process: function(t) {
                        return this._append(t), this._process()
                    },
                    finalize: function(t) {
                        return t && this._append(t), this._doFinalize()
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function(t) {
                        return {
                            encrypt: function(e, r, i) {
                                return ("string" == typeof r ? l : d).encrypt(t, e, r, i)
                            },
                            decrypt: function(e, r, i) {
                                return ("string" == typeof r ? l : d).decrypt(t, e, r, i)
                            }
                        }
                    }
                });
            r.StreamCipher = a.extend({
                _doFinalize: function() {
                    return this._process(!0)
                },
                blockSize: 1
            });
            var f = e.mode = {},
                h = function(e, r, i) {
                    var n = this._iv;
                    n ? this._iv = t : n = this._prevBlock;
                    for (var s = 0; i > s; s++) e[r + s] ^= n[s]
                        },
                u = (r.BlockCipherMode = i.extend({
                    createEncryptor: function(t, e) {
                        return this.Encryptor.create(t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.Decryptor.create(t, e)
                    },
                    init: function(t, e) {
                        this._cipher = t, this._iv = e
                    }
                })).extend();
            u.Encryptor = u.extend({
                processBlock: function(t, e) {
                    var r = this._cipher,
                        i = r.blockSize;
                    h.call(this, t, e, i), r.encryptBlock(t, e), this._prevBlock = t.slice(e, e + i)
                }
            }), u.Decryptor = u.extend({
                processBlock: function(t, e) {
                    var r = this._cipher,
                        i = r.blockSize,
                        n = t.slice(e, e + i);
                    r.decryptBlock(t, e), h.call(this, t, e, i), this._prevBlock = n
                }
            }), f = f.CBC = u, u = (e.pad = {}).Pkcs7 = {
                pad: function(t, e) {
                    for (var r = 4 * e, r = r - t.sigBytes % r, i = r << 24 | r << 16 | r << 8 | r, s = [], o = 0; r > o; o += 4) s.push(i);
                    r = n.create(s, r), t.concat(r)
                },
                unpad: function(t) {
                    t.sigBytes -= 255 & t.words[t.sigBytes - 1 >>> 2]
                }
            }, r.BlockCipher = a.extend({
                cfg: a.cfg.extend({
                    mode: f,
                    padding: u
                }),
                reset: function() {
                    a.reset.call(this);
                    var t = this.cfg,
                        e = t.iv,
                        t = t.mode;
                    if (this._xformMode == this._ENC_XFORM_MODE) var r = t.createEncryptor;
                    else r = t.createDecryptor, this._minBufferSize = 1;
                    this._mode = r.call(t, this, e && e.words)
                },
                _doProcessBlock: function(t, e) {
                    this._mode.processBlock(t, e)
                },
                _doFinalize: function() {
                    var t = this.cfg.padding;
                    if (this._xformMode == this._ENC_XFORM_MODE) {
                        t.pad(this._data, this.blockSize);
                        var e = this._process(!0)
                        } else e = this._process(!0), t.unpad(e);
                    return e
                },
                blockSize: 4
            });
            var p = r.CipherParams = i.extend({
                init: function(t) {
                    this.mixIn(t)
                },
                toString: function(t) {
                    return (t || this.formatter).stringify(this)
                }
            }),
                f = (e.format = {}).OpenSSL = {
                    stringify: function(t) {
                        var e = t.ciphertext;
                        return t = t.salt, (t ? n.create([1398893684, 1701076831]).concat(t).concat(e) : e).toString(o)
                    },
                    parse: function(t) {
                        t = o.parse(t);
                        var e = t.words;
                        if (1398893684 == e[0] && 1701076831 == e[1]) {
                            var r = n.create(e.slice(2, 4));
                            e.splice(0, 4), t.sigBytes -= 16
                        }
                        return p.create({
                            ciphertext: t,
                            salt: r
                        })
                    }
                },
                d = r.SerializableCipher = i.extend({
                    cfg: i.extend({
                        format: f
                    }),
                    encrypt: function(t, e, r, i) {
                        i = this.cfg.extend(i);
                        var n = t.createEncryptor(r, i);
                        return e = n.finalize(e), n = n.cfg, p.create({
                            ciphertext: e,
                            key: r,
                            iv: n.iv,
                            algorithm: t,
                            mode: n.mode,
                            padding: n.padding,
                            blockSize: t.blockSize,
                            formatter: i.format
                        })
                    },
                    decrypt: function(t, e, r, i) {
                        return i = this.cfg.extend(i), e = this._parse(e, i.format), t.createDecryptor(r, i).finalize(e.ciphertext)
                    },
                    _parse: function(t, e) {
                        return "string" == typeof t ? e.parse(t, this) : t
                    }
                }),
                e = (e.kdf = {}).OpenSSL = {
                    execute: function(t, e, r, i) {
                        return i || (i = n.random(8)), t = c.create({
                            keySize: e + r
                        }).compute(t, i), r = n.create(t.words.slice(e), 4 * r), t.sigBytes = 4 * e, p.create({
                            key: t,
                            iv: r,
                            salt: i
                        })
                    }
                },
                l = r.PasswordBasedCipher = d.extend({
                    cfg: d.cfg.extend({
                        kdf: e
                    }),
                    encrypt: function(t, e, r, i) {
                        return i = this.cfg.extend(i), r = i.kdf.execute(r, t.keySize, t.ivSize), i.iv = r.iv, t = d.encrypt.call(this, t, e, r.key, i), t.mixIn(r), t
                    },
                    decrypt: function(t, e, r, i) {
                        return i = this.cfg.extend(i), e = this._parse(e, i.format), r = i.kdf.execute(r, t.keySize, t.ivSize, e.salt), i.iv = r.iv, d.decrypt.call(this, t, e, r.key, i)
                    }
                })
            }(),
            function() {
            for (var t = CryptoJS, e = t.lib.BlockCipher, r = t.algo, i = [], n = [], s = [], o = [], c = [], a = [], f = [], h = [], u = [], p = [], d = [], l = 0; 256 > l; l++) d[l] = 128 > l ? l << 1 : l << 1 ^ 283;
            for (var y = 0, _ = 0, l = 0; 256 > l; l++) {
                var v = _ ^ _ << 1 ^ _ << 2 ^ _ << 3 ^ _ << 4,
                    v = v >>> 8 ^ 255 & v ^ 99;
                i[y] = v, n[v] = y;
                var g = d[y],
                    B = d[g],
                    m = d[B],
                    x = 257 * d[v] ^ 16843008 * v;
                s[y] = x << 24 | x >>> 8, o[y] = x << 16 | x >>> 16, c[y] = x << 8 | x >>> 24, a[y] = x, x = 16843009 * m ^ 65537 * B ^ 257 * g ^ 16843008 * y, f[v] = x << 24 | x >>> 8, h[v] = x << 16 | x >>> 16, u[v] = x << 8 | x >>> 24, p[v] = x, y ? (y = g ^ d[d[d[m ^ g]]], _ ^= d[d[_]]) : y = _ = 1
            }
            var S = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                r = r.AES = e.extend({
                    _doReset: function() {
                        for (var t = this._key, e = t.words, r = t.sigBytes / 4, t = 4 * ((this._nRounds = r + 6) + 1), n = this._keySchedule = [], s = 0; t > s; s++)
                            if (r > s) n[s] = e[s];
                            else {
                                var o = n[s - 1];
                                s % r ? r > 6 && 4 == s % r && (o = i[o >>> 24] << 24 | i[o >>> 16 & 255] << 16 | i[o >>> 8 & 255] << 8 | i[255 & o]) : (o = o << 8 | o >>> 24, o = i[o >>> 24] << 24 | i[o >>> 16 & 255] << 16 | i[o >>> 8 & 255] << 8 | i[255 & o], o ^= S[s / r | 0] << 24), n[s] = n[s - r] ^ o
                            }
                        for (e = this._invKeySchedule = [], r = 0; t > r; r++) s = t - r, o = r % 4 ? n[s] : n[s - 4], e[r] = 4 > r || 4 >= s ? o : f[i[o >>> 24]] ^ h[i[o >>> 16 & 255]] ^ u[i[o >>> 8 & 255]] ^ p[i[255 & o]]
                            },
                    encryptBlock: function(t, e) {
                        this._doCryptBlock(t, e, this._keySchedule, s, o, c, a, i)
                    },
                    decryptBlock: function(t, e) {
                        var r = t[e + 1];
                        t[e + 1] = t[e + 3], t[e + 3] = r, this._doCryptBlock(t, e, this._invKeySchedule, f, h, u, p, n), r = t[e + 1], t[e + 1] = t[e + 3], t[e + 3] = r
                    },
                    _doCryptBlock: function(t, e, r, i, n, s, o, c) {
                        for (var a = this._nRounds, f = t[e] ^ r[0], h = t[e + 1] ^ r[1], u = t[e + 2] ^ r[2], p = t[e + 3] ^ r[3], d = 4, l = 1; a > l; l++) var y = i[f >>> 24] ^ n[h >>> 16 & 255] ^ s[u >>> 8 & 255] ^ o[255 & p] ^ r[d++],
                            _ = i[h >>> 24] ^ n[u >>> 16 & 255] ^ s[p >>> 8 & 255] ^ o[255 & f] ^ r[d++],
                            v = i[u >>> 24] ^ n[p >>> 16 & 255] ^ s[f >>> 8 & 255] ^ o[255 & h] ^ r[d++],
                            p = i[p >>> 24] ^ n[f >>> 16 & 255] ^ s[h >>> 8 & 255] ^ o[255 & u] ^ r[d++],
                            f = y,
                            h = _,
                            u = v;
                        y = (c[f >>> 24] << 24 | c[h >>> 16 & 255] << 16 | c[u >>> 8 & 255] << 8 | c[255 & p]) ^ r[d++], _ = (c[h >>> 24] << 24 | c[u >>> 16 & 255] << 16 | c[p >>> 8 & 255] << 8 | c[255 & f]) ^ r[d++], v = (c[u >>> 24] << 24 | c[p >>> 16 & 255] << 16 | c[f >>> 8 & 255] << 8 | c[255 & h]) ^ r[d++], p = (c[p >>> 24] << 24 | c[f >>> 16 & 255] << 16 | c[h >>> 8 & 255] << 8 | c[255 & u]) ^ r[d++], t[e] = y, t[e + 1] = _, t[e + 2] = v, t[e + 3] = p
                    },
                    keySize: 8
                });
            t.AES = e._createHelper(r)
        }();

        ! function(t) {
            t.fn.qrcode = function(e) {
                function r(t) {
                    this.mode = u, this.data = t
                }

                function o(t, e) {
                    this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
                }

                function n(t, e) {
                    if (void 0 == t.length) throw Error(t.length + "/" + e);
                    for (var r = 0; r < t.length && 0 == t[r];) r++;
                    this.num = Array(t.length - r + e);
                    for (var o = 0; o < t.length - r; o++) this.num[o] = t[o + r]
                        }

                function i(t, e) {
                    this.totalCount = t, this.dataCount = e
                }

                function s() {
                    this.buffer = [], this.length = 0
                }
                var u;
                r.prototype = {
                    getLength: function() {
                        return this.data.length
                    },
                    write: function(t) {
                        for (var e = 0; e < this.data.length; e++) t.put(this.data.charCodeAt(e), 8)
                            }
                }, o.prototype = {
                    addData: function(t) {
                        this.dataList.push(new r(t)), this.dataCache = null
                    },
                    isDark: function(t, e) {
                        if (0 > t || this.moduleCount <= t || 0 > e || this.moduleCount <= e) throw Error(t + "," + e);
                        return this.modules[t][e]
                    },
                    getModuleCount: function() {
                        return this.moduleCount
                    },
                    make: function() {
                        if (1 > this.typeNumber) {
                            for (var t = 1, t = 1; 40 > t; t++) {
                                for (var e = i.getRSBlocks(t, this.errorCorrectLevel), r = new s, o = 0, n = 0; n < e.length; n++) o += e[n].dataCount;
                                for (n = 0; n < this.dataList.length; n++) e = this.dataList[n], r.put(e.mode, 4), r.put(e.getLength(), a.getLengthInBits(e.mode, t)), e.write(r);
                                if (r.getLengthInBits() <= 8 * o) break
                                    }
                            this.typeNumber = t
                        }
                        this.makeImpl(!1, this.getBestMaskPattern())
                    },
                    makeImpl: function(t, e) {
                        this.moduleCount = 4 * this.typeNumber + 17, this.modules = Array(this.moduleCount);
                        for (var r = 0; r < this.moduleCount; r++) {
                            this.modules[r] = Array(this.moduleCount);
                            for (var n = 0; n < this.moduleCount; n++) this.modules[r][n] = null
                                }
                        this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(t, e), 7 <= this.typeNumber && this.setupTypeNumber(t), null == this.dataCache && (this.dataCache = o.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, e)
                    },
                    setupPositionProbePattern: function(t, e) {
                        for (var r = -1; 7 >= r; r++)
                            if (!(-1 >= t + r || this.moduleCount <= t + r))
                                for (var o = -1; 7 >= o; o++) - 1 >= e + o || this.moduleCount <= e + o || (this.modules[t + r][e + o] = r >= 0 && 6 >= r && (0 == o || 6 == o) || o >= 0 && 6 >= o && (0 == r || 6 == r) || r >= 2 && 4 >= r && o >= 2 && 4 >= o ? !0 : !1)
                                    },
                    getBestMaskPattern: function() {
                        for (var t = 0, e = 0, r = 0; 8 > r; r++) {
                            this.makeImpl(!0, r);
                            var o = a.getLostPoint(this);
                            (0 == r || t > o) && (t = o, e = r)
                        }
                        return e
                    },
                    createMovieClip: function(t, e, r) {
                        for (t = t.createEmptyMovieClip(e, r), this.make(), e = 0; e < this.modules.length; e++)
                            for (var r = 1 * e, o = 0; o < this.modules[e].length; o++) {
                                var n = 1 * o;
                                this.modules[e][o] && (t.beginFill(0, 100), t.moveTo(n, r), t.lineTo(n + 1, r), t.lineTo(n + 1, r + 1), t.lineTo(n, r + 1), t.endFill())
                            }
                        return t
                    },
                    setupTimingPattern: function() {
                        for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = 0 == t % 2);
                        for (t = 8; t < this.moduleCount - 8; t++) null == this.modules[6][t] && (this.modules[6][t] = 0 == t % 2)
                            },
                    setupPositionAdjustPattern: function() {
                        for (var t = a.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++)
                            for (var r = 0; r < t.length; r++) {
                                var o = t[e],
                                    n = t[r];
                                if (null == this.modules[o][n])
                                    for (var i = -2; 2 >= i; i++)
                                        for (var s = -2; 2 >= s; s++) this.modules[o + i][n + s] = -2 == i || 2 == i || -2 == s || 2 == s || 0 == i && 0 == s ? !0 : !1
                                            }
                    },
                    setupTypeNumber: function(t) {
                        for (var e = a.getBCHTypeNumber(this.typeNumber), r = 0; 18 > r; r++) {
                            var o = !t && 1 == (e >> r & 1);
                            this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = o
                        }
                        for (r = 0; 18 > r; r++) o = !t && 1 == (e >> r & 1), this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = o
                            },
                    setupTypeInfo: function(t, e) {
                        for (var r = a.getBCHTypeInfo(this.errorCorrectLevel << 3 | e), o = 0; 15 > o; o++) {
                            var n = !t && 1 == (r >> o & 1);
                            6 > o ? this.modules[o][8] = n : 8 > o ? this.modules[o + 1][8] = n : this.modules[this.moduleCount - 15 + o][8] = n
                        }
                        for (o = 0; 15 > o; o++) n = !t && 1 == (r >> o & 1), 8 > o ? this.modules[8][this.moduleCount - o - 1] = n : 9 > o ? this.modules[8][15 - o - 1 + 1] = n : this.modules[8][15 - o - 1] = n;
                        this.modules[this.moduleCount - 8][8] = !t
                    },
                    mapData: function(t, e) {
                        for (var r = -1, o = this.moduleCount - 1, n = 7, i = 0, s = this.moduleCount - 1; s > 0; s -= 2)
                            for (6 == s && s--;;) {
                                for (var u = 0; 2 > u; u++)
                                    if (null == this.modules[o][s - u]) {
                                        var h = !1;
                                        i < t.length && (h = 1 == (t[i] >>> n & 1)), a.getMask(e, o, s - u) && (h = !h), this.modules[o][s - u] = h, n--, -1 == n && (i++, n = 7)
                                    }
                                if (o += r, 0 > o || this.moduleCount <= o) {
                                    o -= r, r = -r;
                                    break
                                }
                            }
                    }
                }, o.PAD0 = 236, o.PAD1 = 17, o.createData = function(t, e, r) {
                    for (var e = i.getRSBlocks(t, e), n = new s, u = 0; u < r.length; u++) {
                        var h = r[u];
                        n.put(h.mode, 4), n.put(h.getLength(), a.getLengthInBits(h.mode, t)), h.write(n)
                    }
                    for (u = t = 0; u < e.length; u++) t += e[u].dataCount;
                    if (n.getLengthInBits() > 8 * t) throw Error("code length overflow. (" + n.getLengthInBits() + ">" + 8 * t + ")");
                    for (n.getLengthInBits() + 4 <= 8 * t && n.put(0, 4); 0 != n.getLengthInBits() % 8;) n.putBit(!1);
                    for (; !(n.getLengthInBits() >= 8 * t) && (n.put(o.PAD0, 8), !(n.getLengthInBits() >= 8 * t));) n.put(o.PAD1, 8);
                    return o.createBytes(n, e)
                }, o.createBytes = function(t, e) {
                    for (var r = 0, o = 0, i = 0, s = Array(e.length), u = Array(e.length), h = 0; h < e.length; h++) {
                        var l = e[h].dataCount,
                            g = e[h].totalCount - l,
                            o = Math.max(o, l),
                            i = Math.max(i, g);
                        s[h] = Array(l);
                        for (var f = 0; f < s[h].length; f++) s[h][f] = 255 & t.buffer[f + r];
                        for (r += l, f = a.getErrorCorrectPolynomial(g), l = new n(s[h], f.getLength() - 1).mod(f), u[h] = Array(f.getLength() - 1), f = 0; f < u[h].length; f++) g = f + l.getLength() - u[h].length, u[h][f] = g >= 0 ? l.get(g) : 0
                            }
                    for (f = h = 0; f < e.length; f++) h += e[f].totalCount;
                    for (r = Array(h), f = l = 0; o > f; f++)
                        for (h = 0; h < e.length; h++) f < s[h].length && (r[l++] = s[h][f]);
                    for (f = 0; i > f; f++)
                        for (h = 0; h < e.length; h++) f < u[h].length && (r[l++] = u[h][f]);
                    return r
                }, u = 4;
                for (var a = {
                    PATTERN_POSITION_TABLE: [
                        [],
                        [6, 18],
                        [6, 22],
                        [6, 26],
                        [6, 30],
                        [6, 34],
                        [6, 22, 38],
                        [6, 24, 42],
                        [6, 26, 46],
                        [6, 28, 50],
                        [6, 30, 54],
                        [6, 32, 58],
                        [6, 34, 62],
                        [6, 26, 46, 66],
                        [6, 26, 48, 70],
                        [6, 26, 50, 74],
                        [6, 30, 54, 78],
                        [6, 30, 56, 82],
                        [6, 30, 58, 86],
                        [6, 34, 62, 90],
                        [6, 28, 50, 72, 94],
                        [6, 26, 50, 74, 98],
                        [6, 30, 54, 78, 102],
                        [6, 28, 54, 80, 106],
                        [6, 32, 58, 84, 110],
                        [6, 30, 58, 86, 114],
                        [6, 34, 62, 90, 118],
                        [6, 26, 50, 74, 98, 122],
                        [6, 30, 54, 78, 102, 126],
                        [6, 26, 52, 78, 104, 130],
                        [6, 30, 56, 82, 108, 134],
                        [6, 34, 60, 86, 112, 138],
                        [6, 30, 58, 86, 114, 142],
                        [6, 34, 62, 90, 118, 146],
                        [6, 30, 54, 78, 102, 126, 150],
                        [6, 24, 50, 76, 102, 128, 154],
                        [6, 28, 54, 80, 106, 132, 158],
                        [6, 32, 58, 84, 110, 136, 162],
                        [6, 26, 54, 82, 110, 138, 166],
                        [6, 30, 58, 86, 114, 142, 170]
                    ],
                    G15: 1335,
                    G18: 7973,
                    G15_MASK: 21522,
                    getBCHTypeInfo: function(t) {
                        for (var e = t << 10; 0 <= a.getBCHDigit(e) - a.getBCHDigit(a.G15);) e ^= a.G15 << a.getBCHDigit(e) - a.getBCHDigit(a.G15);
                        return (t << 10 | e) ^ a.G15_MASK
                    },
                    getBCHTypeNumber: function(t) {
                        for (var e = t << 12; 0 <= a.getBCHDigit(e) - a.getBCHDigit(a.G18);) e ^= a.G18 << a.getBCHDigit(e) - a.getBCHDigit(a.G18);
                        return t << 12 | e
                    },
                    getBCHDigit: function(t) {
                        for (var e = 0; 0 != t;) e++, t >>>= 1;
                        return e
                    },
                    getPatternPosition: function(t) {
                        return a.PATTERN_POSITION_TABLE[t - 1]
                    },
                    getMask: function(t, e, r) {
                        switch (t) {
                            case 0:
                                return 0 == (e + r) % 2;
                            case 1:
                                return 0 == e % 2;
                            case 2:
                                return 0 == r % 3;
                            case 3:
                                return 0 == (e + r) % 3;
                            case 4:
                                return 0 == (Math.floor(e / 2) + Math.floor(r / 3)) % 2;
                            case 5:
                                return 0 == e * r % 2 + e * r % 3;
                            case 6:
                                return 0 == (e * r % 2 + e * r % 3) % 2;
                            case 7:
                                return 0 == (e * r % 3 + (e + r) % 2) % 2;
                            default:
                                throw Error("bad maskPattern:" + t)
                        }
                    },
                    getErrorCorrectPolynomial: function(t) {
                        for (var e = new n([1], 0), r = 0; t > r; r++) e = e.multiply(new n([1, h.gexp(r)], 0));
                        return e
                    },
                    getLengthInBits: function(t, e) {
                        if (e >= 1 && 10 > e) switch (t) {
                            case 1:
                                return 10;
                            case 2:
                                return 9;
                            case u:
                                return 8;
                            case 8:
                                return 8;
                            default:
                                throw Error("mode:" + t)
                        } else if (27 > e) switch (t) {
                            case 1:
                                return 12;
                            case 2:
                                return 11;
                            case u:
                                return 16;
                            case 8:
                                return 10;
                            default:
                                throw Error("mode:" + t)
                        } else {
                            if (!(41 > e)) throw Error("type:" + e);
                            switch (t) {
                                case 1:
                                    return 14;
                                case 2:
                                    return 13;
                                case u:
                                    return 16;
                                case 8:
                                    return 12;
                                default:
                                    throw Error("mode:" + t)
                            }
                        }
                    },
                    getLostPoint: function(t) {
                        for (var e = t.getModuleCount(), r = 0, o = 0; e > o; o++)
                            for (var n = 0; e > n; n++) {
                                for (var i = 0, s = t.isDark(o, n), u = -1; 1 >= u; u++)
                                    if (!(0 > o + u || o + u >= e))
                                        for (var a = -1; 1 >= a; a++) 0 > n + a || n + a >= e || 0 == u && 0 == a || s == t.isDark(o + u, n + a) && i++;
                                i > 5 && (r += 3 + i - 5)
                            }
                        for (o = 0; e - 1 > o; o++)
                            for (n = 0; e - 1 > n; n++) i = 0, t.isDark(o, n) && i++, t.isDark(o + 1, n) && i++, t.isDark(o, n + 1) && i++, t.isDark(o + 1, n + 1) && i++, (0 == i || 4 == i) && (r += 3);
                        for (o = 0; e > o; o++)
                            for (n = 0; e - 6 > n; n++) t.isDark(o, n) && !t.isDark(o, n + 1) && t.isDark(o, n + 2) && t.isDark(o, n + 3) && t.isDark(o, n + 4) && !t.isDark(o, n + 5) && t.isDark(o, n + 6) && (r += 40);
                        for (n = 0; e > n; n++)
                            for (o = 0; e - 6 > o; o++) t.isDark(o, n) && !t.isDark(o + 1, n) && t.isDark(o + 2, n) && t.isDark(o + 3, n) && t.isDark(o + 4, n) && !t.isDark(o + 5, n) && t.isDark(o + 6, n) && (r += 40);
                        for (n = i = 0; e > n; n++)
                            for (o = 0; e > o; o++) t.isDark(o, n) && i++;
                        return t = Math.abs(100 * i / e / e - 50) / 5, r + 10 * t
                    }
                }, h = {
                    glog: function(t) {
                        if (1 > t) throw Error("glog(" + t + ")");
                        return h.LOG_TABLE[t]
                    },
                    gexp: function(t) {
                        for (; 0 > t;) t += 255;
                        for (; t >= 256;) t -= 255;
                        return h.EXP_TABLE[t]
                    },
                    EXP_TABLE: Array(256),
                    LOG_TABLE: Array(256)
                }, l = 0; 8 > l; l++) h.EXP_TABLE[l] = 1 << l;
                for (l = 8; 256 > l; l++) h.EXP_TABLE[l] = h.EXP_TABLE[l - 4] ^ h.EXP_TABLE[l - 5] ^ h.EXP_TABLE[l - 6] ^ h.EXP_TABLE[l - 8];
                for (l = 0; 255 > l; l++) h.LOG_TABLE[h.EXP_TABLE[l]] = l;
                return n.prototype = {
                    get: function(t) {
                        return this.num[t]
                    },
                    getLength: function() {
                        return this.num.length
                    },
                    multiply: function(t) {
                        for (var e = Array(this.getLength() + t.getLength() - 1), r = 0; r < this.getLength(); r++)
                            for (var o = 0; o < t.getLength(); o++) e[r + o] ^= h.gexp(h.glog(this.get(r)) + h.glog(t.get(o)));
                        return new n(e, 0)
                    },
                    mod: function(t) {
                        if (0 > this.getLength() - t.getLength()) return this;
                        for (var e = h.glog(this.get(0)) - h.glog(t.get(0)), r = Array(this.getLength()), o = 0; o < this.getLength(); o++) r[o] = this.get(o);
                        for (o = 0; o < t.getLength(); o++) r[o] ^= h.gexp(h.glog(t.get(o)) + e);
                        return new n(r, 0).mod(t)
                    }
                }, i.RS_BLOCK_TABLE = [
                    [1, 26, 19],
                    [1, 26, 16],
                    [1, 26, 13],
                    [1, 26, 9],
                    [1, 44, 34],
                    [1, 44, 28],
                    [1, 44, 22],
                    [1, 44, 16],
                    [1, 70, 55],
                    [1, 70, 44],
                    [2, 35, 17],
                    [2, 35, 13],
                    [1, 100, 80],
                    [2, 50, 32],
                    [2, 50, 24],
                    [4, 25, 9],
                    [1, 134, 108],
                    [2, 67, 43],
                    [2, 33, 15, 2, 34, 16],
                    [2, 33, 11, 2, 34, 12],
                    [2, 86, 68],
                    [4, 43, 27],
                    [4, 43, 19],
                    [4, 43, 15],
                    [2, 98, 78],
                    [4, 49, 31],
                    [2, 32, 14, 4, 33, 15],
                    [4, 39, 13, 1, 40, 14],
                    [2, 121, 97],
                    [2, 60, 38, 2, 61, 39],
                    [4, 40, 18, 2, 41, 19],
                    [4, 40, 14, 2, 41, 15],
                    [2, 146, 116],
                    [3, 58, 36, 2, 59, 37],
                    [4, 36, 16, 4, 37, 17],
                    [4, 36, 12, 4, 37, 13],
                    [2, 86, 68, 2, 87, 69],
                    [4, 69, 43, 1, 70, 44],
                    [6, 43, 19, 2, 44, 20],
                    [6, 43, 15, 2, 44, 16],
                    [4, 101, 81],
                    [1, 80, 50, 4, 81, 51],
                    [4, 50, 22, 4, 51, 23],
                    [3, 36, 12, 8, 37, 13],
                    [2, 116, 92, 2, 117, 93],
                    [6, 58, 36, 2, 59, 37],
                    [4, 46, 20, 6, 47, 21],
                    [7, 42, 14, 4, 43, 15],
                    [4, 133, 107],
                    [8, 59, 37, 1, 60, 38],
                    [8, 44, 20, 4, 45, 21],
                    [12, 33, 11, 4, 34, 12],
                    [3, 145, 115, 1, 146, 116],
                    [4, 64, 40, 5, 65, 41],
                    [11, 36, 16, 5, 37, 17],
                    [11, 36, 12, 5, 37, 13],
                    [5, 109, 87, 1, 110, 88],
                    [5, 65, 41, 5, 66, 42],
                    [5, 54, 24, 7, 55, 25],
                    [11, 36, 12],
                    [5, 122, 98, 1, 123, 99],
                    [7, 73, 45, 3, 74, 46],
                    [15, 43, 19, 2, 44, 20],
                    [3, 45, 15, 13, 46, 16],
                    [1, 135, 107, 5, 136, 108],
                    [10, 74, 46, 1, 75, 47],
                    [1, 50, 22, 15, 51, 23],
                    [2, 42, 14, 17, 43, 15],
                    [5, 150, 120, 1, 151, 121],
                    [9, 69, 43, 4, 70, 44],
                    [17, 50, 22, 1, 51, 23],
                    [2, 42, 14, 19, 43, 15],
                    [3, 141, 113, 4, 142, 114],
                    [3, 70, 44, 11, 71, 45],
                    [17, 47, 21, 4, 48, 22],
                    [9, 39, 13, 16, 40, 14],
                    [3, 135, 107, 5, 136, 108],
                    [3, 67, 41, 13, 68, 42],
                    [15, 54, 24, 5, 55, 25],
                    [15, 43, 15, 10, 44, 16],
                    [4, 144, 116, 4, 145, 117],
                    [17, 68, 42],
                    [17, 50, 22, 6, 51, 23],
                    [19, 46, 16, 6, 47, 17],
                    [2, 139, 111, 7, 140, 112],
                    [17, 74, 46],
                    [7, 54, 24, 16, 55, 25],
                    [34, 37, 13],
                    [4, 151, 121, 5, 152, 122],
                    [4, 75, 47, 14, 76, 48],
                    [11, 54, 24, 14, 55, 25],
                    [16, 45, 15, 14, 46, 16],
                    [6, 147, 117, 4, 148, 118],
                    [6, 73, 45, 14, 74, 46],
                    [11, 54, 24, 16, 55, 25],
                    [30, 46, 16, 2, 47, 17],
                    [8, 132, 106, 4, 133, 107],
                    [8, 75, 47, 13, 76, 48],
                    [7, 54, 24, 22, 55, 25],
                    [22, 45, 15, 13, 46, 16],
                    [10, 142, 114, 2, 143, 115],
                    [19, 74, 46, 4, 75, 47],
                    [28, 50, 22, 6, 51, 23],
                    [33, 46, 16, 4, 47, 17],
                    [8, 152, 122, 4, 153, 123],
                    [22, 73, 45, 3, 74, 46],
                    [8, 53, 23, 26, 54, 24],
                    [12, 45, 15, 28, 46, 16],
                    [3, 147, 117, 10, 148, 118],
                    [3, 73, 45, 23, 74, 46],
                    [4, 54, 24, 31, 55, 25],
                    [11, 45, 15, 31, 46, 16],
                    [7, 146, 116, 7, 147, 117],
                    [21, 73, 45, 7, 74, 46],
                    [1, 53, 23, 37, 54, 24],
                    [19, 45, 15, 26, 46, 16],
                    [5, 145, 115, 10, 146, 116],
                    [19, 75, 47, 10, 76, 48],
                    [15, 54, 24, 25, 55, 25],
                    [23, 45, 15, 25, 46, 16],
                    [13, 145, 115, 3, 146, 116],
                    [2, 74, 46, 29, 75, 47],
                    [42, 54, 24, 1, 55, 25],
                    [23, 45, 15, 28, 46, 16],
                    [17, 145, 115],
                    [10, 74, 46, 23, 75, 47],
                    [10, 54, 24, 35, 55, 25],
                    [19, 45, 15, 35, 46, 16],
                    [17, 145, 115, 1, 146, 116],
                    [14, 74, 46, 21, 75, 47],
                    [29, 54, 24, 19, 55, 25],
                    [11, 45, 15, 46, 46, 16],
                    [13, 145, 115, 6, 146, 116],
                    [14, 74, 46, 23, 75, 47],
                    [44, 54, 24, 7, 55, 25],
                    [59, 46, 16, 1, 47, 17],
                    [12, 151, 121, 7, 152, 122],
                    [12, 75, 47, 26, 76, 48],
                    [39, 54, 24, 14, 55, 25],
                    [22, 45, 15, 41, 46, 16],
                    [6, 151, 121, 14, 152, 122],
                    [6, 75, 47, 34, 76, 48],
                    [46, 54, 24, 10, 55, 25],
                    [2, 45, 15, 64, 46, 16],
                    [17, 152, 122, 4, 153, 123],
                    [29, 74, 46, 14, 75, 47],
                    [49, 54, 24, 10, 55, 25],
                    [24, 45, 15, 46, 46, 16],
                    [4, 152, 122, 18, 153, 123],
                    [13, 74, 46, 32, 75, 47],
                    [48, 54, 24, 14, 55, 25],
                    [42, 45, 15, 32, 46, 16],
                    [20, 147, 117, 4, 148, 118],
                    [40, 75, 47, 7, 76, 48],
                    [43, 54, 24, 22, 55, 25],
                    [10, 45, 15, 67, 46, 16],
                    [19, 148, 118, 6, 149, 119],
                    [18, 75, 47, 31, 76, 48],
                    [34, 54, 24, 34, 55, 25],
                    [20, 45, 15, 61, 46, 16]
                ], i.getRSBlocks = function(t, e) {
                    var r = i.getRsBlockTable(t, e);
                    if (void 0 == r) throw Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
                    for (var o = r.length / 3, n = [], s = 0; o > s; s++)
                        for (var u = r[3 * s + 0], a = r[3 * s + 1], h = r[3 * s + 2], l = 0; u > l; l++) n.push(new i(a, h));
                    return n
                }, i.getRsBlockTable = function(t, e) {
                    switch (e) {
                        case 1:
                            return i.RS_BLOCK_TABLE[4 * (t - 1) + 0];
                        case 0:
                            return i.RS_BLOCK_TABLE[4 * (t - 1) + 1];
                        case 3:
                            return i.RS_BLOCK_TABLE[4 * (t - 1) + 2];
                        case 2:
                            return i.RS_BLOCK_TABLE[4 * (t - 1) + 3]
                    }
                }, s.prototype = {
                    get: function(t) {
                        return 1 == (this.buffer[Math.floor(t / 8)] >>> 7 - t % 8 & 1)
                    },
                    put: function(t, e) {
                        for (var r = 0; e > r; r++) this.putBit(1 == (t >>> e - r - 1 & 1))
                            },
                    getLengthInBits: function() {
                        return this.length
                    },
                    putBit: function(t) {
                        var e = Math.floor(this.length / 8);
                        this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
                    }
                }, "string" == typeof e && (e = {
                    text: e
                }), e = t.extend({}, {
                    render: "canvas",
                    width: 256,
                    height: 256,
                    typeNumber: -1,
                    correctLevel: 2,
                    background: "#ffffff",
                    foreground: "#000000"
                }, e), this.each(function() {
                    var r;
                    if ("canvas" == e.render) {
                        r = new o(e.typeNumber, e.correctLevel), r.addData(e.text), r.make();
                        var n = document.createElement("canvas");
                        n.width = e.width, n.height = e.height;
                        for (var i = n.getContext("2d"), s = e.width / r.getModuleCount(), u = e.height / r.getModuleCount(), a = 0; a < r.getModuleCount(); a++)
                            for (var h = 0; h < r.getModuleCount(); h++) {
                                i.fillStyle = r.isDark(a, h) ? e.foreground : e.background;
                                var l = Math.ceil((h + 1) * s) - Math.floor(h * s),
                                    g = Math.ceil((a + 1) * s) - Math.floor(a * s);
                                i.fillRect(Math.round(h * s), Math.round(a * u), l, g)
                            }
                    } else
                        for (r = new o(e.typeNumber, e.correctLevel), r.addData(e.text), r.make(), n = t("<table></table>").css("width", e.width + "px").css("height", e.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", e.background), i = e.width / r.getModuleCount(), s = e.height / r.getModuleCount(), u = 0; u < r.getModuleCount(); u++)
                            for (a = t("<tr></tr>").css("height", s + "px").appendTo(n), h = 0; h < r.getModuleCount(); h++) t("<td></td>").css("width", i + "px").css("background-color", r.isDark(u, h) ? e.foreground : e.background).appendTo(a);
                    r = n, jQuery(r).appendTo(this)
                })
            }
        }(jQuery);