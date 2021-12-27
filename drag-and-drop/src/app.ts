/// <reference path="./components/todo-form.ts" />
/// <reference path="./components/todo-list.ts" />
namespace App {
  new TodoForm();
  new TodoList('active');
  new TodoList('completed');
}
