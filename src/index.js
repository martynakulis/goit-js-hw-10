import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

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

fetchBreeds()
  .then(data => {
    const options = data.data;

    loader.style.display = 'block';
    error.style.display = 'none';

    breedSelect.innerHTML = options
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');

    loader.style.display = 'none';
  })
  .catch(() => {
    loader.style.display = 'none';
    error.style.display = 'block';
  })
  .finally(() => {
    breedSelect.style.display = 'block';
  });

breedSelect.addEventListener('change', event => {
  error.style.display = 'none';
  loader.style.display = 'block';
  catInfo.style.display = 'none';

  const breed = event.target.value;

  fetchCatByBreed(breed)
    .then(data => {
      const catData = data.data[0].breeds[0];

      if (catData) {
        catInfo.innerHTML = `
          <p>${catData.name}</p>
          <p>${catData.description}</p>
          <p>${catData.temperament}</p>
          <img src='${data.data[0].url}' >`;
      } else {
        catInfo.innerHTML = Notiflix.Notify.failure(
          'No information available for this breed'
        );
      }

      loader.style.display = 'none';
      catInfo.style.display = 'block';
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
});
