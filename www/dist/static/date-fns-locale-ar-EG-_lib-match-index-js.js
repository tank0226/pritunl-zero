(self.webpackChunkpritunl_zero=self.webpackChunkpritunl_zero||[]).push([[11053,46144,70140],{94461:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=a.width,n=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],u=t.match(n);if(!u)return null;var l,d=u[0],i=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],s=Array.isArray(i)?function(e,t){for(var a=0;a<e.length;a++)if(t(e[a]))return a;return}(i,(function(e){return e.test(d)})):function(e,t){for(var a in e)if(e.hasOwnProperty(a)&&t(e[a]))return a;return}(i,(function(e){return e.test(d)}));return l=e.valueCallback?e.valueCallback(s):s,{value:l=a.valueCallback?a.valueCallback(l):l,rest:t.slice(d.length)}}},e.exports=t.default},44497:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.match(e.matchPattern);if(!r)return null;var n=r[0],u=t.match(e.parsePattern);if(!u)return null;var l=e.valueCallback?e.valueCallback(u[0]):u[0];return{value:l=a.valueCallback?a.valueCallback(l):l,rest:t.slice(n.length)}}},e.exports=t.default},65254:(e,t,a)=>{"use strict";var r=a(1654).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a(94461)),u={ordinalNumber:(0,r(a(44497)).default)({matchPattern:/^(\d+)/,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,n.default)({matchPatterns:{narrow:/^(ق|ب)/g,abbreviated:/^(ق.م|ب.م)/g,wide:/^(قبل الميلاد|بعد الميلاد)/g},defaultMatchWidth:"wide",parsePatterns:{any:[/^ق/g,/^ب/g]},defaultParseWidth:"any"}),quarter:(0,n.default)({matchPatterns:{narrow:/^[1234]/,abbreviated:/^ر[1234]/,wide:/^الربع (الأول|الثاني|الثالث|الرابع)/},defaultMatchWidth:"wide",parsePatterns:{wide:[/الربع الأول/,/الربع الثاني/,/الربع الثالث/,/الربع الرابع/],any:[/1/,/2/,/3/,/4/]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,n.default)({matchPatterns:{narrow:/^(ي|ف|م|أ|س|ن|د)/,abbreviated:/^(ينا|فبر|مارس|أبريل|مايو|يونـ|يولـ|أغسـ|سبتـ|أكتـ|نوفـ|ديسـ)/,wide:/^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^ي/,/^ف/,/^م/,/^أ/,/^م/,/^ي/,/^ي/,/^أ/,/^س/,/^أ/,/^ن/,/^د/],any:[/^ينا/,/^فبر/,/^مارس/,/^أبريل/,/^مايو/,/^يون/,/^يول/,/^أغس/,/^سبت/,/^أكت/,/^نوف/,/^ديس/]},defaultParseWidth:"any"}),day:(0,n.default)({matchPatterns:{narrow:/^(ح|ن|ث|ر|خ|ج|س)/,short:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,abbreviated:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,wide:/^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^ح/,/^ن/,/^ث/,/^ر/,/^خ/,/^ج/,/^س/],any:[/أحد/,/اثنين/,/ثلاثاء/,/أربعاء/,/خميس/,/جمعة/,/سبت/]},defaultParseWidth:"any"}),dayPeriod:(0,n.default)({matchPatterns:{narrow:/^(ص|م|ن|ظ|في الصباح|بعد الظهر|في المساء|في الليل)/,abbreviated:/^(ص|م|نصف الليل|ظهراً|في الصباح|بعد الظهر|في المساء|في الليل)/,wide:/^(ص|م|نصف الليل|في الصباح|ظهراً|بعد الظهر|في المساء|في الليل)/,any:/^(ص|م|صباح|ظهر|مساء|ليل)/},defaultMatchWidth:"any",parsePatterns:{any:{am:/^ص/,pm:/^م/,midnight:/^ن/,noon:/^ظ/,morning:/^ص/,afternoon:/^بعد/,evening:/^م/,night:/^ل/}},defaultParseWidth:"any"})};t.default=u,e.exports=t.default},1654:e=>{e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}}]);
//# sourceMappingURL=date-fns-locale-ar-EG-_lib-match-index-js.js.map