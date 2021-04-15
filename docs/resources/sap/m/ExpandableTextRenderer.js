/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","sap/m/HyphenationSupport","./library"],function(e,t,a,n){"use strict";var r=t.TextDirection;var s=n.WrappingType;var i={apiVersion:2};i.render=function(t,n){var i=n._getDisplayedText(),p=n.getTextDirection(),o=n.getTooltip_AsString(),l=n.getWrappingType(),d=n.getTextAlign(),g=n.getRenderWhitespace(),x=n._isExpandable(),c=n.getProperty("expanded"),T=c?"&nbsp;&nbsp;":" ... ";t.openStart("div",n);t.class("sapMExText");t.class("sapUiSelectable");if(l!==s.Hyphenated){if(i&&i.length>0&&!/\s/.test(i)){t.class("sapMExTextBreakWord")}}t.attr("dir",p!==r.Inherit?p.toLowerCase():"auto");if(o){t.attr("title",o)}if(d){d=e.getTextAlign(d,p);if(d){t.style("text-align",d)}}if(g){t.class("sapMExTextRenderWhitespaceWrap")}a.writeHyphenationClass(t,n);t.openEnd();t.openStart("span",n.getId()+"-string");t.class("sapMExTextString");t.openEnd();t.text(a.getTextForRender(n,"main"));t.close("span");if(x){t.openStart("span");t.class("sapMExTextEllipsis");t.openEnd();t.unsafeHtml(T);t.close("span");t.renderControl(n._getShowMoreLink())}t.close("div")};return i},true);