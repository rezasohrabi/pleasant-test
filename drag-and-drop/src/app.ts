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

  submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.usernameInputElement.value, this.todoInputElement.value);
  }

  configureSubmit() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  attach() {
    this.appElement.insertAdjacentElement('afterbegin', this.element);
  }
}

new TodoForm();
