//Project State Management - singleton design pattern
class ProjectState {
  private projects: any[] = []; // click add button then add project here in the array.
  private listeners: any[] = []; // it'll be called whenever something changes.
  private static instance: ProjectState;
  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  addListner(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }
  addProject(t: string, d: string, p: number) {
    const newProject = {
      id: Math.random().toString(), // make unique id
      title: t,
      description: d,
      people: p,
    };
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      // listers array modifying with listerFn
      listenerFn(this.projects.slice()); // only return copy of the array.
    }
  }
}
const projectState = ProjectState.getInstance();

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
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];
  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.assignedProjects = []; // initialized.
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListner((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
  private attach() {
    this.hostElement?.insertAdjacentElement("beforeend", this.element);
  }
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl?.appendChild(listItem);
    }
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
      projectState.addProject(t, d, p);
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
