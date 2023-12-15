import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] =
  'live_YWD0Bu9jDiHTPM2CTuBAWYmm1NDzDah9zx81el5nFwq8zvSP7odjb7ls0shZPuhX';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

new SlimSelect({
  select: '#single',
});

breedSelect.style.display = 'none';
error.style.display = 'none';

fetchBreeds()
  .then(data => {
    breedSelect.style.display = 'block';
    loader.style.display = 'none';

    const option = data.map(breed =>
      `<option value="${breed.id}"> ${breed.name}</option >`.join('')
    );
    breedSelect.insertAdjacentHTML('beforeend', option);
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

breedSelect.addEventListener('change', () => {
  catInfo.innerHTML = '';
  const selected = this.value;

  loader.style.display = 'block';

  fetchCatByBreed(selected)
    .then(breed => {
      const url = breed[0].url;
      const name = breed[0].breeds[0].name;
      const description = breed[0].breeds[0].description;
      const temperament = breed[0].breeds[0].temperament;

      catInfo.innerHTML = `
        <img src="${url}" alt="${name}" width="500px" height="400px">
        <h2>${name}</h2>
        <p>Description: ${description}</p>
        <p>Temperament: ${temperament}</p>
            `;

      loader.style.display = 'none';
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});
