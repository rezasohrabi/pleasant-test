namespace App {
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
}
