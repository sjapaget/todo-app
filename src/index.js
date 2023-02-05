import './sass/main.scss';
import Displayer from './display';
import Storer from './storage';
import Project from './project';
// import Task from './task';

const root = document.getElementById('root');
root.classList.add('main__container');

// const exampleTask = new Task({
//   title: 'Example Task',
//   description: 'This is an example task',
//   dueDate: new Date('26/12/2023'),
// });

// const exampleTaskTwo = new Task({
//   title: 'Example Task Two',
//   description: 'Two - This is an example task',
//   dueDate: new Date('22/12/2022'),
// });

const savedProjects = Storer.retrieveAll();
let allProjects;

if (savedProjects) {
  allProjects = savedProjects.map((projectData) => new Project(projectData));
} else {
  const defaultProject = new Project({
    name: 'Your Tasks',
  });
  defaultProject.saveProject();
  allProjects = [defaultProject];
}

const display = new Displayer(root, allProjects);
display.renderUI();
