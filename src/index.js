import { getImgs } from './api/getImgs';
import markupList from './tamplates/markupList';
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

  if (evt.target.searchQuery.value === '') {
    Notiflix.Notify.warning('Please enter search query!');
    return;
  }

  if (query === evt.target.searchQuery.value.trim().toLowerCase()) {
    Notiflix.Notify.warning('You enter the same search query');
    return;
  }

  page = 1;
  query = evt.target.searchQuery.value.trim().toLowerCase();
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('visually-hidden');

  try {
    const arrImg = await getImgs(query, page);

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
      simpleLightBox = new SimpleLightbox('.gallery a');
      return;
    }
  } catch (error) {
    Notiflix.Notify.error(error);
  }
}

async function loadMore() {
  page += 1;
  scroll();

  try {
    const arrImg = await getImgs(query, page);

    if (page > totalPages) {
      refs.loadMoreBtn.classList.add('visually-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    refs.gallery.insertAdjacentHTML('beforeend', markupList(arrImg.hits));
    simpleLightBox.refresh();
    return;
  } catch (error) {
    Notiflix.Notify.error(error);
  }
}

function scroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
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
