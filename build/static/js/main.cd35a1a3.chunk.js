(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{102:function(e,t,s){},103:function(e,t,s){},114:function(e,t,s){},115:function(e,t,s){},116:function(e,t,s){},118:function(e,t,s){},122:function(e,t,s){"use strict";s.r(t);var c=s(1),a=s(15),i=s.n(a),n=(s(59),s.p,s(60),s(10)),r=s(23),l=s(48),o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:localStorage.getItem("tok"),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"Auth":return t.auth;default:return e}},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SuggestionSet":return t.suggestions;default:return e}},j=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||r.c,u=s(3),b=s(4),m=(s(64),s(31)),h=s.n(m).a.create({baseURL:"https://fabromall-server.herokuapp.com/",headers:{Authorization:"Bearer ".concat(localStorage.getItem("tok"))}});h.interceptors.request.use((function(e){var t=localStorage.getItem("tok");return t&&(e.headers.Authorization="Bearer "+t),e}),(function(e){return Promise.reject(e)}));var p=h,O=s(0),f=Object(n.b)()((function(e){var t=Object(c.useState)(!1),s=Object(b.a)(t,2),a=s[0],i=s[1],n=Object(c.useState)(!1),r=Object(b.a)(n,2),l=r[0],o=r[1],d=Object(c.useState)({name:"",email:"",password:""}),j=Object(b.a)(d,2),m=j[0],h=j[1],f=Object(c.useState)(),x=Object(b.a)(f,2),v=x[0],g=x[1],y=Object(c.useState)(!1),N=Object(b.a)(y,2),k=N[0],w=N[1],S=Object(c.useState)(!1),C=Object(b.a)(S,2),B=C[0],E=C[1],I=Object(c.useState)({email:"",password:""}),L=Object(b.a)(I,2),M=L[0],T=L[1],A=Object(c.useState)(!1),F=Object(b.a)(A,2),D=F[0],_=F[1];Object(c.useEffect)((function(){document.getElementById("email-error")&&(document.getElementById("email-error").innerHTML=""),document.getElementById("error")&&(document.getElementById("error").innerHTML="")}),[a]),Object(c.useEffect)((function(){document.getElementById("password")&&(document.getElementById("password").type=l?"text":"password")}),[l]);return Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{className:"login-image"}),Object(O.jsx)("div",{className:"Login-Container",children:Object(O.jsxs)("div",{className:"login-wrapper",children:[Object(O.jsxs)("div",{className:"side-image",children:[Object(O.jsxs)("div",{style:{marginTop:"10px",marginLeft:"20px",fontSize:"18px"},children:[Object(O.jsx)("text",{style:{color:"#FF4545"},children:"fabro"}),Object(O.jsx)("text",{style:{color:"#374FCD"},children:"Mall"})]}),Object(O.jsx)("h3",{className:"quote",children:"Make Your Choice Wise"})]}),a?D?Object(O.jsxs)("div",{className:"sidebox",children:[Object(O.jsx)("h4",{className:"ExitButton",onClick:function(){i(!a),_(!1)},children:"x"}),Object(O.jsxs)("form",{onSubmit:function(e){!function(e){e.preventDefault(),console.log(e.target.vcode.value),p.post("/signup_check",{email:m.email,otp:e.target.vcode.value}).then((function(e){console.log(e.data),e.data.attempts?200===e.data.status?document.getElementById("verify-error").innerHTML="Signup Successful":(document.getElementById("verify-error").innerHTML="OTP is Incorrect! Please verify and try again",document.getElementById("verify-error").style.padding="0px 5px",document.getElementById("verify-error").style.width="100%",setTimeout((function(){document.getElementById("verify-error").style.width="0px",document.getElementById("verify-error").style.padding="0px 0px"}),4e3)):(document.getElementById("verify-error").innerHTML="Too many attempts! Please verify your mail and try again",document.getElementById("verify-error").style.padding="0px 5px",document.getElementById("verify-error").style.width="100%",setTimeout((function(){document.getElementById("verify-error").style.width="0px",document.getElementById("verify-error").style.padding="0px 0px"}),5e3))})).catch((function(e){console.log(e)}))}(e)},children:[Object(O.jsxs)("div",{className:"confirm-signup",children:[Object(O.jsx)("p",{className:"verify-error",id:"verify-error",children:"Too many attempts verify mail and signup again !"}),Object(O.jsx)("h2",{className:"verify-header",children:"Verify Code"}),Object(O.jsx)("div",{className:"verify-content",children:"A confirmation code was sent to your mail. please check the 5 digit code sent to your mail and enter below"}),Object(O.jsx)("label",{children:"Enter Code:"}),Object(O.jsx)("input",{type:"text",value:v,className:"verify-input",name:"vcode",onChange:function(e){e.target.value.match(/^\d{0,5}$/)&&g(e.target.value)}})]}),Object(O.jsx)("div",{className:"verify-btn",children:Object(O.jsx)("button",{children:"Verify"})})]})]}):Object(O.jsxs)("div",{className:"sidebox",children:[Object(O.jsx)("h4",{className:"ExitButton",onClick:function(){i(!a)},children:"x"}),Object(O.jsx)("p",{className:"error",id:"email-error"}),Object(O.jsx)("h2",{className:"Login-text",children:"SIGN UP"}),Object(O.jsx)("div",{className:"Login",children:Object(O.jsxs)("div",{children:[Object(O.jsx)("p",{id:"Sign_upMessage",style:{color:"red",textAlign:"center",fontWeight:"bold"}}),Object(O.jsxs)("form",{onSubmit:function(e){!function(e){e.preventDefault(),document.getElementById("submitButton").disabled="true",w(!0),(document.querySelector("#Sign_upMessage").innerHTML="! Email already exists")&&(document.querySelector("#Sign_upMessage").innerHTML=""),document.querySelector("#Sign_upMessage").innerHTML="",e.preventDefault(),p.post("/signup",m).then((function(e){document.getElementById("submitButton").disabled="false",console.log("response",e.data),w(!1),_(!0),document.getElementById("email-error").innerHTML=""})).catch((function(t){w(!1),t.response&&401===t.response.status&&(document.getElementById("email-error").innerHTML="Email already exists !",e.target.signupname.value="",e.target.signupemail.value="",e.target.signuppassword.value="",e.target.signupcontact.value="")}))}(e)},children:[Object(O.jsx)("div",{className:"s-user-div",children:Object(O.jsx)("i",{class:"fas fa-user-plus"})}),Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"contact-div",children:[Object(O.jsxs)("div",{className:"division_3",children:[Object(O.jsx)("div",{children:Object(O.jsx)("i",{class:"fas fa-user"})}),Object(O.jsx)("input",{name:"signupname",onChange:function(e){h(Object(u.a)(Object(u.a)({},m),{},{name:e.target.value}))},type:"text",className:"con-input",placeholder:"User-name",required:!0})]}),Object(O.jsxs)("div",{className:"division_3",children:[Object(O.jsx)("div",{children:Object(O.jsx)("i",{class:"fas fa-phone"})}),Object(O.jsx)("input",{name:"signupcontact",onChange:function(e){h(Object(u.a)(Object(u.a)({},m),{},{contact:e.target.value}))},type:"number",className:"con-input",placeholder:"Contact",required:!0})]})]}),Object(O.jsx)("br",{}),Object(O.jsx)("br",{}),Object(O.jsxs)("div",{className:"division_4",children:[Object(O.jsx)("div",{children:Object(O.jsx)("i",{class:"fas fa-envelope"})}),Object(O.jsx)("input",{name:"signupemail",onChange:function(e){h(Object(u.a)(Object(u.a)({},m),{},{email:e.target.value}))},type:"email",className:"input",placeholder:"Email-id",required:!0})]}),Object(O.jsx)("br",{}),Object(O.jsx)("br",{}),Object(O.jsxs)("div",{className:"division_5",children:[Object(O.jsx)("div",{children:Object(O.jsx)("i",{class:"fas fa-lock"})}),Object(O.jsx)("input",{onChange:function(e){h(Object(u.a)(Object(u.a)({},m),{},{password:e.target.value}))},type:"password",name:"signuppassword",placeholder:"Password",className:"input",id:"password"}),l?Object(O.jsx)("i",{onClick:function(){return o(!1)},class:"fas fa-eye"}):Object(O.jsx)("i",{onClick:function(){o(!0)},class:"fas fa-eye-slash"})]}),Object(O.jsx)("br",{}),Object(O.jsx)("br",{}),document.querySelector("#submitButton")&&void(m.name&&m.email&&m.password?document.querySelector("#submitButton").disabled=!1:document.querySelector("#submitButton").disabled=!0),Object(O.jsx)("div",{style:{textAlign:"center"},children:Object(O.jsx)("button",{className:"Submitbutton",id:"submitButton",disabled:!0,children:Object(O.jsx)("h3",{children:k?Object(O.jsx)("i",{class:"fas fa-circle-notch fa-spin"}):"Sign-up"})})})]})]})]})})]}):Object(O.jsxs)("div",{className:"sidebox",children:[Object(O.jsx)("p",{id:"error",className:"error"}),Object(O.jsx)("div",{className:"Login-text",children:Object(O.jsx)("h2",{children:"LOGIN"})}),Object(O.jsxs)("div",{className:"Login",children:[Object(O.jsx)("div",{className:"user-div",children:Object(O.jsx)("i",{class:"fas fa-user-circle",style:{borderRadius:"50%"}})}),Object(O.jsxs)("div",{children:[Object(O.jsxs)("form",{onSubmit:function(t){!function(t){t.preventDefault(),E(!0),p.post("/login",M).then((function(t){console.log(t.data),localStorage.setItem("tok",t.data.token),e.dispatch({type:"Auth",auth:localStorage.getItem("tok")}),E(!1)})).catch((function(e){E(!1),e.response&&401===e.response.status&&(document.getElementById("error").innerHTML="Invalid username or password !",t.target.email.value="",t.target.password.value="")}))}(t)},autoComplete:"on",children:[Object(O.jsxs)("div",{className:"division_1",children:[Object(O.jsx)("div",{children:Object(O.jsx)("i",{class:"fas fa-envelope"})}),Object(O.jsx)("input",{name:"email",onChange:function(e){T(Object(u.a)(Object(u.a)({},M),{},{email:e.target.value}))},type:"email",className:"input",placeholder:"Email-id"})]}),Object(O.jsxs)("div",{className:"division_2",children:[Object(O.jsx)("div",{children:Object(O.jsx)("i",{class:"fas fa-lock"})}),Object(O.jsx)("input",{name:"password",id:"password",onChange:function(e){T(Object(u.a)(Object(u.a)({},M),{},{password:e.target.value}))},type:"password",placeholder:"Password",className:"input"}),l?Object(O.jsx)("i",{onClick:function(){return o(!1)},class:"fas fa-eye"}):Object(O.jsx)("i",{onClick:function(){o(!0)},class:"fas fa-eye-slash"})]}),Object(O.jsx)("br",{}),Object(O.jsx)("br",{}),Object(O.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Object(O.jsx)("div",{className:"forgot-pass",children:"Forgot Password ?"}),Object(O.jsx)("button",{className:"Submitbutton",id:"loginButton",disabled:!0,children:Object(O.jsx)("h3",{children:B?Object(O.jsx)("i",{class:"fas fa-circle-notch fa-spin"}):"Log-in"})}),document.querySelector("#loginButton")&&void(M.email&&M.password?document.querySelector("#loginButton").disabled=!1:document.querySelector("#loginButton").disabled=!0)]})]}),Object(O.jsx)("br",{})]})]}),Object(O.jsxs)("div",{className:"new-user",children:[Object(O.jsx)("h4",{children:"New user ?"}),Object(O.jsx)("text",{href:"",className:"Register",onClick:function(){i(!a)},children:Object(O.jsx)("h5",{children:"Sign up"})})]})]})]})})]})})),x=s(14),v=s(49),g=s(50),y=s(21),N=s(54),k=s(53),w=s(51),S=s.n(w),C=(s(99),s(100),s(101),function(e){Object(N.a)(s,e);var t=Object(k.a)(s);function s(e){var c;return Object(v.a)(this,s),(c=t.call(this,e)).next=c.next.bind(Object(y.a)(c)),c.previous=c.previous.bind(Object(y.a)(c)),c}return Object(g.a)(s,[{key:"next",value:function(){this.slider.slickNext()}},{key:"previous",value:function(){this.slider.slickPrev()}},{key:"render",value:function(){var e=this;return Object(O.jsx)("div",{className:"slicker-container",children:Object(O.jsxs)("div",{className:"slicker-content",children:[Object(O.jsxs)(S.a,Object(u.a)(Object(u.a)({ref:function(t){return e.slider=t}},{dots:!0,infinite:!0,speed:1e3,autoplaySpeed:7e3,slidesToShow:1,slidesToScroll:1,centerMode:!0,variableWidth:!0,autoplay:!0}),{},{className:"custom-slider",children:[Object(O.jsx)("div",{className:"each-slick",children:Object(O.jsx)("div",{className:"img-div",id:"slider-1",children:Object(O.jsxs)("h1",{id:"quote-1",children:["World class Designs",Object(O.jsx)("br",{}),"For You"]})})}),Object(O.jsx)("div",{className:"each-slick",children:Object(O.jsx)("div",{className:"img-div",id:"slider-2",children:Object(O.jsxs)("h1",{id:"quote-3",children:["Good clothing makes",Object(O.jsx)("br",{}),"you feel better"]})})}),Object(O.jsx)("div",{className:"each-slick",children:Object(O.jsx)("div",{className:"img-div",id:"slider-3",children:Object(O.jsxs)("h1",{id:"quote-2",children:["Let your Surroundings",Object(O.jsx)("br",{}),"Look Colourful"]})})})]})),Object(O.jsxs)("div",{className:"slicker-button-div",style:{textAlign:"center"},children:[Object(O.jsx)("button",{className:"slick-button",onClick:this.previous,children:Object(O.jsx)("i",{class:"fas fa-angle-left","aria-hidden":"true"})}),Object(O.jsx)("button",{className:"slick-button",onClick:this.next,children:Object(O.jsx)("i",{class:"fas fa-angle-right"})})]})]})})}}]),s}(c.Component)),B=(s(102),Object(n.b)((function(e){return{suggestions:e.Suggestions}}))((function(e){var t=Object(c.useState)({}),s=Object(b.a)(t,2),a=s[0],i=s[1],n=Object(c.useState)([]),r=Object(b.a)(n,2),l=r[0],o=r[1];return Object(c.useEffect)((function(){p.get("/fetch_home_products").then((function(e){console.log(e.data),i(e.data)}))}),[]),Object(c.useEffect)((function(){o(e.suggestions)}),[e.suggestions]),Object(O.jsx)("div",{className:"home-container",children:Object(O.jsxs)("div",{className:"container",children:[Object(O.jsx)("div",{children:Object(O.jsx)(C,{})}),Object(O.jsx)("div",{className:"home-content",children:Object(O.jsx)("div",{className:"each-type",children:Object.keys(a).map((function(e,t){return Object(O.jsxs)("div",{children:[3===t&&Object(O.jsxs)("div",{className:"gallery",children:[Object(O.jsx)("div",{className:"gal-cont-rel",children:Object(O.jsx)("div",{className:"gal-cont",children:Object(O.jsx)("div",{className:"content",children:"The word 'fabric' also derives from Latin, with roots in the Proto-Indo-European language. Stemming most recently from the Middle French fabrique, or 'building, thing made', and earlier from the Latin fabrica ('workshop; an art, trade; skilful production, structure, fabric'), the noun fabrica stems from the Latin faber, or 'artisan who works in hard materials', which itself is derived from the Proto-Indo-European dhabh- , meaning 'to fit together.Textiles are made from many materials, with four main sources: animal (wool, silk), plant (cotton, flax, jute, bamboo), mineral (asbestos, glass fibre), and synthetic (nylon, polyester, acrylic, rayon)."})})}),Object(O.jsx)("div",{className:"grid-div-rel",children:Object(O.jsx)("div",{className:"grid-div",children:Object(O.jsxs)("div",{className:"grid-wrapper",children:[Object(O.jsx)("div",{className:"box-1"}),Object(O.jsx)("div",{className:"box-2"}),Object(O.jsx)("div",{className:"box-3"}),Object(O.jsx)("div",{className:"box-4"}),Object(O.jsx)("div",{className:"box-5"}),Object(O.jsx)("div",{className:"box-6"})]})})})]}),Object(O.jsxs)("div",{className:"type-container",children:[Object(O.jsxs)("div",{className:"type-title-div",children:[Object(O.jsxs)("div",{className:"type-title",children:[e[0].toUpperCase()+e.slice(1)," fabrics"]}),Object(O.jsx)("div",{className:"line"})]}),Object(O.jsx)("div",{className:"home-show",onMouseOver:function(){document.getElementById("homeshow-"+t).style.display="flex"},onMouseLeave:function(){document.getElementById("homeshow-"+t).style.display="none"},children:Object.values(a)[t].map((function(s,c){return Object(O.jsxs)("div",{className:"each-product",children:[5===c&&Object(O.jsxs)("div",{id:"homeshow-"+t,className:"hover-div",onClick:function(){new Promise((function(t){var s=[];l.filter((function(c){return c.typename.toLowerCase().includes(e.toLowerCase())&&(s=[].concat(Object(x.a)(s),[c]),t(s)),c.typename.toLowerCase().includes(e.toLowerCase())}))})).then((function(e){W.push({pathname:"products",state:{product:e}})}))},children:[Object(O.jsx)("div",{children:"See More"}),Object(O.jsx)("i",{class:"fas fa-arrow-circle-right"})]}),Object(O.jsx)("div",{className:"h-prd-img",children:Object(O.jsx)("img",{src:s.img})}),Object(O.jsxs)("div",{className:"h-prd-des",children:[Object(O.jsx)("div",{children:s.name}),Object(O.jsxs)("div",{className:"h-price",children:[Object(O.jsx)("i",{class:"fas fa-rupee-sign"}),"\xa0",s.price,".00"]})]})]})}))})]})]})}))})})]})})}))),E=(s(103),s(22)),I=function(e){return Object(O.jsx)("div",{className:"search-div",children:Object(O.jsxs)("form",{onSubmit:function(t){return e.searchprd(t)},autocomplete:"off",children:[Object(O.jsxs)("div",{className:"search-input-div",children:[Object(O.jsx)("input",{type:"text",value:e.suggestvalue,autocomplete:"off",onChange:function(t){e.setSuggestvalue(t)},onFocus:e.focus,onBlur:function(t){return e.blur(t)},name:"search",id:"search-id"}),Object(O.jsxs)("div",{id:"pseudo-placeholder",className:"pseudo-placeholder",style:{display:"".concat(""===e.suggestvalue?"block":"none")},children:[Object(O.jsx)("i",{class:"fas fa-search"}),"\xa0Search"]}),Object(O.jsx)("div",{id:"show-sugs",className:"show-sugs",style:{display:"".concat(0===e.searchfilter.length?"none":"block")},children:e.searchfilter.map((function(t){return Object(O.jsxs)("div",{className:"search-options",onClick:function(){e.setSuggestvaluetype(t.typename)},children:[Object(O.jsx)("div",{className:"search-sug-img-div",style:{backgroundImage:'url("'.concat(t.img,'")')}}),Object(O.jsx)("div",{className:"search-sug-name",children:t.typename})]})}))})]}),Object(O.jsx)("button",{className:"search-btn",children:Object(O.jsx)("i",{class:"fas fa-search"})})]})})},L=Object(n.b)((function(e){return{suggestions:e.Suggestions}}))((function(e){var t=Object(c.useState)([]),s=Object(b.a)(t,2),a=s[0],i=s[1],n=Object(c.useState)({prepage:1,centpage:2,postpage:3}),r=Object(b.a)(n,2),l=r[0],o=r[1],d=Object(c.useState)(["Bedsheet","Bath Towel","Quilt","Window Curtain","Apron"]),j=Object(b.a)(d,2),m=j[0],h=(j[1],Object(c.useState)([])),f=Object(b.a)(h,2),v=f[0],g=f[1],y=Object(c.useState)(1),N=Object(b.a)(y,2),k=N[0],w=N[1],S=Object(c.useState)(10),C=Object(b.a)(S,2),B=C[0],L=C[1],M=Object(c.useState)(["Price","Rating"]),T=Object(b.a)(M,2),A=T[0],F=(T[1],Object(c.useState)([{placeholder:"Price",value:[{label:Object(O.jsxs)("span",{children:["below\xa0\xa0",Object(O.jsx)("i",{class:"fas fa-rupee-sign",style:{marginRight:"3px",fontSize:"15px"}}),"250"]}),value:"null-300"},{label:Object(O.jsxs)("span",{children:[Object(O.jsx)("i",{class:"fas fa-rupee-sign",style:{marginRight:"3px",fontSize:"15px"}})," ","250 - 500"]}),value:"250-500"},{label:Object(O.jsxs)("span",{children:[Object(O.jsx)("i",{class:"fas fa-rupee-sign",style:{marginRight:"3px",fontSize:"15px"}})," ","500 - 1000"]}),value:"500-1000"},{label:Object(O.jsxs)("span",{children:["above\xa0\xa0",Object(O.jsx)("i",{class:"fas fa-rupee-sign",style:{marginRight:"3px",fontSize:"15px"}})," ","1000"]}),value:"1000-null"}]},{placeholder:"Rating",value:[{value:"chocolate",label:"Chocolate"},{value:"strawberry",label:"Strawberry"},{value:"vanilla",label:"Vanilla"}]},{placeholder:"Sold rate",value:[{value:"chocolates",label:"Chocolates"},{value:"strawberries",label:"Strawberries"},{value:"vanillas",label:"Vanillas"}]}])),D=Object(b.a)(F,2),_=D[0],P=(D[1],Object(c.useState)("")),q=Object(b.a)(P,2),z=q[0],H=q[1],R=Object(c.useState)([]),U=Object(b.a)(R,2),V=U[0],Y=U[1];Object(c.useEffect)((function(){window.addEventListener("scroll",G);var e=W.location.state?W.location.state.product:[{categoryname:"Bedroom",categoryvalue:"Bedroom",typename:"Bedsheet",typevalue:"Bedsheet"}];return p.post("/fetch_product",e).then((function(e){console.log(e.data.current),i(e.data.current.products),L(e.data.totalpages),w(e.data.current.currentpage),o({prepage:e.data.totalpages>=1&&1,centpage:e.data.totalpages>=2&&2,postpage:e.data.totalpages>=3&&3})})),console.log(W.location),function(){window.removeEventListener("scroll",G)}}),[]),Object(c.useEffect)((function(){Y(e.suggestions)}),[e.suggestions]),Object(c.useEffect)((function(){if(""===z)return g([]),0;var e=V.filter((function(e){return e.typename.toLowerCase().includes(z.toLowerCase())}));g(e)}),[z]);var G=function(){0===window.pageYOffset?document.getElementById("suggestion").style.boxShadow="none":document.getElementById("suggestion").style.boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"},X={option:function(e,t){return Object(u.a)(Object(u.a)({},e),{},{color:t.isSelected?"white":"#0C0C0C",padding:20,fontFamily:"poppins-reg"})},value:function(e){return Object(u.a)(Object(u.a)({},e),{},{fontFamily:"poppins-reg"})},placeholder:function(e){return Object(u.a)(Object(u.a)({},e),{},{fontFamily:"poppins-reg",fontSize:"14px",color:"#6B6B6B"})},singleValue:function(e,t){var s=t.isDisabled?.5:1;return Object(u.a)(Object(u.a)({},e),{},{opacity:s,transition:"opacity 300ms",fontFamily:"poppins-500",color:"#0C0C0C"})}},J=function(e){for(var t=[];0!==e;e--)t=[].concat(Object(x.a)(t),[Object(O.jsx)("i",{style:{color:"#FFE920"},class:"fas fa-star"})]);for(e=5-t.length;0!==e;e--)t=[].concat(Object(x.a)(t),[Object(O.jsx)("i",{id:"unmarked",style:{color:"#DDDDDD"},class:"fas fa-star"})]);return t},Q=function(e){e>1&&e<B&&o({prepage:e-1,centpage:e,postpage:e+1}),e>=1&&e<=B&&(w(e),setTimeout((function(){if(e===parseInt(document.getElementById("pg-highlight").innerHTML)){var t=12*(e-1);p.post("/pagination",{skip:t,limit:12}).then((function(t){console.log(t.data.current.products),i(t.data.current.products),w(e),e>1&&e<B&&o({prepage:e-1,centpage:e,postpage:e+1})}))}}),1e3))};return Object(O.jsxs)("div",{className:"products-container",children:[Object(O.jsx)("div",{id:"suggestion",className:"suggestions-div",children:Object(O.jsx)("div",{className:"container",children:Object(O.jsxs)("div",{className:"suggestions-wrapper",children:[Object(O.jsx)("div",{className:"suggestions",children:m.map((function(e){return Object(O.jsxs)("div",{className:"each-suggestion",children:[Object(O.jsx)("div",{className:"suggest-image",style:{backgroundImage:'url("https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f")'}}),Object(O.jsx)("div",{className:"sug-name",children:e})]})}))}),Object(O.jsx)(I,{suggestvalue:z,setSuggestvalue:function(e){return H(e.target.value)},focus:function(){document.getElementById("pseudo-placeholder").style.display="none",0!==v.length&&(document.getElementById("show-sugs").style.display="block")},blur:function(e){setTimeout((function(){document.getElementById("show-sugs").style.display="none"}),150),""===e.target.value&&(document.getElementById("pseudo-placeholder").style.display="block")},searchfilter:v,setSuggestvaluetype:function(e){H(e)},searchprd:function(e){!function(e){e.preventDefault(),e.target.search.blur(),0!==v.length&&(console.log("entering"),p.post("/fetch_product",v).then((function(e){console.log(e.data),i(e.data.current.products),L(e.data.totalpages),w(e.data.current.currentpage),o({prepage:e.data.totalpages>=1&&1,centpage:e.data.totalpages>=2&&2,postpage:e.data.totalpages>=3&&3})})))}(e)}})]})})}),Object(O.jsx)("div",{className:"container",children:Object(O.jsxs)("div",{className:"product-content",children:[Object(O.jsxs)("div",{className:"products-display-div",children:[Object(O.jsxs)("div",{className:"filter-sort",children:[Object(O.jsxs)("div",{className:"filter-div",children:[Object(O.jsxs)("div",{className:"filt-title",children:[Object(O.jsx)("div",{children:Object(O.jsx)("i",{class:"fas fa-filter"})}),Object(O.jsx)("div",{className:"filt-tit-text",children:"Filter by"})]}),Object(O.jsx)("div",{className:"filters",children:_.map((function(e){return Object(O.jsx)("div",{className:"select-div",children:Object(O.jsx)(E.a,{options:e.value,styles:X,placeholder:e.placeholder})})}))})]}),Object(O.jsxs)("div",{className:"sort-div",style:{marginTop:"35px"},children:[Object(O.jsxs)("div",{className:"sort-title",children:[Object(O.jsx)("div",{children:Object(O.jsx)("i",{class:"fas fa-sort-amount-down"})}),Object(O.jsx)("div",{className:"sort-tit-text",children:"Sort by"})]}),Object(O.jsxs)("div",{className:"sorts",children:[Object(O.jsx)("form",{onChange:function(e){return console.log(e.target.value)},children:A.map((function(e){return Object(O.jsx)("div",{className:"check-div",children:Object(O.jsxs)("label",{for:e,children:[Object(O.jsx)("input",{type:"radio",id:e,name:"sorting",value:e}),Object(O.jsx)("div",{className:"custom-radio",children:Object(O.jsx)("i",{class:"fas fa-check"})}),e]})})}))}),Object(O.jsx)("div",{className:"sort-select",children:Object(O.jsx)(E.a,{options:[{value:"Ascending",label:"Ascending"},{value:"Descending",label:"Descending"}],styles:X,defaultValue:[{value:"Ascending",label:"Ascending"}]})})]})]})]}),Object(O.jsx)("div",{className:"pds-list",children:a.map((function(e){return Object(O.jsxs)("div",{className:"each-prdct",children:[Object(O.jsx)("div",{className:"prdct-img-div",children:Object(O.jsx)("img",{src:e.img,className:"prd-img"})}),Object(O.jsxs)("div",{className:"prdct-des",children:[Object(O.jsx)("div",{className:"prdct-name",children:e.name}),Object(O.jsxs)("div",{className:"rating-div",children:[Object(O.jsxs)("div",{className:"rate",children:[J(e.rating).map((function(e){return e})),Object(O.jsxs)("div",{className:"rating-num",children:[e.rating,".0"]})]}),Object(O.jsx)("div",{className:"sold-rate",children:"(350)"})]}),Object(O.jsxs)("div",{className:"price-div",children:[Object(O.jsxs)("div",{className:"ogn-price",children:[Object(O.jsx)("i",{class:"fas fa-rupee-sign"})," ",e.price,".00",Object(O.jsx)("div",{className:"strike"})]}),Object(O.jsxs)("div",{className:"offer",children:[e.offer,"% off"]}),Object(O.jsxs)("div",{className:"dscnt-offer",children:[Object(O.jsx)("i",{class:"fas fa-rupee-sign"})," ",Math.round(e.price*(1-e.offer/100)),".00"]})]})]})]})}))})]}),Object(O.jsx)("div",{className:"pagination",children:Object(O.jsxs)("div",{className:"page-show",children:[Object(O.jsxs)("div",{onClick:function(){Q(k-1)},className:"pre-next pre-page",children:[Object(O.jsx)("i",{class:"fas fa-angle-left"}),"\xa0\xa0 Previous Page"]}),Object(O.jsxs)("div",{className:"e-page-wrap",children:[Object(O.jsxs)("div",{className:"page-info",children:[k," / ",B]}),Object(O.jsx)("div",{onClick:function(){Q(l.prepage)},className:"e-page",id:l.prepage===k&&"pg-highlight",children:l.prepage}),B>=2&&Object(O.jsx)("div",{onClick:function(){Q(l.centpage)},id:l.centpage===k&&"pg-highlight",className:"e-page",children:l.centpage}),B>=3&&Object(O.jsx)("div",{onClick:function(){Q(l.postpage)},className:"e-page",id:l.postpage===k&&"pg-highlight",children:l.postpage})]}),Object(O.jsxs)("div",{onClick:function(){Q(k+1)},className:"pre-next post-page",children:["Next Page\xa0\xa0",Object(O.jsx)("i",{class:"fas fa-angle-right"})]})]})})]})})]})})),M=(s(114),function(){var e=Object(c.useState)({img:"https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/bedsheet%2F104%20TC%20Cotton%20Double%20Floral%20Bedsheet(235-220cm)-399.jpeg?alt=media&token=5fe94faa-e093-4fdc-ae5e-bf28a6398025",name:"104 TC Cotton Double Floral Bedsheet",rating:4,wishlist:!1,cart:!1,stock:!0,offer:10,price:399,description:{size:"235 X 220cm",color:"Multicolor",package:"1"},model_number:"BE101T01",customer_review:[{name:"parthi vijay151",profile:"",likes:5,liked:!1,rating:3,review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie"},{name:"Sam Billy",profile:"",likes:2,liked:!1,rating:3,review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie"},{name:"Rishi 2001",profile:"",likes:4,liked:!0,rating:3,review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie"}]}),t=Object(b.a)(e,2),s=t[0],a=(t[1],function(e){for(var t=[];0!==e;e--)t=[].concat(Object(x.a)(t),[Object(O.jsx)("i",{style:{color:"#FFE920"},class:"fas fa-star"})]);for(e=5-t.length;0!==e;e--)t=[].concat(Object(x.a)(t),[Object(O.jsx)("i",{id:"unmarked",style:{color:"#DDDDDD"},class:"fas fa-star"})]);return t}),i={option:function(e,t){return Object(u.a)(Object(u.a)({},e),{},{color:t.isSelected?"white":"#0C0C0C",padding:20,fontFamily:"poppins-reg"})},value:function(e){return Object(u.a)(Object(u.a)({},e),{},{fontFamily:"poppins-reg"})},placeholder:function(e){return Object(u.a)(Object(u.a)({},e),{},{fontFamily:"poppins-reg",fontSize:"14px",color:"#6B6B6B"})},singleValue:function(e,t){var s=t.isDisabled?.5:1;return Object(u.a)(Object(u.a)({},e),{},{opacity:s,transition:"opacity 300ms",fontFamily:"poppins-500",color:"#0C0C0C"})}};return Object(O.jsx)("div",{className:"each-prd-container",children:Object(O.jsxs)("div",{className:"container",children:[Object(O.jsxs)("div",{className:"sub-header",children:[Object(O.jsxs)("div",{children:["Bedroom Fabrics ",Object(O.jsx)("text",{style:{color:"black"},children:"|"})," Bedsheet"]}),Object(O.jsxs)("div",{className:"ep-search-div",children:[Object(O.jsx)("input",{type:"text",onFocus:function(){document.getElementById("pseudo-placeholder").style.display="none"},onBlur:function(e){""===e.target.value&&(document.getElementById("pseudo-placeholder").style.display="block")}}),Object(O.jsxs)("div",{id:"pseudo-placeholder",className:"pseudo-placeholder",children:[Object(O.jsx)("i",{class:"fas fa-search"}),"\xa0Search"]}),Object(O.jsx)("div",{className:"search-btn",children:Object(O.jsx)("i",{class:"fas fa-search"})})]})]}),Object(O.jsxs)("div",{className:"product-display",children:[Object(O.jsxs)("div",{className:"product-wrapper",children:[Object(O.jsx)("div",{className:"ep-img-div",children:Object(O.jsx)("img",{src:s.img,className:"ep-img"})}),Object(O.jsxs)("div",{className:"prd-des",children:[Object(O.jsxs)("div",{className:"prd-name",children:[s.name," ",Object(O.jsxs)("span",{className:"name-color",children:[Object(O.jsx)("span",{className:"bracket",children:"("}),s.description.color,Object(O.jsx)("span",{className:"bracket",children:")"})]})]}),Object(O.jsxs)("div",{className:"rating-div",style:{justifyContent:"flex-start"},children:[Object(O.jsxs)("div",{className:"rate",id:"ep-ref",children:[a(s.rating).map((function(e){return e})),Object(O.jsxs)("div",{className:"rating-num",children:[s.rating,".0"]})]}),Object(O.jsx)("div",{className:"sold-rate",style:{marginLeft:"10px"},children:"(350)"})]}),Object(O.jsx)("div",{id:"ep-price-div",className:"price-div",children:Object(O.jsxs)("div",{id:"ep-price",className:"price-div",children:[Object(O.jsxs)("div",{className:"ogn-price",children:[Object(O.jsx)("i",{class:"fas fa-rupee-sign"})," ",s.price,".00",Object(O.jsx)("div",{className:"strike"})]}),Object(O.jsxs)("div",{className:"offer",children:[s.offer,"% off"]}),Object(O.jsxs)("div",{className:"dscnt-offer",children:[Object(O.jsx)("i",{class:"fas fa-rupee-sign"})," ",Math.round(s.price*(1-s.offer/100)),".00"]})]})}),Object(O.jsx)("div",{className:"stock-div",children:s.stock?Object(O.jsxs)("div",{className:"stock-in",children:[Object(O.jsx)("i",{class:"fas fa-check-circle"}),"Stock Available"]}):Object(O.jsx)("div",{children:"Out of Stock"})}),Object(O.jsxs)("div",{className:"prd-info",children:[Object(O.jsx)("div",{children:"Product Details"}),Object(O.jsx)("div",{className:"prd-info-breaker"}),Object(O.jsxs)("div",{className:"prd-det",children:[Object(O.jsxs)("div",{children:["size: ",s.description.size]}),Object(O.jsxs)("div",{children:["package: Pack of ",s.description.package]}),Object(O.jsxs)("div",{children:["color: ",s.description.color]})]})]}),Object(O.jsx)("div",{className:"add-wish",children:s.wishlist?Object(O.jsxs)("div",{className:"added-wish",children:[Object(O.jsx)("i",{class:"fas fa-heart"})," ",Object(O.jsx)("text",{children:"Added to wishlist"})]}):Object(O.jsxs)("div",{className:"unadded-wish",children:[Object(O.jsx)("i",{class:"far fa-heart"})," ",Object(O.jsx)("text",{children:"Add to wishlist"})]})}),Object(O.jsxs)("div",{className:"ep-btn-div",children:[Object(O.jsxs)("button",{children:[Object(O.jsx)("i",{class:"fas fa-shopping-cart"}),"\xa0\xa0Add to Cart"]}),Object(O.jsxs)("button",{children:[Object(O.jsx)("i",{class:"fas fa-box-open"}),"\xa0\xa0Place Order"]})]})]})]}),Object(O.jsxs)("div",{className:"add-review",children:[Object(O.jsx)("div",{className:"add-rev-title",children:"Add Your Review"}),Object(O.jsx)("form",{children:Object(O.jsxs)("div",{className:"review-form",children:[Object(O.jsx)("label",{children:"Enter your review :"}),Object(O.jsx)("textarea",{className:"txt-area"}),Object(O.jsxs)("div",{className:"my-rev-rat",children:[Object(O.jsx)("label",{children:"Enter your rating :"}),Object(O.jsx)("div",{style:{height:"5px"}}),Object(O.jsx)(E.a,{styles:i,options:[{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5}],placeholder:"Product Rating"})]}),Object(O.jsx)("div",{className:"rev-btn-div",children:Object(O.jsx)("button",{className:"rev-btn",children:"Add"})})]})})]})]}),Object(O.jsx)("div",{className:"ep-line"}),Object(O.jsxs)("div",{className:"cus-review",children:[Object(O.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"10px",color:"#101010",fontSize:"20px"},children:"Customer Review"}),Object(O.jsx)("div",{className:"review-div",children:s.customer_review.map((function(e){return Object(O.jsxs)("div",{className:"each-review",children:[Object(O.jsxs)("div",{className:"rev-prf-div",children:[Object(O.jsxs)("div",{className:"rev-prf",children:[Object(O.jsx)("div",{className:"user-prf-pic"}),Object(O.jsx)("div",{style:{marginLeft:"5px"},children:e.name})]}),Object(O.jsxs)("div",{className:"rev-likes",children:[e.liked?Object(O.jsx)("i",{class:"fas fa-heart"}):Object(O.jsx)("i",{class:"far fa-heart"}),e.likes]})]}),Object(O.jsx)("div",{className:"rev-message",children:e.review}),Object(O.jsxs)("div",{className:"my-rating",children:["My Rating: ",a(e.rating).map((function(e){return e}))]})]})}))})]})]})})}),T=s(52),A=s.n(T),F=s(5),D=s(28),_=(s(115),s(116),function(){return Object(O.jsxs)("div",{className:"toggle-div",children:[Object(O.jsx)("div",{className:"toggle"}),Object(O.jsx)("div",{className:"toggle"}),Object(O.jsx)("div",{className:"toggle"})]})}),P=s(17),q=function(){var e=Object(c.useState)([{name:"Home",to:"home",icon:Object(O.jsx)("icon",{style:{fontSize:"22px",color:"#636363",marginTop:"-3px"},class:"fas fa-home"})},{name:"My Cart",to:"my_cart",icon:Object(O.jsx)("icon",{style:{fontSize:"22px",color:"#636363"},class:"fas fa-shopping-cart"})},{name:"My WishList",to:"my_wishlist",icon:Object(O.jsx)("icon",{style:{fontSize:"22px",color:"#636363"},class:"fas fa-heart"})},{name:"My Orders",to:"my_orders",icon:Object(O.jsx)("icon",{style:{fontSize:"22px",color:"#636363"},class:"fas fa-box-open"})},{name:"My Account",to:"my_account",icon:Object(O.jsx)("icon",{style:{fontSize:"25px",color:"#636363"},class:"fas fa-user-circle"})},{name:"Notifications",to:"notifications",icon:Object(O.jsx)("icon",{style:{fontSize:"22px",color:"#636363"},class:"fas fa-bell"})}]),t=Object(b.a)(e,2),s=t[0],a=(t[1],Object(c.useState)(!1)),i=Object(b.a)(a,2),n=i[0],r=i[1];return Object(O.jsxs)("div",{className:"header-container",children:[Object(O.jsx)("div",{className:"container",children:Object(O.jsxs)("div",{className:"header-content",children:[Object(O.jsx)("div",{onClick:function(){r(!0)},style:{cursor:"pointer"},children:Object(O.jsx)(_,{})}),Object(O.jsx)("div",{className:"title",children:Object(O.jsx)("h3",{children:"fabroMall"})}),Object(O.jsx)("div",{className:"cart-icon",children:Object(O.jsx)("i",{class:"fas fa-shopping-cart"})})]})}),n&&Object(O.jsx)("div",{className:"sidebar-container",children:Object(O.jsxs)("div",{className:"sidebar-wrapper",children:[Object(O.jsx)("h4",{className:"ExitButton",onClick:function(){r(!1)},children:"x"}),Object(O.jsxs)("div",{className:"profile-pic-div",children:[Object(O.jsx)("div",{className:"profile-pic"}),Object(O.jsx)("div",{children:"Tony Stark H"})]}),Object(O.jsx)("div",{className:"navigations-div",children:s.map((function(e){return Object(O.jsx)(P.a,{to:e.to,className:"nav-link",activeClassName:"active-nav",children:Object(O.jsxs)("div",{className:"each-nav",children:[Object(O.jsx)("div",{className:"hdr-icon-div",children:e.icon}),Object(O.jsx)("div",{className:"nav-name",children:e.name})]})})}))})]})})]})},z=(s(118),function(){var e=Object(c.useState)({Account:[{link:"My Account",icon:"",href:""},{link:"My Cart",icon:"",href:""},{link:"My Wishlist",icon:"",href:""},{link:"Order History",icon:"",href:""}],"Help Center":[{link:"Product issues",icon:"",href:""},{link:"Report",icon:"",href:""},{link:"Feedback",icon:"",href:""}],"Follow Us":[{link:"Instagram",icon:"fab fa-instagram",href:""},{link:"Facebook",icon:"fab fa-facebook-f",href:""}],"Contact Us":[{link:"Make a call",icon:"fas fa-phone",href:""},{link:"Mail Us",icon:"fas fa-envelope",href:""},{link:"Whatsapp",icon:"fab fa-whatsapp",href:""}]}),t=Object(b.a)(e,2),s=t[0];t[1];return Object(O.jsx)("div",{className:"footer-container",children:Object(O.jsx)("div",{className:"container",children:Object(O.jsxs)("div",{className:"footer-content",children:[Object(O.jsx)("div",{className:"footer-wrapper",children:Object.keys(s).map((function(e,t){return Object(O.jsx)("div",{className:"each-foot",children:Object(O.jsxs)("div",{className:"footer-title-div",children:[Object(O.jsx)("h3",{className:"footer-title",children:e}),Object(O.jsx)("div",{className:"each-ft-cnt-div",children:Object.values(s)[t].map((function(e){return Object(O.jsxs)("a",{href:e.href?e.href:null,className:"each-link",children:[e.icon&&Object(O.jsx)("i",{class:e.icon})," ",e.link]})}))})]})})}))}),Object(O.jsx)("div",{className:"footer-line"}),Object(O.jsxs)("div",{className:"privacy",children:[Object(O.jsx)("div",{children:"Terms & Conditions"}),Object(O.jsx)("div",{children:"Privacy Policy"})]})]})})})}),H=["isAuthenticated","component"],R=Object(n.b)((function(e){return{isAuthenticated:e.Auth}}))((function(e){var t=e.isAuthenticated,s=e.component,c=Object(D.a)(e,H);return Object(O.jsxs)("div",{children:[Object(O.jsx)(q,{}),Object(O.jsx)(F.b,Object(u.a)(Object(u.a)({},c),{},{component:function(e){return t?Object(O.jsx)("div",{children:Object(O.jsx)(s,Object(u.a)({},e))}):Object(O.jsx)("div",{children:Object(O.jsx)(F.a,{to:"/"})})}})),Object(O.jsx)(z,{})]})})),U=["isAuthenticated","component"],V=Object(n.b)((function(e){return{isAuthenticated:e.Auth}}))((function(e){var t=e.isAuthenticated,s=e.component,c=Object(D.a)(e,U);return Object(O.jsx)("div",{children:Object(O.jsx)(F.b,Object(u.a)(Object(u.a)({},c),{},{component:function(e){return t?Object(O.jsx)(F.a,{to:"/home"}):Object(O.jsx)("div",{children:Object(O.jsx)(s,Object(u.a)({},e))})}}))})})),W=A()(),Y=function(){return Object(O.jsx)(F.c,{history:W,children:Object(O.jsx)("div",{children:Object(O.jsxs)(F.d,{children:[Object(O.jsx)(V,{path:"/",component:f,exact:!0}),Object(O.jsx)(R,{path:"/home",component:B}),Object(O.jsx)(R,{path:"/products",component:L}),Object(O.jsx)(R,{path:"/eachproduct",component:M}),Object(O.jsx)(F.b,{path:""})]})})})},G=Object(r.d)(Object(r.b)({Auth:o,Suggestions:d}),j(Object(r.a)(l.a)));var X=function(){return Object(c.useEffect)((function(){p.get("/suggestions").then((function(e){console.log(e.data),G.dispatch({type:"SuggestionSet",suggestions:e.data})}))}),[]),Object(O.jsx)("div",{children:Object(O.jsx)(n.a,{store:G,children:Object(O.jsx)(Y,{})})})},J=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,123)).then((function(t){var s=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,n=t.getTTFB;s(e),c(e),a(e),i(e),n(e)}))};i.a.render(Object(O.jsx)(X,{}),document.getElementById("root")),J()},59:function(e,t,s){},60:function(e,t,s){},64:function(e,t,s){},99:function(e,t,s){}},[[122,1,2]]]);
//# sourceMappingURL=main.cd35a1a3.chunk.js.map