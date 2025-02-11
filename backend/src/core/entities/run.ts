import { Task } from './task';

export type RunStatus =
  | 'inProgress'
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed';

export class Run {
  public readonly id: string;
  private _status: string;
  private _tasks: Task[];
  private _retries: number;

  constructor() {
    this.id = crypto.randomUUID();
    this._status = 'inProgress';
    this._tasks = [];
  }

  get status() {
    return this._status;
  }

  get tasks() {
    return this._tasks;
  }

  static InitInProgress() {
    return new Run();
  }

  retry() {
    this._retries += 1;
  }

  run() {
    this._status = 'running';
  }

  addTask(task: Task) {
    this._tasks.push(task);
  }

  updateTask(task: Task) {
    this._tasks = this._tasks.map((t) => (t.id === task.id ? task : t));
  }
}
