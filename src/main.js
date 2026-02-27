import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54810342-78f3e5f8f5ab65816402207bb';

function fetchImages(query) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}
const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
form.addEventListener('submit', event => {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value.trim();
  if (!query) return;

  gallery.innerHTML = ''; // eski sonuçları temizle
  loader.classList.remove('hidden'); // loader göster

  fetchImages(query)
    .then(data => {
      loader.classList.add('hidden'); // loader gizle
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      renderGallery(data.hits);
    })
    .catch(error => {
      loader.classList.add('hidden');
      iziToast.error({
        message: 'Something went wrong!',
      });
      console.error(error);
    });
});

function renderGallery(images) {
  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${img.likes}</p>
        <p>Views: ${img.views}</p>
        <p>Comments: ${img.comments}</p>
        <p>Downloads: ${img.downloads}</p>
      </div>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
