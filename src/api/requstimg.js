import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29505255-484f86763b9591f191f4bfca7';
const SEARCH_PARAMETRS =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
export async function getImg(searchQuery, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}${SEARCH_PARAMETRS}&q=${searchQuery}&page=${page}`
  );
  return response.data;
}
