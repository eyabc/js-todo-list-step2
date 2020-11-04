import { loadingWrapper, useMiddleWare } from './utils.js';
import { setter } from './store/index.js';
import {
  readUserFacade,
  checkUser,
  createUserFacade,
  removeUserFacade,
  createUserTodoItemFacade,
  updateUserTodoItemCompleteFacade,
  removeUserTodoItemFacade,
  updateUserTodoItemFacade,
  removeUserTodoItemsAllFacade,
  updateUserTodoItemPriorityFacade,
} from './endpoint/facade.js';

export const createUserHandler = async(validator) => {
  const name = prompt('추가하고 싶은 이름을 입력해주세요.');
  if (name === null) return;

  const result = await validator(name, createUserHandler);
  if (result) createUserFacade(name);
};

export const deleteUserTodoItemsAllHandler = () => {
  removeUserTodoItemsAllFacade();
};

export const addUserTodoItemHandler = ({ target, target: { value }, key }) => {
  if (value === '' || key !== 'Enter') return;
  createUserTodoItemFacade(value);
  target.value = '';
};


export const toggleCompleteHandler = (target) => {
  const itemId = target.closest('li').dataset.todoIdx;
  updateUserTodoItemCompleteFacade(itemId);
};

export const deleteTodoItemHandler = (target) => {
  const itemId = target.closest('li').dataset.todoIdx;
  removeUserTodoItemFacade(itemId);
};


export const editModeHandler = ({ target }, editItem) => {
  if (target.dataset.component !== 'todo-label') return;
  const itemId = target.closest('li').dataset.todoIdx;
  if (editItem.id !== -1 && editItem.id !== itemId) {
    setter.itemMode(editItem.id, 'view');
    editItem.component.render();
  }
  setter.itemMode(itemId, 'edit');
  return itemId;
};

export const editItemContentsHandler = ({ target, target: { dataset, value }, key }) => {
  if (dataset.component !== 'editMode' || value === '' || key !== 'Enter') return;
  const itemId = target.closest('li').dataset.todoIdx;
  updateUserTodoItemFacade(value, itemId);
};

export const escapeEditHandler = ({ key, target: { dataset } }, editItem) => {
  if (dataset.component !== 'editMode' || key !== 'Escape') return;
  setter.itemMode(editItem.id, 'view');
  editItem.component.render();
  editItem.id = -1;
  editItem.component = undefined;
};

export const setPriorityHandler = ({ target, target: { dataset, value } }) => {
  if (dataset.component !== 'todoPriority') return;
  const itemId = target.closest('li').dataset.todoIdx;
  updateUserTodoItemPriorityFacade(value, itemId);
  return itemId;
};

export const setUserHandler = (event) => {
  const userId = event.target.dataset.index;
  userId && readUserFacade(userId);
};

export const deleteUserHandler = ({ target: { dataset: { component } } }) => {
  if (component !== 'user-delete') return;

  const confirm = window.confirm('유저를 정말로 삭제하시겠습니까?');
  if (!confirm) return;

  loadingWrapper(
    () => useMiddleWare(checkUser, removeUserFacade),
  );
};