import{_ as n,a as t,b as i,c as e,i as o,s as r,d as c,S as u,f,g as a,h as s,e as l,j as h,k as p,l as d,m as v,o as y,n as m,p as g,t as b,u as w,v as x,w as $,x as R,y as k,z as E,A as D,B as I,C as V,D as T,E as j,F as z,G as A,H as O,I as P,J as S,K as B,L as W}from"./client.c5c29cd2.js";import{g as C,a as F,b as G,f as H,c as N,E as J}from"./index.1fd4d17b.js";function K(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var o,r=t(n);if(e){var c=t(this).constructor;o=Reflect.construct(r,arguments,c)}else o=r.apply(this,arguments);return i(this,o)}}function L(n){var t,i,e,o,r,c,u;return{c:function(){t=f("a"),i=f("figure"),e=f("video"),this.h()},l:function(n){t=a(n,"A",{rel:!0,href:!0,class:!0});var o=s(t);i=a(o,"FIGURE",{});var r=s(i);e=a(r,"VIDEO",{class:!0,muted:!0,autoplay:!0,playsinline:!0,"webkit-playsinline":!0,poster:!0}),s(e).forEach(l),r.forEach(l),o.forEach(l),this.h()},h:function(){h(e,"class","w-full bg-white"),e.muted=!0,e.autoplay=!0,e.playsInline=!0,h(e,"webkit-playsinline",""),h(e,"poster",o=C(n[0])),h(t,"rel","prefetch"),h(t,"href",r="/exhibits/"+n[0].key),h(t,"class","m-px exhibit relative w-84")},m:function(o,r){p(o,t,r),d(t,i),d(i,e),n[3](e),c||(u=v(e,"mouseover",n[2]),c=!0)},p:function(n,i){var c=y(i,1)[0];1&c&&o!==(o=C(n[0]))&&h(e,"poster",o),1&c&&r!==(r="/exhibits/"+n[0].key)&&h(t,"href",r)},i:m,o:m,d:function(i){i&&l(t),n[3](null),c=!1,u()}}}function U(n,t,i){var e,o=t.exhibit,r=!1;return n.$$set=function(n){"exhibit"in n&&i(0,o=n.exhibit)},[o,e,function(){r||(r=!0,i(1,e.src=F(o),e),i(1,e.oncanplay=function(){i(1,e.poster=G(o),e),e.play()},e))},function(n){g[n?"unshift":"push"]((function(){i(1,e=n)}))}]}var X=function(t){n(f,u);var i=K(f);function f(n){var t;return e(this,f),t=i.call(this),o(c(t),n,U,L,r,{exhibit:0}),t}return f}();function Y(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var o,r=t(n);if(e){var c=t(this).constructor;o=Reflect.construct(r,arguments,c)}else o=r.apply(this,arguments);return i(this,o)}}function _(n){var t,i,e,o;return{c:function(){t=f("video"),this.h()},l:function(n){t=a(n,"VIDEO",{class:!0,muted:!0,playsinline:!0,"webkit-playsinline":!0,poster:!0}),s(t).forEach(l),this.h()},h:function(){h(t,"class","absolute inset-0 w-full h-full z-10"),t.muted=!0,t.playsInline=!0,h(t,"webkit-playsinline",""),h(t,"poster",i=C(n[0]))},m:function(i,e){p(i,t,e),n[13](t),o=!0},p:function(n,e){(!o||1&e&&i!==(i=C(n[0])))&&h(t,"poster",i)},i:function(n){o||(e&&e.end(1),o=!0)},o:function(n){n&&(e=w(t,H,{})),o=!1},d:function(i){i&&l(t),n[13](null),i&&e&&e.end()}}}function q(n){var t,i,e,o,r,c,u,m,g,w,z,A=!1,O=function(){A=!1};b(n[11]),b(n[12]);var P=n[7]&&_(n);return{c:function(){i=f("div"),e=f("a"),o=f("div"),r=x(),c=f("div"),u=x(),P&&P.c(),this.h()},l:function(n){i=a(n,"DIV",{class:!0,style:!0});var t=s(i);e=a(t,"A",{rel:!0,href:!0,class:!0});var f=s(e);o=a(f,"DIV",{class:!0,style:!0}),s(o).forEach(l),r=$(f),c=a(f,"DIV",{class:!0,style:!0}),s(c).forEach(l),u=$(f),P&&P.l(f),f.forEach(l),t.forEach(l),this.h()},h:function(){h(o,"class","absolute inset-0 bg-cover"),R(o,"background-image","url("+C(n[0])+")"),k(o,"opacity-0",n[8]),h(c,"class","absolute inset-0 bg-cover transition-opacity duration-500"),R(c,"background-image","url("+N(n[0])+")"),k(c,"opacity-0",!n[8]),h(e,"rel","prefetch"),h(e,"href",m="/exhibits/"+n[0].key),h(e,"class","m-px w-full bg-blue-500"),h(i,"class","relative w-full m-1 mx-2 h-96"),R(i,"height",n[9]+"px"),b((function(){return n[14].call(i)}))},m:function(f,a){p(f,i,a),d(i,e),d(e,o),d(e,r),d(e,c),d(e,u),P&&P.m(e,null),g=E(i,n[14].bind(i)),n[15](i),w||(z=[v(window,"scroll",n[10]),v(window,"scroll",(function(){A=!0,clearTimeout(t),t=setTimeout(O,100),n[11]()})),v(window,"resize",n[12])],w=!0)},p:function(n,r){var u=y(r,1)[0];24&u&&!A&&(A=!0,clearTimeout(t),scrollTo(n[3],n[4]),t=setTimeout(O,100)),1&u&&R(o,"background-image","url("+C(n[0])+")"),256&u&&k(o,"opacity-0",n[8]),1&u&&R(c,"background-image","url("+N(n[0])+")"),256&u&&k(c,"opacity-0",!n[8]),n[7]?P?(P.p(n,u),128&u&&D(P,1)):((P=_(n)).c(),D(P,1),P.m(e,null)):P&&(I(),V(P,1,1,(function(){P=null})),T()),1&u&&m!==(m="/exhibits/"+n[0].key)&&h(e,"href",m),512&u&&R(i,"height",n[9]+"px")},i:function(n){D(P)},o:function(n){V(P)},d:function(t){t&&l(i),P&&P.d(),g(),n[15](null),w=!1,j(z)}}}function M(){for(var n,t=arguments.length,i=new Array(t),e=0;e<t;e++)i[e]=arguments[e];(n=console).log.apply(n,["[autoplay]"].concat(i))}function Q(n,t,i){var e,o,r,c,u,f,a,s=t.exhibit,l=!0,h=!1,p=!1;function d(n){var t=o.getBoundingClientRect(),r=t.top>=0&&t.bottom<=n,c=t.bottom<=0||t.top>=n;r&&!h&&(console.log("Playing video ".concat(s.key),t),p||(p=!0,i(7,l=!0),i(1,e.src=F(s),e),e.play(),M("init video element"),i(1,e.oncanplay=function(){M("canplay fired"),e.play()},e),i(1,e.onerror=function(){M("onerror fired")},e),i(1,e.onended=function(){M("onended fired"),l&&(i(7,l=!1),i(8,h=!0))},e))),c&&p&&e&&(e.pause(),i(1,e.src=null,e),e.load(),p=!1)}return z((function(){d(f)})),n.$$set=function(n){"exhibit"in n&&i(0,s=n.exhibit)},[s,e,o,r,c,u,f,l,h,a,function(){d(f)},function(){i(3,r=window.pageXOffset),i(4,c=window.pageYOffset)},function(){i(5,u=window.innerWidth),i(6,f=window.innerHeight)},function(n){g[n?"unshift":"push"]((function(){i(1,e=n)}))},function(){a=this.clientWidth,i(9,a)},function(n){g[n?"unshift":"push"]((function(){i(2,o=n)}))}]}var Z=function(t){n(f,u);var i=Y(f);function f(n){var t;return e(this,f),t=i.call(this),o(c(t),n,Q,q,r,{exhibit:0}),t}return f}();function nn(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var o,r=t(n);if(e){var c=t(this).constructor;o=Reflect.construct(r,arguments,c)}else o=r.apply(this,arguments);return i(this,o)}}function tn(n,t,i){var e=n.slice();return e[3]=t[i],e}function en(n){for(var t,i,e=J,o=[],r=0;r<e.length;r+=1)o[r]=cn(tn(n,e,r));var c=function(n){return V(o[n],1,1,(function(){o[n]=null}))};return{c:function(){for(var n=0;n<o.length;n+=1)o[n].c();t=A()},l:function(n){for(var i=0;i<o.length;i+=1)o[i].l(n);t=A()},m:function(n,e){for(var r=0;r<o.length;r+=1)o[r].m(n,e);p(n,t,e),i=!0},p:function(n,i){if(2&i){var r;for(e=J,r=0;r<e.length;r+=1){var u=tn(n,e,r);o[r]?(o[r].p(u,i),D(o[r],1)):(o[r]=cn(u),o[r].c(),D(o[r],1),o[r].m(t.parentNode,t))}for(I(),r=e.length;r<o.length;r+=1)c(r);T()}},i:function(n){if(!i){for(var t=0;t<e.length;t+=1)D(o[t]);i=!0}},o:function(n){o=o.filter(Boolean);for(var t=0;t<o.length;t+=1)V(o[t]);i=!1},d:function(n){O(o,n),n&&l(t)}}}function on(n){var t,i;return t=new X({props:{exhibit:n[3]}}),{c:function(){P(t.$$.fragment)},l:function(n){S(t.$$.fragment,n)},m:function(n,e){B(t,n,e),i=!0},p:m,i:function(n){i||(D(t.$$.fragment,n),i=!0)},o:function(n){V(t.$$.fragment,n),i=!1},d:function(n){W(t,n)}}}function rn(n){var t,i;return t=new Z({props:{exhibit:n[3]}}),{c:function(){P(t.$$.fragment)},l:function(n){S(t.$$.fragment,n)},m:function(n,e){B(t,n,e),i=!0},p:m,i:function(n){i||(D(t.$$.fragment,n),i=!0)},o:function(n){V(t.$$.fragment,n),i=!1},d:function(n){W(t,n)}}}function cn(n){var t,i,e,o,r=[rn,on],c=[];function u(n,t){return n[1]?0:1}return t=u(n),i=c[t]=r[t](n),{c:function(){i.c(),e=A()},l:function(n){i.l(n),e=A()},m:function(n,i){c[t].m(n,i),p(n,e,i),o=!0},p:function(n,o){var f=t;(t=u(n))===f?c[t].p(n,o):(I(),V(c[f],1,1,(function(){c[f]=null})),T(),(i=c[t])||(i=c[t]=r[t](n)).c(),D(i,1),i.m(e.parentNode,e))},i:function(n){o||(D(i),o=!0)},o:function(n){V(i),o=!1},d:function(n){c[t].d(n),n&&l(e)}}}function un(n){var t,i,e,o;b(n[2]);var r=!!n[0]&&en(n);return{c:function(){t=f("div"),r&&r.c(),this.h()},l:function(n){t=a(n,"DIV",{class:!0});var i=s(t);r&&r.l(i),i.forEach(l),this.h()},h:function(){h(t,"class","flex text-white justify-center flex-wrap")},m:function(c,u){p(c,t,u),r&&r.m(t,null),i=!0,e||(o=v(window,"resize",n[2]),e=!0)},p:function(n,i){var e=y(i,1)[0];n[0]?r?(r.p(n,e),1&e&&D(r,1)):((r=en(n)).c(),D(r,1),r.m(t,null)):r&&(I(),V(r,1,1,(function(){r=null})),T())},i:function(n){i||(D(r),i=!0)},o:function(n){V(r),i=!1},d:function(n){n&&l(t),r&&r.d(),e=!1,o()}}}function fn(n,t,i){var e,o;return n.$$.update=function(){1&n.$$.dirty&&i(1,o=e<768)},[e,o,function(){i(0,e=window.innerWidth)}]}var an=function(t){n(f,u);var i=nn(f);function f(n){var t;return e(this,f),t=i.call(this),o(c(t),n,fn,un,r,{}),t}return f}();export default an;