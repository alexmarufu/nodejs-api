module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=require("react")},function(e,t,n){"use strict";n.r(t),n.d(t,"Form",(function(){return u})),n.d(t,"Button",(function(){return i})),n.d(t,"Field",(function(){return a}));var r=n(0),o=n.n(r),u=function(e,t){var n=e.children,r=e.url,u=e.data;return o.a.createElement("form",{onSubmit:function(){fetch("".concat(r),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)}).then((function(e){return console.log(e),e.json()})).catch((function(e){console.log(e)})),t.preventDefault()}},n)},i=function(e){var t=e.title;return o.a.createElement("button",{type:"submit"},t)},a=function(e){var t=e.height,n=e.width,r=e.borderRadius,u=e.backgroundColor,i=e.borderColor,a=e.borderWidth,c=e.name,l=e.type,d=e.value,f=e.onChange;return o.a.createElement(o.a.Fragment,null,o.a.createElement("input",{style:{height:t,width:n,borderRadius:r,backgroundColor:u,borderColor:i,borderWidth:a},name:c,type:l,value:d,onChange:f}))}}]);