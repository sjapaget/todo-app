import Task from './task.js'

export default class Displayer {

  constructor(rootNode, projects) {
    this.rootNode = rootNode;
    this.projects = projects
    this.currentProject = projects[0];
  }

  renderUI() {

    const taskContainer = document.createElement('main');
    taskContainer.classList.add('main__task-container');

    this.#renderControls(this.rootNode);

    this.#renderCurrentProject(this.currentProject, taskContainer);
    this.rootNode.appendChild(taskContainer);

    this.#renderProjectsList(this.rootNode);
  };

  #renderControls(DOMnode) {

    const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('main__buttons-container');
    const addTaskButton = document.createElement('button');
      addTaskButton.innerText = "Add Task";
      addTaskButton.onclick = this.#renderNewTaskForm.bind(this);

    buttonsContainer.appendChild(addTaskButton);

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

    const section = document.createElement('div');
      section.classList.add('main__projects-list')
    const sectionTitle = document.createElement('h1');
      sectionTitle.innerText = 'Projects:'
    section.appendChild(sectionTitle);

    const listContainer = document.createElement('ul');

    const projectsList = this.projects.map(project => project.name);
      projectsList.map(projectName => {

        const listItem = document.createElement('li');
        listItem.innerText = projectName;
        listContainer.appendChild(listItem);
      });

    section.appendChild(listContainer);
    DOMnode.appendChild(section);
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

    const [taskTitleGroup, taskTitleInput] = this.#generateFormInput({
      inputType: "text",
      placeHolderText: "Feed the cat...",
      inputName: "task-name",
      labelText: 'Task Name'
    });

    form.appendChild(taskTitleGroup);

    const [taskDescriptionGroup, taskDescriptionInput] = this.#generateFormInput({
      inputType: "text",
      placeHolderText: "More details here.",
      inputName: "task-description",
      labelText: 'Description'
    });
    form.appendChild(taskDescriptionGroup);

    const [taskDueDateGroup, taskDueDateInput] = this.#generateFormInput({
      inputType: "date",
      placeHolderText: "dd/mm/yyyy",
      inputName: "task-dueDate",
      labelText: 'Due Date'
    });
    form.appendChild(taskDueDateGroup);

    const [taskPriorityGroup, taskPriorityInput] = this.#generateFormInput({
      inputType: 'checkbox',
      placeHolderText: "Priority task?",
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

    newTaskFormContainer.appendChild(title);
    newTaskFormContainer.appendChild(form);

    this.rootNode.appendChild(newTaskFormContainer);
  };

  #generateFormInput(properties) {
    const {
      inputType,
      placeholderText,
      inputName,
      labelText,

    } = properties;

    const input = document.createElement('input');
      input.type = inputType;
      input.placeHolder = placeholderText;
      input.name = inputName;
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
