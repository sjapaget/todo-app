export default class Displayer {

  constructor(rootNode, projects) {
    this.rootNode = rootNode;
    this.projects = projects
    this.currentProject = projects[0];
  }

  renderUI() {
    const taskContainer = document.createElement('main');
    taskContainer.classList.add('main__task-container');

    this.renderCurrentProject(this.currentProject, taskContainer);
    this.renderControls(this.rootNode)
    this.renderProjectsList(this.rootNode)

    this.rootNode.appendChild(taskContainer)
  }

  renderControls(DOMnode) {
    const projectButtons = document.createElement('div');

    const addTaskButton = document.createElement('button');
      addTaskButton.innerText = "Add Task";
      addTaskButton.onclick = this.renderNewTaskForm.bind(this);

    projectButtons.appendChild(addTaskButton);

    DOMnode.appendChild(projectButtons);
  }

  renderCurrentProject(currentProject, DOMnode) {

    const projectName = document.createElement('h1');
    projectName.innerText = currentProject.name;
    DOMnode.appendChild(projectName);

    this.renderTasks(currentProject.tasks, DOMnode);
  }

  renderProjectsList(DOMnode) {

    const section = document.createElement('div');
    const sectionTitle = document.createElement('h1');
    sectionTitle.innerText = 'Projects:'
    section.appendChild(sectionTitle);

    const listContainer = document.createElement('ul');

    const projectsList = this.projects.map(project => project.name);
    projectsList.map(projectName => {

      const listItem = document.createElement('li');
      listItem.innerText = projectName
      listContainer.appendChild(listItem)
    })

    section.appendChild(listContainer)
    DOMnode.appendChild(section)
  }

  renderTasks(tasksArray, DOMnode = this.rootNode) {
    const taskList = document.createElement('ul');
    tasksArray.forEach(task => {
      const listItem = document.createElement('li');
      listItem.innerText = task.title
      taskList.appendChild(listItem);
    })
    DOMnode.appendChild(taskList);
  }

  renderNewTaskForm() {
    const newTaskFormContainer = document.createElement('div');
    const form = document.createElement('form');
    const title = document.createElement('h2');
    title.innerText = 'New Task';

    const taskTitleInput = document.createElement('input');
    taskTitleInput.placeholder = 'Task Name';
    form.appendChild(taskTitleInput);

    const taskDescriptionInput = document.createElement('input');
    taskDescriptionInput.placeholder = 'Description';
    form.appendChild(taskDescriptionInput);

    const taskDueDateInput = document.createElement('input');
    taskDueDateInput.type = 'date';
    taskDueDateInput.placeholder = 'Due Date';
    form.appendChild(taskDueDateInput);

    const submitButton = document.createElement('button');
      submitButton.innerText = "Create Task";
      submitButton.onclick = (event) => {
        event.preventDefault();
        const newTask = new Task({

        })
        this.currentProject.addTask(newTask);
      }
    form.appendChild(submitButton);
    newTaskFormContainer.appendChild(title);
    newTaskFormContainer.appendChild(form);

    this.rootNode.appendChild(newTaskFormContainer);
  }
}
