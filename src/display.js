export default class Displayer {

  static renderTasks(tasksArray, rootNode) {
    const taskList = document.createElement('ul');
    tasksArray.forEach(task => {
      const listItem = document.createElement('li');
      listItem.innerText = task.title
      taskList.appendChild(listItem);
    })
    rootNode.appendChild(taskList);
  }
}
