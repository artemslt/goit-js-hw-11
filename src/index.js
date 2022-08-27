import { getImg } from './api/requstimg';
import markupList from './tamplates/tamplates';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', searchQuery);

function searchQuery(evt) {
  evt.preventDefault();

  const query = evt.target.searchQuery.value;
  getImg(query)
    .then(arrImg => {
      console.log(arrImg);
      return markupList(arrImg);
    })
    .then(data => refs.gallery.insertAdjacentHTML('beforeend', data));
}
