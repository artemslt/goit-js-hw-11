import axios from 'axios';

export async function getImg() {
  try {
    const response = await axios.get(
      'https://pixabay.com/api/?key=29505255-484f86763b9591f191f4bfca7&q=hamster'
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
