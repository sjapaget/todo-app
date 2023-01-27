import Project from './project.js';
import Task from './task.js'

export default class Displayer {

  constructor(rootNode, projects) {
    this.rootNode = rootNode;
    this.projects = projects;
    this.currentProject = projects[0];
  }

  renderUI() {

    this.#renderControls(this.rootNode);

    const taskContainer = document.createElement('main');
      taskContainer.classList.add('main__task-container');
    this.#renderCurrentProject(this.currentProject, taskContainer);
    this.rootNode.appendChild(taskContainer);

    const projectsContainer = document.createElement('aside');
      projectsContainer.classList.add('main__projects-list');
    this.rootNode.appendChild(projectsContainer);
    this.#renderProjectsList(projectsContainer);
  };

  #renderControls(DOMnode) {

    const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('main__buttons-container');

    const addTaskButton = document.createElement('button');
      addTaskButton.classList.add('controls__button');
      addTaskButton.innerText = "Add Task";
      addTaskButton.onclick = this.#renderNewTaskForm.bind(this);
    buttonsContainer.appendChild(addTaskButton);

    const addProjectButton = document.createElement('button');
      addProjectButton.classList.add('controls__button');
      addProjectButton.innerText = "New Project";
      addProjectButton.onclick = this.#renderNewProjectForm.bind(this);
    buttonsContainer.appendChild(addProjectButton);

    DOMnode.appendChild(buttonsContainer);
  };

  #renderCurrentProject(currentProject, DOMnode) {

    DOMnode.replaceChildren();

    const projectName = document.createElement('h1');
    projectName.innerText = currentProject.name;
    DOMnode.appendChild(projectName);

    this.#renderTasks(currentProject.tasks, DOMnode);
  }

  #renderProjectsList(DOMnode) {

    DOMnode.replaceChildren();

    const listContainer = document.createElement('ul');

    const sectionTitle = document.createElement('h1');
      sectionTitle.innerText = 'Projects:'
    listContainer.appendChild(sectionTitle);

    const projectsList = this.projects.map(project => project.name);
      projectsList.map(projectName => {
        const listItem = document.createElement('li');
        listItem.innerText = projectName;
        listContainer.appendChild(listItem);
      });

    DOMnode.appendChild(listContainer);
  };

  #renderTasks(tasksArray, DOMnode = this.rootNode) {

    const taskList = document.createElement('ul');
      taskList.classList.add('main__task-list')

    tasksArray.forEach(task => {
      const listItem = document.createElement('li');
      listItem.innerText = task.title;
      taskList.appendChild(listItem);
    });

    DOMnode.appendChild(taskList);
  };

  #renderNewTaskForm() {

    const newTaskFormContainer = document.createElement('div');
      newTaskFormContainer.classList.add('form__container')

    const form = document.createElement('form');

    const title = document.createElement('h2');
      title.innerText = 'New Task';

    newTaskFormContainer.appendChild(title);
    newTaskFormContainer.appendChild(form);

    const [taskTitleGroup, taskTitleInput] = this.#generateFormInput({
      inputType: "text",
      placeholderText: "Feed the cat...",
      inputName: "task-name",
      labelText: 'Task Name'
    });

    form.appendChild(taskTitleGroup);

    const [taskDescriptionGroup, taskDescriptionInput] = this.#generateFormInput({
      inputType: "text",
      placeholderText: "More details here.",
      inputName: "task-description",
      labelText: 'Description'
    });
    form.appendChild(taskDescriptionGroup);

    const [taskDueDateGroup, taskDueDateInput] = this.#generateFormInput({
      inputType: "date",
      placeholderText: "dd/mm/yyyy",
      inputName: "task-dueDate",
      labelText: 'Due Date'
    });
    form.appendChild(taskDueDateGroup);

    const [taskPriorityGroup, taskPriorityInput] = this.#generateFormInput({
      inputType: 'checkbox',
      placeholderText: "Priority task?",
      inputName: "task-priority",
      labelText: "Priority task?"
    });
    form.appendChild(taskPriorityGroup);

    const submitButton = document.createElement('button');
      submitButton.innerText = "Create Task";

      submitButton.onclick = (event) => {

        event.preventDefault();
        const dueDate = new Date(taskDueDateInput.value);

        this.currentProject.addTask(new Task({
          title: taskTitleInput.value,
          description: taskDescriptionInput.value,
          dueDate: dueDate,
          priority: taskPriorityInput.value
        }));

        const taskContainer = document.getElementsByClassName('main__task-container')[0];

        this.#renderCurrentProject(this.currentProject, taskContainer);

        const formContainer = event.path[2];
        formContainer.remove();
      };

    form.appendChild(submitButton);

    const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('form__cancel-btn');
      cancelBtn.innerText = 'Cancel';
      cancelBtn.onclick = (event) => {
        event.preventDefault();
        const formContainer = document.getElementsByClassName('form__container')[0];
        formContainer.remove();
      }
    form.appendChild(cancelBtn);

    newTaskFormContainer.appendChild(title);
    newTaskFormContainer.appendChild(form);

    this.rootNode.appendChild(newTaskFormContainer);
  };

  #renderNewProjectForm() {

    const newProjectFormContainer = this.#generateForm('New Project');
    const form = newProjectFormContainer.firstChild;

    const [projectTitleGroup, projectTitleInput] = this.#generateFormInput({
      inputType: "text",
      placeholderText: "Project title",
      inputName: "project-name",
      labelText: "Title"
    });
    form.appendChild(projectTitleGroup);

    const submitButton = document.createElement('button');
      submitButton.innerText = "Create Project";

      submitButton.onclick = (event) => {
        event.preventDefault();

        const newProject = new Project({
          name: projectTitleInput.value
        });

        this.projects.push(newProject);

        const projectListContainer = document.querySelector('.main__projects-list');

        this.#renderProjectsList(projectListContainer);

        const formContainer = document.querySelector('.form__container');
        formContainer.remove();
      };

    form.appendChild(submitButton);

    const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('form__cancel-btn');
      cancelBtn.innerText = 'Cancel';
      cancelBtn.onclick = (event) => {
        event.preventDefault();
        const formContainer = document.getElementsByClassName('form__container')[0];
        formContainer.remove();
      }
    form.appendChild(cancelBtn);

    this.rootNode.appendChild(newProjectFormContainer);
  };

  #generateForm(formTitle) {
    const formContainer = document.createElement('div');
      formContainer.classList.add('form__container');

    const form = document.createElement('form');

    const title = document.createElement('h2');
      form.innerText = formTitle;

      formContainer.appendChild(form);
      formContainer.appendChild(title);

    return formContainer;
  }

  #generateFormInput(properties) {
    const {
      inputType,
      placeholderText,
      inputName,
      labelText,

    } = properties;

    const input = document.createElement('input');
      input.type = inputType;
      input.placeholder = placeholderText;
      input.name = inputName;
      input.classList.add('form__input')
    const label = document.createElement('label');
      label.for = inputName;
      label.innerText = labelText;
    const group = document.createElement('div');
      group.classList.add("form__input-group")
      group.appendChild(label);
      group.appendChild(input);
    return [group, input]
  };
}
