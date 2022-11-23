export default class Project {
  constructor({name, tasks}) {
    this.name = name || 'Unknown';
    this.tasks = tasks || [];
  }

  get taskList() {
    return this.tasks
  }

  addTask(task) {
    // add a check to verify that the parameter passed is an instance of Task class
    this.tasks.push(task)
  }
}
