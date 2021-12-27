/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/todo-model.ts" />
/// <reference path="../models/drag-drop-interfaces.ts" />

namespace App {
  export class TodoItem
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
      this.element.querySelector('p')!.textContent =
        this.todo.status.toString();
    }
  }
}
