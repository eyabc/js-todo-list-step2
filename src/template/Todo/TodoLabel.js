const TodoLabel = ({ contents }) => {
  const dom = document.createElement('label');
  dom.classList.add('label');
  dom.dataset.component = 'todo-label';

  const render = () => {
    dom.innerHTML = `
      <select class="chip select" data-component="todo-priority"> 
        <option value="0" selected>순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
      </select>
      ${ contents }
    ;`
  };

  return { dom, render }
};

// chip primary secondary

export default TodoLabel;