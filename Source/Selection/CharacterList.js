class CharacterExample {
    constructor(el) {
        this.btn = document.createElement("button");
        this.el = el;
        this.btn.textContent = "THIS BUTTON!!";
        this.el.appendChild(this.btn);
        console.log("Finished Constructor!")
    }

    teste() {
        console.log("inside test");
        this.btn.textContent = "IM NOT A BUTTON!!";
    }
}