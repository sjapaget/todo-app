export default class Storer {
  static retrieveAll() {
    const todosString = localStorage.getItem('todos');
    const todosObj = JSON.parse(todosString);
    return todosObj;
  }
}
