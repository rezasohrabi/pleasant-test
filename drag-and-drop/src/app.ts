class TodoForm {
  templateElement: HTMLTemplateElement;
  appElement: HTMLDivElement;
  element: HTMLElement;

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
    this.attach();
  }

  attach() {
    this.appElement.insertAdjacentElement('afterbegin', this.element);
  }
}

new TodoForm();
