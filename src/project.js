/* eslint-disable import/no-extraneous-dependencies */
import { v1 } from 'uuid';
import Storer from './storage';

export default class Project {
  constructor({ name, tasks, id = v1() }) {
    // TODO - check this, looks like it is generating a new id every time a project is deserialised
    this.id = id;
    this.name = name || 'Unknown';
    this.tasks = tasks || [];
  }

  saveProject() {
    const existingProjectData = Storer.retrieveAll() || [];
    const existingProjects = existingProjectData.map((projectData) => new Project(projectData));

    const projectAlreadyExists = existingProjects.find((project) => project.id === this.id);

    if (projectAlreadyExists) {
      existingProjects.forEach((project) => {
        if (project.id === this.id) {
          project.tasks = this.tasks;
        }
      })
    } else {
      existingProjects.push(this);
    }

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
