/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataParentBinding","./lib/_AggregationCache","./lib/_AggregationHelper","./lib/_Cache","./lib/_GroupLock","./lib/_Helper","sap/base/Log","sap/base/util/uid","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/FilterOperator","sap/ui/model/FilterProcessor","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/Sorter","sap/ui/model/odata/OperationMode","sap/ui/thirdparty/jquery"],function(e,t,i,n,r,o,s,a,h,d,u,f,c,l,p,g,C,x,y){"use strict";var v="sap.ui.model.odata.v4.ODataListBinding",m={AggregatedDataStateChange:true,change:true,createCompleted:true,createSent:true,dataReceived:true,dataRequested:true,DataStateChange:true,patchCompleted:true,patchSent:true,refresh:true};var P=g.extend("sap.ui.model.odata.v4.ODataListBinding",{constructor:function(i,n,r,o,a,h){g.call(this,i,n);t.call(this);if(n.slice(-1)==="/"){throw new Error("Invalid path: "+n)}this.oAggregation=null;this.aApplicationFilters=s.toArray(a);this.sChangeReason=i.bAutoExpandSelect?"AddVirtualContext":undefined;this.oDiff=undefined;this.aFilters=[];this.bHasAnalyticalInfo=false;this.mPreviousContextsByPath={};this.aPreviousData=[];this.aSorters=s.toArray(o);this.applyParameters(y.extend(true,{},h));this.oHeaderContext=this.bRelative?null:e.create(this.oModel,this,n);if(!this.bRelative||r&&!r.fetchValue){this.createReadGroupLock(this.getGroupId(),true)}this.setContext(r);i.bindingCreated(this)}});t(P.prototype);P.prototype.attachCreateCompleted=function(e,t){this.attachEvent("createCompleted",e,t)};P.prototype.detachCreateCompleted=function(e,t){this.detachEvent("createCompleted",e,t)};P.prototype.attachCreateSent=function(e,t){this.attachEvent("createSent",e,t)};P.prototype.detachCreateSent=function(e,t){this.detachEvent("createSent",e,t)};P.prototype._delete=function(t,i,n,r){var o=false,a=this;return this.deleteFromCache(t,i,String(n.iIndex),r,function(t,i){var r,h,d,u,f;if(n.created()){a.destroyCreated(n,true)}else{for(h=t;h<a.aContexts.length;h+=1){n=a.aContexts[h];if(n){a.mPreviousContextsByPath[n.getPath()]=n}}u=a.oModel.resolve(a.sPath,a.oContext);a.aContexts.splice(t,1);for(h=t;h<a.aContexts.length;h+=1){if(a.aContexts[h]){f=h-a.iCreatedContexts;d=s.getPrivateAnnotation(i[h],"predicate");r=u+(d||"/"+f);n=a.mPreviousContextsByPath[r];if(n){delete a.mPreviousContextsByPath[r];if(n.iIndex===f){n.checkUpdate()}else{n.iIndex=f}}else{n=e.create(a.oModel,a,r,f)}a.aContexts[h]=n}}a.iMaxLength-=1}o=true}).then(function(){if(o){a._fireChange({reason:f.Remove})}})};P.prototype.adjustPredicate=function(e,t,i){var n=this;function r(e,t){var i=n.aPreviousData.indexOf(e);if(i>=0){n.aPreviousData[i]=t}}if(i){i.adjustPredicate(e,t,r)}else{this.oHeaderContext.adjustPredicate(e,t);this.aContexts.forEach(function(i){i.adjustPredicate(e,t,r)})}};P.prototype.applyParameters=function(e,t){var i,r;this.checkBindingParameters(e,["$$aggregation","$$canonicalPath","$$groupId","$$operationMode","$$ownRequest","$$patchWithoutSideEffects","$$updateGroupId"]);r=e.$$operationMode||this.oModel.sOperationMode;if(!r&&(this.aSorters.length||this.aApplicationFilters.length)){throw new Error("Unsupported operation mode: "+r)}this.sOperationMode=r;this.sGroupId=e.$$groupId;this.sUpdateGroupId=e.$$updateGroupId;this.mQueryOptions=this.oModel.buildQueryOptions(e,true);this.mParameters=e;if("$$aggregation"in e){if("$apply"in this.mQueryOptions){throw new Error("Cannot combine $$aggregation and $apply")}i=s.clone(e.$$aggregation);this.mQueryOptions.$apply=n.buildApply(i).$apply;this.oAggregation=i}if(this.isRootBindingSuspended()){this.setResumeChangeReason(t);return}this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.reset(t)};P.prototype.attachEvent=function(e){if(!(e in m)){throw new Error("Unsupported event '"+e+"': v4.ODataListBinding#attachEvent")}return g.prototype.attachEvent.apply(this,arguments)};P.prototype.create=function(t,i,n){var r,o=this.fetchResourcePath(),a,d,u=this.oModel.resolve(this.sPath,this.oContext),c="($uid="+h()+")",l=u+c,p=this;if(!u){throw new Error("Binding is not yet resolved: "+this)}n=!!n;if(n&&!this.mQueryOptions.$count){throw new Error("Must set $count to create at the end")}if(this.bCreatedAtEnd!==undefined&&this.bCreatedAtEnd!==n){throw new Error("Creating entities at the start and at the end is not supported.")}this.bCreatedAtEnd=n;this.checkSuspended();d=this.lockGroup(this.getUpdateGroupId(),true,true,function(){p.destroyCreated(r,true);return Promise.resolve().then(function(){p._fireChange({reason:f.Remove})})});a=this.createInCache(d,o,"",c,t,function(e){p.oModel.reportError("POST on '"+o+"' failed; will be repeated automatically",v,e);p.fireEvent("createCompleted",{context:r,success:false})},function(){p.fireEvent("createSent",{context:r})}).then(function(e){var n,o;if(!(t&&t["@$ui5.keepTransientPath"])){o=s.getPrivateAnnotation(e,"predicate");if(o){p.adjustPredicate(c,o,r);p.oModel.checkMessages()}}p.fireEvent("createCompleted",{context:r,success:true});if(!i){n=p.getGroupId();if(!p.oModel.isDirectGroup(n)&&!p.oModel.isAutoGroup(n)){n="$auto"}return p.refreshSingle(r,p.lockGroup(n))}},function(e){d.unlock(true);throw e});this.iCreatedContexts+=1;r=e.create(this.oModel,this,l,-this.iCreatedContexts,a);this.aContexts.unshift(r);this._fireChange({reason:f.Add});return r};P.prototype.createContexts=function(t,i,n){var r=false,o,a,h,d=n.$count,u,f=this.bLengthFinal,c=this.oModel,l=c.resolve(this.sPath,this.oContext),p,g=t>this.aContexts.length,C=this;function x(){var e,t=C.iMaxLength+C.iCreatedContexts;if(t>=C.aContexts.length){return}for(e=t;e<C.aContexts.length;e+=1){if(C.aContexts[e]){C.aContexts[e].destroy()}}while(t>0&&!C.aContexts[t-1]){t-=1}C.aContexts.length=t;r=true}for(h=t;h<t+n.length;h+=1){if(this.aContexts[h]===undefined&&n[h-t]){r=true;u=h-this.iCreatedContexts;p=s.getPrivateAnnotation(n[h-t],"predicate")||s.getPrivateAnnotation(n[h-t],"transientPredicate");a=l+(p||"/"+u);o=this.mPreviousContextsByPath[a];if(o&&(!o.created()||o.isTransient())){delete this.mPreviousContextsByPath[a];o.iIndex=u;o.checkUpdate()}else{o=e.create(c,this,a,u)}this.aContexts[h]=o}}if(Object.keys(this.mPreviousContextsByPath).length){sap.ui.getCore().addPrerenderingTask(this.destroyPreviousContexts.bind(this))}if(d!==undefined){this.bLengthFinal=true;this.iMaxLength=d-this.iCreatedContexts;x()}else{if(!n.length){this.iMaxLength=t-this.iCreatedContexts;x()}else if(this.aContexts.length>this.iMaxLength+this.iCreatedContexts){this.iMaxLength=Infinity}if(!(g&&n.length===0)){this.bLengthFinal=this.aContexts.length===this.iMaxLength+this.iCreatedContexts}}if(this.bLengthFinal!==f){r=true}return r};P.prototype.destroy=function(){if(this.bHasAnalyticalInfo&&this.aContexts===undefined){return}this.aContexts.forEach(function(e){e.destroy()});this.destroyPreviousContexts();if(this.oHeaderContext){this.oHeaderContext.destroy()}this.oModel.bindingDestroyed(this);this.oAggregation=undefined;this.aApplicationFilters=undefined;this.aContexts=undefined;this.oDiff=undefined;this.aFilters=undefined;this.oHeaderContext=undefined;this.mPreviousContextsByPath=undefined;this.aPreviousData=undefined;this.mQueryOptions=undefined;this.aSorters=undefined;t.prototype.destroy.call(this);g.prototype.destroy.call(this)};P.prototype.destroyCreated=function(e,t){var i,n=e.getModelIndex();this.iCreatedContexts-=1;for(i=0;i<n;i+=1){this.aContexts[i].iIndex+=1}if(!this.iCreatedContexts){this.bCreatedAtEnd=undefined}this.aContexts.splice(n,1);if(t&&this.iCurrentEnd){this.mPreviousContextsByPath[e.getPath()]=e}else{e.destroy()}};P.prototype.destroyPreviousContexts=function(){var e=this.mPreviousContextsByPath;if(e){Object.keys(e).forEach(function(t){e[t].destroy()});this.mPreviousContextsByPath={}}};P.prototype.doCreateCache=function(e,t,o,s){var a=this.oAggregation&&(this.oAggregation.groupLevels.length||n.hasMinOrMax(this.oAggregation.aggregate)||n.hasGrandTotal(this.oAggregation.aggregate));t=this.inheritQueryOptions(t,o);return a?i.create(this.oModel.oRequestor,e,this.oAggregation,t):r.create(this.oModel.oRequestor,e,t,this.oModel.bAutoExpandSelect,s)};P.prototype.doFetchQueryOptions=function(e){var t=this.getOrderby(this.mQueryOptions.$orderby),i=this;return this.fetchFilter(e,this.mQueryOptions.$filter).then(function(e){return s.mergeQueryOptions(i.mQueryOptions,t,e)})};P.prototype.doSetProperty=function(){};P.prototype.enableExtendedChangeDetection=function(e,t){if(t!==undefined){throw new Error("Unsupported property 'key' with value '"+t+"' in binding info for "+this)}return g.prototype.enableExtendedChangeDetection.apply(this,arguments)};P.prototype.fetchContexts=function(e,t,i,n,r,o){var s,a=this;if(this.bCreatedAtEnd){e+=this.iCreatedContexts}n=n||this.lockGroup();s=this.fetchData(e,t,i,n,o);if(r){s=Promise.resolve(s)}return s.then(function(i){return i&&a.createContexts(e,t,i.value)},function(e){n.unlock(true);throw e})};P.prototype.fetchData=function(e,t,i,n,r){var o=this.oContext,s=this;return this.oCachePromise.then(function(a){if(s.bRelative&&o!==s.oContext){return undefined}if(a){return a.read(e,t,i,n,r)}n.unlock();return o.fetchValue(s.sReducedPath).then(function(i){var n;i=i||[];n=i.$count;i=i.slice(e,e+t);i.$count=n;return{value:i}})})};P.prototype.fetchDownloadUrl=function(){var e=this.oModel;if(this.isRelative()&&!this.oContext){throw new Error("Binding is unresolved")}return this.withCache(function(t,i){var n=t.mQueryOptions,r=s.getMetaPath(i);if(i){n=s.getQueryOptionsForPath(n,i);n=s.merge({},e.mUriParameters,n)}return e.sServiceUrl+s.buildPath(t.sResourcePath,i)+e.oRequestor.buildQueryString(s.buildPath(t.sMetaPath,r),n)})};P.prototype.fetchFilter=function(e,t){var i,n,r;function o(e,t,i){var n,r,o,a;function h(e){return o?"tolower("+e+")":e}o=t==="Edm.String"&&e.bCaseSensitive===false;r=h(decodeURIComponent(e.sPath));a=h(s.formatLiteral(e.oValue1,t));switch(e.sOperator){case c.BT:n=r+" ge "+a+" and "+r+" le "+h(s.formatLiteral(e.oValue2,t));break;case c.NB:n=u(r+" lt "+a+" or "+r+" gt "+h(s.formatLiteral(e.oValue2,t)),i);break;case c.EQ:case c.GE:case c.GT:case c.LE:case c.LT:case c.NE:n=r+" "+e.sOperator.toLowerCase()+" "+a;break;case c.Contains:case c.EndsWith:case c.NotContains:case c.NotEndsWith:case c.NotStartsWith:case c.StartsWith:n=e.sOperator.toLowerCase().replace("not","not ")+"("+r+","+a+")";break;default:throw new Error("Unsupported operator: "+e.sOperator)}return n}function a(e,t,i){if(e.aFilters){return d.all(e.aFilters.map(function(i){return a(i,t,e.bAnd)})).then(function(t){return u(t.join(e.bAnd?" and ":" or "),i&&!e.bAnd)})}return n.fetchObject(h(e.sPath,t),r).then(function(n){var s,d,u;if(!n){throw new Error("Type cannot be determined, no metadata for path: "+r.getPath())}u=e.sOperator;if(u===c.All||u===c.Any){s=e.oCondition;d=e.sVariable;if(u===c.Any&&!s){return e.sPath+"/any()"}t=Object.create(t);t[d]=h(e.sPath,t);return a(s,t).then(function(t){return e.sPath+"/"+e.sOperator.toLowerCase()+"("+d+":"+t+")"})}return o(e,n.$Type,i)})}function h(e,t){var i=e.split("/");i[0]=t[i[0]];return i[0]?i.join("/"):e}function u(e,t){return t?"("+e+")":e}i=l.combineFilters(this.aFilters,this.aApplicationFilters);if(!i){return d.resolve(t)}n=this.oModel.getMetaModel();r=n.getMetaContext(this.oModel.resolve(this.sPath,e));return a(i,{},t).then(function(e){if(t){e+=" and ("+t+")"}return e})};P.prototype.fetchValue=function(e,t,i){var n=this;return this.oCachePromise.then(function(r){var s,a;if(r){s=i?o.$cached:n.lockGroup();a=n.getRelativePath(e);if(a!==undefined){return r.fetchValue(s,a,undefined,t)}}if(n.oContext){return n.oContext.fetchValue(e,t,i)}})};P.prototype.filter=function(e,t){var i=s.toArray(e);if(this.sOperationMode!==x.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server")}if(this.hasPendingChanges()){throw new Error("Cannot filter due to pending changes")}if(t===p.Control){this.aFilters=i}else{this.aApplicationFilters=i}if(this.isRootBindingSuspended()){this.setResumeChangeReason(f.Filter);return this}this.createReadGroupLock(this.getGroupId(),true);this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.reset(f.Filter);return this};P.prototype.getContexts=function(t,i,n){var r,o,s=false,h=false,d,u,c=!!this.sChangeReason,l,p=this;a.debug(this+"#getContexts("+t+", "+i+", "+n+")",undefined,v);this.checkSuspended();if(t!==0&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" first parameter must be 0 if extended change detection is enabled, but is "+t)}if(n!==undefined&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" third parameter must not be set if extended change detection is enabled")}if(this.bRelative&&!this.oContext){this.aPreviousData=[];return[]}r=this.sChangeReason||f.Change;this.sChangeReason=undefined;if(r==="AddVirtualContext"){sap.ui.getCore().addPrerenderingTask(function(){if(!p.isRootBindingSuspended()){p.sChangeReason="RemoveVirtualContext";p._fireChange({detailedReason:p.sChangeReason,reason:f.Change});p.reset(f.Refresh)}l.destroy()},true);l=e.create(this.oModel,this,this.oModel.resolve(this.sPath,this.oContext)+"/"+e.VIRTUAL,e.VIRTUAL);return[l]}if(r==="RemoveVirtualContext"){return[]}t=t||0;i=i||this.oModel.iSizeLimit;if(!n||n<0){n=0}d=this.oReadGroupLock;this.oReadGroupLock=undefined;if(!this.oDiff){u=this.fetchContexts(t,i,n,d,c,function(){s=true;p.fireDataRequested()});this.resolveRefreshPromise(u);u.then(function(e){if(p.bUseExtendedChangeDetection){p.oDiff={aDiff:p.getDiff(i),iLength:i}}if(h){if(e||p.oDiff&&p.oDiff.aDiff.length){p._fireChange({reason:r})}else{p.oDiff=undefined}}if(s){p.fireDataReceived({data:{}})}},function(e){if(s){p.fireDataReceived(e.canceled?{data:{}}:{error:e})}throw e}).catch(function(e){p.oModel.reportError("Failed to get contexts for "+p.oModel.sServiceUrl+p.oModel.resolve(p.sPath,p.oContext).slice(1)+" with start index "+t+" and length "+i,v,e)});h=true}this.iCurrentBegin=t;this.iCurrentEnd=t+i;o=this.getContextsInViewOrder(t,i);if(this.bUseExtendedChangeDetection){if(this.oDiff&&i!==this.oDiff.iLength){throw new Error("Extended change detection protocol violation: Expected "+"getContexts(0,"+this.oDiff.iLength+"), but got getContexts(0,"+i+")")}o.dataRequested=!this.oDiff;o.diff=this.oDiff?this.oDiff.aDiff:[]}this.oDiff=undefined;return o};P.prototype.getContextsInViewOrder=function(e,t){var i,n,r;if(this.bCreatedAtEnd){i=[];r=Math.min(t,this.getLength()-e);for(n=0;n<r;n+=1){i[n]=this.aContexts[this.getModelIndex(e+n)]}}else{i=this.aContexts.slice(e,e+t)}return i};P.prototype.getCurrentContexts=function(){var e,t=Math.min(this.iCurrentEnd,this.iMaxLength+this.iCreatedContexts)-this.iCurrentBegin;e=this.getContextsInViewOrder(this.iCurrentBegin,t);while(e.length<t){e.push(undefined)}return e};P.prototype.getDependentBindings=function(){var e=this;return this.oModel.getDependentBindings(this).filter(function(t){return!(t.oContext.getPath()in e.mPreviousContextsByPath)})};P.prototype.getDiff=function(e){var t,i,n=this;i=this.getContextsInViewOrder(0,e).map(function(e){return n.bDetectUpdates?JSON.stringify(e.getValue()):e.getPath()});t=this.diffData(this.aPreviousData,i);this.aPreviousData=i;return t};P.prototype.getDistinctValues=function(){throw new Error("Unsupported operation: v4.ODataListBinding#getDistinctValues")};P.prototype.getDownloadUrl=s.createGetMethod("fetchDownloadUrl",true);P.prototype.getFilterInfo=function(e){var t=l.combineFilters(this.aFilters,this.aApplicationFilters),i=null,n;if(t){i=t.getAST(e)}if(this.mQueryOptions.$filter){n={expression:this.mQueryOptions.$filter,syntax:"OData "+this.oModel.getODataVersion(),type:"Custom"};if(i){i={left:i,op:"&&",right:n,type:"Logical"}}else{i=n}}return i};P.prototype.getHeaderContext=function(){return this.bRelative&&!this.oContext?null:this.oHeaderContext};P.prototype.getModelIndex=function(e){if(!this.bCreatedAtEnd){return e}return e<this.getLength()-this.iCreatedContexts?e+this.iCreatedContexts:this.getLength()-e-1};P.prototype.getLength=function(){if(this.bLengthFinal){return this.iMaxLength+this.iCreatedContexts}return this.aContexts.length?this.aContexts.length+10:0};P.prototype.getOrderby=function(e){var t=[],i=this;this.aSorters.forEach(function(e){if(e instanceof C){t.push(e.sPath+(e.bDescending?" desc":""))}else{throw new Error("Unsupported sorter: "+e+" - "+i)}});if(e){t.push(e)}return t.join(",")};P.prototype.getQueryOptions=function(e){var t={},i=this;if(e){throw new Error("Unsupported parameter value: bWithSystemQueryOptions: "+e)}Object.keys(this.mQueryOptions).forEach(function(e){if(e[0]!=="$"){t[e]=s.clone(i.mQueryOptions[e])}});return t};P.prototype.hasPendingChangesForPath=function(e){if(this.oCache===undefined){return this.iCreatedContexts>0}return t.prototype.hasPendingChangesForPath.apply(this,arguments)};P.prototype.inheritQueryOptions=function(e,t){var i;if(!Object.keys(this.mParameters).length){i=this.getQueryOptionsForPath("",t);if(e.$orderby&&i.$orderby){e.$orderby+=","+i.$orderby}if(e.$filter&&i.$filter){e.$filter="("+e.$filter+") and ("+i.$filter+")"}e=y.extend({},i,e)}return e};P.prototype.initialize=function(){if((!this.bRelative||this.oContext)&&!this.getRootBinding().isSuspended()){if(this.oModel.bAutoExpandSelect){this._fireChange({detailedReason:this.sChangeReason,reason:f.Change})}else{this.sChangeReason=f.Refresh;this._fireRefresh({reason:f.Refresh})}}};P.prototype.isLengthFinal=function(){return this.bLengthFinal};P.prototype.refreshInternal=function(e,t,i,n){var r=this;function o(){return r.oModel.getDependentBindings(r).map(function(i){return i.refreshInternal(e,t,false,n)})}if(this.isRootBindingSuspended()){this.refreshSuspended(t);return d.all(o())}this.createReadGroupLock(t,this.isRoot());return this.oCachePromise.then(function(t){var i=r.oRefreshPromise;if(t&&!i){r.removeCachesAndMessages(e);r.fetchCache(r.oContext);i=r.createRefreshPromise();if(n){i=i.catch(function(e){return r.fetchResourcePath(r.oContext).then(function(i){if(!r.bRelative||t.$resourcePath===i){r.oCache=t;r.oCachePromise=d.resolve(t);t.setActive(true);r._fireChange({reason:f.Change})}throw e})})}}r.reset(f.Refresh);return d.all(o().concat(i))})};P.prototype.refreshSingle=function(e,t,i){var n=e.getPath().slice(1),r=this;if(e===this.oHeaderContext){throw new Error("Unsupported header context: "+e)}return this.withCache(function(o,s,a){var h=false,u=[],c=false;function l(e){if(h){r.fireDataReceived(e)}}function p(){h=true;r.fireDataRequested()}function g(){var t,i;if(e.created()){r.destroyCreated(e)}else{i=e.getModelIndex();r.aContexts.splice(i,1);for(t=i;t<r.aContexts.length;t+=1){if(r.aContexts[t]){r.aContexts[t].iIndex-=1}}e.destroy();r.iMaxLength-=1}c=true;r._fireChange({reason:f.Remove})}u.push((i?o.refreshSingleWithRemove(t,s,e.getModelIndex(),p,g):o.refreshSingle(t,s,e.getModelIndex(),p)).then(function(o){var s=[];l({data:{}});if(!c){s.push(e.checkUpdate());if(i){s.push(r.refreshDependentBindings(n,t.getGroupId()))}}return d.all(s).then(function(){return o})},function(e){l({error:e});throw e}).catch(function(i){t.unlock(true);r.oModel.reportError("Failed to refresh entity: "+e,v,i)}));if(!i){u.push(r.refreshDependentBindings(n,t.getGroupId()))}return d.all(u).then(function(e){return e[0]})})};P.prototype.requestContexts=function(e,t,i){var n=this;if(this.bRelative&&!this.oContext){throw new Error("Unresolved binding: "+this.sPath)}this.checkSuspended();this.oModel.checkGroupId(i);e=e||0;t=t||this.oModel.iSizeLimit;return Promise.resolve(this.fetchContexts(e,t,0,this.lockGroup(i,true))).then(function(i){if(i){n._fireChange({reason:f.Change})}return n.getContextsInViewOrder(e,t)},function(i){n.oModel.reportError("Failed to get contexts for "+n.oModel.sServiceUrl+n.oModel.resolve(n.sPath,n.oContext).slice(1)+" with start index "+e+" and length "+t,v,i);throw i})};P.prototype.requestDownloadUrl=s.createRequestMethod("fetchDownloadUrl");P.prototype.requestSideEffects=function(e,t,i){var n,r=this.oModel,o={},s,a,h=i&&i!==this.oHeaderContext;function u(e){return e.catch(function(e){r.reportError("Failed to request side effects",v,e);throw e})}if(t.indexOf("")<0){s=this.oCache.requestSideEffects(this.lockGroup(e),t,o,h?i.getModelIndex():this.iCurrentBegin,h?undefined:this.iCurrentEnd-this.iCurrentBegin);if(s){a=[s];this.visitSideEffects(e,t,h?i:undefined,o,a);return d.all(a.map(u))}}if(h){return this.refreshSingle(i,this.lockGroup(e),false)}if(this.aContexts.length){n=this.aContexts.every(function(e){return e.isTransient()});if(n){return d.resolve()}}return this.refreshInternal("",e,false,true)};P.prototype.reset=function(e){var t=this.iCurrentEnd===0,i=this;if(this.aContexts){this.aContexts.forEach(function(e){i.mPreviousContextsByPath[e.getPath()]=e})}this.aContexts=[];this.iCreatedContexts=0;this.bCreatedAtEnd=undefined;this.iCurrentBegin=this.iCurrentEnd=0;this.iMaxLength=Infinity;this.bLengthFinal=false;if(e&&!(t&&e===f.Change)){this.sChangeReason=e;this._fireRefresh({reason:e})}if(this.getHeaderContext()){this.oModel.getDependentBindings(this.oHeaderContext).forEach(function(e){e.checkUpdate()})}};P.prototype.resumeInternal=function(){var e=this.getDependentBindings(),t=this.sResumeChangeReason;this.sResumeChangeReason=f.Change;this.removeCachesAndMessages("");this.reset();this.fetchCache(this.oContext);e.forEach(function(e){e.resumeInternal(false)});if(this.sChangeReason==="AddVirtualContext"){this._fireChange({detailedReason:this.sChangeReason,reason:t})}else{this._fireRefresh({reason:t})}this.oModel.getDependentBindings(this.oHeaderContext).forEach(function(e){e.checkUpdate()})};P.prototype.setAggregation=function(e){if(this.hasPendingChanges()){throw new Error("Cannot set $$aggregation due to pending changes")}if(!this.oAggregation&&"$apply"in this.mQueryOptions){throw new Error("Cannot override existing $apply : '"+this.mQueryOptions.$apply+"'")}e=s.clone(e);this.mQueryOptions.$apply=n.buildApply(e).$apply;this.oAggregation=e;if(this.isRootBindingSuspended()){this.setResumeChangeReason(f.Change);return}this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.reset(f.Change)};P.prototype.setContext=function(t){var i,n,r=this;if(this.oContext!==t){if(this.bRelative){for(i=0;i<r.iCreatedContexts;i+=1){if(r.aContexts[i].isTransient()){throw new Error("setContext on relative binding is forbidden if a "+"transient entity exists: "+r)}}this.reset();this.fetchCache(t);if(t){n=this.oModel.resolve(this.sPath,t);if(this.oHeaderContext&&this.oHeaderContext.getPath()!==n){this.oHeaderContext.destroy();this.oHeaderContext=null}if(!this.oHeaderContext){this.oHeaderContext=e.create(this.oModel,this,n)}}u.prototype.setContext.call(this,t)}else{this.oContext=t}}};P.prototype.sort=function(e){if(this.sOperationMode!==x.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server")}if(this.hasPendingChanges()){throw new Error("Cannot sort due to pending changes")}this.aSorters=s.toArray(e);if(this.isRootBindingSuspended()){this.setResumeChangeReason(f.Sort);return this}this.removeCachesAndMessages("");this.createReadGroupLock(this.getGroupId(),true);this.fetchCache(this.oContext);this.reset(f.Sort);return this};P.prototype.updateAnalyticalInfo=function(e){var t={aggregate:{},group:{}},i=false,r=this;e.forEach(function(e){var n={};if("total"in e){if("grouped"in e){throw new Error("Both dimension and measure: "+e.name)}if(e.as){n.name=e.name;t.aggregate[e.as]=n}else{t.aggregate[e.name]=n}if(e.min){n.min=true;i=true}if(e.max){n.max=true;i=true}if(e.with){n.with=e.with}}else if(!("grouped"in e)||e.inResult||e.visible){t.group[e.name]=n}});this.oAggregation=t;this.changeParameters(n.buildApply(t));this.bHasAnalyticalInfo=true;if(i){return{measureRangePromise:Promise.resolve(this.getRootBindingResumePromise().then(function(){return r.oCachePromise}).then(function(e){return e.getMeasureRangePromise()}))}}};return P});