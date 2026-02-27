/* empty css                      */import{S as d,i as c}from"./assets/vendor-5ObWk2rO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const u=new d(".gallery a",{captionsData:"alt",captionDelay:250}),f="https://pixabay.com/api/",m="54810342-78f3e5f8f5ab65816402207bb";function p(s){return fetch(`${f}?key=${m}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()})}const h=document.getElementById("search-form"),l=document.querySelector(".gallery"),i=document.querySelector(".loader");h.addEventListener("submit",s=>{s.preventDefault();const t=s.target.elements.searchQuery.value.trim();t&&(l.innerHTML="",i.classList.remove("hidden"),p(t).then(r=>{if(i.classList.add("hidden"),r.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}y(r.hits)}).catch(r=>{i.classList.add("hidden"),c.error({message:"Something went wrong!"}),console.error(r)}))});function y(s){const t=s.map(r=>`
    <li class="gallery-item">
      <a href="${r.largeImageURL}">
        <img src="${r.webformatURL}" alt="${r.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${r.likes}</p>
        <p>Views: ${r.views}</p>
        <p>Comments: ${r.comments}</p>
        <p>Downloads: ${r.downloads}</p>
      </div>
    </li>
  `).join("");l.insertAdjacentHTML("beforeend",t),u.refresh()}
//# sourceMappingURL=index.js.map
