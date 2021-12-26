interface Validatable {
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.trim().length > 0;
  }
  if (validatableInput.minLength) {
    isValid =
      isValid &&
      validatableInput.value.trim().length >= validatableInput.minLength;
  }
  if (validatableInput.maxLength) {
    isValid =
      isValid &&
      validatableInput.value.trim().length <= validatableInput.maxLength;
  }
  return isValid;
}

enum TodoStatus {
  Active,
  Completed,
}

class Todo {
  constructor(
    public id: string,
    public username: string,
    public todo: string,
    public completed: boolean,
    public status: TodoStatus
  ) {}
}
type Listener = (todos: Todo[]) => void;

class TodoState {
  listeners: Listener[] = [];
  todos: Todo[] = [];
  static instance: TodoState;

  static getInstance(): TodoState {
    if (this.instance) {
      return this.instance;
    }
    return new TodoState();
  }

  addListener(listenerFn: Listener): void {
    this.listeners.push(listenerFn);
  }

  addTodo(username: string, todo: string, completed: boolean): void {
    this.todos.push(
      new Todo(
        Math.random().toString(),
        username,
        todo,
        completed,
        TodoStatus.Active
      )
    );
    for (const listenerFn of this.listeners) {
      listenerFn(this.todos.slice());
    }
  }
}

const todoState = TodoState.getInstance();

function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
class TodoForm {
  templateElement: HTMLTemplateElement;
  appElement: HTMLDivElement;
  element: HTMLElement;
  usernameInputElement: HTMLInputElement;
  todoInputElement: HTMLInputElement;
  completedCheckboxElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'add-todo-form'
    ) as HTMLTemplateElement;
    this.appElement = document.getElementById('app') as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = 'add-todo-input';
    this.usernameInputElement = this.element.querySelector(
      '#username-input'
    ) as HTMLInputElement;
    this.todoInputElement = this.element.querySelector(
      '#todo-input'
    ) as HTMLInputElement;
    this.completedCheckboxElement = this.element.querySelector(
      '#is-completed-input'
    ) as HTMLInputElement;
    this.configureSubmit();
    this.attach();
  }

  gatherUserInput(): [string, string, boolean] | void {
    const enteredUsername = this.usernameInputElement.value;
    const enteredTodo = this.todoInputElement.value;
    const usernameValidatable: Validatable = {
      value: this.usernameInputElement.value,
      minLength: 2,
      maxLength: 50,
    };
    const todoValidatable: Validatable = {
      value: this.todoInputElement.value,
      minLength: 2,
      maxLength: 500,
    };

    if (!validate(usernameValidatable)) {
      alert('Invalid username, try again!');
      return;
    }
    if (!validate(todoValidatable)) {
      alert('Invalid todo, try again!');
    }
    return [
      enteredTodo,
      enteredUsername,
      this.completedCheckboxElement.checked,
    ];
  }

  @autobind
  submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [username, todo, completed] = userInput;
      todoState.addTodo(username, todo, completed);
      this.clearInputs();
    }
  }

  clearInputs() {
    this.usernameInputElement.value = '';
    this.todoInputElement.value = '';
    this.completedCheckboxElement.checked = false;
  }

  configureSubmit() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  attach() {
    this.appElement.insertAdjacentElement('afterbegin', this.element);
  }
}

class TodoList {
  templateElement: HTMLTemplateElement;
  appElement: HTMLDivElement;
  element: HTMLElement;
  todos: Todo[] = [];

  constructor(private type: 'active' | 'completed') {
    this.templateElement = document.getElementById(
      'todo-list'
    ) as HTMLTemplateElement;
    this.appElement = document.getElementById('app') as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-todos`;
    this.attach();
    this.renderContent();
    todoState.addListener((todos: Todo[]) => {
      this.todos = todos;
      this.renderTodos();
    });
  }

  private renderTodos() {
    const ul = this.element.querySelector('ul') as HTMLUListElement;
    for (const todo of this.todos) {
      const item = document.createElement('li');
      item.textContent = todo.username;
      ul.appendChild(item);
    }
  }

  private attach() {
    this.appElement.insertAdjacentElement('beforeend', this.element);
  }

  private renderContent() {
    this.element.querySelector('ul')!.id = `${this.type}-todos-list`;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + 'TODOS';
  }
}

new TodoForm();
new TodoList('active');
new TodoList('completed');
