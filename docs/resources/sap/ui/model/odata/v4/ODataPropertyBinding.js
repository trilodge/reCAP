/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataBinding","./lib/_Cache","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ChangeReason","sap/ui/model/odata/v4/Context","sap/ui/model/PropertyBinding"],function(e,t,o,n,i,r,s,a,h){"use strict";var u="sap.ui.model.odata.v4.ODataPropertyBinding",d=Object.freeze([]),p={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true};var l=h.extend("sap.ui.model.odata.v4.ODataPropertyBinding",{constructor:function(t,o,n,i){h.call(this,t,o);e.call(this);if(o.slice(-1)==="/"){throw new Error("Invalid path: "+o)}if(i){this.checkBindingParameters(i,["$$groupId"]);this.sGroupId=i.$$groupId}else{this.sGroupId=undefined}this.oCheckUpdateCallToken=undefined;this.mQueryOptions=this.oModel.buildQueryOptions(i,false);this.fetchCache(n);this.oContext=n;this.bHasDeclaredType=undefined;this.bInitial=true;this.vValue=undefined;t.bindingCreated(this)},metadata:{publicMethods:[]}});e(l.prototype);l.prototype.adjustPredicate=function(){};l.prototype.attachEvent=function(e){if(!(e in p)){throw new Error("Unsupported event '"+e+"': v4.ODataPropertyBinding#attachEvent")}return h.prototype.attachEvent.apply(this,arguments)};l.prototype.checkUpdateInternal=function(e,t,h,d){var p=false,l=this.sPath.indexOf("##"),f=l>=0,c=this.oModel.getMetaModel(),y={data:{}},g=this.oModel.resolve(this.sPath,this.oContext),C={forceUpdate:g&&(e||this.oCheckUpdateCallToken&&this.oCheckUpdateCallToken.forceUpdate)},v=this.oType,I=this;this.oCheckUpdateCallToken=C;if(this.bHasDeclaredType===undefined){this.bHasDeclaredType=!!v}if(g&&!this.bHasDeclaredType&&this.sInternalType!=="any"&&!f){v=c.fetchUI5Type(g)}if(arguments.length<4){d=this.oCachePromise.then(function(e){var t,o;if(e){return e.fetchValue(I.lockGroup(h||I.getGroupId()),undefined,function(){p=true;I.fireDataRequested()},I)}if(!I.sReducedPath||I.bRelative&&!I.oContext){return undefined}if(I.bRelative&&I.oContext.iIndex===a.VIRTUAL){C.forceUpdate=false}if(!f){return I.oContext.fetchValue(I.sReducedPath,I)}t=I.sPath.slice(0,l);o=I.sPath.slice(l+2);if(o[0]==="/"){o="."+o}return c.fetchObject(o,c.getMetaContext(I.oModel.resolve(t,I.oContext)))}).then(function(e){if(!e||typeof e!=="object"){return e}if(I.sInternalType==="any"&&(I.getBindingMode()===r.OneTime||I.sPath[I.sPath.lastIndexOf("/")+1]==="#"&&!f)){if(f){return e}else if(I.bRelative){return o.publicClone(e)}}n.error("Accessed value is not primitive",g,u)},function(e){I.oModel.reportError("Failed to read path "+g,u,e);if(e.canceled){C.forceUpdate=false;return I.vValue}y={error:e}});if(e&&d.isFulfilled()){if(v&&v.isFulfilled&&v.isFulfilled()){this.setType(v.getResult(),this.sInternalType)}this.vValue=d.getResult()}d=Promise.resolve(d)}return i.all([d,v]).then(function(e){var o=e[1],n=e[0];if(C===I.oCheckUpdateCallToken){I.oCheckUpdateCallToken=undefined;I.setType(o,I.sInternalType);if(C.forceUpdate||I.vValue!==n){I.bInitial=false;I.vValue=n;I._fireChange({reason:t||s.Change})}I.checkDataState()}if(p){I.fireDataReceived(y)}})};l.prototype.deregisterChange=function(){var e=this;this.withCache(function(t,o,n){n.doDeregisterChangeListener(o,e)}).catch(function(t){e.oModel.reportError("Error in deregisterChange",u,t)},"",false,true)};l.prototype.destroy=function(){this.deregisterChange();this.oModel.bindingDestroyed(this);this.oCheckUpdateCallToken=undefined;this.mQueryOptions=undefined;this.vValue=undefined;e.prototype.destroy.call(this);h.prototype.destroy.apply(this,arguments)};l.prototype.doCreateCache=function(e,o){return t.createProperty(this.oModel.oRequestor,e,o)};l.prototype.doFetchQueryOptions=function(){return this.isRoot()?i.resolve(this.mQueryOptions):i.resolve({})};l.prototype.getDependentBindings=function(){return d};l.prototype.getResumePromise=function(){};l.prototype.getValue=function(){return this.vValue};l.prototype.requestValue=function(){var e=this;return Promise.resolve(this.checkUpdateInternal().then(function(){return e.getValue()}))};l.prototype.getValueListType=function(){var e=this.getModel().resolve(this.sPath,this.oContext);if(!e){throw new Error(this+" is not resolved yet")}return this.getModel().getMetaModel().getValueListType(e)};l.prototype.hasPendingChangesInDependents=function(){return false};l.prototype.isMeta=function(){return this.sPath.includes("##")};l.prototype.onChange=function(e){this.checkUpdateInternal(undefined,undefined,undefined,e)};l.prototype.refreshInternal=function(e,t,o){if(this.isRootBindingSuspended()){this.sResumeChangeReason=s.Refresh;return i.resolve()}this.fetchCache(this.oContext);return o?this.checkUpdateInternal(false,s.Refresh,t):i.resolve()};l.prototype.requestValueListInfo=function(e){var t=this.getModel().resolve(this.sPath,this.oContext);if(!t){throw new Error(this+" is not resolved yet")}return this.getModel().getMetaModel().requestValueListInfo(t,e)};l.prototype.requestValueListType=function(){var e=this.getModel().resolve(this.sPath,this.oContext);if(!e){throw new Error(this+" is not resolved yet")}return this.getModel().getMetaModel().requestValueListType(e)};l.prototype.resetChangesInDependents=function(){};l.prototype.resetInvalidDataState=function(){if(this.getDataState().isControlDirty()){this._fireChange({reason:s.Change})}};l.prototype.resume=function(){throw new Error("Unsupported operation: resume")};l.prototype.resumeInternal=function(e){this.fetchCache(this.oContext);if(e){this.checkUpdateInternal(false,this.sResumeChangeReason)}this.sResumeChangeReason=s.Change};l.prototype.setContext=function(e){if(this.oContext!==e){if(this.bRelative){this.deregisterChange()}this.oContext=e;if(this.bRelative){this.fetchCache(this.oContext);this.checkUpdateInternal(false,s.Context)}}};l.prototype.setType=function(e){var t=this.oType;if(e&&e.getName()==="sap.ui.model.odata.type.DateTimeOffset"){e.setV4()}h.prototype.setType.apply(this,arguments);if(!this.bInitial&&t!==e){this._fireChange({reason:s.Change})}};l.prototype.setValue=function(e,t){var o,n=this;function i(e){n.oModel.reportError("Failed to update path "+n.oModel.resolve(n.sPath,n.oContext),u,e);return e}this.checkSuspended();this.oModel.checkGroupId(t);if(typeof e==="function"||e&&typeof e==="object"){throw i(new Error("Not a primitive value"))}if(this.vValue===undefined){throw i(new Error("Must not change a property before it has been read"))}if(this.vValue!==e){if(this.oCache){i(new Error("Cannot set value on this binding as it is not relative"+" to a sap.ui.model.odata.v4.Context"));return}o=this.lockGroup(t||this.getUpdateGroupId(),true,true);this.oContext.doSetProperty(this.sPath,e,o).catch(function(e){o.unlock(true);i(e)})}};l.prototype.suspend=function(){throw new Error("Unsupported operation: suspend")};l.prototype.visitSideEffects=function(){};return l});