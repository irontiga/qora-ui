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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/elements/login-screen/create-account-page/create-account-page.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/elements/login-screen/create-account-page/create-account-page.js":
/*!******************************************************************************!*\
  !*** ./src/elements/login-screen/create-account-page/create-account-page.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import { WORDLIST } from \"../../../wordlist.js\"\r\n\r\nclass CreateAccountPage extends Polymer.Element {\r\n    static get is() {\r\n        return \"create-account-page\";\r\n    }\r\n    static get properties() {\r\n        return {\r\n            generatedPassphrase: {\r\n                type: String,\r\n                value: \"\"\r\n            },\r\n            passphraseInputType: {\r\n                type: String,\r\n                value: \"password\"\r\n            },\r\n            passphraseVisibilityIcon: {\r\n                type: String,\r\n                value: \"icons:visibility-off\"\r\n            }\r\n        }\r\n    }\r\n    constructor() {\r\n        super()\r\n        this.crypto = window.crypto || window.msCrytpo\r\n    }\r\n    connectedCallback() {\r\n        super.connectedCallback()\r\n    }\r\n    ready() {\r\n        super.ready()\r\n        // this.generatedPassphrase = this.generatePassphrase()\r\n    }\r\n\r\n    _regeneratePassphrase(){\r\n        this.generatedPassphrase = this.generatePassphrase()\r\n    }\r\n    togglePassphraseVisibility() {\r\n        this.passphraseInputType = this.passphraseInputType === \"password\" ? \"text\" : \"password\";\r\n        this.passphraseVisibilityIcon = this.passphraseInputType === \"password\" ? \"icons:visibility-off\" : \"icons:visibility\"\r\n    }\r\n\r\n\r\n    create(){\r\n        const passphrase = this.passphrase\r\n        if (passphrase == undefined || passphrase.length == 0) {\r\n            this.loading = false\r\n            return\r\n        }\r\n\r\n        // Let's change to Sha512(Bcrypt(Sha512(Passphrase + nonce)) * 8)\r\n        // const passphraseSeed = PBKDF2_HMAC_SHA512.bytes(utils.stringtoUTF8Array(passphrase), STATIC_SALT, PBKDF2_ROUNDS, 64);\r\n        const nonces = Array.from(Array(KDF_THREADS).keys())\r\n        seedPieces = nonces.map(nonce => {\r\n            return SHA512(nonce + passphrase + nonce)\r\n        })\r\n        console.log(passphraseSeed)\r\n        this.login(new PhraseWallet(passphraseSeed, 2))\r\n\r\n        if (this.rememberMe) {\r\n            this._remember(passphraseSeed, 2)\r\n        }\r\n    }\r\n}\r\n\r\ncustomElements.define(CreateAccountPage.is, CreateAccountPage)\r\n\r\n\r\n\r\n    // login(){\r\n    //     this.$.container.style.opacity = 0;\r\n    //     setTimeout(() => {\r\n    //         this.$.container.style.display = \"none\"\r\n    //     }, 500)\r\n    //     console.log(this.$.container)\r\n    // }\r\n\r\n        // generatePassphrase(){\r\n    //     const randNumArray = new Uint16Array(12)\r\n\r\n    //     this.crypto.getRandomValues(randNumArray)\r\n\r\n    //     let generatedPassphrase = \"\";\r\n\r\n    //     randNumArray.forEach(num => {\r\n    //         generatedPassphrase += \" \" + WORDLIST[num % WORDLIST.length]\r\n    //     })\r\n\r\n    //     return generatedPassphrase;\r\n    // }\r\n    \n\n//# sourceURL=webpack:///./src/elements/login-screen/create-account-page/create-account-page.js?");

/***/ })

/******/ });