"use strict";
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        // when we create a new instance of this class, i immediately wanna render a form that belongs to this instance.
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = "user-input";
        this.attach();
    }
    // i just wanna split my collection and rendering logic.
    attach() {
        // reach out to the hostElement where i want to render my content.
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement); // formElement 바로 뒤에, import 된 template node 를 insert 합니다.
    }
}
const projectInput = new ProjectInput();
