import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29505255-484f86763b9591f191f4bfca7';
export async function getImgs(searchQuery, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: page,
    },
  });
  return response.data;
}
