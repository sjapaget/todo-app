export default class Project {
  constructor({name, tasks}) {
    this.name = name || 'Unknown';
    this.tasks = tasks || [];
  }

  get taskList() {
    return this.taskList
  }

  addTask(task) {
    this.tasks.push(task)
  }
}
