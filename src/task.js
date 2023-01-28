import { format } from 'date-fns';

export default class Task {
  constructor({
    title, description, dueDate, priority, completed,
  }) {
    this.title = title || 'Title';
    this.description = description || 'Description';
    this.dueDate = dueDate || new Date();
    this.priority = priority || false;
    this.completed = completed || false;
  }

  get dueDateFormatted() {
    return format(this.dueDate, 'dd/MM/yyyy');
  }

  set done(val) {
    this.completed = val;
  }
}
