import * as CONST from '../../constants/index.js';

const TodoFilter = ({ getFilter, setFilter }) => {
  const onFilterHandler = ({ target: { dataset } }) => setFilter(dataset.filter);
  const dom = document.createElement('ul');
  dom.classList.add('filters');
  dom.addEventListener('click', onFilterHandler);

  const render = () => {
    const filter = getFilter(render);
    dom.innerHTML = Object.entries(CONST.filter).map(([key, value]) => {
      return `<li><a href="#" class="${ key } ${ filter === key ? 'selected' : '' }" data-filter="${ key }">${ value }</a></li>`;
    }).join('');
  };

  render();
  return dom;
};

export default TodoFilter;