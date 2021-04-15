ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var a=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},a.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:true}]}};r.inherits(a,o);a.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}};a.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}};a.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}};t.DocCommentHighlightRules=a});ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./doc_comment_highlight_rules").DocCommentHighlightRules;var a=e("./text_highlight_rules").TextHighlightRules;var i="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*";var s=function(e){var t=this.createKeywordMapper({"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|"+"Namespace|QName|XML|XMLList|"+"ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"+"Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"+"Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"+"SyntaxError|TypeError|URIError|"+"decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|"+"isNaN|parseFloat|parseInt|"+"JSON|Math|"+"this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|async|await|"+"break|case|catch|continue|default|delete|do|else|finally|for|function|"+"if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|"+"__parent__|__count__|escape|unescape|with|__proto__|"+"class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},"identifier");var n="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";var r="\\\\(?:x[0-9a-fA-F]{2}|"+"u[0-9a-fA-F]{4}|"+"u{[0-9a-fA-F]{1,6}}|"+"[0-2][0-7]{0,2}|"+"3[0-7][0-7]?|"+"[4-7][0-7]?|"+".)";this.$rules={no_regex:[o.getStartRule("doc-start"),c("no_regex"),{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator"],regex:"("+i+")(\\.)(prototype)(\\.)("+i+")(\\s*)(=)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\.)("+i+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+i+")(\\.)("+i+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+i+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"from(?=\\s*('|\"))"},{token:"keyword",regex:"(?:"+n+")\\b",next:"start"},{token:["support.constant"],regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/},{token:t,regex:i},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+i+")(\\.)("+i+")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:i},{regex:"",token:"empty",next:"no_regex"}],start:[o.getStartRule("doc-start"),c("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],function_arguments:[{token:"variable.parameter",regex:i},{token:"punctuation.operator",regex:"[, ]+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:r},{token:"string",regex:"\\\\$",consumeLineEnd:true},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:r},{token:"string",regex:"\\\\$",consumeLineEnd:true},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]};if(!e||!e.noES6){this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(e,t,n){this.next=e=="{"?this.nextState:"";if(e=="{"&&n.length){n.unshift("start",t)}else if(e=="}"&&n.length){n.shift();this.next=n.shift();if(this.next.indexOf("string")!=-1||this.next.indexOf("jsx")!=-1)return"paren.quasi.end"}return e=="{"?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:r},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]});if(!e||e.jsx!=false)l.call(this)}this.embedRules(o,"doc-",[o.getEndRule("no_regex")]);this.normalizeRules()};r.inherits(s,a);function l(){var e=i.replace("\\d","\\d\\-");var t={onMatch:function(e,t,n){var r=e.charAt(1)=="/"?2:1;if(r==1){if(t!=this.nextState)n.unshift(this.next,this.nextState,0);else n.unshift(this.next);n[2]++}else if(r==2){if(t==this.nextState){n[1]--;if(!n[1]||n[1]<0){n.shift();n.shift()}}}return[{type:"meta.tag.punctuation."+(r==1?"":"end-")+"tag-open.xml",value:e.slice(0,r)},{type:"meta.tag.tag-name.xml",value:e.substr(r)}]},regex:"</?"+e+"",next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(t);var n={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[n,t,{include:"reference"},{defaultToken:"string"}];this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(e,t,n){if(t==n[0])n.shift();if(e.length==2){if(n[0]==this.nextState)n[1]--;if(!n[1]||n[1]<0){n.splice(0,2)}}this.next=n[0]||"start";return[{type:this.token,value:e}]},nextState:"jsx"},n,c("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:e},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},t];this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function c(e){return[{token:"comment",regex:/\/\*/,next:[o.getTagRule(),{token:"comment",regex:"\\*\\/",next:e||"pop"},{defaultToken:"comment",caseInsensitive:true}]},{token:"comment",regex:"\\/\\/",next:[o.getTagRule(),{token:"comment",regex:"$|^",next:e||"pop"},{defaultToken:"comment",caseInsensitive:true}]}]}t.JavaScriptHighlightRules=s});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range;var o=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var n=e.getLine(t);var o=n.match(/^(\s*\})/);if(!o)return 0;var a=o[1].length;var i=e.findMatchingBracket({row:t,column:a});if(!i||i.row==t)return 0;var s=this.$getIndent(e.getLine(i.row));e.replace(new r(t,0,t,a-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype);t.MatchingBraceOutdent=o});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop");var o=e("../../range").Range;var a=e("./fold_mode").FoldMode;var i=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(i,a);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var o=this._getFoldWidgetBase(e,t,n);if(!o&&this.startRegionRe.test(r))return"start";return o};this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var a=o.match(this.foldingStartMarker);if(a){var i=a.index;if(a[1])return this.openingBracketBlock(e,a[1],n,i);var s=e.getCommentFoldRange(n,i+a[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var a=o.match(this.foldingStopMarker);if(a){var i=a.index+a[0].length;if(a[1])return this.closingBracketBlock(e,a[1],n,i);return e.getCommentFoldRange(n,i,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var r=n.search(/\S/);var a=t;var i=n.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){n=e.getLine(t);var c=n.search(/\S/);if(c===-1)continue;if(r>c)break;var u=this.getFoldWidgetRange(e,"all",t);if(u){if(u.start.row<=a){break}else if(u.isMultiLine()){t=u.end.row}else if(r==c){break}}s=t}return new o(a,i,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/);var a=e.getLength();var i=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++n<a){t=e.getLine(n);var c=s.exec(t);if(!c)continue;if(c[1])l--;else l++;if(!l)break}var u=n;if(u>i){return new o(i,r,u,t.length)}}}).call(i.prototype)});ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./text").Mode;var a=e("./javascript_highlight_rules").JavaScriptHighlightRules;var i=e("./matching_brace_outdent").MatchingBraceOutdent;var s=e("../worker/worker_client").WorkerClient;var l=e("./behaviour/cstyle").CstyleBehaviour;var c=e("./folding/cstyle").FoldMode;var u=function(){this.HighlightRules=a;this.$outdent=new i;this.$behaviour=new l;this.foldingRules=new c};r.inherits(u,o);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.$quotes={'"':'"',"'":"'","`":"`"};this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);var o=this.getTokenizer().getLineTokens(t,e);var a=o.tokens;var i=o.state;if(a.length&&a[a.length-1].type=="comment"){return r}if(e=="start"||e=="no_regex"){var s=t.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);if(s){r+=n}}else if(e=="doc-start"){if(i=="start"||i=="no_regex"){return""}var s=t.match(/^\s*(\/?)\*/);if(s){if(s[1]){r+=" "}r+="* "}}return r};this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)};this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)};this.createWorker=function(e){var t=new s(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");t.attachToDocument(e.getDocument());t.on("annotate",function(t){e.setAnnotations(t.data)});t.on("terminate",function(){e.clearAnnotations()});return t};this.$id="ace/mode/javascript"}).call(u.prototype);t.Mode=u});ace.define("ace/mode/scala_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./doc_comment_highlight_rules").DocCommentHighlightRules;var a=e("./text_highlight_rules").TextHighlightRules;var i=function(){var e="case|default|do|else|for|if|match|while|throw|return|try|trye|catch|finally|yield|"+"abstract|class|def|extends|final|forSome|implicit|implicits|import|lazy|new|object|null|"+"override|package|private|protected|sealed|super|this|trait|type|val|var|with|"+"assert|assume|require|print|println|printf|readLine|readBoolean|readByte|readShort|"+"readChar|readInt|readLong|readFloat|readDouble";var t="true|false";var n="AbstractMethodError|AssertionError|ClassCircularityError|"+"ClassFormatError|Deprecated|EnumConstantNotPresentException|"+"ExceptionInInitializerError|IllegalAccessError|"+"IllegalThreadStateException|InstantiationError|InternalError|"+"NegativeArraySizeException|NoSuchFieldError|Override|Process|"+"ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|"+"SuppressWarnings|TypeNotPresentException|UnknownError|"+"UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|"+"InstantiationException|IndexOutOfBoundsException|"+"ArrayIndexOutOfBoundsException|CloneNotSupportedException|"+"NoSuchFieldException|IllegalArgumentException|NumberFormatException|"+"SecurityException|Void|InheritableThreadLocal|IllegalStateException|"+"InterruptedException|NoSuchMethodException|IllegalAccessException|"+"UnsupportedOperationException|Enum|StrictMath|Package|Compiler|"+"Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|"+"NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|"+"NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|"+"Character|Boolean|StackTraceElement|Appendable|StringBuffer|"+"Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|"+"StackOverflowError|OutOfMemoryError|VirtualMachineError|"+"ArrayStoreException|ClassCastException|LinkageError|"+"NoClassDefFoundError|ClassNotFoundException|RuntimeException|"+"Exception|ThreadDeath|Error|Throwable|System|ClassLoader|"+"Cloneable|Class|CharSequence|Comparable|String|Object|"+"Unit|Any|AnyVal|AnyRef|Null|ScalaObject|Singleton|Seq|Iterable|List|"+"Option|Array|Char|Byte|Int|Long|Nothing|"+"App|Application|BufferedIterator|BigDecimal|BigInt|Console|Either|"+"Enumeration|Equiv|Fractional|Function|IndexedSeq|Integral|Iterator|"+"Map|Numeric|Nil|NotNull|Ordered|Ordering|PartialFunction|PartialOrdering|"+"Product|Proxy|Range|Responder|Seq|Serializable|Set|Specializable|Stream|"+"StringContext|Symbol|Traversable|TraversableOnce|Tuple|Vector|Pair|Triple";var r=this.createKeywordMapper({"variable.language":"this",keyword:e,"support.function":n,"constant.language":t},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},o.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'"""',next:"tstring"},{token:"string",regex:'"(?=.)',next:"string"},{token:"symbol.constant",regex:"'[\\w\\d_]+"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:r,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],string:[{token:"escape",regex:'\\\\"'},{token:"string",regex:'"',next:"start"},{token:"string.invalid",regex:'[^"\\\\]*$',next:"start"},{token:"string",regex:'[^"\\\\]+'}],tstring:[{token:"string",regex:'"{3,5}',next:"start"},{defaultToken:"string"}]};this.embedRules(o,"doc-",[o.getEndRule("start")])};r.inherits(i,a);t.ScalaHighlightRules=i});ace.define("ace/mode/scala",["require","exports","module","ace/lib/oop","ace/mode/javascript","ace/mode/scala_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./javascript").Mode;var a=e("./scala_highlight_rules").ScalaHighlightRules;var i=function(){o.call(this);this.HighlightRules=a};r.inherits(i,o);(function(){this.createWorker=function(e){return null};this.$id="ace/mode/scala"}).call(i.prototype);t.Mode=i});(function(){ace.require(["ace/mode/scala"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();