/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool"],function(t){"use strict";t.insertFontFaceStyle();var e={apiVersion:2};e.writeAccessibilityState=function(t,e){var o={role:"button",controls:e.getParent().sId+"-cont",keyshortcuts:"F5",describedby:e._sAriaF5Text};t.accessibilityState(e,o)};e.render=function(t,e){var o=e.getShowIcon();var n=e.getCustomIcon();var s=e.getTooltip_AsString();var a=e._getRB();t.openStart("div",e);t.class("sapMPullDown");t.class(!e._bTouchMode?"sapMPullDownNontouch":"sapMPullDownTouch");if(o&&!n){t.class("sapMPullDownLogo")}if(s){t.attr("title",s)}t.attr("tabindex",0);this.writeAccessibilityState(t,e);t.openEnd();if(o&&n){var l=e.getCustomIconImage();if(l){t.openStart("div").class("sapMPullDownCI").openEnd();t.renderControl(l);t.close("div")}}t.openStart("span").class("sapMPullDownIcon").openEnd().close("span");t.openStart("span").class("sapMPullDownBusy").openEnd();t.renderControl(e._oBusyIndicator);t.close("span");t.openStart("span",e.getId()+"-T");t.class("sapMPullDownText");t.attr("aria-live","assertive");t.openEnd();t.text(a.getText(e._bTouchMode?"PULL2REFRESH_PULLDOWN":"PULL2REFRESH_REFRESH"));t.close("span");t.openStart("span",e.getId()+"-I");t.class("sapMPullDownInfo");t.openEnd();t.text(e.getDescription());t.close("span");t.close("div")};return e},true);