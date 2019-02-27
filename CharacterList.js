class Character
{
    constructor(el)
    {
        var btn = document.createElement("button");
        btn.appendChild(document.createTextNode("THIS BUTTON!!"));
        el.appendChild(btn);
        console.log("Finished Constructor!")
    }
}