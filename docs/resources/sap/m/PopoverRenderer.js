/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/m/library","sap/ui/dom/getScrollbarSize"],function(e,t,o){"use strict";var a=t.PlacementType;var s={apiVersion:2};s.render=function(e,t){e.openStart("div",t);var o=this.generateRootClasses(t);o.forEach(function(t){e.class(t)});if(!t.getHorizontalScrolling()){e.class("sapMPopoverHorScrollDisabled")}if(!t.getVerticalScrolling()){e.class("sapMPopoverVerScrollDisabled")}var a=t.getTooltip_AsString();if(a){e.attr("title",a)}e.attr("tabindex","-1").accessibilityState(t,t._getAccessibilityOptions()).openEnd();if(t.getResizable()){e.icon("sap-icon://resize-corner",["sapMPopoverResizeHandle"],{title:""})}this.renderContent(e,t);e.close("div")};s.isButtonFooter=function(e){if(e instanceof sap.m.Bar){var t=e.getContentLeft(),o=e.getContentRight(),a=e.getContentMiddle(),s=!t||t.length===0,r=!o||o.length===0,n=false;if(a&&a.length===2){if(a[0]instanceof sap.m.Button&&a[1]instanceof sap.m.Button){n=true}}return s&&r&&n}else{return false}};s.renderContent=function(t,a){var s=a._getAnyHeader(),r=a.getId(),n=0,i=a._getAllContent(),p=a.getFooter(),l=a.getSubHeader(),c=a.getContentWidth(),d=a.getContentMinWidth(),g=a.getContentHeight();if(e.system.desktop){t.openStart("span",a.getId()+"-firstfe").class("sapMPopoverHiddenFocusable").attr("tabindex","0").openEnd().close("span")}if(s){t.openStart("header").class("sapMPopoverHeader").openEnd();if(s._applyContextClassFor){s._applyContextClassFor("header")}t.renderControl(s);t.close("header")}if(l){t.openStart("header").class("sapMPopoverSubHeader").openEnd();if(l._applyContextClassFor){l._applyContextClassFor("subheader")}t.renderControl(l);t.close("header")}t.openStart("div",r+"-cont");if(c){t.style("width",c)}if(d){t.style("min-width",d)}if(g){t.style("height",g)}t.class("sapMPopoverCont");if(sap.ui.getCore().getConfiguration().getAccessibility()&&a.getProperty("ariaRoleApplication")){t.attr("role","application")}t.openEnd();t.openStart("div",a.getId()+"-scroll").class("sapMPopoverScroll");if(!a.getHorizontalScrolling()){t.style(sap.ui.getCore().getConfiguration().getRTL()?"margin-left":"margin-right",o().width+"px")}t.openEnd();for(n=0;n<i.length;n++){t.renderControl(i[n])}t.close("div");t.close("div");if(p){t.openStart("footer").class("sapMPopoverFooter");if(this.isButtonFooter(p)){t.class("sapMPopoverSpecialFooter")}t.openEnd();if(p._applyContextClassFor){p._applyContextClassFor("footer");p.addStyleClass("sapMTBNoBorders")}t.renderControl(p);t.close("footer")}if(a.getShowArrow()){t.openStart("span",r+"-arrow").class("sapMPopoverArr").openEnd().close("span")}if(e.system.desktop){t.openStart("span",a.getId()+"-middlefe").class("sapMPopoverHiddenFocusable").attr("tabindex","-1").openEnd().close("span");t.openStart("span",a.getId()+"-lastfe").class("sapMPopoverHiddenFocusable").attr("tabindex","0").openEnd().close("span")}};s.generateRootClasses=function(e){var t=["sapMPopover"],o=e.getSubHeader(),s=e.getFooter(),r=e.getVerticalScrolling()&&!e._forceDisableScrolling,n=e.getHorizontalScrolling()&&!e._forceDisableScrolling,i=e._getAnyHeader();if(i){t.push("sapMPopoverWithBar")}else{t.push("sapMPopoverWithoutBar")}if(o){t.push("sapMPopoverWithSubHeader")}else{t.push("sapMPopoverWithoutSubHeader")}if(e._hasSingleNavContent()){t.push("sapMPopoverNav")}if(e._hasSinglePageContent()){t.push("sapMPopoverPage")}if(s){t.push("sapMPopoverWithFooter")}else{t.push("sapMPopoverWithoutFooter")}if(e.getPlacement()===a.Top){t.push("sapMPopoverPlacedTop")}if(!r){t.push("sapMPopoverVerScrollDisabled")}if(!n){t.push("sapMPopoverHorScrollDisabled")}t.push("sapMPopup-CTX");if(e._bSizeCompact){t.push("sapUiSizeCompact")}return t.concat(e.aCustomStyleClasses)};return s},true);