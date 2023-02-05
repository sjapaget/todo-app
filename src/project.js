/* eslint-disable import/no-extraneous-dependencies */
import { v1 } from 'uuid';
import Storer from './storage';

export default class Project {
  constructor({ name, tasks }) {
    this.id = v1();
    this.name = name || 'Unknown';
    this.tasks = tasks || [];
  }

  saveProject() {
    const existingProjectData = Storer.retrieveAll() || [];
    const existingProjects = existingProjectData.map((projectData) => new Project(projectData));
    existingProjects.push(this);

    const existingProjectsStringified = JSON.stringify(existingProjects);
    Storer.saveAllProjects(existingProjectsStringified);
  }

  get taskList() {
    return this.tasks;
  }

  addTask(task) {
    // add a check to verify that the parameter passed is an instance of Task class
    this.tasks.push(task);
    this.saveProject();
  }
}
