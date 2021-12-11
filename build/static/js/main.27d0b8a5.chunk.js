(this["webpackJsonpgfi-qc"]=this["webpackJsonpgfi-qc"]||[]).push([[0],{335:function(e,t,c){},363:function(e,t,c){"use strict";c.r(t);var a=c(0),i=c.n(a),n=c(23),l=c.n(n),s=(c(335),c(34)),r=c(10),o=c(296),j=c(437),d=c(378),b=c(434),O=c(425),u=c(288),h=c.n(u),x=c(126),f=c(195),p=c(51),g=c(127),m=c(152),v=c(295),y=c(433),w=c(5),S=window.require("electron").ipcRenderer;var F={fontSize:30,fontWeight:"600",color:"text.primary",marginTop:4,marginBottom:2},k={pointerEvents:"none",opacity:.2,transition:"opacity 0.6s"},M={pointerEvents:"auto",opacity:1,transition:"opacity 0.6s"},C=function(){var e,t=Object(o.a)({palette:{mode:"dark"}}),c=(Object(o.a)({palette:{mode:"light"}}),Object(a.useState)(0)),i=Object(r.a)(c,2),n=i[0],l=i[1],u=Object(a.useState)([]),C=Object(r.a)(u,2),D=C[0],T=C[1],E=Object(a.useState)(null),z=Object(r.a)(E,2),I=z[0],P=z[1],Y=Object(a.useState)(null),W=Object(r.a)(Y,2),G=W[0],N=W[1],R=Object(a.useState)(""),B=Object(r.a)(R,2),q=B[0],A=B[1],H=Object(a.useState)(""),J=Object(r.a)(H,2),L=J[0],V=J[1],$=Object(a.useState)(!1),K=Object(r.a)($,2),Q=K[0],U=K[1],X=Object(a.useState)(!1),Z=Object(r.a)(X,2),_=Z[0],ee=Z[1],te=Object(a.useState)(!1),ce=Object(r.a)(te,2),ae=ce[0],ie=ce[1],ne=Object(a.useState)([]),le=Object(r.a)(ne,2),se=le[0],re=le[1],oe=Object(a.useState)([]),je=Object(r.a)(oe,2),de=je[0],be=je[1];return S.on("dataDirPathSetted",(function(e,t){var c=t.dataDirPath,a=t.retailers;P(c),T(Object.values(a))})),S.on("gfiFileSelected",(function(e,t){re(t)})),Object(a.useEffect)((function(){N(null)}),[I]),Object(a.useEffect)((function(){A(""),V("")}),[G]),Object(a.useEffect)((function(){U(/^(\d{4})$/.test(q)),ee(/^(\d{4})$/.test(L))}),[q,L]),Object(a.useEffect)((function(){re([]),ie(!1),clearTimeout(e),Q&&_&&(e=setTimeout((function(){S.send("selectGfiFile",{selectedRetailerCode:G,startWeek:q,endWeek:L}),ie(!0)}),500))}),[Q,_]),Object(a.useEffect)((function(){var e=[];se.forEach((function(t){t.size=parseFloat((t.size/1e6).toFixed(1))+"(MB)",t.isDefault&&e.push(t.id)})),be(e)}),[se]),Object(w.jsx)(j.a,{theme:t,children:Object(w.jsxs)("div",{className:"App",style:{display:"flex",flexDirection:"column",width:"100vw",height:"100vh"},children:[Object(w.jsx)(d.a,{sx:{width:"100vw",bgcolor:"background.paper",color:"text.primary"},children:Object(w.jsxs)(b.a,{value:n,onChange:function(e,t){return l(t)},centered:!0,children:[Object(w.jsx)(O.a,{label:"Merge GFI"}),Object(w.jsx)(O.a,{label:"Item Two"}),Object(w.jsx)(O.a,{label:"Item Three"})]})}),Object(w.jsxs)(d.a,{sx:{flex:1,padding:2,overflow:"scroll",bgcolor:"background.paper",display:"flex"},children:[Object(w.jsxs)(d.a,{sx:{flex:1,padding:5,display:"flex",flexDirection:"column",justifyContent:"space-evenly"},children:[Object(w.jsxs)("div",{children:[Object(w.jsx)(d.a,{sx:Object(s.a)(Object(s.a)({},F),{},{marginTop:0}),children:"Select Data Directory Path"}),Object(w.jsx)(x.a,{defaultValue:"click to set path",InputProps:{readOnly:!0},size:"small",sx:{width:"100%"},onClick:function(){return S.send("setDataDirPath")},value:I})]}),Object(w.jsxs)("div",{style:Object(s.a)({},I?Object(s.a)({},M):Object(s.a)({},k)),children:[Object(w.jsx)(d.a,{sx:F,children:"Select Retailer"}),Object(w.jsxs)(g.a,{fullWidth:!0,children:[Object(w.jsx)(f.a,{children:"Retailer"}),Object(w.jsx)(m.a,{style:{},label:"Retailer",value:G,size:"small",onChange:function(e){return N(e.target.value)},children:D.map((function(e){return Object(w.jsx)(p.a,{style:{display:"block",textAlign:"center"},value:e.code,children:"".concat(e.code," - ").concat(e.name," \n")})}))})]})]}),Object(w.jsxs)("div",{style:{width:"100%",display:"flex",height:"150px"},children:[Object(w.jsxs)("div",{style:Object(s.a)(Object(s.a)({},G?Object(s.a)({},M):Object(s.a)({},k)),{},{flex:1,transition:"opacity 1s"}),children:[Object(w.jsx)(d.a,{sx:F,children:"Start Week"}),Object(w.jsx)(x.a,{error:!Q&&""!==q,label:"YYMM",helperText:!Q&&""!==q&&"Format must be YYMM",size:"small",style:{width:"100%"},onChange:function(e){return A(e.target.value)},value:q})]}),Object(w.jsx)("div",{style:{width:"20px"}}),Object(w.jsxs)("div",{style:Object(s.a)(Object(s.a)({},G?Object(s.a)({},M):Object(s.a)({},k)),{},{flex:1}),children:[Object(w.jsx)(d.a,{sx:F,children:"End Week"}),Object(w.jsx)(x.a,{error:!_&&""!==L,label:"YYMM",helperText:!_&&""!==L&&"Format must be YYMM",size:"small",style:{width:"100%"},onChange:function(e){return V(e.target.value)},value:L})]})]}),Object(w.jsx)(h.a,{variant:ae&&de.length?"contained":"outlined",color:ae&&de.length?"primary":"error",style:Object(s.a)(Object(s.a)({},ae&&de.length?Object(s.a)({},M):Object(s.a)({},k)),{},{width:"100%"}),onClick:function(){return S.send("mergeGfiFiles",{selectedGfiFiles:de})},children:"Merge GFI Files"})]}),Object(w.jsx)(y.a,{sx:{},orientation:"vertical"}),Object(w.jsx)(d.a,{sx:{flex:1,padding:5,display:"flex",flexDirection:"column"},children:Object(w.jsxs)("div",{style:Object(s.a)(Object(s.a)({},ae?Object(s.a)({},M):Object(s.a)({},k)),{},{height:"100%",display:"flex",flexDirection:"column"}),children:[Object(w.jsx)(d.a,{sx:Object(s.a)(Object(s.a)({},F),{},{marginTop:0}),children:"Select GFI Files"}),Object(w.jsx)("div",{style:{flex:1,width:"100%",overflow:"scroll"},children:Object(w.jsx)(v.a,{headerHeight:40,rows:se,columns:[{field:"name",headerName:"File Name",width:210},{field:"size",headerName:"Size",width:80},{field:"week",headerName:"Week",width:80},{field:"version",headerName:"Ver",width:60}],checkboxSelection:!0,selectionModel:ae&&de,onSelectionModelChange:function(e){be(e)},hideFooterPagination:!0,rowHeight:30})})]})})]})]})})},D=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,443)).then((function(t){var c=t.getCLS,a=t.getFID,i=t.getFCP,n=t.getLCP,l=t.getTTFB;c(e),a(e),i(e),n(e),l(e)}))};l.a.render(Object(w.jsx)(i.a.StrictMode,{children:Object(w.jsx)(C,{})}),document.getElementById("root")),D()}},[[363,1,2]]]);
//# sourceMappingURL=main.27d0b8a5.chunk.js.map