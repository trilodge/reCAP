/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./UniversalDate","../CalendarType"],function(e,t){"use strict";var a=e.extend("sap.ui.core.date.Japanese",{constructor:function(){var e=arguments;if(e.length>1){e=o(e)}this.oDate=this.createDate(Date,e);this.sCalendarType=t.Japanese}});a.UTC=function(){var e=o(arguments);return Date.UTC.apply(Date,e)};a.now=function(){return Date.now()};function n(a){var n=e.getEraByDate(t.Japanese,a.year,a.month,a.day),r=e.getEraStartDate(t.Japanese,n).year;return{era:n,year:a.year-r+1,month:a.month,day:a.day}}function r(a){var n=e.getEraStartDate(t.Japanese,a.era).year;return{year:n+a.year-1,month:a.month,day:a.day}}function o(a){var n,o,i,s=a[0];if(typeof s=="number"){if(s>=100){return a}else{i=e.getCurrentEra(t.Japanese);s=[i,s]}}else if(!Array.isArray(s)){s=[]}n={era:s[0],year:s[1],month:a[1],day:a[2]!==undefined?a[2]:1};o=r(n);a[0]=o.year;return a}a.prototype._getJapanese=function(){var e={year:this.oDate.getFullYear(),month:this.oDate.getMonth(),day:this.oDate.getDate()};return n(e)};a.prototype._setJapanese=function(e){var t=r(e);return this.oDate.setFullYear(t.year,t.month,t.day)};a.prototype._getUTCJapanese=function(){var e={year:this.oDate.getUTCFullYear(),month:this.oDate.getUTCMonth(),day:this.oDate.getUTCDate()};return n(e)};a.prototype._setUTCJapanese=function(e){var t=r(e);return this.oDate.setUTCFullYear(t.year,t.month,t.day)};a.prototype.getYear=function(){return this._getJapanese().year};a.prototype.getFullYear=function(){return this._getJapanese().year};a.prototype.getEra=function(){return this._getJapanese().era};a.prototype.getUTCFullYear=function(){return this._getUTCJapanese().year};a.prototype.getUTCEra=function(){return this._getUTCJapanese().era};a.prototype.setYear=function(e){var t=this._getJapanese();t.year=e;return this._setJapanese(t)};a.prototype.setFullYear=function(e,t,a){var n=this._getJapanese();n.year=e;if(t!==undefined){n.month=t}if(a!==undefined){n.day=a}return this._setJapanese(n)};a.prototype.setEra=function(a,r,o,i){var s=e.getEraStartDate(t.Japanese,a),u=n(s);if(r!==undefined){u.year=r}if(o!==undefined){u.month=o}if(i!==undefined){u.day=i}return this._setJapanese(u)};a.prototype.setUTCFullYear=function(e,t,a){var n=this._getUTCJapanese();n.year=e;if(t!==undefined){n.month=t}if(a!==undefined){n.day=a}return this._setUTCJapanese(n)};a.prototype.setUTCEra=function(a,r,o,i){var s=e.getEraStartDate(t.Japanese,a),u=n(s);if(r!==undefined){u.year=r}if(o!==undefined){u.month=o}if(i!==undefined){u.day=i}return this._setUTCJapanese(u)};a.prototype.getWeek=function(){return e.getWeekByDate(this.sCalendarType,this.oDate.getFullYear(),this.getMonth(),this.getDate())};a.prototype.getUTCWeek=function(){return e.getWeekByDate(this.sCalendarType,this.oDate.getUTCFullYear(),this.getUTCMonth(),this.getUTCDate())};return a});