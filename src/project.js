/* eslint-disable import/no-extraneous-dependencies */
import { v1 } from 'uuid';
import Storer from './storage';

export default class Project {
  constructor({ name, tasks }) {
    this.id = v1();
    this.name = name || 'Unknown';
    this.tasks = tasks || [];
    this.#saveProject();
  }

  #saveProject() {
    const projectData = {
      id: this.id,
      name: this.name,
      tasks: this.tasks,
    };

    const existingProjects = Storer.retrieveAll() || [];
    existingProjects.push(projectData);

    const existingProjectsStringified = JSON.stringify(existingProjects);
    localStorage.setItem('todos', existingProjectsStringified);
  }

  get taskList() {
    return this.tasks;
  }

  addTask(task) {
    // add a check to verify that the parameter passed is an instance of Task class
    this.tasks.push(task);
    this.#saveProject();
  }
}
