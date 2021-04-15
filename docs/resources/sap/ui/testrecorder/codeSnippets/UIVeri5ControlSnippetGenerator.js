/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/testrecorder/codeSnippets/ControlSnippetGenerator","sap/ui/testrecorder/interaction/Commands"],function(e,t){"use strict";var r=e.extend("sap.ui.testrecorder.codeSnippets.UIVeri5ControlSnippetGenerator",{});r.prototype._generate=function(e){var t="element(by.control("+this._getSelectorAsString(e.controlSelector)+"))";var r=this._getSelectorWithAssertion(t,e.assertion);return r+this._getActionAsString(e.action)+";"};r.prototype._getActionAsString=function(e){switch(e){case t.PRESS:return".click()";case t.ENTER_TEXT:return'.sendKeys("test")';default:return""}};r.prototype._getSelectorWithAssertion=function(e,t){if(t){var r;if(!t.expectedValue||t.expectedValue==="false"){r=".toBeFalsy()"}else if(t.propertyType==="boolean"){r=".toBeTruthy()"}else{r='.toEqual("'+t.expectedValue+'")'}return"expect("+e+'.asControl().getProperty("'+t.propertyName+'"))'+r}else{return e}};return new r});