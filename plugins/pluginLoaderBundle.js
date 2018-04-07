/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./plugins/pluginLoader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/js/wimp/wimp.js":
/*!********************************!*\
  !*** ./client/js/wimp/wimp.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Copyright 2018 @ Johan Esterhuizen\r\n\r\n// [ON] = TEST THE SELECTOR/TARGETS EVERY SINGLE CALL. If myWimp has a listener (on(\"blah\")) and a target is added...IT SHOULD BE CARRIED ACCROSS. SYKE DON\"T REQUERY\r\n\r\nconst Wimp = (function(){\r\n    \r\n    const registeredTargets = {}; // \"name\" : elements. Quite handy for proxied requests...\r\n    \r\n    // Not registered listeners....rather..\r\n    // Outgoing HTTP requests\r\n    const pendingRequests = {}; // \"hgad683gfy8q\" : function(data, event) <-- event.data already parsed\r\n    \r\n    const proxiedStreams = {}; // { name: [window, window, window] // All the targets}\r\n    \r\n    // Streams ~ websockets .. do we need websockets? Nope we dont't :D Wimp(\"balancePage\").on(\"balance-update\", data => { ... })\r\n    // Listening to streams\r\n    // const connectedStreams = { \"name\": ... }\r\n    // Window's own streams\r\n    // const registeredStreams = { \"\" : { \"private\": ..., \"fn\" : function } }\r\n    \r\n    let proxyingEnabled = false;\r\n    \r\n    let DOMSelector = document.querySelectorAll.bind(document);\r\n    \r\n    const wimps = []; // Instances of Wimp within the window. Loop through it for all requests\r\n    \r\n    const pendingProxyTargets = {} // {randID : [id, id, id]}\r\n    \r\n    const readyFrames = []; // Stores every frame that is ready. Prevents duplicates, especially when proxying\r\n    \r\n\r\n    class Wimp {\r\n        \r\n        static get pendingRequests(){\r\n            return pendingRequests;\r\n        }\r\n        static get registeredTargets(){\r\n            return registeredTargets;\r\n        }\r\n        static set proxy(enabled){\r\n            proxyingEnabled = enabled;\r\n        }\r\n        static get proxy(){\r\n            return proxyingEnabled;\r\n        }\r\n        \r\n        // Use newSelector = document.querySelector(\"my-polymer-app\").shadowRoot.querySelectorAll for accessing iframes in the shadowRoot\r\n        // If you don't call Wimp.listen you can't make requests or receive messages\r\n        static init(newSelector){\r\n            // Maybe should be instance.listen which also sends the ready event to the targets. Notifying them that we are ready for requests.\r\n            \r\n            DOMSelector = newSelector || DOMSelector;\r\n            \r\n            window.addEventListener(\"message\", Wimp._listener);\r\n            \r\n        }\r\n        \r\n        static _listener(event){\r\n            const data = JSON.parse(event.data);\r\n            const parsedEvent = {\r\n                data,\r\n                source: event.source,\r\n                origin: event.origin\r\n            };\r\n            \r\n            switch(data.type){\r\n                case \"readyCheck\":\r\n                    // Obviously ready(as we're receiving a mesage), so just change the type and send it back\r\n                    data.type = \"readyResponse\";\r\n                    Wimp._postMessage({window: event.source, origin: event.origin}, data);\r\n                    break;\r\n                case \"proxyReadyCheck\":\r\n                    if(pendingProxyTargets[data.requestID]){\r\n                        return; // Request has already been received\r\n                    }\r\n                    \r\n                    data.type = \"readyResponse\";\r\n                    Wimp._postMessage({window: event.source, origin: event.origin}, data);\r\n                    \r\n                    // Now check all the targets. Responds \"targetsReady\"\r\n                    if(!proxyingEnabled){\r\n                        throw \"Proxying disabled. Enable it with `Wimp.proxy = true;`\";\r\n                    }\r\n                    \r\n                    pendingProxyTargets[data.requestID] = {\r\n                        targets: [],\r\n                        pending: {},\r\n                        window: event.source,\r\n                        origin: event.origin\r\n                    };\r\n                    \r\n                    const proxyTargets = pendingProxyTargets[data.requestID].targets;\r\n                    const pendingReady = pendingProxyTargets[data.requestID].pending;\r\n                    \r\n                    data.targets.forEach((target) => {\r\n                        proxyTargets.push(...Wimp._getTargetWindows(target));\r\n                    });\r\n                    proxyTargets.forEach(target => {\r\n                        if(readyFrames.includes(target.window)){\r\n                            return;\r\n                        }\r\n                        // And wait for everyone to be ready\r\n                        const pendingID = Math.random().toString(36).substr(2, 12);\r\n                        pendingReady[pendingID] = target;\r\n                        // Now keep on checking for the ready...and because setInterval is dumb\r\n                    });\r\n                    \r\n                    const readyCheck = () => {\r\n                        if(Object.keys(pendingReady).length == 0){\r\n                            data.type = \"targetsReady\";\r\n                            Wimp._postMessage({window: event.source, origin: event.origin}, data);\r\n                            return;\r\n                        }\r\n                        Object.keys(pendingReady).forEach(pending => {\r\n                            Wimp._postMessage(pendingReady[pending], {\r\n                                type: \"readyCheck\",\r\n                                requestID: pending\r\n                            });\r\n                        })\r\n                        setTimeout(() => readyCheck(), 10);\r\n                    }\r\n                    readyCheck();\r\n                    \r\n                    break;\r\n                case \"proxyReadyCheckReset\":\r\n                    const framesToRemove = [];\r\n                    \r\n                    data.targets.forEach((target) => {\r\n                        framesToRemove.push(...Wimp._getTargetWindows(target));\r\n                    });\r\n                    \r\n                    framesToRemove.forEach(target => {\r\n                        if(readyFrames.indexOf(target.window) !== -1){\r\n                            readyFrames.splice(readyFrames.indexOf(target.window), 1);\r\n                        }\r\n                    })\r\n                    \r\n                    break;\r\n                    \r\n                case \"readyResponse\":\r\n                    if(!readyFrames.includes(event.source)){\r\n                        readyFrames.push(event.source)\r\n                    }\r\n                    wimps.some(w => {\r\n                        if(w.pendingReady[data.requestID]){\r\n                            delete w.pendingReady[data.requestID];\r\n                            return 1;\r\n                        }\r\n                        if(w.pendingReadyProxy == data.requestID){\r\n                            w.proxyReady = true;\r\n                            return 1;\r\n                        }\r\n                    });\r\n                    Object.keys(pendingProxyTargets).forEach(id => {\r\n                        if(pendingProxyTargets[id].pending[data.requestID]){\r\n                            delete pendingProxyTargets[id].pending[data.requestID];\r\n                        }\r\n                    })\r\n                    break;\r\n                case \"targetsReady\":\r\n                    wimps.some(w => {\r\n                        if(w.pendingReadyProxy == data.requestID){\r\n                            w.isReady = true;\r\n                            w.readyFunction();\r\n                        }\r\n                    })\r\n                    break;\r\n                case \"response\":\r\n                    // Response to a request\r\n                    // Try avoid errors please\r\n                    data.success = data.success != \"false\";\r\n                    \r\n                    if(pendingRequests[data.requestID]){\r\n                        pendingRequests[data.requestID](data) // , parsedEvent);\r\n                        delete pendingRequests[data.requestID];\r\n                    } else {\r\n                        //Wimp.error(event.source, `Unrecognized requestID '${data.requestID}' from '${data.request}' request.`, data.requestID)\r\n                        console.error(`Unrecognized requestID '${data.requestID}' from '${data.request}' request.`)\r\n                    }\r\n                    break;\r\n                case \"request\":\r\n                    // All the \"on\" things\r\n                    \r\n                    wimps.forEach(w => {\r\n                        w.targets.some(target => {\r\n                            if(target.window == event.source){\r\n                                \r\n                                const res = data.expectResponse ? Wimp._responseFactory(event, data.requestID) : () => {};\r\n                                \r\n                                if(w.routes[data.request]){ w.routes[data.request](data.data, res) }\r\n                                return 1;\r\n                            }\r\n                        })\r\n                    });\r\n                    break;\r\n                case \"proxy\":\r\n                    if(!proxyingEnabled){\r\n                        throw \"Proxying disabled. Enable it with `Wimp.proxy = true;`\"\r\n                    }\r\n                    // Relay a proxied request/response\r\n                    Wimp._relay(parsedEvent);\r\n                    break;\r\n                case \"joinStream\":\r\n                    wimps.forEach(w => {\r\n                        if(w.streams[data.name]){\r\n                            w.streams[data.name].fn(data.data, event);\r\n                        } else {\r\n                            // Do nothing. Stream doesn't exist so just ignore it\r\n                        }\r\n                    })\r\n                    \r\n                    break;\r\n                case \"streamMessage\":\r\n                    wimps.forEach(w => {\r\n                        if(w.listeners[data.name]){\r\n                            w.listeners[data.name](data.data);\r\n                        } else {\r\n                            // No one is listening to this stream...wonder who sent the message :joy:\r\n                        }\r\n                    })\r\n                    if(proxiedStreams[data.name]){\r\n                        proxiedStreams[data.name].forEach(target => {\r\n                            Wimp._postMessage(target, data);\r\n                        })\r\n                    }\r\n                    \r\n                    break;\r\n                case \"joinProxyStream\":\r\n                    if(!proxyingEnabled){\r\n                        throw \"Proxying disabled. Enable it with `Wimp.proxy = true;`\"\r\n                    }\r\n                    // There should only be one, altho I guess it's possible for there to be multiple...\r\n                    //const targets = Wimp._getTargetWindows(data.target);\r\n                    const targets = [];\r\n                    \r\n                    data.targets.forEach((target) => {\r\n                        targets.push(...Wimp._getTargetWindows(target));\r\n                    })\r\n                    \r\n                    data.type = \"joinStream\";\r\n                    delete data.target;\r\n                    \r\n                    targets.forEach(target => {\r\n                        Wimp._postMessage(target, data);\r\n                    })\r\n                    if(proxiedStreams[name]){\r\n                        if(proxiedStreams[data.name].indexOf(event.source) == -1){\r\n                            proxiedStreams[data.name].push({\r\n                                window: event.source,\r\n                                origin: event.origin\r\n                            });\r\n                        }\r\n                    } else {\r\n                        proxiedStreams[data.name] = [{\r\n                            window: event.source,\r\n                            origin: event.origin\r\n                        }];\r\n                    }\r\n                    break;\r\n                case \"ready\":\r\n                    // When the target(s) are all ready for requests\r\n                    break;\r\n            }\r\n            \r\n            \r\n        }\r\n        \r\n        static registerTarget(name, element){\r\n            const targets = [];\r\n            Wimp._targetsToArrayObject(element).forEach((target) => {\r\n                targets.push(...Wimp._getTargetWindows(target));\r\n            });\r\n            registeredTargets[name] = targets;\r\n        }\r\n        \r\n        static _relay(event){\r\n            // Proxy requests\r\n            //const targets = Wimp._getTargetWindows({selector: event.data.target, origin: \"*\"});\r\n            const targets = [];\r\n            event.data.targets.forEach((target) => {\r\n                targets.push(...Wimp._getTargetWindows(target));\r\n            })\r\n            const requestIDs = [];\r\n            \r\n            const options = Object.assign({},event.data);\r\n            options.type = \"request\";\r\n            delete options.target;\r\n            \r\n            targets.forEach(target => {\r\n                const requestID = Math.random().toString(36).substr(2, 12);\r\n                requestIDs.push(requestID);\r\n            });\r\n            \r\n            // Send the IDs BEFORE\r\n            Wimp._postMessage({window: event.source, origin: event.origin}, {\r\n                type: \"response\",\r\n                requestID: event.data.requestID,\r\n                requestIDs: requestIDs\r\n            })\r\n            \r\n            targets.forEach((target, i) => {\r\n                options.requestID = requestIDs[i];\r\n                // Make a pending request and then pass it on to the client\r\n                pendingRequests[requestIDs[i]] = (response) => {\r\n                    Wimp._postMessage({window: event.source, origin: event.origin}, response);\r\n                }\r\n                // Send the clients request to the target\r\n                Wimp._postMessage({\r\n                    window: target.window,\r\n                    origin: target.origin\r\n                }, options)\r\n            })\r\n        }\r\n        \r\n        static _postMessage(target, data){\r\n            target.window.postMessage(JSON.stringify(data), target.origin);\r\n        }\r\n        \r\n        static error(target, message, requestID){\r\n            const data = {\r\n                success: \"false\",\r\n                error: {\r\n                    message: message\r\n                },\r\n                type: \"response\"\r\n            }\r\n\r\n            if(requestID){ data.requestID = requestID; }\r\n\r\n            Wimp._postMessage({\r\n                window: target.window,\r\n                origin: target.origin\r\n            }, data)\r\n        }\r\n        \r\n        static _responseFactory(event, requestID){\r\n            const res = data => {\r\n                const options = {\r\n                    data,\r\n                    requestID,\r\n                    success: true,\r\n                    type: \"response\"\r\n                }\r\n                Wimp._postMessage({window: event.source, origin: event.origin}, options);\r\n            }\r\n            res.error = message => {\r\n                message = message || \"An error occured\";\r\n                Wimp.error({window: event.source, origin: event.origin}, message, requestID)\r\n            }\r\n            return res;\r\n        }\r\n        \r\n        static _targetsToArrayObject(targets){\r\n            if(!Array.isArray(targets)){\r\n                targets = [targets];\r\n            }\r\n            // Correct formatting\r\n            for(let i=0;i<targets.length;i++){\r\n                if(targets[i].postMessage || !targets[i].selector){\r\n                    targets[i] = {\r\n                        selector: targets[i],\r\n                        origin: \"*\"\r\n                    }\r\n                }\r\n                if(!targets[i].origin){\r\n                    targets[i].origin = \"*\"\r\n                }\r\n            }\r\n            return targets\r\n        }\r\n        // Takes a string or element and returns an array of elements or throws an error\r\n        static _getTargetWindows(target){\r\n            if(typeof target.selector == \"string\"){\r\n                \r\n                if(target.selector == \"*\"){\r\n                    // Avoid testing every element in the page\r\n                    return Array.prototype.slice.call(window.frames).map(frame => {\r\n                        return {\r\n                            window: frame,\r\n                            origin: target.origin\r\n                        }\r\n                    })\r\n//                    return Wimp_getTargetWindows({\r\n//                        selector: \"iframe\",\r\n//                        origin: target.origin\r\n//                    });\r\n                }\r\n                \r\n                // id/name for a target\r\n                else {\r\n                    if(target.selector in registeredTargets){\r\n                        // Return an array...\r\n                        return registeredTargets[target.selector];\r\n//                      return [{\r\n//                          window: registeredTargets[target.selector],\r\n//                          origin: target.origin\r\n//                      }];\r\n                    }\r\n                    // Otherwise assume it's a css selector\r\n                    const nodes = Array.prototype.slice.call(DOMSelector(target.selector));\r\n                    return nodes.filter(node => {\r\n                        // Check that it is an iframe...\r\n                        return node.contentWindow;\r\n                    }).map(node => {\r\n                        return {\r\n                            window: node.contentWindow,\r\n                            origin: target.origin\r\n                        }\r\n                    });\r\n                    // Registered iframe with name maybe if it's enclosed in curly braces ({}) or starts with +?\r\n                    // OR a query selector...could encompass *\r\n                    // Just go with it's a query selector if not in registeredTargets\r\n                }\r\n            }\r\n            else{\r\n                return [{\r\n                    window: target.selector,\r\n                    origin: target.origin\r\n                }]\r\n                // Dom element\r\n            }\r\n        }\r\n        \r\n        // frame could be an array, proxy can only be a string or an object\r\n        constructor(targets, proxy){\r\n            wimps.push(this);\r\n            \r\n            // Incoming\r\n            this.routes = {};\r\n            this.streams = {};\r\n            this.listeners = {}; // Listeners for streams\r\n            this.pendingReady = {};\r\n            this.proxyReady = false;\r\n            this.proxyTargetsReady = false;\r\n            this.readyFunction = () => {}; // Default ready function. Does absolutely nothing :)\r\n            // Store targets\r\n            this.targets = [];\r\n            \r\n            // Make it a gorgeous object if it isn't already one\r\n            if(proxy && proxy.postMessage){\r\n                proxy = {\r\n                    selector: proxy,\r\n                    origin: \"*\"\r\n                }\r\n            }\r\n            \r\n            targets = Wimp._targetsToArrayObject(targets);\r\n            \r\n            // Store original selector(if it is one)\r\n            this.selectors = [];\r\n            targets.forEach(target => {\r\n                if(typeof target.selector == \"string\"){\r\n                    this.selectors.push(target);\r\n                }\r\n            })\r\n            \r\n            // Store \r\n            this.proxy = proxy ? Wimp._getTargetWindows(proxy)[0] : false;\r\n            \r\n            targets.forEach((target) => {\r\n                // Store the target\r\n                this.targets.push(...Wimp._getTargetWindows(target));\r\n            });\r\n            this.readyCheck(false);\r\n        }\r\n        \r\n        readyCheck(reset){\r\n            this.isReady = false;\r\n            \r\n            if(reset){\r\n                this.targets.forEach(target => {\r\n                    if(readyFrames.indexOf(target.window) !== -1){\r\n                        readyFrames.splice(readyFrames.indexOf(target.window), 1);\r\n                    }\r\n                })\r\n                \r\n                if(this.proxy){\r\n                    Wimp._postMessage(this.proxy, {\r\n                        type: \"proxyReadyCheckReset\",\r\n                        targets: this.selectors\r\n                        // No request ID, no response expected\r\n                    });\r\n                }\r\n            }\r\n            \r\n            if(this.proxy){\r\n                this.pendingReadyProxy = Math.random().toString(36).substr(2, 12);\r\n                const readyCheck = () => {\r\n                    Wimp._postMessage(this.proxy, {\r\n                        type: \"proxyReadyCheck\",\r\n                        targets: this.selectors,\r\n                        requestID: this.pendingReadyProxy\r\n                    });\r\n                    // The proxy is ready...but we are still waiting for the target(s)\r\n                    if(this.proxyReady) {\r\n                        return;\r\n                    }\r\n                    setTimeout(() => readyCheck(), 10);\r\n                }\r\n                readyCheck();\r\n            } else {\r\n                this.targets.forEach(target => {\r\n                    if(readyFrames.includes(target.window)){\r\n                        return;\r\n                    }\r\n                    // And wait for everyone to be ready\r\n                    const pendingID = Math.random().toString(36).substr(2, 12);\r\n                    this.pendingReady[pendingID] = target;\r\n                    // Now keep on checking for the ready...and because setInterval is dumb\r\n                    const readyCheck = () => {\r\n                        if(Object.keys(this.pendingReady).length == 0){\r\n                            this.isReady = true;\r\n                            this.readyFunction();\r\n                            return;\r\n                        }\r\n                        Object.keys(this.pendingReady).forEach(pending => {\r\n                            Wimp._postMessage(this.pendingReady[pending], {\r\n                                type: \"readyCheck\",\r\n                                requestID: pending\r\n                            });\r\n                        })\r\n                        setTimeout(() => readyCheck(), 10);\r\n                    }\r\n\r\n                    readyCheck();\r\n                });\r\n            }\r\n        }\r\n        \r\n        \r\n        // Like a HTTP request, it's once off - fetches/does something\r\n        // data stored in options.data\r\n        request(request, options, cb){\r\n            // Request can be omitted and included in options\r\n            if ( typeof request != \"string\" ) { options = request; cb = options; }\r\n            \r\n            // Or you could have to deal with request(\"hello\", fn...)\r\n            if ( typeof options == \"function\" ) { cb = options; options = void 0; }\r\n            \r\n            // Make sure options does indeed exist\r\n            options = options || {};\r\n            \r\n            options.request = options.request || request;\r\n            \r\n            if ( !options.request ) { throw \"Request must be specified\" };\r\n            \r\n            if(options.expectResponse != false){\r\n                options.expectResponse = true;\r\n            }\r\n            \r\n            // If no callback\r\n            const promiseArray = [];\r\n            \r\n\r\n            \r\n            // Obviously handle proxied requests differently...\r\n            if(!this.proxy){\r\n                // Send the request to each of the targets with different request IDs...if promise return array of promises (which can be wrapped in a Promise.all()), otherwise call the callback with each response\r\n                this.targets.forEach(target => {\r\n                    \r\n                    options.requestID = Math.random().toString(36).substr(2, 12);\r\n                    options.type = \"request\";\r\n                    \r\n                    if(!options.expectResponse){\r\n                        Wimp._postMessage(target, options);\r\n                        return;\r\n                    }\r\n                    \r\n                    if(!cb) {\r\n                        promiseArray.push(new Promise((resolve, reject) => {\r\n                            pendingRequests[options.requestID] = resolve;\r\n                        }))\r\n                    } else {\r\n                        pendingRequests[options.requestID] = cb;\r\n                    }\r\n                    \r\n                    Wimp._postMessage(target, options);\r\n\r\n                });\r\n                \r\n                if(!cb){\r\n                    return promiseArray.length == 1 ? promiseArray[0] : promiseArray;\r\n                }\r\n                \r\n            } else {\r\n                // First request/response fetchs an array of request IDs, as sometimes a request can have multiple targets\r\n                const initID = Math.random().toString(36).substr(2, 12);\r\n                options.requestID = initID;\r\n                options.type = \"proxy\";\r\n                options.targets = this.selectors;\r\n                \r\n                const initFunction = response => {\r\n                    \r\n                    response.requestIDs.forEach(id => {\r\n                        if(!cb) {\r\n                            promiseArray.push(new Promise((resolve, reject) => {\r\n                                pendingRequests[id] = resolve;\r\n                            }))\r\n                        } else {\r\n                            pendingRequests[id] = cb;\r\n                        }\r\n                    })\r\n                    \r\n                    if(!cb){\r\n                        return promiseArray.length == 1 ? promiseArray[0] : promiseArray;\r\n                    }\r\n                }\r\n                \r\n                if(!cb){\r\n                    return new Promise((resolve, reject) => {\r\n                        pendingRequests[initID] = resolve;\r\n                        Wimp._postMessage(this.proxy, options);\r\n                    }).then(response => {\r\n                        return initFunction(response);\r\n                    });\r\n                } else {\r\n                    pendingRequests[initID] = initFunction;\r\n                    Wimp._postMessage(this.proxy, options);\r\n                }\r\n            }\r\n            \r\n        }\r\n        \r\n        // Like HTTP, but from the server's perspective - returns something - not to be confused with Stream.on(\"...\")\r\n        // fn(options)\r\n        on(request, fn){\r\n            this.routes[request] = fn;\r\n        }\r\n        \r\n        // const myStream = new Wimp(\"*\").createStream(\"balance\", (req, res) => {})\r\n        createStream(name, options, joinFn){\r\n            // Name of the stream, it's options, and function to be called whenever a user joins. Options of name can be omitted\r\n            if ( typeof name != \"string\" ) { options = name; joinFn = options; }\r\n            if ( typeof options == \"function\" ) { joinFn = options; options = void 0; }\r\n            options = options || {};\r\n            options.name = options.name || name;\r\n            if ( !options.name ) { throw \"Name must be specified\" };\r\n            \r\n            this.streams[name] = {\r\n                fn: (data, event) => {\r\n                    if(this.streams[name].targets.indexOf(event.source) < 0){\r\n                        this.streams[name].targets.push({\r\n                            window: event.source,\r\n                            origin: event.origin\r\n                        });\r\n                    }\r\n                    joinFn(data, (response) => {\r\n                        Wimp._postMessage({\r\n                            window: event.source, \r\n                            origin: event.origin\r\n                        }, {\r\n                            type: \"streamMessage\",\r\n                            name: name,\r\n                            data: response\r\n                        })\r\n                    });\r\n                },\r\n                targets: []\r\n            }\r\n            \r\n            return {\r\n                emit: data => {\r\n                    options = {\r\n                        name: name,\r\n                        type: \"streamMessage\",\r\n                        data: data\r\n                    }\r\n                    this.streams[name].targets.forEach(target => {\r\n                        Wimp._postMessage(target, options);\r\n                    })\r\n                }\r\n            }\r\n            \r\n        }\r\n        \r\n        // const myDad = new Wimp(window.parent).listen(\"balance\", update => { })\r\n        listen(name, fn){\r\n            if(this.proxy){\r\n                Wimp._postMessage(this.proxy, {\r\n                    type: \"joinProxyStream\",\r\n                    name: name,\r\n                    targets: this.selectors\r\n                })\r\n            } else {\r\n                this.targets.forEach(target => {\r\n                    Wimp._postMessage(target, {\r\n                        type: \"joinStream\",\r\n                        name: name\r\n                    })\r\n                })\r\n            }\r\n            this.listeners[name] = fn;\r\n        }\r\n        \r\n        addTarget(targets){\r\n            // So that we can add window.open popups to \"*\" selector etc.\r\n            targets = Wimp._targetsToArrayObject(targets);\r\n            targets.forEach(target => {\r\n                if(typeof target.selector == \"string\"){\r\n                    this.selectors.push(target);\r\n                }\r\n            })\r\n            this.targets.push(...Wimp._getTargetWindows(targets));\r\n        }\r\n        \r\n        requery(){\r\n            this.targets = []; // Delete the old targers\r\n            this.selectors.forEach((target) => {\r\n                // Store the target\r\n                this.targets.push(...Wimp._getTargetWindows(target));\r\n            });\r\n        }\r\n        \r\n        hashSync(){\r\n            this.on(\"hashchange\", (req, res) => {\r\n                window.location.hash = req.hash;\r\n            })\r\n\r\n            window.addEventListener(\"hashchange\", (e) => {\r\n                const newHash = e.newURL.split(\"#\", 2)[1] || \"\"\r\n                this.request(\"hashchange\", {\r\n                    data: {\r\n                        hash: newHash\r\n                    },\r\n                    expectResponse: false\r\n                });\r\n            }, false);\r\n        }\r\n        \r\n        ready(cb){\r\n            // Call cb when a handshake has occured (aka the target frame is loaded)...might be unnecessary....test window.parent.document.readyState or frame.contentWindow.document.readyState ...altho frame should = contentWindow\r\n            // Check that ready has not already been fired\r\n            if(this.isReady){\r\n                if(!cb){\r\n                    return Promise.resolve();\r\n                }\r\n                return cb();\r\n            }\r\n            \r\n            if(!cb){\r\n                return new Promise(resolve => {\r\n                    this.readyFunction = resolve;\r\n                })\r\n            }\r\n            this.readyFunction = cb;\r\n            \r\n        }\r\n        \r\n        destroy(){\r\n            wimps.splice(wimps.indexOf(this), 1)\r\n        }\r\n    }\r\n    \r\n    return Wimp;\r\n}());\r\n\r\nif (typeof module === 'object' && module.exports) {\r\n    // CommonJS\r\n    module.exports = Wimp;\r\n} else if (this === window){\r\n    // Browser global\r\n    window.Wimp = Wimp\r\n}\r\n\n\n//# sourceURL=webpack:///./client/js/wimp/wimp.js?");

/***/ }),

/***/ "./plugins/pluginLoader.js":
/*!*********************************!*\
  !*** ./plugins/pluginLoader.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client_js_wimp_wimp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/js/wimp/wimp.js */ \"./client/js/wimp/wimp.js\");\n/* harmony import */ var _client_js_wimp_wimp_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_js_wimp_wimp_js__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n\r\nwindow.Wimp = _client_js_wimp_wimp_js__WEBPACK_IMPORTED_MODULE_0___default.a\r\n\r\nconst pluginScript = document.createElement(\"script\");\r\npluginScript.async = false;\r\nconst hash = window.location.hash\r\npluginScript.src = hash.slice(1);\r\n\r\ndocument.body.appendChild(pluginScript);\r\n\n\n//# sourceURL=webpack:///./plugins/pluginLoader.js?");

/***/ })

/******/ });