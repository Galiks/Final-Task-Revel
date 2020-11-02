/*
@license
Webix <%= pkg.productName %> v.<%= pkg.version %>
This software is covered by Webix Trial License.
Usage without proper license is prohibited.
(c) XB Software Ltd.
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).query={})}(this,(function(t){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */var e=function(t,i){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,i)};function i(t,i){function r(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}var r=function(){return(r=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)},n=function(){},o=function(){function t(t,e){this.webixJet=!0,this.webix=t,this._events=[],this._subs={},this._data={},e&&e.params&&t.extend(this._data,e.params)}return t.prototype.getRoot=function(){return this._root},t.prototype.destructor=function(){this._detachEvents(),this._destroySubs(),this._events=this._container=this.app=this._parent=this._root=null},t.prototype.setParam=function(t,e,i){if(this._data[t]!==e&&(this._data[t]=e,this._segment.update(t,e,0),i))return this.show(null)},t.prototype.getParam=function(t,e){var i=this._data[t];if(void 0!==i||!e)return i;var r=this.getParentView();return r?r.getParam(t,e):void 0},t.prototype.getUrl=function(){return this._segment.suburl()},t.prototype.getUrlString=function(){return this._segment.toString()},t.prototype.getParentView=function(){return this._parent},t.prototype.$$=function(t){if("string"==typeof t){var e=this.getRoot();return e.queryView((function(i){return(i.config.id===t||i.config.localId===t)&&i.$scope===e.$scope}),"self")}return t},t.prototype.on=function(t,e,i){var r=t.attachEvent(e,i);return this._events.push({obj:t,id:r}),r},t.prototype.contains=function(t){for(var e in this._subs){var i=this._subs[e].view;if(i===t||i.contains(t))return!0}return!1},t.prototype.getSubView=function(t){var e=this.getSubViewInfo(t);if(e)return e.subview.view},t.prototype.getSubViewInfo=function(t){var e=this._subs[t||"default"];return e?{subview:e,parent:this}:"_top"===t?(this._subs[t]={url:"",id:null,popup:!0},this.getSubViewInfo(t)):this._parent?this._parent.getSubViewInfo(t):null},t.prototype._detachEvents=function(){for(var t=this._events,e=t.length-1;e>=0;e--)t[e].obj.detachEvent(t[e].id)},t.prototype._destroySubs=function(){for(var t in this._subs){var e=this._subs[t].view;e&&e.destructor()}this._subs={}},t.prototype._init_url_data=function(){var t=this._segment.current();this._data={},this.webix.extend(this._data,t.params,!0)},t.prototype._getDefaultSub=function(){if(this._subs.default)return this._subs.default;for(var t in this._subs){var e=this._subs[t];if(!e.branch&&e.view&&"_top"!==t){var i=e.view._getDefaultSub();if(i)return i}}},t.prototype._routed_view=function(){var t=this.getParentView();if(!t)return!0;var e=t._getDefaultSub();return!(!e&&e!==this)&&t._routed_view()},t}();function s(t){"/"===t[0]&&(t=t.substr(1));for(var e=t.split("/"),i=[],r=0;r<e.length;r++){var n=e[r],o={},s=n.indexOf(":");if(-1===s&&(s=n.indexOf("?")),-1!==s)for(var u=0,a=n.substr(s+1).split(/[\:\?\&]/g);u<a.length;u++){var p=a[u].split("=");o[p[0]]=decodeURIComponent(p[1])}i[r]={page:s>-1?n.substr(0,s):n,params:o,isNew:!0}}return i}function u(t){for(var e=[],i=0,r=t;i<r.length;i++){var n=r[i];e.push("/"+n.page);var o=a(n.params);o&&e.push("?"+o)}return e.join("")}function a(t){var e=[];for(var i in t)"object"!=typeof t[i]&&(e.length&&e.push("&"),e.push(i+"="+encodeURIComponent(t[i])));return e.join("")}var p=function(){function t(t,e){this._next=1,this.route="string"==typeof t?{url:s(t),path:t}:t,this.index=e}return t.prototype.current=function(){return this.route.url[this.index]},t.prototype.next=function(){return this.route.url[this.index+this._next]},t.prototype.suburl=function(){return this.route.url.slice(this.index)},t.prototype.shift=function(e){var i=new t(this.route,this.index+this._next);return i.setParams(i.route.url,e,i.index),i},t.prototype.setParams=function(t,e,i){if(e){var r=t[i].params;for(var n in e)r[n]=e[n]}},t.prototype.refresh=function(){for(var t=this.route.url,e=this.index+1;e<t.length;e++)t[e].isNew=!0},t.prototype.toString=function(){var t=u(this.suburl());return t?t.substr(1):""},t.prototype._join=function(t,e){var i=this.route.url;if(null===t)return i;var r=this.route.url,n=!0;if(i=r.slice(0,this.index+(e?this._next:0)),t){i=i.concat(s(t));for(var o=0;o<i.length;o++)r[o]&&(i[o].view=r[o].view),n&&r[o]&&i[o].page===r[o].page?i[o].isNew=!1:i[o].isNew&&(n=!1)}return i},t.prototype.append=function(t){var e=this._join(t,!0);return this.route.path=u(e),this.route.url=e,this.route.path},t.prototype.show=function(t,e,i){var r=this,o=this._join(t.url,i);return this.setParams(o,t.params,this.index+(i?this._next:0)),new Promise((function(t,i){var s=u(o),a={url:o,redirect:s,confirm:Promise.resolve()},p=e?e.app:null;if(p&&!p.callEvent("app:guard",[a.redirect,e,a]))return void i(new n);a.confirm.catch((function(t){return i(t)})).then((function(){if(null!==a.redirect){if(a.redirect!==s)return p.show(a.redirect),void i(new n);r.route.path=s,r.route.url=o,t()}else i(new n)}))}))},t.prototype.size=function(t){this._next=t},t.prototype.split=function(){var e={url:this.route.url.slice(this.index+1),path:""};return e.url.length&&(e.path=u(e.url)),new t(e,0)},t.prototype.update=function(t,e,i){var r=this.route.url[this.index+(i||0)];if(!r)return this.route.url.push({page:"",params:{}}),this.update(t,e,i);""===t?r.page=e:r.params[t]=e,this.route.path=u(this.route.url)},t}(),c=function(t){function e(e,i){var r=t.call(this,e.webix)||this;return r.app=e,r._children=[],r}return i(e,t),e.prototype.ui=function(t,e){var i=(e=e||{}).container||t.container,r=this.app.createView(t);return this._children.push(r),r.render(i,this._segment,this),"object"!=typeof t||t instanceof o?r:r.getRoot()},e.prototype.show=function(t,e){if(e=e||{},"object"==typeof t){for(var i in t)this.setParam(i,t[i]);t=null}else{if("/"===t.substr(0,1))return this.app.show(t,e);if(0===t.indexOf("./")&&(t=t.substr(2)),0===t.indexOf("../")){var r=this.getParentView();return r?r.show(t.substr(3),e):this.app.show("/"+t.substr(3))}var n=this.getSubViewInfo(e.target);if(n){if(n.parent!==this)return n.parent.show(t,e);if(e.target&&"default"!==e.target)return this._renderFrameLock(e.target,n.subview,{url:t,params:e.params})}else if(t)return this.app.show("/"+t,e)}return this._show(this._segment,{url:t,params:e.params},this)},e.prototype._show=function(t,e,i){var r=this;return t.show(e,i,!0).then((function(){return r._init_url_data(),r._urlChange()})).then((function(){t.route.linkRouter&&(r.app.getRouter().set(t.route.path,{silent:!0}),r.app.callEvent("app:route",[t.route.path]))}))},e.prototype.init=function(t,e){},e.prototype.ready=function(t,e){},e.prototype.config=function(){this.app.webix.message("View:Config is not implemented")},e.prototype.urlChange=function(t,e){},e.prototype.destroy=function(){},e.prototype.destructor=function(){this.destroy(),this._destroyKids(),this._root&&(this._root.destructor(),t.prototype.destructor.call(this))},e.prototype.use=function(t,e){t(this.app,this,e)},e.prototype.refresh=function(){this.getUrl();return this.destroy(),this._destroyKids(),this._destroySubs(),this._detachEvents(),this._container.tagName&&this._root.destructor(),this._segment.refresh(),this._render(this._segment)},e.prototype.render=function(t,e,i){var r=this;"string"==typeof e&&(e=new p(e,0)),this._segment=e,this._parent=i,this._init_url_data();var n="string"==typeof(t=t||document.body)?this.webix.toNode(t):t;return this._container!==n?(this._container=n,this._render(e)):this._urlChange().then((function(){return r.getRoot()}))},e.prototype._render=function(t){var e=this,i=this.config();return i.then?i.then((function(i){return e._render_final(i,t)})):this._render_final(i,t)},e.prototype._render_final=function(t,e){var i,r=this,n=null,o=null,s=!1;if(this._container.tagName?o=this._container:(n=this._container).popup?(o=document.body,s=!0):o=this.webix.$$(n.id),!this.app||!o)return Promise.reject(null);var u=this._segment.current(),a={ui:{}};this.app.copyConfig(t,a.ui,this._subs),this.app.callEvent("app:render",[this,e,a]),a.ui.$scope=this,!n&&u.isNew&&u.view&&u.view.destructor();try{if(n&&!s){var p=o,c=p.getParentView();c&&"multiview"===c.name&&!a.ui.id&&(a.ui.id=p.config.id)}this._root=this.app.webix.ui(a.ui,o);var l=this._root;s&&l.setPosition&&!l.isVisible()&&l.show(),n&&(n.view&&n.view!==this&&n.view!==this.app&&n.view.destructor(),n.id=this._root.config.id,this.getParentView()||!this.app.app?n.view=this:n.view=this.app),u.isNew&&(u.view=this,u.isNew=!1),i=Promise.resolve(this._init(this._root,e)).then((function(){return r._urlChange().then((function(){return r._initUrl=null,r.ready(r._root,e.suburl())}))}))}catch(t){i=Promise.reject(t)}return i.catch((function(t){return r._initError(r,t)}))},e.prototype._init=function(t,e){return this.init(t,e.suburl())},e.prototype._urlChange=function(){var t=this;this.app.callEvent("app:urlchange",[this,this._segment]);var e=[];for(var i in this._subs){var r=this._subs[i],n=this._renderFrameLock(i,r,null);n&&e.push(n)}return Promise.all(e).then((function(){return t.urlChange(t._root,t._segment.suburl())}))},e.prototype._renderFrameLock=function(t,e,i){if(!e.lock){var r=this._renderFrame(t,e,i);r&&(e.lock=r.then((function(){return e.lock=null}),(function(){return e.lock=null})))}return e.lock},e.prototype._renderFrame=function(t,e,i){var r=this;if("default"===t){if(this._segment.next()){var n=i?i.params:null;return e.params&&(n=this.webix.extend(n||{},e.params)),this._createSubView(e,this._segment.shift(n))}e.view&&e.popup&&(e.view.destructor(),e.view=null)}if(null!==i&&(e.url=i.url,e.params&&(i.params=this.webix.extend(i.params||{},e.params))),e.route){if(null!==i)return e.route.show(i,e.view).then((function(){return r._createSubView(e,e.route)}));if(e.branch)return}var o=e.view;if(!o&&e.url){if("string"==typeof e.url)return e.route=new p(e.url,0),i&&e.route.setParams(e.route.route.url,i.params,0),e.params&&e.route.setParams(e.route.route.url,e.params,0),this._createSubView(e,e.route);"function"!=typeof e.url||o instanceof e.url||(o=new(this.app._override(e.url))(this.app,"")),o||(o=e.url)}if(o)return o.render(e,e.route||this._segment,this)},e.prototype._initError=function(t,e){return this.app&&this.app.error("app:error:initview",[e,t]),!0},e.prototype._createSubView=function(t,e){var i=this;return this.app.createFromURL(e.current()).then((function(r){return r.render(t,e,i)}))},e.prototype._destroyKids=function(){for(var t=this._children,e=t.length-1;e>=0;e--)t[e]&&t[e].destructor&&t[e].destructor();this._children=[]},e}(o),l=function(t){function e(e,i){var r=t.call(this,e,i)||this;return r._ui=i.ui,r}return i(e,t),e.prototype.config=function(){return this._ui},e}(c),h=function(){function t(t,e,i){this.path="",this.app=i}return t.prototype.set=function(t,e){this.path=t;var i=this.app;i.app.getRouter().set(i._segment.append(this.path),{silent:!0})},t.prototype.get=function(){return this.path},t}(),f=!0,d=function(t){function e(e){var i=this,r=(e||{}).webix||window.webix;return e=r.extend({name:"App",version:"1.0",start:"/home"},e,!0),(i=t.call(this,r,e)||this).config=e,i.app=i.config.app,i.ready=Promise.resolve(),i._services={},i.webix.extend(i,i.webix.EventSystem),i}return i(e,t),e.prototype.getUrl=function(){return this._subSegment.suburl()},e.prototype.getUrlString=function(){return this._subSegment.toString()},e.prototype.getService=function(t){var e=this._services[t];return"function"==typeof e&&(e=this._services[t]=e(this)),e},e.prototype.setService=function(t,e){this._services[t]=e},e.prototype.destructor=function(){this.getSubView().destructor(),t.prototype.destructor.call(this)},e.prototype.copyConfig=function(t,e,i){if((t instanceof o||"function"==typeof t&&t.prototype instanceof o)&&(t={$subview:t}),void 0!==t.$subview)return this.addSubView(t,e,i);var r=t instanceof Array;for(var n in e=e||(r?[]:{}),t){var s=t[n];if("function"==typeof s&&s.prototype instanceof o&&(s={$subview:s}),!s||"object"!=typeof s||s instanceof this.webix.DataCollection||s instanceof RegExp||s instanceof Map)e[n]=s;else if(s instanceof Date)e[n]=new Date(s);else{var u=this.copyConfig(s,s instanceof Array?[]:{},i);null!==u&&(r?e.push(u):e[n]=u)}}return e},e.prototype.getRouter=function(){return this.$router},e.prototype.clickHandler=function(t,e){if(t&&(e=e||t.target||t.srcElement)&&e.getAttribute){var i=e.getAttribute("trigger");if(i)return this._forView(e,(function(t){return t.app.trigger(i)})),t.cancelBubble=!0,t.preventDefault();var r=e.getAttribute("route");if(r)return this._forView(e,(function(t){return t.show(r)})),t.cancelBubble=!0,t.preventDefault()}var n=e.parentNode;n&&this.clickHandler(t,n)},e.prototype.getRoot=function(){return this.getSubView().getRoot()},e.prototype.refresh=function(){var t=this;return this._subSegment?this.getSubView().refresh().then((function(e){return t.callEvent("app:route",[t.getUrl()]),e})):Promise.resolve(null)},e.prototype.loadView=function(t){var e=this,i=this.config.views,r=null;if(""===t)return Promise.resolve(this._loadError("",new Error("Webix Jet: Empty url segment")));try{i&&"string"==typeof(r="function"==typeof i?i(t):i[t])&&(t=r,r=null),r||("_hidden"===t?r={hidden:!0}:"_blank"===t?r={}:(t=t.replace(/\./g,"/"),r=this.require("jet-views",t)))}catch(e){r=this._loadError(t,e)}return r.then||(r=Promise.resolve(r)),r=r.then((function(t){return t.__esModule?t.default:t})).catch((function(i){return e._loadError(t,i)}))},e.prototype._forView=function(t,e){var i=this.webix.$$(t);i&&e(i.$scope)},e.prototype._loadViewDynamic=function(t){return null},e.prototype.createFromURL=function(t){var e=this;return t.isNew||!t.view?this.loadView(t.page).then((function(i){return e.createView(i,name,t.params)})):Promise.resolve(t.view)},e.prototype._override=function(t){var e=this.config.override;if(e){for(var i=void 0;t;)i=t,t=e.get(t);return i}return t},e.prototype.createView=function(t,i,r){if("function"==typeof(t=this._override(t))){if(t.prototype instanceof e)return new t({app:this,name:i,params:r,router:h});if(t.prototype instanceof o)return new t(this,{name:i,params:r});t=t(this)}return t instanceof o?t:new l(this,{name:i,ui:t})},e.prototype.show=function(t,e){return t&&this.app&&0==t.indexOf("//")?this.app.show(t.substr(1),e):this.render(this._container,t||this.config.start,e)},e.prototype.trigger=function(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];this.apply(t,e)},e.prototype.apply=function(t,e){this.callEvent(t,e)},e.prototype.action=function(t){return this.webix.bind((function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];this.apply(t,e)}),this)},e.prototype.on=function(t,e){this.attachEvent(t,e)},e.prototype.use=function(t,e){t(this,null,e)},e.prototype.error=function(t,e){if(this.callEvent(t,e),this.callEvent("app:error",e),this.config.debug)for(var i=0;i<e.length;i++)if(console.error(e[i]),e[i]instanceof Error){var r=e[i].message;0===r.indexOf("Module build failed")?(r=r.replace(/\x1b\[[0-9;]*m/g,""),document.body.innerHTML="<pre style='font-size:16px; background-color: #ec6873; color: #000; padding:10px;'>"+r+"</pre>"):(r+="<br><br>Check console for more details",this.webix.message({type:"error",text:r,expire:-1}))}},e.prototype.render=function(t,e,i){var r=this;this._container="string"==typeof t?this.webix.toNode(t):t||document.body;var n=null;!this.$router?(f&&"tagName"in this._container&&(this.webix.event(document.body,"click",(function(t){return r.clickHandler(t)})),f=!1),"string"==typeof e&&(e=new p(e,0)),this._subSegment=this._first_start(e),this._subSegment.route.linkRouter=!0):n="string"==typeof e?e:this.app?e.split().route.path||this.config.start:e.toString();var o=i?i.params:this.config.params||null,s=this.getSubView(),u=this._subSegment,a=u.show({url:n,params:o},s).then((function(){return r.createFromURL(u.current())})).then((function(e){return e.render(t,u)})).then((function(t){return r.$router.set(u.route.path,{silent:!0}),r.callEvent("app:route",[r.getUrl()]),t}));return this.ready=this.ready.then((function(){return a})),a},e.prototype.getSubView=function(){if(this._subSegment){var t=this._subSegment.current().view;if(t)return t}return new c(this,{})},e.prototype.require=function(t,e){return null},e.prototype._first_start=function(t){var e=this;this._segment=t;if(this.$router=new this.config.router((function(t){return setTimeout((function(){e.show(t).catch((function(t){if(!(t instanceof n))throw t}))}),1)}),this.config,this),this._container===document.body&&!1!==this.config.animation){var i=this._container;this.webix.html.addCss(i,"webixappstart"),setTimeout((function(){e.webix.html.removeCss(i,"webixappstart"),e.webix.html.addCss(i,"webixapp")}),10)}if(t){if(this.app){var r=t.current().view;t.current().view=this,t.next()?(t.refresh(),t=t.split()):t=new p(this.config.start,0),t.current().view=r}}else{var o=this.$router.get();o||(o=this.config.start,this.$router.set(o,{silent:!0})),t=new p(o,0)}return t},e.prototype._loadError=function(t,e){return this.error("app:error:resolve",[e,t]),{template:" "}},e.prototype.addSubView=function(t,e,i){var r=!0!==t.$subview?t.$subview:null,n=t.name||(r?this.webix.uid():"default");return e.id=t.id||"s"+this.webix.uid(),(i[n]={id:e.id,url:r,branch:t.branch,popup:t.popup,params:t.params}).popup?null:e},e}(o),v=function(){function t(t,e){var i=this;this.config=e||{},this._detectPrefix(),this.cb=t,window.onpopstate=function(){return i.cb(i.get())}}return t.prototype.set=function(t,e){var i=this;if(this.config.routes){var r=t.split("?",2);for(var n in this.config.routes)if(this.config.routes[n]===r[0]){t=n+(r.length>1?"?"+r[1]:"");break}}this.get()!==t&&window.history.pushState(null,null,this.prefix+this.sufix+t),e&&e.silent||setTimeout((function(){return i.cb(t)}),1)},t.prototype.get=function(){var t=this._getRaw().replace(this.prefix,"").replace(this.sufix,"");if(t="/"!==t&&"#"!==t?t:"",this.config.routes){var e=t.split("?",2),i=this.config.routes[e[0]];i&&(t=i+(e.length>1?"?"+e[1]:""))}return t},t.prototype._detectPrefix=function(){var t=this.config.routerPrefix;this.sufix="#"+(void 0===t?"!":t),this.prefix=document.location.href.split("#",2)[0]},t.prototype._getRaw=function(){return document.location.href},t}(),g=!1;function y(t){if(!g&&t){g=!0;var e=window;e.Promise||(e.Promise=t.promise);var i=t.version.split(".");10*i[0]+1*i[1]<53&&(t.ui.freeze=function(e){var i=e();return i&&i.then?i.then((function(e){return t.ui.$freeze=!1,t.ui.resize(),e})):(t.ui.$freeze=!1,t.ui.resize()),i});var r=t.ui.baselayout.prototype.addView,n=t.ui.baselayout.prototype.removeView,o={addView:function(t,e){if(this.$scope&&this.$scope.webixJet&&!t.queryView){var i=this.$scope,n={};t=i.app.copyConfig(t,{},n),r.apply(this,[t,e]);var o=function(t){i._renderFrame(t,n[t],null).then((function(){i._subs[t]=n[t]}))};for(var s in n)o(s);return t.id}return r.apply(this,arguments)},removeView:function(){if(n.apply(this,arguments),this.$scope&&this.$scope.webixJet){var e=this.$scope._subs;for(var i in e){var r=e[i];t.$$(r.id)||(r.view.destructor(),delete e[i])}}}};t.extend(t.ui.layout.prototype,o,!0),t.extend(t.ui.baselayout.prototype,o,!0),t.protoUI({name:"jetapp",$init:function(e){this.$app=new this.app(e);var i=t.uid().toString();e.body={id:i},this.$ready.push((function(){this.callEvent("onInit",[this.$app]),this.$app.render({id:i})}))}},t.ui.proxy,t.EventSystem)}}var w=function(t){function e(e){var i;return e.router=e.router||v,y((i=t.call(this,e)||this).webix),i}return i(e,t),e.prototype.require=function(t,e){return require(t+"/"+e)},e}(d),b=(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}i(e,t),e.prototype._detectPrefix=function(){this.prefix="",this.sufix=this.config.routerPrefix||""},e.prototype._getRaw=function(){return document.location.pathname+(document.location.search||"")}}(v),function(){function t(t,e){this.path="",this.cb=t}return t.prototype.set=function(t,e){var i=this;this.path=t,e&&e.silent||setTimeout((function(){return i.cb(t)}),1)},t.prototype.get=function(){return this.path},t}());function m(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function _(t,e,i){for(var r in t)m(t,r)&&e.call(i||t,t[r],r,t)}function x(t){t="Warning: "+t,"undefined"!=typeof console&&console.error(t);try{throw new Error(t)}catch(t){}}var S=String.prototype.replace,$=String.prototype.split,E=function(t){var e=t%10;return 11!==t&&1===e?0:2<=e&&e<=4&&!(t>=12&&t<=14)?1:2},P={arabic:function(t){if(t<3)return t;var e=t%100;return e>=3&&e<=10?3:e>=11?4:5},bosnian_serbian:E,chinese:function(){return 0},croatian:E,french:function(t){return t>1?1:0},german:function(t){return 1!==t?1:0},russian:E,lithuanian:function(t){return t%10==1&&t%100!=11?0:t%10>=2&&t%10<=9&&(t%100<11||t%100>19)?1:2},czech:function(t){return 1===t?0:t>=2&&t<=4?1:2},polish:function(t){if(1===t)return 0;var e=t%10;return 2<=e&&e<=4&&(t%100<10||t%100>=20)?1:2},icelandic:function(t){return t%10!=1||t%100==11?1:0},slovenian:function(t){var e=t%100;return 1===e?0:2===e?1:3===e||4===e?2:3}},A={arabic:["ar"],bosnian_serbian:["bs-Latn-BA","bs-Cyrl-BA","srl-RS","sr-RS"],chinese:["id","id-ID","ja","ko","ko-KR","lo","ms","th","th-TH","zh"],croatian:["hr","hr-HR"],german:["fa","da","de","en","es","fi","el","he","hi-IN","hu","hu-HU","it","nl","no","pt","sv","tr"],french:["fr","tl","pt-br"],russian:["ru","ru-RU"],lithuanian:["lt"],czech:["cs","cs-CZ","sk"],polish:["pl"],icelandic:["is"],slovenian:["sl-SL"]};function V(t){var e,i=(e={},_(A,(function(t,i){_(t,(function(t){e[t]=i}))})),e);return i[t]||i[$.call(t,/-/,1)[0]]||i.en}function I(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}var j=/\$/g,F=/%\{(.*?)\}/g;function k(t,e,i,r){if("string"!=typeof t)throw new TypeError("Polyglot.transformPhrase expects argument #1 to be string");if(null==e)return t;var n=t,o=r||F,s="number"==typeof e?{smart_count:e}:e;if(null!=s.smart_count&&n){var u=$.call(n,"||||");n=(u[function(t,e){return P[V(t)](e)}(i||"en",s.smart_count)]||u[0]).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}return n=S.call(n,o,(function(t,e){return m(s,e)&&null!=s[e]?S.call(s[e],j,"$$"):t}))}function C(t){var e=t||{};this.phrases={},this.extend(e.phrases||{}),this.currentLocale=e.locale||"en";var i=e.allowMissing?k:null;this.onMissingKey="function"==typeof e.onMissingKey?e.onMissingKey:i,this.warn=e.warn||x,this.tokenRegex=function(t){var e=t&&t.prefix||"%{",i=t&&t.suffix||"}";if("||||"===e||"||||"===i)throw new RangeError('"||||" token is reserved for pluralization');return new RegExp(I(e)+"(.*?)"+I(i),"g")}(e.interpolation)}C.prototype.locale=function(t){return t&&(this.currentLocale=t),this.currentLocale},C.prototype.extend=function(t,e){_(t,(function(t,i){var r=e?e+"."+i:i;"object"==typeof t?this.extend(t,r):this.phrases[r]=t}),this)},C.prototype.unset=function(t,e){"string"==typeof t?delete this.phrases[t]:_(t,(function(t,i){var r=e?e+"."+i:i;"object"==typeof t?this.unset(t,r):delete this.phrases[r]}),this)},C.prototype.clear=function(){this.phrases={}},C.prototype.replace=function(t){this.clear(),this.extend(t)},C.prototype.t=function(t,e){var i,r,n=null==e?{}:e;if("string"==typeof this.phrases[t])i=this.phrases[t];else if("string"==typeof n._)i=n._;else if(this.onMissingKey){r=(0,this.onMissingKey)(t,n,this.currentLocale,this.tokenRegex)}else this.warn('Missing translation for key: "'+t+'"'),r=t;return"string"==typeof i&&(r=k(i,n,this.currentLocale,this.tokenRegex)),r},C.prototype.has=function(t){return m(this.phrases,t)},C.transformPhrase=function(t,e,i){return k(t,e,i)};var R=C;var O=window.webix;O&&y(O);var q=function(t,e,i){var r=(i=i||{}).storage,n=r?r.get("lang")||"en":i.lang||"en";function o(e,o,s){o.__esModule&&(o=o.default);var a={phrases:o};i.polyglot&&t.webix.extend(a,i.polyglot);var p=u.polyglot=new R(a);if(p.locale(e),u._=t.webix.bind(p.t,p),n=e,r&&r.put("lang",n),i.webix){var c=i.webix[e];c&&t.webix.i18n.setLocale(c)}return s?Promise.resolve():t.refresh()}function s(e,r){if(!1!==i.path){var n=(i.path?i.path+"/":"")+e;o(e,t.require("jet-locales",n),r)}}var u={getLang:function(){return n},setLang:s,setLangData:o,_:null,polyglot:null};t.setService("locale",u),s(n,!0)},L=window;L.Promise||(L.Promise=L.webix.promise);var D=1;function G(t,e,i){Object.defineProperty(e,i,{get:function(){return t[i]},set:function(e){return t[i]=e}})}function M(t,e){e=e||{};var i={},r={},n=function(t,e){var n=D++;return i[n]={mask:t,handler:e},e("*"===t?r:r[t],void 0,t),n},o=[],s=!1,u=function(t,e,r,n){if(s)o.push([t,e,r,n]);else for(var u=Object.keys(i),a=0;a<u.length;a++){var p=i[u[a]];p&&("*"!==p.mask&&p.mask!==t||p.handler(r,e,t,n))}};for(var a in t)if(t.hasOwnProperty(a)){var p=t[a];e.nested&&"object"==typeof p&&p?r[a]=M(p,e):N(r,p,a,u)}return Object.defineProperty(r,"$changes",{value:{attachEvent:n,detachEvent:function(t){delete i[t]}},enumerable:!1,configurable:!1}),Object.defineProperty(r,"$observe",{value:n,enumerable:!1,configurable:!1}),Object.defineProperty(r,"$batch",{value:function(t){if("function"!=typeof t){var e=t;t=function(){for(var t in e)r[t]=e[t]}}for(s=!0,t(r),s=!1;o.length;){var i=o.shift();u.apply(this,i)}},enumerable:!1,configurable:!1}),r}function N(t,e,i,r){Object.defineProperty(t,i,{get:function(){return e},set:function(t){if(null===e||null===t?e!==t:e.valueOf()!=t.valueOf()){var n=e;e=t,r(i,n,t,null)}},enumerable:!0,configurable:!1})}var U=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.config=function(){var t=this,e=this.app.getService("locale")._;return{view:"popup",point:!1,body:{view:"list",yCount:4,width:120,borderless:!0,data:[{id:"edit",value:e("Edit")},{id:"add-filter",value:e("Add Filter")},{id:"add-group",value:e("Add Group")},{id:"delete",value:e("Delete")}],click:function(e){t.app.callEvent("action",[e,t.Item]),t.Hide()}}}},e.prototype.Hide=function(){this.getRoot().hide()},e.prototype.Show=function(t,e){this.Item=e;var i=webix.html.offset(t);this.getRoot().show({x:i.x+i.width+webix.skin.$active.dataPadding,y:i.y-10})},e}(c),B=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.GetButton=function(){var t=this;return{view:"button",value:(0,this.app.getService("locale")._)("Add filter"),localId:"button",css:"webix_primary",click:function(){return t.Add(null,null)}}},e.prototype.GetList=function(){var t=this,e=this.app.getService("locale")._,i=this.getParam("simple")?"<span style='float:right' class='webix_icon action-close wxi-close'></span>":"<span style='float:right' class='webix_icon action-menu wxi-dots'></span>",r=e("and"),n=e("or"),o=function(t){return"and"==t.glue?r:n};return{view:"tree",borderless:!0,localId:"list",glue:"and",css:"wbq-query_list",scheme:{$serialize:function(t){if(t.group)return{group:t.group,glue:t.glue};var e={glue:t.glue,field:t.field,condition:t.condition};return t.includes&&t.includes.length&&(e.includes=t.includes),e},$init:function(t){t.group&&(t.$css="group",t.open=!0)}},type:{template:function(r){return r.group?"<div class='wbq-filter_join wbq-filter_join_"+r.glue+"'>"+o(r)+"</div>":t.Template(r,t.app.config.fields,i,e)+"<div class='wbq-filter_join wbq-filter_join_"+r.glue+"'>"+o(r)+"</div>"}},onClick:{"action-menu":function(t,e){this.$scope.Actions.Show(t.target,e)},"action-close":function(e,i){t.Delete(i)},"wbq-filter_join":function(e,i){t.SwitchGlue(i)}},on:{onItemDblClick:function(e){return t.EditStart(e)}}}},e.prototype.init=function(){var t=this;this.Actions=this.ui(U),this.on(this.app,"applyFilter",(function(e){return t.EditStop(e)})),this.on(this.app,"action",(function(e,i){"delete"===e?t.Delete(i):"add-filter"===e?t.Add(null,i):"add-group"===e?t.AddGroup(null,i):"edit"===e&&webix.delay((function(){return t.EditStart(i)}))})),this.State=this.getParam("state"),this.on(this.State.$changes,"value",(function(e){t.LastValue=JSON.stringify(e),t.$$("list").clearAll(),e&&t.$$("list").parse(t.ConvertTo(e))}))},e.prototype.ConvertTo=function(t,e){var i=this;if(t.rules){var n=t.rules.map((function(e){return i.ConvertTo(e,t.glue)}));return e?{group:!0,glue:e,data:n}:n}return r(r({},t),{glue:e})},e.prototype.ConvertFrom=function(t,e){var i=this,r=e.getBranch(t),n=r.map((function(t){var r=t.id,n=t.field,o=t.type,s=t.condition,u=t.includes;return n?{field:n,type:o,condition:s,includes:u}:i.ConvertFrom(r,e)}));return n.length?{glue:r[0].glue,rules:n}:null},e.prototype.Add=function(t,e){this.EditStop(),t=t||{field:""};var i=this.$$("list"),r=e?i.getParentId(e):0,n=e?i.getBranchIndex(e)+1:-1;!e&&i.count()&&(e=i.getFirstId());var o=e?i.getItem(e).glue:i.config.glue;t.glue=o;var s=i.add(t,n,r);this.EditStart(s),this.CreateMode=!0},e.prototype.SwitchGlue=function(t){for(var e=this.$$("list"),i=e.data.getBranch(e.getParentId(t)),r=0;r<i.length;r++)e.updateItem(i[r].id,{glue:"and"==i[r].glue?"or":"and"});this.Save()},e.prototype.AddGroup=function(t,e){this.EditStop(),t=t||{};var i=this.$$("list"),r=e?i.getParentId(e):0,n=e?i.getBranchIndex(e)+1:-1,o={id:webix.uid(),group:!0},s=e?i.getItem(e).glue:i.config.glue;o.glue=s,t.glue="and"==o.glue?"or":"and",i.add(o,n,r);var u=i.add(t,null,o.id);this.EditStart(u),this.CreateMode=!0},e.prototype.Delete=function(t){this.EditStop(),this.DeleteSilent(t),this.Save()},e.prototype.DeleteSilent=function(t){var e=this.$$("list"),i=e.getParentId(t);e.remove(t);var r=e.data.branch[i];if(i&&!r)this.DeleteSilent(i);else if(1==r.length&&e.getItem(r[0]).group){var n=r[0];if(i){var o=e.getParentId(i),s=e.getBranchIndex(i,o);e.move(n,s,e,{parent:o}),this.DeleteSilent(i)}else{s=e.getBranchIndex(n,0);var u=[].concat(e.data.branch[n]);e.move(u,s,e,{parent:0}),this.DeleteSilent(n)}}},e.prototype.EditStop=function(t){if(this.Active){var e=this.$$("list");t?((t=t||this.Active.GetValue()).includes=t.includes||[],e.updateItem(this.ActiveId,r({},t))):this.CreateMode?this.DeleteSilent(this.ActiveId):e.refresh(this.ActiveId);var i=this.Active;this.Active=null,i.destructor(),this.Save()}},e.prototype.Save=function(){var t=this.ConvertFrom(0,this.$$("list").data),e=JSON.stringify(t);this.LastValue!==e&&(this.State.value=t)},e.prototype.Template=function(t,e,i,r){var n="&nbsp;",o=e.find((function(e){return e.id===t.field}))||{value:""};if(t.includes&&t.includes.length){n=r("in")+" ";for(var s=0;s<t.includes.length;s++)n+=(s>0?", ":"")+"<span class='wbq-field-value'>"+t.includes[s]+"</span>"}else t.condition&&t.condition.type&&(n=r(t.condition.type)+" <span class='wbq-field-value'>"+this.Format(t.condition.filter,o.format,o.type)+"</span>");return"<span class='wbq-field-box'><span class='wbq-field-name'>"+o.value+"</span> "+n+" </span>"+i},e.prototype.Format=function(t,e,i){if(!t)return"";if(t.start)t=this.Format(t.start,e,i)+(t.end?" - "+this.Format(t.end,e,i):"");else{var r=e||("date"==i?webix.i18n.dateFormatStr:null);r&&(t=r(t))}return t},e}(c),T=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.config=function(){var t=this,e=this.app.getService("locale")._;return{padding:10,margin:6,css:"webix_shadow_small",rows:[{view:"richselect",options:[],localId:"field",on:{onChange:function(){return t.AdjustToField()}}},{localId:"filter"},{type:"clean",cols:[{view:"button",value:e("Cancel"),width:100,click:function(){return t.Hide()}},{},{view:"button",value:e("Apply"),width:100,css:"webix_primary",click:function(){return t.ApplyFilter()}}]}]}},e.prototype.GetField=function(){var t=this.$$("field");return t.getList().getItem(t.getValue())},e.prototype.AdjustToField=function(){var t=this.GetField();this.CreateFilter(t.id,t.type,t.format,t.conditions,this.$$("filter"))},e.prototype.CreateFilter=function(t,e,i,r,n){var o={view:"filter",localId:"filter",conditions:r,field:t,mode:e,template:function(r){var n=r[t],o=i||("date"==e?webix.i18n.dateFormatStr:null);return o&&(n=o(n)),n},margin:6},s=webix.ui(o,n),u=this.app.getService("backend").data(t);return s.parse(u),s},e.prototype.ApplyFilter=function(){this.app.callEvent("applyFilter",[this.GetValue()])},e.prototype.GetValue=function(){var t=this.GetField(),e=r(r({},this.$$("filter").getValue()),{field:t.id,type:t.type});return""!=e.condition.filter||e.includes&&e.includes.length||(e=null),e},e.prototype.Hide=function(){this.app.callEvent("applyFilter",[null])},e.prototype.Show=function(t,e){var i=this.$$("field");i.getList().parse(e),t.field?i.setValue(t.field):i.setValue(e[0].id),this.$$("filter").setValue(webix.copy(t))},e}(c),H=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.config=function(){return{view:"popup",point:!1,body:{$subview:T,name:"body"}}},e.prototype.Show=function(t,e,i){var r=this;setTimeout((function(){r.getRoot().show(i),r.getSubView("body").Show(t,e)}),100)},e}(c),z=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.config=function(){var t=this.GetButton();t.width=100;var e=this.GetList();e.scroll=!1!==this.app.config.scroll?"x":"",e.borderless=!0,e.css="wbq-query_bar";var i=8,r=58;return("mini"==webix.skin.$name||"compact"==webix.skin.$name)&&(i=4,r=50),{view:"toolbar",paddingX:2*i,paddingY:i,height:r,borderless:!0,cols:[e,t]}},e.prototype.EditStart=function(t){var e=this;this.EditStop();var i=this.$$("list");this.ActiveId=t,this.Active=this.ui(H),this.Active.getRoot().attachEvent("onHide",(function(){e.Active&&e.EditStop()}));var r=webix.html.offset(i.getItemNode(t));this.Active.Show(i.getItem(t),this.app.config.fields,r),this.CreateMode=!1},e}(B),K=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.config=function(){return{paddingX:16,paddingY:8,margin:0,rows:[this.GetButton(),this.GetList()]}},e.prototype.EditStart=function(t){var e=this;if(!this.ActiveId||this.ActiveId!=t){this.EditStop();var i=this.$$("list"),r=i.getItemNode(t);r.classList.add("active-editor"),r.innerHTML="",this.ActiveId=t,this.Active=this.ui(T,{container:r}),this.$$("list").attachEvent("onAfterRender",(function(){return e.EditStop()})),this.Active.Show(i.getItem(t),this.app.config.fields),this.CreateMode=!1}},e}(B),J={JetView:c};J.actions=U,J.bar=z,J.base=B,J.filter=T,J.list=K,J.popup=H;var W=function(){function t(t){this._app=t}return t.prototype.data=function(t){var e=this._app.config.data;return"function"==typeof e?Promise.resolve(e(t)).then((function(e){return e.map((function(e){var i;return(i={})[t]=e,i}))})):Promise.resolve(e)},t.prototype.save=function(t){console.log(t)},t}();function X(t,e,i){if(!t||!t.rules.length)return function(){return!0};var r=t.rules.map((function(t){return function(t,e,i){if(t.rules)return X(t,e,i);return function(r){var n=r[t.field];if(t.includes&&t.includes.length)return-1!==t.includes.findIndex((function(t){return t===n}));if(n){var o=t.condition.type;return(e[o]||e[i[t.field]][o])(n,t.condition.filter)}return!1}}(t,e,i)}));return("or"===t.glue?Z:Y)(r)}function Y(t){return function(e){for(var i=0;i<t.length;i++)if(!t[i](e))return!1;return!0}}function Z(t){return function(e){for(var i=0;i<t.length;i++)if(t[i](e))return!0;return!1}}var Q=function(t){function e(e){var i=this,n=M({value:e.value||null}),o={router:b,version:"8.0.2",debug:!0};return(i=t.call(this,r(r({},o),e))||this).config.start="bar"===e.type?"/bar":"/list",i.config.params={state:n,simple:!0===e.simple},i.setService("backend",new(i.dynamic(W))(i)),i.use(q,i.config.locale||{lang:"en",webix:{en:"en-US"}}),i}return i(e,t),e.prototype.dynamic=function(t){return this.config.override&&this.config.override.get(t)||t},e.prototype.require=function(t,e){return"jet-views"===t?J[e]:"jet-locales"===t?et[e]:null},e.prototype.getState=function(){return this.config.params.state},e.prototype.GetFilter=function(){return function(t,e){var i=webix.filters,r={};return e.forEach((function(t){t.conditions&&t.conditions.forEach((function(t){"object"==typeof t&&(i[t.id]=t.handler)})),t.type&&(r[t.id]=t.type)})),X(t,i,r)}(this.config.params.state.value,this.config.fields)},e}(w);webix.protoUI({name:"query",app:Q,getState:function(){return this.$app.getState()},getService:function(t){return this.$app.getService(t)},$init:function(){var t,e,i=this,r=this.getState();for(var n in r)G(r,this.config,n);r.$changes.attachEvent("value",(t=function(t,e){return i.callEvent("onChange",t,e)},e=!1,function(){if(e)return t.apply(this,arguments);e=!0}))},getFilterFunction:function(){return this.$app.GetFilter()}},webix.ui.jetapp);var tt={Backend:W},et={en:{"Add filter":"Add filter",in:"=",equal:"=",notEqual:"<>",less:"<",greater:">",greaterOrEqual:">=",lessOrEqual:"<=",contains:"contains",notContains:"not contains",beginsWith:"begins",notBeginsWith:"not begings",endsWith:"ends",notEndsWith:"not ends",between:"between",notBetween:"not between",and:"and",or:"or",Edit:"Edit","Add Filter":"Add Filter","Add Group":"Add Group",Delete:"Delete",Apply:"Apply",Cancel:"Cancel"}};t.App=Q,t.locales=et,t.services=tt,t.views=J,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=query.min.js.map
