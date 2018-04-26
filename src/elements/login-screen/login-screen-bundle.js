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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/elements/login-screen/login-screen.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/elements/login-screen/login-screen.js":
/*!***************************************************!*\
  !*** ./src/elements/login-screen/login-screen.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class LoginContainer extends Polymer.Element {\r\n    static get is() {\r\n        return \"login-screen\";\r\n    }\r\n    static get properties() {\r\n        return {\r\n            selectedPage: {\r\n                type: String,\r\n                value: \"welcome\",\r\n                observer: \"_pageChange\"\r\n            },\r\n            pages: {\r\n                type: Object,\r\n                value: {\r\n                    \"welcome\": 0,\r\n                    \"new-account\" : 1,\r\n                    \"login\": 2\r\n                }\r\n            },\r\n            loggedIn : {\r\n                type: Boolean,\r\n                notify: true\r\n            },\r\n            wallet: {\r\n                type: Object,\r\n                notify: true\r\n            },\r\n            addressCount: {\r\n                type: Object\r\n            },\r\n            addresses : {\r\n                type: Array,\r\n                value: [],\r\n                notify: true\r\n            },\r\n            addressColors: {\r\n                type: Array\r\n            }\r\n        }\r\n    }\r\n    constructor() {\r\n        super()\r\n    }\r\n    connectedCallback() {\r\n        super.connectedCallback()\r\n    }\r\n    ready() {\r\n        super.ready()\r\n        this.selectedPage = \"welcome\"\r\n    }\r\n    logOut(){\r\n        this.$[\"login-page\"].logOut()\r\n    }\r\n    _pageChange(newPage, oldPage){\r\n        if(!this.shadowRoot.querySelector(\"#loginContainerPages\") || !newPage){\r\n            return\r\n        }\r\n        const pages = this.shadowRoot.querySelector(\"#loginContainerPages\").children\r\n        // Run the animation on the newly selected page\r\n        const newIndex = this.pages[newPage]\r\n        if (!pages[newIndex].className.includes('animated')) {\r\n            pages[newIndex].className += ' animated';\r\n        }\r\n\r\n        if (typeof oldPage !== 'undefined') {\r\n            const oldIndex = this.pages[oldPage]\r\n            // Stop the animation of hidden pages\r\n            //pages[oldIndex].className = pages[oldIndex].className.split(' animated').join('');\r\n            pages[oldIndex].classList.remove(\"animated\")\r\n        }\r\n    }\r\n    _backToWelcome(){\r\n        this.selectedPage = \"welcome\"\r\n    }\r\n\r\n}\r\n\r\ncustomElements.define(LoginContainer.is, LoginContainer)\n\n//# sourceURL=webpack:///./src/elements/login-screen/login-screen.js?");

/***/ })

/******/ });