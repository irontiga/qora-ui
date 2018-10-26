!function(){"use strict";function o(e,t,n,r,s,a,i){try{var c=e[a](i),o=c.value}catch(e){return void n(e)}c.done?t(o):Promise.resolve(o).then(r,s)}function s(c){return function(){var e=this,i=arguments;return new Promise(function(t,n){var r=c.apply(e,i);function s(e){o(r,t,n,s,a,"next",e)}function a(e){o(r,t,n,s,a,"throw",e)}s(void 0)})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}var t=function(){function t(e){var n=this;a(this,t),this._parentWimp=e,this._eachNewBlockFunctions=[],this._lastBlock={height:-1},this._blockStream=e.createStream("New block",function(e,t){t(n._lastBlock)})}var e;return n(t,[{key:"check",value:function(){var e=this,t=this._check();t.then(function(){setTimeout(function(){return e.check()},3e3)}),t.catch(function(){setTimeout(function(){return e.check()},3e3)})}},{key:"_check",value:(e=s(regeneratorRuntime.mark(function e(){var t,n,r,s=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("checking block"),t=setTimeout(function(){throw new Error("Block check timed out")},3e3),e.next=4,this._parentWimp.request("qoraApiCall",{data:{type:"api",url:"blocks/last"}});case 4:return n=e.sent,clearTimeout(t),(r=JSON.parse(n.data)).height>this._lastBlock.height&&(console.log("NNEEEWWW BLLOOCCCKKK"),this._lastBlock=r,this._blockStream.emit(this._lastBlock),this._eachNewBlockFunctions.forEach(function(e){return e(s._lastBlock)})),e.abrupt("return");case 9:case"end":return e.stop()}},e,this)})),function(){return e.apply(this,arguments)})},{key:"addNewBlockFunction",value:function(e){this._eachNewBlockFunctions.push(e)}}]),t}(),i={},c=function(){function r(e,t){var n=this;a(this,r),t=t||[],this._parentWimp=e,this.reset(),t.forEach(function(e){return n.addAddress(e)})}var t;return n(r,[{key:"reset",value:function(){this._addresses={},this._addressStreams={}}},{key:"addAddress",value:function(e){var n=this,r=e.address;this._addresses[r]=e,this._addressStreams[r]=this._parentWimp.createStream("address/".concat(r),function(e,t){t(n._addresses[r])}),this.updateAddress(r)}},{key:"testBlock",value:function(e){var s=this,a=[];e.transactions.forEach(function(e){console.log(s);for(var t=Object.keys(s._addresses),n=0;n<t.length;n++){var r=t[n];r in a||a.push(r)}}),a.forEach(function(e){return s.updateAddress(e)})}},{key:"updateAddress",value:(t=s(regeneratorRuntime.mark(function e(t){var n,r,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("UPPPDDAAATTTINGGG AADDDRRR",t),e.next=3,this._parentWimp.request("qoraApiCall",{data:{type:"explorer",data:{addr:t,txOnPage:10}}});case 3:for(n=e.sent,console.log("response: ",n),(r=n.success?n.data:i).transactions=[],s=r.start;s>=r.end;s--)r.transactions.push(r[s]),delete r[s];if(this._addresses[t]){e.next=10;break}return e.abrupt("return");case 10:this._addresses[t]=r,this._addressStreams[t].emit(r);case 12:case"end":return e.stop()}},e,this)})),function(e){return t.apply(this,arguments)})}]),r}(),u=function(){function t(e){a(this,t),this._parentWimp=e,this._unconfirmedTransactionStreams={},this.reset()}var e;return n(t,[{key:"reset",value:function(){this._addresses={},this._addressesUnconfirmedTransactions={}}},{key:"addAddress",value:function(e){var n=this,r=e.address;this._addresses[r]=e,this._addressesUnconfirmedTransactions[r]=[],this._unconfirmedTransactionStreams[r]||(this._unconfirmedTransactionStreams[r]=this._parentWimp.createStream("unconfirmedOfAddress/".concat(r),function(e,t){t(n._addressesUnconfirmedTransactions[r])}))}},{key:"check",value:function(){var e=this;this._addressTransactionCheck().then(function(){return setTimeout(function(){return e.check()},5e3)}).catch(function(){return setTimeout(function(){return e.check()},5e3)})}},{key:"_addressTransactionCheck",value:(e=s(regeneratorRuntime.mark(function e(){var n=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all(Object.keys(this._addresses).map(function(t){return n._parentWimp.request("qoraApiCall",{data:{type:"api",url:"transactions/unconfirmedof/".concat(t)}}).then(function(e){e=JSON.parse(e.data),n._unconfirmedTransactionStreams[t].emit(e)})})));case 1:case"end":return e.stop()}},e,this)})),function(){return e.apply(this,arguments)})}]),t}(),e=function(){function e(n){var r=this;a(this,e),this._parentWimp=n,this._blockCheck=new t(n),this._addressWatcher=new c(n),this._unconfirmedTransactionWatcher=new u(n),n.on("login",s(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.request("getQoraAddresses");case 2:t=e.sent,r.updateAddresses(t.data);case 4:case"end":return e.stop()}},e,this)}))),this._blockCheck.addNewBlockFunction(this._addressWatcher.testBlock.bind(this._addressWatcher)),this._blockCheck.check(),this._unconfirmedTransactionWatcher.check()}return n(e,[{key:"updateAddresses",value:function(e){var t=this;this._addressWatcher.reset(),e.forEach(function(e){return t._addressWatcher.addAddress(e)}),this._unconfirmedTransactionWatcher.reset(),e.forEach(function(e){return t._unconfirmedTransactionWatcher.addAddress(e)})}}]),e}();Wimp.init();var d=new Wimp(window.parent);d.request("registerUrl",{data:{url:"wallet",page:"core/wallet/index.html",title:"Wallet",icon:"credit-card",menus:[],parent:!1}},function(e){}),d.request("registerUrl",{data:{url:"send-money",page:"core/send-money-page/index.html",title:"Send money",icon:"send",menus:[],parent:!1}},function(e){});new e(d)}();
