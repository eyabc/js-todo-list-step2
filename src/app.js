import { setApi } from './endpoint/api.js';
import { initStore } from './store/index.js';
import { initRender } from './render.js';

setApi('https://js-todo-list-9ca3a.df.r.appspot.com');

(async () => await initStore())()
  .then(() => initRender());



