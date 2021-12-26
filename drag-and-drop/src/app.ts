interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
}
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
type Listener<T> = (todos: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>): void {
    this.listeners.push(listenerFn);
  }
}

class TodoState extends State<Todo> {
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

const todoState = TodoState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  appElement: T;
  element: U;
  constructor(
    templateId: string,
    appId: string,
    insertAtStart: boolean,
    elementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.appElement = document.getElementById(appId) as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;

    if (elementId) {
      this.element.id = elementId;
    }
    this.attach(insertAtStart);
  }

  attach(insertAtStart: boolean) {
    this.appElement.insertAdjacentElement(
      insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

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
class TodoForm extends Component<HTMLDivElement, HTMLFormElement> {
  usernameInputElement: HTMLInputElement;
  todoInputElement: HTMLInputElement;
  completedCheckboxElement: HTMLInputElement;

  constructor() {
    super('add-todo-form', 'app', true, 'add-todo-input');
    this.usernameInputElement = this.element.querySelector(
      '#username-input'
    ) as HTMLInputElement;
    this.todoInputElement = this.element.querySelector(
      '#todo-input'
    ) as HTMLInputElement;
    this.completedCheckboxElement = this.element.querySelector(
      '#is-completed-input'
    ) as HTMLInputElement;
    this.configure();
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

  configure(): void {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {}
}

class TodoList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  todos: Todo[];

  constructor(private type: 'active' | 'completed') {
    super('todo-list', 'app', false, `${type}-todos`);
    this.todos = [];
    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listElement = this.element.querySelector('ul')!;
      listElement.classList.add('droppable');
    }
  }

  @autobind
  dragLeaveHandler(_: DragEvent): void {
    const listElement = this.element.querySelector('ul')!;
    listElement.classList.remove('droppable');
  }

  @autobind
  dropHandler(event: DragEvent): void {
    const todoId = event.dataTransfer!.getData('text/plain');
    todoState.moveTodo(
      todoId,
      this.type === 'active' ? TodoStatus.Active : TodoStatus.Completed
    );
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    todoState.addListener((todos: Todo[]) => {
      const filteredTodos = todos.filter((todo) => {
        if (this.type === 'active') {
          return todo.status === TodoStatus.Active;
        }
        return todo.status === TodoStatus.Completed;
      });
      this.todos = filteredTodos;
      this.renderTodos();
    });
  }

  renderContent(): void {
    this.element.querySelector('ul')!.id = `${this.type}-todos-list`;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' TODOS';
  }

  private renderTodos() {
    const ul = this.element.querySelector('ul') as HTMLUListElement;
    ul.innerHTML = '';
    for (const todo of this.todos) {
      new TodoItem(this.element.querySelector('ul')!.id, todo);
    }
  }
}

class TodoItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private todo: Todo;

  constructor(appId: string, todo: Todo) {
    super('todo-item', appId, false, todo.id);
    this.todo = todo;
    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', this.todo.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @autobind
  dragEndHandler(_: DragEvent): void {
    console.log('Drag End!');
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.todo.todo;
    this.element.querySelector('h3')!.textContent = this.todo.username;
    this.element.querySelector('p')!.textContent = this.todo.status.toString();
  }
}

new TodoForm();
new TodoList('active');
new TodoList('completed');
