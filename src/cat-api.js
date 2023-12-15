import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_YWD0Bu9jDiHTPM2CTuBAWYmm1NDzDah9zx81el5nFwq8zvSP7odjb7ls0shZPuhX';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}
