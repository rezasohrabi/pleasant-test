/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../utils/validation.ts" />
/// <reference path="../state/todo-state.ts" />

namespace App {
  export class TodoForm extends Component<HTMLDivElement, HTMLFormElement> {
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
}
