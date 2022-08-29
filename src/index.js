import { getImg } from './api/requstimg';
import markupList from './tamplates/tamplates';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('#load-more-button'),
};

let page = 1;
let query = '';
let totalPages = 0;
let simpleLightBox;

refs.form.addEventListener('submit', searchQuery);
refs.loadMoreBtn.addEventListener('click', loadMore);

async function searchQuery(evt) {
  evt.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  query = evt.target.searchQuery.value.trim().toLowerCase();
  refs.loadMoreBtn.classList.add('visually-hidden');
  const arrImg = await getImg(query, page);

  try {
    if (arrImg.totalHits === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      totalPages = arrImg.totalHits / 40;
      Notiflix.Notify.info(`Hooray! We found ${arrImg.totalHits} images.`);

      if (arrImg.totalHits > 40) {
        refs.loadMoreBtn.classList.remove('visually-hidden');
      }

      refs.gallery.insertAdjacentHTML('beforeend', markupList(arrImg.hits));
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadMore() {
  page += 1;
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  const arrImg = await getImg(query, page);

  try {
    if (page > totalPages) {
      refs.loadMoreBtn.classList.add('visually-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    refs.gallery.insertAdjacentHTML('beforeend', markupList(arrImg.hits));
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    return;
  } catch (error) {
    console.log(error);
  }
}

// Загрузка по скролу

// const container = document.querySelector('.container');
// window.addEventListener('scroll', throttle(onScroll, 1000));

// function onScroll() {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//   const heightBeforeScroll = 300;
//   if (clientHeight + scrollTop >= scrollHeight - heightBeforeScroll) {
//     loadMore();
//   }
// }
