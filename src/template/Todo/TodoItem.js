import TodoLabel from './TodoLabel.js';

const TodoItem = (props) => {
  const { todo } = props;
  const dom = document.createElement('li');
  dom.dataset.todoIdx = todo._id;

  const render = () => {
    const { contents, isCompleted, mode } = todo;
    const viewCondition = () => (mode === undefined || mode === 'view');
    const display = (condition) => condition ? 'block' : "none";
    dom.innerHTML = `
    <div class="view" style="display: ${display(viewCondition())}">
      <input class="toggle" type="checkbox" data-component="toggleComplete" ${ isCompleted && "checked"}/>
      ${ TodoLabel({ contents }) }
      <button class="destroy" data-component="deleteItem"></button>
    </div>
    <input class="edit" data-component="editMode" style="display: ${display(!viewCondition())}" value="${ contents }" required/>
  `;
  };

  return { dom, render };
};

export default TodoItem;