import{r as e,R as t,M as o,F as a,B as r,v as n,a as l,b as c}from"./vendor.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var s="PoETradeHelper_Bookmarks",i="PoETradeHelper_History";function m(l){const[c,s]=e.exports.useState(l.bookmarkFolder?l.bookmarkFolder.name:""),[i,m]=e.exports.useState(l.bookmarkFolder?l.bookmarkFolder.bgColor:"#133d62");return t.createElement(o,{show:l.show,onHide:()=>l.setShow(!1),animation:!1},t.createElement(o.Header,{closeButton:!0},t.createElement(o.Title,null,l.bookmarkFolder?"Edit":"Create"," a folder")),t.createElement(o.Body,null,t.createElement(a.Group,{className:"mb-3"},t.createElement(a.Label,null,"Name:"),t.createElement(a.Control,{value:c,onChange:e=>s(e.currentTarget.value)})),t.createElement(a.Group,{className:"mb-3"},t.createElement(a.Label,null,"Background color:"),t.createElement(a.Control,{value:i,type:"color",onInput:e=>m(e.currentTarget.value)}))),t.createElement(o.Footer,null,t.createElement(r,{variant:"primary",onClick:function(){c&&i&&(l.bookmarkFolder&&l.editBookmarkFolder?(l.bookmarkFolder.name=c,l.bookmarkFolder.bgColor=i,l.editBookmarkFolder(l.bookmarkFolder)):l.addBookmarkFolder&&l.addBookmarkFolder({id:n(),name:c,bgColor:i,bookmarks:[]}),l.setShow(!1))}},l.bookmarkFolder?"Save":"Add")))}function d(e){if(e&&7===e.length){return(299*parseInt(e.substr(1,2),16)+587*parseInt(e.substr(3,2),16)+114*parseInt(e.substr(5,2),16))/1e3>=127.5?"#000":"#e2e2e2"}return""}function u(e){return new Promise((t=>{setTimeout(t,e)}))}function k(l){const[c,s]=e.exports.useState(l.bookmark?l.bookmark.name:""),[i,m]=e.exports.useState(l.bookmark?l.bookmark.url:window.location.href),[d,u]=e.exports.useState(l.bookmark?l.bookmark.bgColor:"#222");return e.exports.useEffect((()=>{let e=$("input.multiselect__input");l.bookmark||s(e[0].value?e[0].value:"Any"===e[1].value?"":e[1].value)}),[]),t.createElement(o,{show:l.show,onHide:()=>l.setShow(!1),animation:!1},t.createElement(o.Header,{closeButton:!0},t.createElement(o.Title,null,l.bookmark?"Edit":"Create"," a bookmark")),t.createElement(o.Body,null,t.createElement(a.Group,{className:"mb-3"},t.createElement(a.Label,null,"Name:"),t.createElement(a.Control,{value:c,onChange:e=>s(e.currentTarget.value)})),t.createElement(a.Group,{className:"mb-3"},t.createElement(a.Label,null,"URL:"),t.createElement(a.Control,{value:i,onChange:e=>m(e.currentTarget.value)})),t.createElement(a.Group,{className:"mb-3"},t.createElement(a.Label,null,"Background color:"),t.createElement(a.Control,{value:d,type:"color",onInput:e=>u(e.currentTarget.value)}))),t.createElement(o.Footer,null,t.createElement(r,{variant:"primary",onClick:function(){c&&i&&d&&(l.bookmark&&l.editBookmark?(l.bookmark.name=c,l.bookmark.url=i,l.bookmark.bgColor=d,l.editBookmark(l.bookmark)):l.addBookmark&&l.addBookmark({id:n(),name:c,url:i,bgColor:d}),l.setShow(!1))}},l.bookmark?"Save":"Add")))}function b(o){const[a,r]=e.exports.useState(!1),n={backgroundColor:o.bookmark.bgColor,color:d(o.bookmark.bgColor)};return t.createElement("div",{className:"d-flex"},t.createElement("a",{href:o.bookmark.url,className:"flex-grow-1 p-1 bookmark-entry",style:n},o.bookmark.name),t.createElement("button",{className:"helper-btn",onClick:()=>o.moveBookmark(o.bookmark,-1)},t.createElement("i",{className:"bi bi-chevron-up"})),t.createElement("button",{className:"helper-btn",onClick:()=>o.moveBookmark(o.bookmark,1)},t.createElement("i",{className:"bi bi-chevron-down"})),t.createElement("button",{className:"helper-btn",onClick:()=>r(!0)},t.createElement("i",{className:"bi bi-pencil-fill"})),t.createElement("button",{className:"helper-btn",onClick:()=>o.deleteBookmark(o.bookmark)},t.createElement("i",{className:"bi bi-trash"})),a&&t.createElement(k,{show:a,setShow:r,editBookmark:o.editBookmark,bookmark:o.bookmark}))}function p(o){const[a,r]=e.exports.useState(!1),[n,c]=e.exports.useState(!1),s={backgroundColor:o.folder.bgColor,color:d(o.folder.bgColor)};function i(e){const t=o.folder.bookmarks.findIndex((t=>t.id===e.id));-1!==t&&(o.folder.bookmarks.splice(t,1),o.updateBookmarkFolder(o.folder))}function u(e){const t=o.folder.bookmarks.findIndex((t=>t.id===e.id));-1!==t&&(o.folder.bookmarks[t]=e,o.updateBookmarkFolder(o.folder))}function p(e,t){const a=o.folder.bookmarks.findIndex((t=>t.id===e.id)),r=a+t;-1!==a&&r>=0&&r<o.folder.bookmarks.length&&(l(o.folder.bookmarks,a,r),o.updateBookmarkFolder(o.folder))}return t.createElement("div",{className:"accordion-item mt-1"},t.createElement("h2",{className:"accordion-header",id:"header_"+o.folder.id},t.createElement("button",{className:"accordion-button collapsed",type:"button",style:s,"data-bs-toggle":"collapse","data-bs-target":"#content_"+o.folder.id,"aria-expanded":"false","aria-controls":"content_"+o.folder.id},t.createElement("div",{className:"me-auto"},o.folder.name),t.createElement("button",{className:"helper-btn",onClick:()=>o.moveBookmarkFolder(o.folder,-1)},t.createElement("i",{className:"bi bi-chevron-up"})),t.createElement("button",{className:"helper-btn",onClick:()=>o.moveBookmarkFolder(o.folder,1)},t.createElement("i",{className:"bi bi-chevron-down"})),t.createElement("button",{className:"helper-btn",onClick:()=>c(!0)},t.createElement("i",{className:"bi bi-pencil-fill"})),t.createElement("button",{className:"helper-btn",onClick:()=>o.deleteBookmarkFolder(o.folder)},t.createElement("i",{className:"bi bi-trash"})),n&&t.createElement(m,{show:n,setShow:c,editBookmarkFolder:o.updateBookmarkFolder,bookmarkFolder:o.folder}))),t.createElement("div",{id:"content_"+o.folder.id,className:"accordion-collapse collapse","aria-labelledby":"header_"+o.folder.id},t.createElement("div",{className:"accordion-body"},o.folder.bookmarks.map((e=>t.createElement(b,{key:e.id,bookmark:e,deleteBookmark:i,moveBookmark:p,editBookmark:u}))),t.createElement("button",{className:"helper-btn w-100",onClick:()=>r(!0)},"Add new bookmark"),a&&t.createElement(k,{show:a,setShow:r,addBookmark:function(e){o.folder.bookmarks.push(e),o.updateBookmarkFolder(o.folder)}}))))}function f(){const[o,a]=e.exports.useState([]),[r,n]=e.exports.useState(!1);function c(e){const t=[...o],r=t.findIndex((t=>t.id===e.id));-1!==r&&(t[r]=e,window.localStorage.setItem(s,JSON.stringify(t)),a(t))}function i(e){const t=[...o],r=t.findIndex((t=>t.id===e.id));-1!==r&&(t.splice(r,1),window.localStorage.setItem(s,JSON.stringify(t)),a(t))}function d(e,t){const r=[...o],n=r.findIndex((t=>t.id===e.id)),c=n+t;-1!==n&&c>=0&&c<r.length&&(l(r,n,c),window.localStorage.setItem(s,JSON.stringify(r)),a(r))}return e.exports.useEffect((()=>{const e=window.localStorage.getItem(s);e?a(JSON.parse(e)):window.localStorage.setItem(s,JSON.stringify(o))}),[]),t.createElement(t.Fragment,null,t.createElement("button",{className:"helper-btn",onClick:function(){n(!0)}},"Create a folder"),t.createElement("hr",null),t.createElement("div",{className:"accordion"},o.map((e=>t.createElement(p,{key:e.id,folder:e,updateBookmarkFolder:c,deleteBookmarkFolder:i,moveBookmarkFolder:d})))),r&&t.createElement(m,{show:r,setShow:n,addBookmarkFolder:function(e){const t=[...o];t.push(e),window.localStorage.setItem(s,JSON.stringify(t)),a(t)}}))}function E(e){return t.createElement("div",{"history-id":e.entry.id,className:"history-entry"},t.createElement("a",{href:e.entry.url,style:{flexGrow:1}},t.createElement("div",{className:"d-flex"},t.createElement("b",{className:"history-title"},e.entry.title),t.createElement("small",{className:"ms-auto"},function(e){let t=new Date,o=t.getTime();t.setDate(0);let a=o-e;if(a<36e5){let e=Math.floor(a/1e3/60);return e+" minute"+(e<=1?"":"s")+" ago"}if(a<864e5){let e=Math.floor(a/1e3/60/60);return e+" hour"+(e<=1?"":"s")+" ago"}if(a<864e5*t.getDate()){let e=Math.floor(a/1e3/60/60/24);return e+" day"+(e<=1?"":"s")+" ago"}return"a long time ago"}(e.entry.time))),t.createElement("small",{style:{color:"gray"}},"...",e.entry.url.substring(e.entry.url.indexOf("/trade/")))))}function h(){const o=e.exports.useState(0)[1],a=e.exports.useRef([]);function r(e){if("click"===e.type||"keydown"===e.type&&"Enter"===e.key){let e=setInterval((()=>{if(/\/trade\/search\/\w+\/\w+/.test(window.location.pathname)&&(clearInterval(e),0==a.current.length||a.current[a.current.length-1].url!==window.location.href)){let e=$("input.multiselect__input"),t=e[0].value?e[0].value:e[1].value;a.current.push({id:n(),title:t,url:window.location.href,time:Date.now()}),window.localStorage.setItem(i,JSON.stringify(a.current)),o((e=>e+1))}}),1e3)}}return e.exports.useEffect((()=>{const e=window.localStorage.getItem(i);if(e){let t=JSON.parse(e);a.current.push(...t)}else window.localStorage.setItem(i,JSON.stringify(a.current));!async function(e){document.body.addEventListener("keydown",e);let t=document.body.querySelector("button.search-btn");for(;!t;)await u(1e3);t.addEventListener("click",e)}(r)}),[]),t.createElement("div",null,a.current.slice().reverse().map((e=>t.createElement(E,{entry:e}))))}let g;function v(e){setInterval((()=>{if(-1===window.location.href.indexOf("exchange")){$(".results span.pull-left:not(.checked)").each(((t,o)=>{let a=$('<button class="btn btn-default whisper-btn">Pin</button>');a.on("click",e),$(o).append(a),$(o).addClass("checked")})),$('span[data-field="price"][helper-checked!="ok"]').has('span.currency-image > img[title!="chaos"]').each(((e,t)=>{let o=y(t)[2];$(t).append(`<br/><span>&#8776;</span> <span>${o}<span>×</span><span><img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png" alt="chaos" title="chaos"></span></span>`),t.setAttribute("helper-checked","ok")}));let t=function(){let e=$("div.search-advanced-pane.brown div.filter-group.expanded div.filter.full-span:not(.disabled) div.filter-title"),t=[];return e.each(((e,o)=>{var a;let r=null==(a=$(o).contents()[1].textContent)?void 0:a.trim();r=null==r?void 0:r.replace(/[\\+\\-]?#/g,"[\\+\\-]?[0-9.]+"),r&&t.push(r)})),t}();$('div[data-mod] span[data-field][helper-checked!="ok"]').each(((e,o)=>{for(const a of t)if(a&&o.textContent&&RegExp(a).test(o.textContent)){o.style.backgroundColor="#484703",o.style.color="#e2e2e2",o.setAttribute("helper-checked","ok");break}}))}}),2e3)}function y(e){var t;let o=e.querySelectorAll("span"),a=o[1].textContent,r=null==(t=o[3].querySelector("span"))?void 0:t.textContent,n=0;if("Chaos Orb"!==r&&g){for(const e of g.lines)if(e.currencyTypeName===r){n=e.chaosEquivalent;break}return[a,r,(parseFloat(a)*n).toFixed(2)]}return[a,r]}function w(e){var o;const[a,r,n]=y(e.parentElement.querySelector('span[data-field="price"]')),l=null==(o=g.currencyDetails.find((e=>e.name.toLowerCase()===(null==r?void 0:r.toLowerCase()))))?void 0:o.icon;return t.createElement("div",null,t.createElement("div",{dangerouslySetInnerHTML:{__html:e.itemElement.outerHTML}}),t.createElement("div",{style:{padding:".5em",backgroundColor:"#000"}},"Price: ",a," ",l?t.createElement(t.Fragment,null,"× ",t.createElement("img",{src:l,width:"28px"})):r,n&&t.createElement(t.Fragment,null," ≈ ",n," × ",t.createElement("img",{src:"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png",width:"28px"})),t.createElement("br",null)),t.createElement("button",{className:"helper-btn",onClick:()=>e.removePin(e.index)},"Remove"),t.createElement("button",{className:"helper-btn",onClick:()=>function(){let t=e.parentElement.getBoundingClientRect(),o=Math.floor(window.innerHeight/2-t.height/2),a=Math.floor(t.top-o);Math.floor(t.top)!=o&&(window.scrollBy(0,a),e.parentElement.style.transition="background 0.5s linear",e.parentElement.style.background="#ffffff50",setTimeout((()=>{e.parentElement.style.background=""}),500))}()},"Scroll to"),t.createElement("hr",null))}function N(){const o=e.exports.useState(0)[1],a=()=>o((e=>e+1)),r=e.exports.useRef([]);function n(e){e>=0&&e<r.current.length&&(r.current.splice(e,1),a())}e.exports.useEffect((()=>{!async function(e){var t,o;let a=e||(null==(t=document.querySelector("span.multiselect__single"))?void 0:t.textContent);for(;void 0===a;)await u(2e3),a=null==(o=document.querySelector("span.multiselect__single"))?void 0:o.textContent;SendGetRequest(`https://poe.ninja/api/data/currencyoverview?league=${a}&type=Currency`).then((e=>{g=e})).catch((e=>{console.error("Failed updating prices:",e)}))}(),v(l)}),[]);const l=e=>{var t,o,n,l;let c=null==(l=null==(n=null==(o=null==(t=e.currentTarget.parentElement)?void 0:t.parentElement)?void 0:o.parentElement)?void 0:n.parentElement)?void 0:l.parentElement,s=c.querySelector("div.itemPopupContainer");$(s).css("margin","0px"),$(s).css("margin-top","0.5em"),r.current.push([s,c]),a()};return t.createElement(t.Fragment,null,r.current.map((e=>t.createElement(w,{key:r.current.indexOf(e),index:r.current.indexOf(e),itemElement:e[0],parentElement:e[1],removePin:n}))))}function C(){return t.createElement(t.Fragment,null)}function S(e){const o={display:e.isOpen?"block":"none"};return t.createElement("div",{id:"helper-tabs",style:o},t.createElement("ul",{className:"nav nav-tabs px-1",role:"tablist"},t.createElement("li",{className:"nav-item",role:"presentation"},t.createElement("button",{className:"nav-link active",id:"bookmark-tab","data-bs-toggle":"tab","data-bs-target":"#bookmark",type:"button",role:"tab","aria-controls":"bookmark","aria-selected":"true"},"Bookmarks")),t.createElement("li",{className:"nav-item",role:"presentation"},t.createElement("button",{className:"nav-link",id:"pins-tab","data-bs-toggle":"tab","data-bs-target":"#pins",type:"button",role:"tab","aria-controls":"pins","aria-selected":"false"},"Pins")),t.createElement("li",{className:"nav-item",role:"presentation"},t.createElement("button",{className:"nav-link",id:"history-tab","data-bs-toggle":"tab","data-bs-target":"#history",type:"button",role:"tab","aria-controls":"history","aria-selected":"false"},"History")),t.createElement("li",{className:"nav-item",role:"presentation"},t.createElement("button",{className:"nav-link",id:"settings-tab","data-bs-toggle":"tab","data-bs-target":"#settings",type:"button",role:"tab","aria-controls":"settings","aria-selected":"false"},"Settings"))),t.createElement("div",{className:"tab-content"},t.createElement("div",{className:"tab-pane overflow-auto active",id:"bookmark",role:"tabpanel","aria-labelledby":"bookmark-tab"},t.createElement(f,null)),t.createElement("div",{className:"tab-pane overflow-auto",id:"pins",role:"tabpanel","aria-labelledby":"pins-tab"},t.createElement(N,null)),t.createElement("div",{className:"tab-pane overflow-auto",id:"history",role:"tabpanel","aria-labelledby":"history-tab"},t.createElement(h,null)),t.createElement("div",{className:"tab-pane overflow-auto",id:"settings",role:"tabpanel","aria-labelledby":"settings-tab"},t.createElement(C,null))))}function x(){const[o,a]=e.exports.useState(!1);let r={height:"fit-content"};function n(){a(!o);const e=document.querySelector("div#app > div.content");e&&(e.style.width=o?"100%":"calc(100% - var(--helper-width))"),r={height:o?"fit-content":"100vh"}}return e.exports.useEffect((()=>{n(),async function(){const e=document.querySelector("div.brown");for(;!e;)await u(1e3);e.addEventListener("click",(async()=>{let e=0;for(;!document.activeElement&&++e<10;)await u(10);let t=document.activeElement;t&&t.classList.contains("multiselect__input")&&!t.classList.contains("helper_checked")&&(t.classList.add("helper_checked"),t.addEventListener("input",(async e=>{await u(2);const t=e.target;/^[a-z]/.test(t.value)&&(t.value="~"+t.value)})))})),console.log("Add tilda done!")}(),async function(){let e=$("div.search-panel > div.controls");for(;e.length<1;)await u(500),e=$("div.search-panel > div.controls");e.css("position","sticky").css("z-index","2").css("bottom","0px").css("background-color","rgba(0,0,0,0.8)"),console.log("Sticky search done!")}()}),[]),t.createElement("div",null,t.createElement("div",{className:"PoETradeHelper",style:r},t.createElement("button",{className:"helper-btn",onClick:()=>n()},"Show/Hide"),t.createElement(S,{isOpen:o})))}c.render(t.createElement(t.StrictMode,null,t.createElement(x,null)),document.getElementById("PoETradeHelper"));
