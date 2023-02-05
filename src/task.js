/* eslint-disable import/no-extraneous-dependencies */
import { format } from 'date-fns';
import { v1 } from 'uuid';

export default class Task {
  constructor({
    title,
    description,
    dueDate,
    priority,
    completed,
  }) {
    this.id = v1();
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
