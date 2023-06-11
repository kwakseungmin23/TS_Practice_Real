function AutoBind(
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
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    // when we create a new instance of this class, i immediately wanna render a form that belongs to this instance.
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input";
    this.attach();
    this.configure();
    this.titleInputElement = this.formElement.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector(
      "#people"
    ) as HTMLInputElement;
  }
  // i just wanna split my collection and rendering logic.
  private attach() {
    // reach out to the hostElement where i want to render my content.
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement); // formElement 바로 뒤에, import 된 template node 를 insert 합니다.
  }

  private gatherUserInput(): [string, string, number] | void {
    const titleUserInput = this.titleInputElement.value;
    const descriptionUserInput = this.descriptionInputElement.value;
    const peopleUserInput = this.peopleInputElement.value; // value property of inputElement will be text by default.
    if (
      titleUserInput.trim().length === 0 ||
      descriptionUserInput.trim().length === 0 ||
      peopleUserInput.trim().length === 0
    ) {
      alert("Invalid input, do not leave the form empty.");
      return;
    } else {
      return [titleUserInput, descriptionUserInput, +peopleUserInput]; // tell ts that peopleUserInput is type number.(+)
    }
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler);
  }
}

const projectInput = new ProjectInput();
