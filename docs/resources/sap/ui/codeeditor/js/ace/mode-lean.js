ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text_highlight_rules").TextHighlightRules;var o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},o.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:true}]}};r.inherits(o,i);o.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}};o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}};o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}};t.DocCommentHighlightRules=o});ace.define("ace/mode/lean_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./doc_comment_highlight_rules").DocCommentHighlightRules;var o=e("./text_highlight_rules").TextHighlightRules;var a=function(){var e=["add_rewrite","alias","as","assume","attribute","begin","by","calc","calc_refl","calc_subst","calc_trans","check","classes","coercions","conjecture","constants","context","corollary","else","end","environment","eval","example","exists","exit","export","exposing","extends","fields","find_decl","forall","from","fun","have","help","hiding","if","import","in","infix","infixl","infixr","instances","let","local","match","namespace","notation","obtain","obtains","omit","opaque","open","options","parameter","parameters","postfix","precedence","prefix","premise","premises","print","private","proof","protected","qed","raw","renaming","section","set_option","show","tactic_hint","take","then","universe","universes","using","variable","variables","with"].join("|");var t=["inductive","structure","record","theorem","axiom","axioms","lemma","hypothesis","definition","constant"].join("|");var n=["Prop","Type","Type'","Type₊","Type₁","Type₂","Type₃"].join("|");var r="\\[("+["abbreviations","all-transparent","begin-end-hints","class","classes","coercion","coercions","declarations","decls","instance","irreducible","multiple-instances","notation","notations","parsing-only","persistent","reduce-hints","reducible","tactic-hints","visible","wf","whnf"].join("|")+")\\]";var o=[].join("|");var a=this.$keywords=this.createKeywordMapper({"keyword.control":e,"storage.type":n,"keyword.operator":o,"variable.language":"sorry"},"identifier");var s="[A-Za-z_α-κμ-ϻἀ-῾℀-⅏][A-Za-z0-9_'α-κμ-ϻἀ-῾⁰-⁹ⁿ-₉ₐ-ₜ℀-⅏]*";var c=new RegExp(["#","@","->","∼","↔","/","==","=",":=","<->","/\\","\\/","∧","∨","≠","<",">","≤","≥","¬","<=",">=","⁻¹","⬝","▸","\\+","\\*","-","/","λ","→","∃","∀",":="].join("|"));this.$rules={start:[{token:"comment",regex:"--.*$"},i.getStartRule("doc-start"),{token:"comment",regex:"\\/-",next:"comment"},{stateName:"qqstring",token:"string.start",regex:'"',next:[{token:"string.end",regex:'"',next:"start"},{token:"constant.language.escape",regex:/\\[n"\\]/},{defaultToken:"string"}]},{token:"keyword.control",regex:t,next:[{token:"variable.language",regex:s,next:"start"}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"storage.modifier",regex:r},{token:a,regex:s},{token:"operator",regex:c},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"-/",next:"start"},{defaultToken:"comment"}]};this.embedRules(i,"doc-",[i.getEndRule("start")]);this.normalizeRules()};r.inherits(a,o);t.leanHighlightRules=a});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range;var i=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var n=e.getLine(t);var i=n.match(/^(\s*\})/);if(!i)return 0;var o=i[1].length;var a=e.findMatchingBracket({row:t,column:o});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new r(t,0,t,o-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype);t.MatchingBraceOutdent=i});ace.define("ace/mode/lean",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/lean_highlight_rules","ace/mode/matching_brace_outdent","ace/range"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text").Mode;var o=e("./lean_highlight_rules").leanHighlightRules;var a=e("./matching_brace_outdent").MatchingBraceOutdent;var s=e("../range").Range;var c=function(){this.HighlightRules=o;this.$outdent=new a};r.inherits(c,i);(function(){this.lineCommentStart="--";this.blockComment={start:"/-",end:"-/"};this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);var i=this.getTokenizer().getLineTokens(t,e);var o=i.tokens;var a=i.state;if(o.length&&o[o.length-1].type=="comment"){return r}if(e=="start"){var s=t.match(/^.*[\{\(\[]\s*$/);if(s){r+=n}}else if(e=="doc-start"){if(a=="start"){return""}var s=t.match(/^\s*(\/?)\*/);if(s){if(s[1]){r+=" "}r+="- "}}return r};this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)};this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)};this.$id="ace/mode/lean"}).call(c.prototype);t.Mode=c});