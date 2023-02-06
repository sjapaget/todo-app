import './sass/main.scss';
import Displayer from './display';
import Storer from './storage';
import Project from './project';

const root = document.getElementById('root');
root.classList.add('main__container');

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
