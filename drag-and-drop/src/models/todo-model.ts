namespace App {
  export enum TodoStatus {
    Active,
    Completed,
  }

  export class Todo {
    constructor(
      public id: string,
      public username: string,
      public todo: string,
      public completed: boolean,
      public status: TodoStatus
    ) {}
  }
}
