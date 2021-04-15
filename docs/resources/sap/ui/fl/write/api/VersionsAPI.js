/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/write/_internal/Versions","sap/ui/fl/Utils","sap/ui/fl/apply/_internal/flexState/ManifestUtils"],function(e,r,n,t){"use strict";function o(e){var r;if(e){var n=e.getManifest();r=t.getFlexReference({manifest:n,componentData:e.getComponentData()})}if(!r){throw Error("The application ID could not be determined")}return r}function i(e){if(!e.selector){throw Error("No selector was provided")}if(!e.layer){throw Error("No layer was provided")}var t=n.getAppComponentForControl(e.selector);return r.getVersionsModel({reference:n.normalizeReference(o(t)),layer:e.layer})}var a={};a.initialize=function(e){if(!e.selector){return Promise.reject("No selector was provided")}if(!e.layer){return Promise.reject("No layer was provided")}var t=n.getAppComponentForControl(e.selector);return r.initialize({reference:n.normalizeReference(o(t)),layer:e.layer})};a.isDraftAvailable=function(e){var r=i(e);var n=r.getProperty("/versions");var t=n.find(function(e){return e.version===sap.ui.fl.Versions.Draft});return!!t};a.isOldVersionDisplayed=function(e){var r=i(e);var n=r.getProperty("/displayedVersion");var t=r.getProperty("/activeVersion");return n!==sap.ui.fl.Versions.Draft&&n!==t};a.loadDraftForApplication=function(e){e.version=sap.ui.fl.Versions.Draft;return a.loadVersionForApplication(e)};a.loadVersionForApplication=function(r){if(!r.selector){return Promise.reject("No selector was provided")}if(!r.layer){return Promise.reject("No layer was provided")}if(r.version===undefined){var t=i(r);if(t){r.version=t.getProperty("/activeVersion")}}var a=n.getAppComponentForControl(r.selector);return Promise.resolve().then(o.bind(undefined,a)).then(function(n){return e.clearAndInitialize({componentId:a.getId(),reference:n,version:r.version})})};a.activate=function(e){if(!e.selector){return Promise.reject("No selector was provided")}if(!e.layer){return Promise.reject("No layer was provided")}if(!e.title){return Promise.reject("No version title was provided")}var t=n.getAppComponentForControl(e.selector);return Promise.resolve().then(o.bind(undefined,t)).then(function(o){return r.activate({nonNormalizedReference:o,reference:n.normalizeReference(o),layer:e.layer,title:e.title,appComponent:t})})};a.discardDraft=function(t){if(!t.selector){return Promise.reject("No selector was provided")}if(!t.layer){return Promise.reject("No layer was provided")}var i=n.getAppComponentForControl(t.selector);return Promise.resolve().then(o.bind(undefined,i)).then(function(o){return r.discardDraft({nonNormalizedReference:o,reference:n.normalizeReference(o),layer:t.layer}).then(function(r){if(r.backendChangesDiscarded){e.clearAndInitialize({componentId:i.getId(),reference:o})}return r})})};return a});