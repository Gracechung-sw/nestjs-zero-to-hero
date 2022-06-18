// TODO: Study diff b/w interface, class type usage.
// We don't need this interface anymore, because now we defined as a database model.
// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
// }

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
