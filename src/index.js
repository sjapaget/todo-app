import './style.css';
import Displayer from './display.js';
import Task from './task.js';

const root = document.getElementById('root');

const taskOne = new Task({
  title: "task one",
  description: "This is a great description"
})

const taskArray = [taskOne];

Displayer.renderTasks(taskArray, root);
