/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/todo-state.ts" />
/// <reference path="../models/todo-model.ts" />
/// <reference path="../models/drag-drop-interfaces.ts" />

namespace App {
  export class TodoList
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
}
