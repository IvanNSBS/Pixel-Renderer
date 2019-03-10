class InputNode extends HTMLElement
{
    constructor()
    {
        super();
        var char_name = document.createElement("input");
        char_name.id = "char_name";
        char_name.setAttribute("type", "text");
        char_name.setAttribute("value", "New Character");
        char_name.className = "character-txt-default";
        char_name.readOnly = true;
        char_name.ondblclick = function(){char_name.readOnly = false;}
        char_name.onkeypress = function(e)
        {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13'){
                char_name.readOnly = true;
                return;
            }
        }
        console.log("Finished");
    }
}

customElements.define('input-node', InputNode);