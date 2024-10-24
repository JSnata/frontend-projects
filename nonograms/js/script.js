import {
  fetchPuzzles,
  fetchUserPuzzles
} from './modules/main.js';

import {
  initialRender
} from './modules/render.js'

fetchPuzzles();
fetchUserPuzzles();
initialRender();
