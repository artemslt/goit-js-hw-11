import axios from 'axios';

export async function getImg(searchQuery) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=29505255-484f86763b9591f191f4bfca7&q=${searchQuery}`
    );
    return response.data.hits;
  } catch (error) {
    console.error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
