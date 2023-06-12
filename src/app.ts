interface Validatable {
  value: string | number;
  required?: boolean; // optional parameter to set undefined case.
  minLength?: number; // strings's minimum length.
  maxLength?: number;
  min?: number; // people's actual minimum number value.
  max?: number;
}
function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0; // value 가 없다면 length 가 0이므로 isValid 는 fasly value가 됩니다.
  }
  if (
    validatableInput.minLength != null && // != -> null & undefined
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null && // != -> null & undefined
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value == "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value == "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}
// validation ↑
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
// autobind decorator ↑
class ProjectList {
  templateElement;
  hostElement;
  element;
  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app");
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.console();
    this.attach();
    this.renderContent();
  }
  private console() {
    console.log(this.templateElement.content.firstElementChild);
  }
  private attach() {
    this.hostElement?.insertAdjacentElement("beforeend", this.element);
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
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
    const titleValidatable: Validatable = {
      value: titleUserInput,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: descriptionUserInput,
      required: true,
      minLength: 2,
    };
    const peopleValidatable: Validatable = {
      value: peopleUserInput,
      required: true,
      min: 1,
    };

    if (
      !validate(titleValidatable) || // at least one of them is false
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, try again.");
      return;
    } else {
      return [titleUserInput, descriptionUserInput, +peopleUserInput]; // tell ts that peopleUserInput is type number.(+)
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [t, d, p] = userInput;
      this.clearInputs();
    }
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler);
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
