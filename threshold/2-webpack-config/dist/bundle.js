(()=>{var e=document.getElementById("app"),t=document.getElementById("stories"),a=(document.getElementById("behind"),document.getElementById("forward"),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:15e4;return Math.floor(Math.random()*e)}),n=function(){fetch("https://picsum.photos/v2/list?page=2&limit=15").then((function(e){return e.json()})).then((function(t){var n=document.createDocumentFragment();t.forEach((function(e){var t=document.createElement("div");t.classList.add("post");var s=document.createElement("section");s.classList.add("post-top"),t.appendChild(s);var d=document.createElement("div");d.classList.add("post-top--info"),s.appendChild(d);var c=document.createElement("img");c.classList.add("post-top--icon"),c.src="/1-webpack/src/assets/icon.jpg",d.appendChild(c);var i=document.createElement("div");d.appendChild(i);var o=document.createElement("p");o.textContent=e.author,o.classList.add("user-name"),i.appendChild(o);var r=document.createElement("p");r.textContent="Akatsuki's Cave",r.classList.add("user-ubication"),i.appendChild(r);var l=document.createElement("img");l.classList.add("flex-left"),l.src="/1-webpack/src/assets/bx-dots-horizontal-rounded.svg",d.appendChild(l);var p=document.createElement("section");p.classList.add("post-photo"),t.appendChild(p);var m=document.createElement("div");m.classList.add("spinner"),m.classList.add("spinner--animation"),p.appendChild(m);var u=document.createElement("img");u.src=e.download_url,u.classList.add("post-photo--item"),u.classList.add("blur--animation"),p.appendChild(u),u.addEventListener("load",(function(e){u.classList.contains("blur--animation")&&(u.classList.remove("blur--animation"),m.classList.remove("spinner--animation"),m.classList.add("disappear"))}));var h=document.createElement("section");h.classList.add("post__like-zone"),t.appendChild(h);var v=document.createElement("img");v.src="/1-webpack/src/assets/bx-heart.svg",h.appendChild(v),v.dataset.like="not-liked",v.addEventListener("click",(function(){"not-liked"==v.dataset.like?(v.src="/1-webpack/src/assets/bxs-heart-filled.svg",v.dataset.like="liked"):(v.src="/1-webpack/src/assets/bx-heart.svg",v.dataset.like="not-liked")}));var f=document.createElement("img");f.src="/1-webpack/src/assets/bx-comment.svg",f.classList.add("flex-comment"),h.appendChild(f);var E=document.createElement("img");E.src="/1-webpack/src/assets/bx-paper-plane.svg",h.appendChild(E);var g=document.createElement("img");g.src="/1-webpack/src/assets/bx-bookmark.svg",g.classList.add("flex-left"),h.appendChild(g);var C=document.createElement("p");C.textContent="Liked by ".concat(a()," people"),t.appendChild(C);var L=document.createElement("p");L.textContent="View All ".concat(a(1500)," comments"),L.classList.add("grey-text"),t.appendChild(L),n.appendChild(t)})),e.appendChild(n),d()}))},s=function(e){e.forEach((function(e){e.isIntersecting&&n()}))},d=function(){new IntersectionObserver(s,{threshold:.25}).observe(e.lastElementChild)};fetch("https://picsum.photos/v2/list?page=5&limit=10").then((function(e){return e.json()})).then((function(e){var a=document.createDocumentFragment();e.forEach((function(e){var n=document.createElement("div");n.classList.add("story--item"),n.classList.add("translate-story"),n.draggable=!0,t.appendChild(n);var s=document.createElement("img");s.src=e.download_url,s.classList.add("story-img"),n.appendChild(s);var d=document.createElement("p");d.textContent=e.author,d.classList.add("story-text"),n.appendChild(d),a.appendChild(n)})),t.appendChild(a),function(e){t.addEventListener("dragend",(function(t){e.forEach((function(e){e.style.transform="translateX(".concat(t.offsetX,"%)")}))}))}(document.querySelectorAll(".story--item"))})),n()})();