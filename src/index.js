import './sass/main.scss';
import Displayer from './display.js';
import Project from './project.js'
import Task from './task.js';


const root = document.getElementById('root');
  root.classList.add('main__container')

const exampleTask = new Task({
  title: 'Example Task',
  description: 'This is an example task',
  dueDate: new Date('26/12/2023'),
})

const defaultProject = new Project({
  name: 'Your Tasks',
})

defaultProject.addTask(exampleTask);

const allProjects = [defaultProject]

const display = new Displayer(root, allProjects)
display.renderUI(defaultProject);
