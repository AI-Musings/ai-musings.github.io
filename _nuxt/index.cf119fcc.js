import{a as p,y as f,s as y,e as v,f as s,z as g,u as i,F as d,o as a,h as t,A as c,B as r,t as n,i as b,C as k,D as _}from"./entry.aeab004a.js";import{u as A}from"./fetch.acbbcb5a.js";const w=["aria-labelledby"],B={class:"lg:px-8"},C={class:"lg:max-w-4xl"},$={class:"mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0"},H={class:"flex flex-col items-start"},N=["id"],V=["datetime"],D={class:"mt-1 text-base leading-7 text-slate-700"},L={class:"mt-4 flex items-center gap-4"},M=["aria-label","onClick"],P={key:0,"aria-hidden":"true",viewBox:"0 0 10 10",fill:"none",class:"h-2.5 w-2.5 fill-current"},F=t("path",{d:"M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z","fill-rule":"evenodd","clip-rule":"evenodd"},null,-1),S=[F],T={key:1,"aria-hidden":"true",viewBox:"0 0 10 10",fill:"none",class:"h-2.5 w-2.5 fill-current"},Z=t("path",{d:"M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z"},null,-1),I=[Z],R=t("span",{class:"ml-3","aria-hidden":"true"},"Listen",-1),j=t("span",{"aria-hidden":"true",class:"text-sm font-bold text-slate-400"},"/",-1),G=p({__name:"index",setup(q){f({title:"AI Musings - The Inner Thoughts of a Machine"});const{data:x}=A("/api/articles","$pqtWcjQkdb"),m=y(()=>{var o;return(o=x.value)==null?void 0:o.items}),{loadAndPlay:h,isArticlePlaying:u}=v();return(o,z)=>{const l=k;return a(!0),s(d,null,g(i(m),e=>(a(),s("article",{key:e.sys.id,"aria-labelledby":e.sys.id,class:"py-10 sm:py-12"},[t("div",B,[t("div",C,[t("div",$,[t("div",H,[t("h2",{id:e.sys.id,class:"mt-2 text-lg font-bold text-slate-900"},[c(l,{to:`/articles/${e.sys.id}`},{default:r(()=>[_(n(e.fields.title),1)]),_:2},1032,["to"])],8,N),t("time",{datetime:e.sys.createdAt,class:"order-first font-mono text-sm leading-7 text-slate-500"},n(new Date(e.sys.createdAt).toLocaleDateString(void 0,{dateStyle:"long"})),9,V),t("p",D,n(e.fields.description),1),t("div",L,[e.fields.audio?(a(),s(d,{key:0},[t("button",{type:"button",class:"flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900","aria-label":`Play '${e.fields.title}'`,onClick:E=>i(h)(e)},[i(u)(e)?(a(),s("svg",P,S)):(a(),s("svg",T,I)),R],8,M),j],64)):b("",!0),c(l,{class:"flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900","aria-label":`Read '${e.fields.title}'`,to:`/articles/${e.sys.id}`},{default:r(()=>[_("Read ")]),_:2},1032,["aria-label","to"])])])])])])],8,w))),128)}}});export{G as default};
