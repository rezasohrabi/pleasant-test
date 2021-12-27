namespace App {
  type Listener<T> = (todos: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>): void {
      this.listeners.push(listenerFn);
    }
  }

  export class TodoState extends State<Todo> {
    todos: Todo[] = [];
    static instance: TodoState;

    private constructor() {
      super();
    }

    static getInstance(): TodoState {
      if (this.instance) {
        return this.instance;
      }
      return new TodoState();
    }

    addTodo(username: string, todo: string, completed: boolean): void {
      const newTodo = new Todo(
        Math.random().toString(),
        username,
        todo,
        completed,
        completed ? TodoStatus.Completed : TodoStatus.Active
      );
      this.todos.push(newTodo);
      this.updateListeners();
    }

    moveTodo(todoId: string, newStatus: TodoStatus) {
      const todo = this.todos.find((todo) => todo.id === todoId);
      if (todo && todo.status !== newStatus) {
        todo.status = newStatus;
        this.updateListeners();
      }
    }

    updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.todos.slice());
      }
    }
  }

  export const todoState = TodoState.getInstance();
}
