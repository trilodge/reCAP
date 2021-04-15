ace.define("ace/mode/c9search_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";var n=e("../lib/oop");var a=e("../lib/lang");var i=e("./text_highlight_rules").TextHighlightRules;function o(e,t){try{return new RegExp(e,t)}catch(e){}}var s=function(){this.$rules={start:[{tokenNames:["c9searchresults.constant.numeric","c9searchresults.text","c9searchresults.text","c9searchresults.keyword"],regex:/(^\s+[0-9]+)(:)(\d*\s?)([^\r\n]+)/,onMatch:function(e,t,r){var n=this.splitRegex.exec(e);var a=this.tokenNames;var i=[{type:a[0],value:n[1]},{type:a[1],value:n[2]}];if(n[3]){if(n[3]==" ")i[1]={type:a[1],value:n[2]+" "};else i.push({type:a[1],value:n[3]})}var o=r[1];var s=n[4];var c;var u=0;if(o&&o.exec){o.lastIndex=0;while(c=o.exec(s)){var h=s.substring(u,c.index);u=o.lastIndex;if(h)i.push({type:a[2],value:h});if(c[0])i.push({type:a[3],value:c[0]});else if(!h)break}}if(u<s.length)i.push({type:a[2],value:s.substr(u)});return i}},{regex:"^Searching for [^\\r\\n]*$",onMatch:function(e,t,r){var n=e.split("");if(n.length<3)return"text";var i,s;var c=0;var u=[{value:n[c++]+"'",type:"text"},{value:s=n[c++],type:"text"},{value:"'"+n[c++],type:"text"}];if(n[2]!==" in"){u.push({value:"'"+n[c++]+"'",type:"text"},{value:n[c++],type:"text"})}u.push({value:" "+n[c++]+" ",type:"text"});if(n[c+1]){i=n[c+1];u.push({value:"("+n[c+1]+")",type:"text"});c+=1}else{c-=1}while(c++<n.length){n[c]&&u.push({value:n[c],type:"text"})}if(s){if(!/regex/.test(i))s=a.escapeRegExp(s);if(/whole/.test(i))s="\\b"+s+"\\b"}var h=s&&o("("+s+")",/ sensitive/.test(i)?"g":"ig");if(h){r[0]=t;r[1]=h}return u}},{regex:"^(?=Found \\d+ matches)",token:"text",next:"numbers"},{token:"string",regex:"^\\S:?[^:]+",next:"numbers"}],numbers:[{regex:"\\d+",token:"constant.numeric"},{regex:"$",token:"text",next:"start"}]};this.normalizeRules()};n.inherits(s,i);t.C9SearchHighlightRules=s});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,r){"use strict";var n=e("../range").Range;var a=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var r=e.getLine(t);var a=r.match(/^(\s*\})/);if(!a)return 0;var i=a[1].length;var o=e.findMatchingBracket({row:t,column:i});if(!o||o.row==t)return 0;var s=this.$getIndent(e.getLine(o.row));e.replace(new n(t,0,t,i-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(a.prototype);t.MatchingBraceOutdent=a});ace.define("ace/mode/folding/c9search",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,r){"use strict";var n=e("../../lib/oop");var a=e("../../range").Range;var i=e("./fold_mode").FoldMode;var o=t.FoldMode=function(){};n.inherits(o,i);(function(){this.foldingStartMarker=/^(\S.*:|Searching for.*)$/;this.foldingStopMarker=/^(\s+|Found.*)$/;this.getFoldWidgetRange=function(e,t,r){var n=e.doc.getAllLines(r);var i=n[r];var o=/^(Found.*|Searching for.*)$/;var s=/^(\S.*:|\s*)$/;var c=o.test(i)?o:s;var u=r;var h=r;if(this.foldingStartMarker.test(i)){for(var l=r+1,d=e.getLength();l<d;l++){if(c.test(n[l]))break}h=l}else if(this.foldingStopMarker.test(i)){for(var l=r-1;l>=0;l--){i=n[l];if(c.test(i))break}u=l}if(u!=h){var g=i.length;if(c===o)g=i.search(/\(Found[^)]+\)$|$/);return new a(u,g,h,0)}}}).call(o.prototype)});ace.define("ace/mode/c9search",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/c9search_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/c9search"],function(e,t,r){"use strict";var n=e("../lib/oop");var a=e("./text").Mode;var i=e("./c9search_highlight_rules").C9SearchHighlightRules;var o=e("./matching_brace_outdent").MatchingBraceOutdent;var s=e("./folding/c9search").FoldMode;var c=function(){this.HighlightRules=i;this.$outdent=new o;this.foldingRules=new s};n.inherits(c,a);(function(){this.getNextLineIndent=function(e,t,r){var n=this.$getIndent(t);return n};this.checkOutdent=function(e,t,r){return this.$outdent.checkOutdent(t,r)};this.autoOutdent=function(e,t,r){this.$outdent.autoOutdent(t,r)};this.$id="ace/mode/c9search"}).call(c.prototype);t.Mode=c});(function(){ace.require(["ace/mode/c9search"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();