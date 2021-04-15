/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/IconPool"],function(t,e){"use strict";var a=t.getLibraryResourceBundle("sap.ui.layout");var i={apiVersion:2};e.insertFontFaceStyle();i.render=function(t,e){t.openStart("div",e).class("sapUiResponsiveSplitter").style("width",e.getWidth()).style("height",e.getHeight()).openEnd();var a=e.getAggregation("_pages");if(a){a.forEach(t.renderControl,t);this.renderPaginator(t,e)}t.close("div")};i.renderPaginator=function(t,e){var i=e._getMaxPageCount(),n=e.getAggregation("_pages")||[];t.openStart("div").attr("role","navigation").class("sapUiResponsiveSplitterPaginator").openEnd();t.openStart("div").class("sapUiResponsiveSplitterPaginatorNavButton").class("sapUiResponsiveSplitterHiddenPaginatorButton").class("sapUiResponsiveSplitterPaginatorButtonBack").openEnd().close("div");t.openStart("div").class("sapUiResponsiveSplitterPaginatorButtons").attr("role","radiogroup").attr("aria-label",a.getText("RESPONSIVE_SPLITTER_ARIA_PAGINATOR_LABEL"));if(n.length>0){t.attr("aria-controls",n[0].getParent().getId())}t.openEnd();for(var s=0;s<i;s++){t.openStart("div").attr("tabindex",0).attr("page-index",s);if(s===0){t.class("sapUiResponsiveSplitterPaginatorSelectedButton")}t.class("sapUiResponsiveSplitterHiddenElement").class("sapUiResponsiveSplitterPaginatorButton").attr("role","radio").attr("aria-checked",false).openEnd().close("div")}t.close("div");t.openStart("div").class("sapUiResponsiveSplitterPaginatorNavButton").class("sapUiResponsiveSplitterHiddenPaginatorButton").class("sapUiResponsiveSplitterPaginatorButtonForward").openEnd().close("div");t.close("div")};return i},true);