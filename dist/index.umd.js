!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("lodash.filter"),require("lodash.last"),require("lodash.chunk"),require("lodash.isplainobject"),require("lodash.isfunction"),require("lodash.get")):"function"==typeof define&&define.amd?define(["exports","lodash.filter","lodash.last","lodash.chunk","lodash.isplainobject","lodash.isfunction","lodash.get"],n):n((t||self).recollectArrayJs={},t.filter,t.last,t.chunk,t.isPlainObject,t.isFunction,t.get)}(this,function(t,n,e,r,u,o,i){function a(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var c=/*#__PURE__*/a(n),f=/*#__PURE__*/a(e),l=/*#__PURE__*/a(r),s=/*#__PURE__*/a(u),d=/*#__PURE__*/a(o),h=/*#__PURE__*/a(i);function p(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var m=function(t,n,e){return h.default(t,n)==e},y=function(t,n,e){var r=h.default(t,n);return e.match(/^([^*])(\w*)([*])$/)?r.startsWith(e.replace(/\*$/,"")):e.match(/^([*])(\w*)([^*])$/)?r.endsWith(e.replace(/^\*/,"")):!!e.match(/^\*\w*\*$/)&&r.includes(e.replace(/^\*/,"").replace(/\*$/,""))},v=/*#__PURE__*/function(){function t(){}return t.factory=function(t,n,e){if(this.PREDICATES.includes(t)&&this[t])return d.default(e)&&(e=e()),this[t](n,e)},t.matches=function(t,n){return function(e){var r=[h.default(e,t)].flatMap(function(t){return t});return(n=[n].flatMap(function(t){return t})).some(function(t){return r.includes(t)})}},t.not_matches=function(t,n){return!this.matches(t,n)},t.in=function(t,n){return this.matches(t,n)},t.not_in=function(t,n){return!this.in(t,n)},t.eq=function(t,n){return function(e){return m(e,t,n)}},t.not_eq=function(t,n){return function(e){return!m(e,t,n)}},t.gte=function(t,n){return function(e){return h.default(e,t)>=n}},t.gt=function(t,n){return function(e){return h.default(e,t)>n}},t.lte=function(t,n){return function(e){return h.default(e,t)<=n}},t.lt=function(t,n){return function(e){return h.default(e,t)<n}},t.cont=function(t,n){return function(e){return y(e,t,n)}},t.not_cont=function(t,n){return function(e){return!y(e,t,n)}},t.starts_with=function(t,n){return function(e){return y(e,t,n+"*")}},t.st=function(t,n){return this.starts_with(t,n)},t.not_st=function(t,n){return!this.starts_with(t,n)},t}();v.PREDICATES=["eq","not_eq","gte","lte","gt","lt","matches","not_matches","in","not_in","cont","not_cont","starts_with","not_starts_with","st","not_st"];var b=function(t,n,e,r){return c.default(t,v.factory(n,e,r))},_=function(t,n,e){for(var r=0,u=Object.entries(e);r<u.length;r++){var o=u[r];t=b(t,o[0],n,o[1])}return t},g=function(t,n,e){var r=n.split("_"),u=f.default(r),o=n.replace("_"+u,"");return b(t,u,o,e)},w=/*#__PURE__*/function(){function t(){}return t.filter=function(t,n){var e=Array.from(t);return this.recollect(e,n)},t}();w.recollect=function(t,n){for(var e,r=Object.entries(n).flatMap(function(t){return t}),u=function(t,n){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(e)return(e=e.call(t)).next.bind(e);if(Array.isArray(t)||(e=function(t,n){if(t){if("string"==typeof t)return p(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?p(t,n):void 0}}(t))){e&&(t=e);var r=0;return function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(l.default(r,2));!(e=u()).done;){var o=e.value,i=o[0],a=o[1];t=s.default(a)?_(t,i,a):g(t,i,n[i])}return t},t.RecollectArray=w,t.default=w});
//# sourceMappingURL=index.umd.js.map
