!function(n){var e={};function r(t){if(e[t])return e[t].exports;var s=e[t]={i:t,l:!1,exports:{}};return n[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=n,r.c=e,r.d=function(n,e,t){r.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:t})},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0})},r.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(e,"a",e),e},r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.p="",r(r.s="./plugins/core/send-money-page/send-money-page.js")}({"./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */function(module,exports,__webpack_require__){eval("/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// resolves . and .. elements in a path array with directory names there\n// must be no slashes, empty elements, or device names (c:\\) in the array\n// (so also no leading and trailing slashes - it does not distinguish\n// relative and absolute paths)\nfunction normalizeArray(parts, allowAboveRoot) {\n  // if the path tries to go above the root, `up` ends up > 0\n  var up = 0;\n  for (var i = parts.length - 1; i >= 0; i--) {\n    var last = parts[i];\n    if (last === '.') {\n      parts.splice(i, 1);\n    } else if (last === '..') {\n      parts.splice(i, 1);\n      up++;\n    } else if (up) {\n      parts.splice(i, 1);\n      up--;\n    }\n  }\n\n  // if the path is allowed to go above the root, restore leading ..s\n  if (allowAboveRoot) {\n    for (; up--; up) {\n      parts.unshift('..');\n    }\n  }\n\n  return parts;\n}\n\n// Split a filename into [root, dir, basename, ext], unix version\n// 'root' is just a slash, or nothing.\nvar splitPathRe =\n    /^(\\/?|)([\\s\\S]*?)((?:\\.{1,2}|[^\\/]+?|)(\\.[^.\\/]*|))(?:[\\/]*)$/;\nvar splitPath = function(filename) {\n  return splitPathRe.exec(filename).slice(1);\n};\n\n// path.resolve([from ...], to)\n// posix version\nexports.resolve = function() {\n  var resolvedPath = '',\n      resolvedAbsolute = false;\n\n  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {\n    var path = (i >= 0) ? arguments[i] : process.cwd();\n\n    // Skip empty and invalid entries\n    if (typeof path !== 'string') {\n      throw new TypeError('Arguments to path.resolve must be strings');\n    } else if (!path) {\n      continue;\n    }\n\n    resolvedPath = path + '/' + resolvedPath;\n    resolvedAbsolute = path.charAt(0) === '/';\n  }\n\n  // At this point the path should be resolved to a full absolute path, but\n  // handle relative paths to be safe (might happen when process.cwd() fails)\n\n  // Normalize the path\n  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {\n    return !!p;\n  }), !resolvedAbsolute).join('/');\n\n  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';\n};\n\n// path.normalize(path)\n// posix version\nexports.normalize = function(path) {\n  var isAbsolute = exports.isAbsolute(path),\n      trailingSlash = substr(path, -1) === '/';\n\n  // Normalize the path\n  path = normalizeArray(filter(path.split('/'), function(p) {\n    return !!p;\n  }), !isAbsolute).join('/');\n\n  if (!path && !isAbsolute) {\n    path = '.';\n  }\n  if (path && trailingSlash) {\n    path += '/';\n  }\n\n  return (isAbsolute ? '/' : '') + path;\n};\n\n// posix version\nexports.isAbsolute = function(path) {\n  return path.charAt(0) === '/';\n};\n\n// posix version\nexports.join = function() {\n  var paths = Array.prototype.slice.call(arguments, 0);\n  return exports.normalize(filter(paths, function(p, index) {\n    if (typeof p !== 'string') {\n      throw new TypeError('Arguments to path.join must be strings');\n    }\n    return p;\n  }).join('/'));\n};\n\n\n// path.relative(from, to)\n// posix version\nexports.relative = function(from, to) {\n  from = exports.resolve(from).substr(1);\n  to = exports.resolve(to).substr(1);\n\n  function trim(arr) {\n    var start = 0;\n    for (; start < arr.length; start++) {\n      if (arr[start] !== '') break;\n    }\n\n    var end = arr.length - 1;\n    for (; end >= 0; end--) {\n      if (arr[end] !== '') break;\n    }\n\n    if (start > end) return [];\n    return arr.slice(start, end - start + 1);\n  }\n\n  var fromParts = trim(from.split('/'));\n  var toParts = trim(to.split('/'));\n\n  var length = Math.min(fromParts.length, toParts.length);\n  var samePartsLength = length;\n  for (var i = 0; i < length; i++) {\n    if (fromParts[i] !== toParts[i]) {\n      samePartsLength = i;\n      break;\n    }\n  }\n\n  var outputParts = [];\n  for (var i = samePartsLength; i < fromParts.length; i++) {\n    outputParts.push('..');\n  }\n\n  outputParts = outputParts.concat(toParts.slice(samePartsLength));\n\n  return outputParts.join('/');\n};\n\nexports.sep = '/';\nexports.delimiter = ':';\n\nexports.dirname = function(path) {\n  var result = splitPath(path),\n      root = result[0],\n      dir = result[1];\n\n  if (!root && !dir) {\n    // No dirname whatsoever\n    return '.';\n  }\n\n  if (dir) {\n    // It has a dirname, strip trailing slash\n    dir = dir.substr(0, dir.length - 1);\n  }\n\n  return root + dir;\n};\n\n\nexports.basename = function(path, ext) {\n  var f = splitPath(path)[2];\n  // TODO: make this comparison case-insensitive on windows?\n  if (ext && f.substr(-1 * ext.length) === ext) {\n    f = f.substr(0, f.length - ext.length);\n  }\n  return f;\n};\n\n\nexports.extname = function(path) {\n  return splitPath(path)[3];\n};\n\nfunction filter (xs, f) {\n    if (xs.filter) return xs.filter(f);\n    var res = [];\n    for (var i = 0; i < xs.length; i++) {\n        if (f(xs[i], i, xs)) res.push(xs[i]);\n    }\n    return res;\n}\n\n// String.prototype.substr - negative index don't work in IE8\nvar substr = 'ab'.substr(-1) === 'b'\n    ? function (str, start, len) { return str.substr(start, len) }\n    : function (str, start, len) {\n        if (start < 0) start = str.length + start;\n        return str.substr(start, len);\n    }\n;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/path-browserify/index.js?")},"./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */function(module,exports){eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?")},"./plugins/core/send-money-page/send-money-page.js":
/*!*********************************************************!*\
  !*** ./plugins/core/send-money-page/send-money-page.js ***!
  \*********************************************************/
/*! no exports provided */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_qora_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/qora/constants.js */ "./src/qora/constants.js");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nclass SendMoneyPage extends Polymer.Element {\r\n    static get is() {\r\n        return "send-money-page";\r\n    }\r\n    static get properties() {\r\n        return {\r\n            addresses: {\r\n                type: Array,\r\n                value: []\r\n            },\r\n            // fee: {\r\n            //     type: Number,\r\n            //     value: 1\r\n            // },\r\n            amount: {\r\n                type: Number\r\n            },\r\n            errorMessage: {\r\n                type: String,\r\n                value: ""\r\n            },\r\n            sendMoneyLoading: {\r\n                type: Boolean,\r\n                value: false\r\n            },\r\n            data: {\r\n                type: Object,\r\n                value: {}\r\n            },\r\n            addressesInfo: {\r\n                type: Object,\r\n                value: {}\r\n            },\r\n            selectedAddress: {\r\n                type: Object,\r\n                value: {}\r\n            },\r\n            selectedAddressInfo: {\r\n                type: Object,\r\n                value: {},\r\n                computed: "_getSelectedAddressInfo(addressesInfo, selectedAddress)"\r\n            },\r\n            addressesUnconfirmedTransactions: {\r\n                type: Object,\r\n                value: {}\r\n            },\r\n            addressInfoStreams: {\r\n                type: Object,\r\n                value: {}\r\n            },\r\n            unconfirmedTransactionStreams: {\r\n                type: Object,\r\n                value: {}\r\n            },\r\n            maxWidth: {\r\n                type: String,\r\n                value: "600"\r\n            }\r\n        }\r\n    }\r\n\r\n    static get observers() {\r\n        return [\r\n            // "_setSelectedAddressInfo(selectedAddress.*, addressesInfo)"\r\n            "_usdKeyUp(usdAmount)"\r\n        ]\r\n    }\r\n\r\n    constructor() {\r\n        super();\r\n    }\r\n\r\n    _floor(num) {\r\n        return Math.floor(num);\r\n    }\r\n\r\n    _checkAmount() {\r\n        this.validAmount = this.amount <= this.selectedAddress.balance\r\n        // if (this.amount > this.selectedAddress.balance - this.fee || this.amount <= 0) {\r\n        //     this.validAmount = true;\r\n        // }\r\n        // else {\r\n        //     this.validAmount = false;\r\n        // }\r\n    }\r\n\r\n    textColor(color) {\r\n        return color == \'light\' ? \'rgba(255,255,255,0.7)\' : \'rgba(0,0,0,0.87)\'\r\n    }\r\n\r\n    async _sendMoney(e) {\r\n        var amount = this.amount * Math.pow(10, 8);\r\n        var recipient = this.recipient;\r\n        // var fee = this.fee\r\n\r\n        // Check for valid...^\r\n\r\n        this.sendMoneyLoading = true;\r\n\r\n        console.log(this.selectedAddress)\r\n\r\n        let lastRef = await this.parentWimp.request("qoraApiCall", {\r\n            data: {\r\n                type: "api",\r\n                url: `addresses/lastreference/${this.selectedAddress.address}/unconfirmed`\r\n            }\r\n        })\r\n        lastRef = lastRef.data\r\n\r\n        this.parentWimp.request("createTransaction", {\r\n            data: {\r\n                type: 2,\r\n                nonce: this.selectedAddress.nonce,\r\n                params: {\r\n                    recipient,\r\n                    amount,\r\n                    lastReference: lastRef\r\n                    // ,\r\n                    // fee\r\n                }\r\n            }\r\n        }).then(response => {\r\n            const responseData = JSON.parse(response.data)\r\n            console.log("Yay: ", response)\r\n            if(!responseData.reference) {\r\n                throw(`Error! ${_src_qora_constants_js__WEBPACK_IMPORTED_MODULE_0__["ERROR_CODES"][responseData]}. Error code ${responseData}`)\r\n            }\r\n            this.successMessage = response.data\r\n        }).catch(err => {\r\n            console.log(err)\r\n            this.errorMessage = err\r\n        })\r\n    }\r\n    _usdKeyUp(){\r\n        this.amount = this.usdAmount / this.BTCUSD\r\n    }\r\n    _kmxKeyUp(){\r\n\r\n    }\r\n\r\n\r\n    updateBTCPrice(){\r\n        this._getBTCPrice().then(data => {\r\n            console.log(data)\r\n            this.BTCUSD = data.USD.last\r\n        }, err=> {})\r\n    }\r\n\r\n    _getBTCPrice(){\r\n        return new Promise((resolve,reject)=> {\r\n            var xhttp = new XMLHttpRequest()\r\n            xhttp.onreadystatechange = function () {\r\n                if (this.readyState == 4) {\r\n                    // Typical action to be performed when the document is ready:\r\n                    // document.getElementById("demo").innerHTML = xhttp.responseText\r\n                    console.log("RESPONSESESESSESESS", xhttp)\r\n                    if (!(this.status == 200)) {\r\n                        reject()\r\n                    }\r\n                    resolve(JSON.parse(xhttp.responseText))\r\n                }\r\n            };\r\n            xhttp.open("GET", "https://blockchain.info/ticker", true);\r\n            xhttp.send();\r\n        })\r\n    }\r\n\r\n    _getSelectedAddressInfo(addressesInfo, selectedAddress) {\r\n        return this.addressesInfo[selectedAddress.address]\r\n    }\r\n\r\n    kmxToUSD (kmx, price) {\r\n        return kmx * price\r\n    }\r\n\r\n    ready() {\r\n        super.ready();\r\n\r\n        this.coreWimp = new Wimp("core", window.parent)\r\n\r\n        this.parentWimp = new Wimp(window.parent)\r\n\r\n        this.parentWimp.ready(() => {\r\n            this.parentWimp.listen("Selected address", selectedAddress => {\r\n                console.log(selectedAddress)\r\n                this.selectedAddress = {}\r\n                this.selectedAddress = selectedAddress\r\n                const addr = selectedAddress.address\r\n\r\n                this.coreWimp.ready(() => {\r\n                    if (!this.addressInfoStreams[addr]) {\r\n                        this.addressInfoStreams[addr] = this.coreWimp.listen(`address/${addr}`, addrInfo => {\r\n                            console.log("Send money page received", addrInfo)\r\n                            this.set(`addressesInfo.${addr}`, addrInfo)\r\n                            // Ahh....actually if no balance....no last reference and so you can\'t send money\r\n                            addrInfo.balance = addrInfo.balance || {\r\n                                total: {\r\n                                    0: 0,\r\n                                    1: 0\r\n                                }\r\n                            }\r\n                            const addressesInfoStore = this.addressesInfo\r\n                            this.addressesInfo = {}\r\n                            this.addressesInfo = addressesInfoStore\r\n                        })\r\n                    }\r\n                       if (!this.unconfirmedTransactionStreams[addr]){\r\n                           this.unconfirmedTransactionStreams[addr] = this.coreWimp.listen(`unconfirmedOfAddress/${addr}`, unconfirmedTransactions => {\r\n                               this.addressesUnconfirmedTransactions[addr] = unconfirmedTransactions\r\n                           })\r\n                       }\r\n\r\n                })\r\n            })\r\n        })\r\n\r\n        this.updateBTCPrice()\r\n\r\n        setInterval(()=> this.updateBTCPrice(), 10000)\r\n\r\n        Wimp.init();\r\n    }\r\n}\r\n\r\nwindow.customElements.define(SendMoneyPage.is, SendMoneyPage);\n\n//# sourceURL=webpack:///./plugins/core/send-money-page/send-money-page.js?')},"./src/qora/constants.js":
/*!*******************************!*\
  !*** ./src/qora/constants.js ***!
  \*******************************/
/*! exports provided: TX_TYPES, ERROR_CODES, QORA_DECIMALS, PROXY_URL, STATIC_SALT, ADDRESS_VERSION, KDF_THREADS, STATIC_BCRYPT_SALT */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TX_TYPES", function() { return TX_TYPES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_CODES", function() { return ERROR_CODES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QORA_DECIMALS", function() { return QORA_DECIMALS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROXY_URL", function() { return PROXY_URL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATIC_SALT", function() { return STATIC_SALT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDRESS_VERSION", function() { return ADDRESS_VERSION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KDF_THREADS", function() { return KDF_THREADS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATIC_BCRYPT_SALT", function() { return STATIC_BCRYPT_SALT; });\n\r\nconst TX_TYPES = {\r\n    1: "Genesis",\r\n    2: "Payment",\r\n    \r\n    3: "Name registration",\r\n    4: "Name update",\r\n    5: "Sell name",\r\n    6: "Cancel sell name",\r\n    7: "Buy name",\r\n    \r\n    8: "Create poll",\r\n    9: "Vote in poll",\r\n    \r\n    10: "Arbitrary",\r\n    \r\n    11: "Issue asset",\r\n    12: "Transfer asset",\r\n    13: "Create asset order",\r\n    14: "Cancel asset order",\r\n    15: "Multi-payment transaction",\r\n    \r\n    16: "Deploy AT",\r\n    \r\n    17: "Message",\r\n\r\n    18: "Delegation",\r\n    19: "Supernode",\r\n    20: "Airdrop"\r\n}\r\n\r\nconst ERROR_CODES = {\r\n    1: "Valid OK",\r\n    2: "Invalid address",\r\n    3: "Negative amount",\r\n    4: "Nagative fee",\r\n    5: "No balance",\r\n    6: "Invalid reference",\r\n\r\n    7: "Invalid time length",\r\n    8: "Invalid value length",\r\n    9: "Name already registered",\r\n\r\n    10: "Name does not exist",\r\n    11: "Invalid name owner",\r\n    12: "Name already for sale",\r\n    13: "Name not for sale",\r\n    14: "Name buyer already owner",\r\n    15: "Invalid amount",\r\n    16: "Invalid seller",\r\n\r\n    17: "Name not lowercase",\r\n\r\n    18: "Invalid description length",\r\n    19: "Invalid options length",\r\n    20: "Invalid option length",\r\n    21: "Duplicate option",\r\n    22: "Poll already created",\r\n    23: "Poll already has votes",\r\n    24: "Poll does not exist",\r\n    25: "Option does not exist",\r\n    26: "Already voted for that option",\r\n    27: "Invalid data length",\r\n\r\n    28: "Invalid quantity",\r\n    29: "Asset does not exist",\r\n    30: "Invalid return",\r\n    31: "Have equals want",\r\n    32: "Order does not exist",\r\n    33: "Invalid order creator",\r\n    34: "Invalid payments length",\r\n    35: "Negative price",\r\n    36: "Invalid creation bytes",\r\n    37: "Invalid tags length",\r\n    38: "Invalid type length",\r\n    \r\n    40: "Fee less required",\r\n    \r\n    41: "Invalid raw data",\r\n    \r\n    42: "Delegation already exists",\r\n    43: "Supernode invalid",\r\n    \r\n    44: "Super node already exists",\r\n    \r\n    45: "Spending disallowed",\r\n    \r\n    10000: "AT_ERROR",\r\n\r\n    1000: "Not yet released.."\r\n}\r\n\r\nconst QORA_DECIMALS = 100000000\r\n\r\nconst PROXY_URL = "/proxy/" // Proxy for api calls\r\n\r\n//const ADDRESS_VERSION = 58;  // Q for Qora\r\nconst ADDRESS_VERSION = 46;  // K for Karma\r\n\r\n// Used as a salt for all qora addresses. Salts used for storing your private keys in local storage will be randomly generated\r\nconst STATIC_SALT = new Uint8Array([54, 190, 201, 206, 65, 29, 123, 129, 147, 231, 180, 166, 171, 45, 95, 165, 78, 200, 208, 194, 44, 207, 221, 146, 45, 238, 68, 68, 69, 102, 62, 6])\r\nconst BCRYPT_ROUNDS = 10 // Remember that the total work spent on key derivation is BCRYPT_ROUNDS * KDF_THREADS\r\nconst BCRYPT_VERSION = "2a"\r\nconst STATIC_BCRYPT_SALT = `$${BCRYPT_VERSION}$${BCRYPT_ROUNDS}$IxVE941tXVUD4cW0TNVm.O`\r\n// const PBKDF2_ROUNDS = Math.pow(2,17) // Deprecated\r\n\r\nconst KDF_THREADS = 16 // 16 Threads seems like a good number :)\r\n\r\n\r\n\r\n//const TX_TYPES =  {\r\n//    GENESIS_TRANSACTION: 1,\r\n//    PAYMENT_TRANSACTION: 2,\r\n//\r\n//    REGISTER_NAME_TRANSACTION: 3,\r\n//    UPDATE_NAME_TRANSACTION: 4,\r\n//    SELL_NAME_TRANSACTION: 5,\r\n//    CANCEL_SELL_NAME_TRANSACTION: 6,\r\n//    BUY_NAME_TRANSACTION: 7,\r\n//\r\n//    CREATE_POLL_TRANSACTION: 8,\r\n//    VOTE_ON_POLL_TRANSACTION: 9,\r\n//\r\n//    ARBITRARY_TRANSACTION: 10,\r\n//\r\n//    ISSUE_ASSET_TRANSACTION: 11,\r\n//    TRANSFER_ASSET_TRANSACTION: 12,\r\n//    CREATE_ORDER_TRANSACTION: 13,\r\n//    CANCEL_ORDER_TRANSACTION: 14,\r\n//    MULTI_PAYMENT_TRANSACTION: 15,\r\n//\r\n//    DEPLOY_AT_TRANSACTION: 16,\r\n//\r\n//    MESSAGE_TRANSACTION: 17\r\n//};\n\n//# sourceURL=webpack:///./src/qora/constants.js?')}});