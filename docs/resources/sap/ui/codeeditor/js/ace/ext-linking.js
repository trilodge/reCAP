ace.define("ace/ext/linking",["require","exports","module","ace/editor","ace/config"],function(e,i,o){var n=e("ace/editor").Editor;e("../config").defineOptions(n.prototype,"editor",{enableLinking:{set:function(e){if(e){this.on("click",r);this.on("mousemove",t)}else{this.off("click",r);this.off("mousemove",t)}},value:false}});i.previousLinkingHover=false;function t(e){var o=e.editor;var n=e.getAccelKey();if(n){var o=e.editor;var t=e.getDocumentPosition();var r=o.session;var s=r.getTokenAt(t.row,t.column);if(i.previousLinkingHover&&i.previousLinkingHover!=s){o._emit("linkHoverOut")}o._emit("linkHover",{position:t,token:s});i.previousLinkingHover=s}else if(i.previousLinkingHover){o._emit("linkHoverOut");i.previousLinkingHover=false}}function r(e){var i=e.getAccelKey();var o=e.getButton();if(o==0&&i){var n=e.editor;var t=e.getDocumentPosition();var r=n.session;var s=r.getTokenAt(t.row,t.column);n._emit("linkClick",{position:t,token:s})}}});(function(){ace.require(["ace/ext/linking"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();