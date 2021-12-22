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
    if (
      this.usernameInputElement.value === '' ||
      this.todoInputElement.value === ''
    ) {
      alert('Invalid value!');
      return;
    }
    return [
      this.usernameInputElement.value,
      this.todoInputElement.value,
      this.completedCheckboxElement.checked,
    ];
  }

  @autobind
  submitHandler(event: Event) {
    event.preventDefault();
    const input = this.gatherUserInput();
    if (Array.isArray(input)) {
      console.log(input);
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

new TodoForm();
