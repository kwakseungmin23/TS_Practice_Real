"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0; // value 가 없다면 length 가 0이므로 isValid 는 fasly value가 됩니다.
    }
    if (validatableInput.minLength != null && // != -> null & undefined
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && // != -> null & undefined
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value == "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value == "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
// validation ↑
function AutoBind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
// autobind decorator ↑
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        // when we create a new instance of this class, i immediately wanna render a form that belongs to this instance.
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = "user-input";
        this.attach();
        this.configure();
        this.titleInputElement = this.formElement.querySelector("#title");
        this.descriptionInputElement = this.formElement.querySelector("#description");
        this.peopleInputElement = this.formElement.querySelector("#people");
    }
    // i just wanna split my collection and rendering logic.
    attach() {
        // reach out to the hostElement where i want to render my content.
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement); // formElement 바로 뒤에, import 된 template node 를 insert 합니다.
    }
    gatherUserInput() {
        const titleUserInput = this.titleInputElement.value;
        const descriptionUserInput = this.descriptionInputElement.value;
        const peopleUserInput = this.peopleInputElement.value; // value property of inputElement will be text by default.
        const titleValidatable = {
            value: titleUserInput,
            required: true,
        };
        const descriptionValidatable = {
            value: descriptionUserInput,
            required: true,
            minLength: 2,
        };
        const peopleValidatable = {
            value: peopleUserInput,
            required: true,
            min: 1,
        };
        if (!validate(titleValidatable) || // at least one of them is false
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid input, try again.");
            return;
        }
        else {
            return [titleUserInput, descriptionUserInput, +peopleUserInput]; // tell ts that peopleUserInput is type number.(+)
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [t, d, p] = userInput;
            console.log(t, d, p);
            this.clearInputs();
        }
    }
    configure() {
        this.formElement.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
