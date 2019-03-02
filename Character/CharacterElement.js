
class Character {
    constructor(char_, add_char) {
        this.char = document.createElement("div");
        this.toggle_anim = document.createElement("button");
        this.tst = null;
        this.char_name = document.createElement("input");
        this.char_list = char_;
        this.add_char_btn = add_char;
        //this.createButton.apply(this);
        //console.log(add_char_btn);
        //add_char_btn.onclick = this.createButton;

        //console.log(this.char_list);
    }


    createButton() {
        var i = this.char_list.childNodes.length;
        this.char = document.createElement("div");
        this.char.id = "char_" + i;
        this.char.className = "button-default";

        var char_container = document.createElement("div");
        char_container.id = "char_cont_" + i;


        this.char_list.appendChild(char_container);


        this.char_name.id = "char_" + i + "_name";
        this.char_name.setAttribute("type", "text");
        this.char_name.setAttribute("value", "New Character");
        this.char_name.className = "character-txt-default";
        this.char_name.readOnly = true;
        this.char_name.ondblclick = function () { this.readOnly = false; }
        this.char_name.onkeypress = function (e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13') {
                this.readOnly = true;
                return;
            }
        }

        this.toggle_anim = document.createElement("button");
        this.toggle_anim.className = "character-expand-default";
        this.toggle_anim.id = "show_anim_" + i;
        //this.toggle_anim.onclick = this.click_expand.bind(this.toggle_anim);

        var exp_txt = document.createTextNode("v");
        this.toggle_anim.appendChild(exp_txt);

        this.char.appendChild(this.toggle_anim);
        this.char.appendChild(this.char_name);

        char_container.appendChild(this.char);
        this.tst = new AnimList(char_container);


        var func = this.click_expand.bind(this);
        this.toggle_anim.addEventListener("click", func, false);
        //console.log(this.toggle_anim);
    }


    click_expand() {
        if (this.toggle_anim.childNodes[0].nodeValue === ">") {
            this.toggle_anim.childNodes[0].nodeValue = "v";
            this.tst.getAnimContainer().style.height = 'auto';

            var endHeight = getComputedStyle(this.tst.getAnimContainer()).height; //max height
            this.tst.getAnimContainer().style.height = '0px';//go back to 0
            this.tst.getAnimContainer().style.transition = 'height 300ms ease-in-out';
            this.tst.getAnimContainer().offsetHeight;
            this.tst.getAnimContainer().style.height = endHeight;

            this.tst.getAnimContainer().addEventListener('transitionend', function transitionEnd(event) {
                if (event.propertyName == 'height') {
                    this.style.transition = ''
                    this.style.height = 'auto'
                    this.removeEventListener('transitionend', transitionEnd, false)
                }
            }, false)

        }
        else {
            this.toggle_anim.childNodes[0].nodeValue = ">";

            this.tst.getAnimContainer().style.height = getComputedStyle(this.tst.getAnimContainer()).height;
            this.tst.getAnimContainer().style.transition = 'height 300ms ease-in-out';
            this.tst.getAnimContainer().offsetHeight;
            this.tst.getAnimContainer().style.height = '0px';
        }
    }
}


class CharacterElement extends HTMLElement {
    constructor() {
        super();
        //TODO: Fix clicking on toggle show character list changing selection
        //      to the clicked character

        this.char_lista = document.getElementById("character-list");
        this.char_elements = [];

        this.add_char_btn = document.getElementById("add_char_btn");

        this.ref = new Character(this.char_lista);

        this.selected_button = null;

        
        function teste() {
            var nchar = new Character(this.char_lista);
            var sel = this.select_char.bind(this, nchar);
            
            this.char_elements.push(nchar);
            nchar.createButton();
            nchar.char.onclick = sel;
        }
        var self = teste.bind(this);
        this.add_char_btn.addEventListener("click", self, false);
    }
    
    select_char(char) {
        console.log("Selected Div");
        console.log(this.selected_button);

        if (this.selected_button === null) {
            this.selected_button = char;

            this.selected_button.char.className = "button-selected";
            this.selected_button.char_name.className = "character-txt-selected";
            this.selected_button.toggle_anim.className = "character-expand-selected";
        }
        else if( this.selected_button !== null && char !== this.selected_button)
        {
            this.selected_button.char.className = "button-default";
            this.selected_button.char_name.className = "character-txt-default";
            this.selected_button.toggle_anim.className = "character-expand-default";

            this.selected_button = char;

            this.selected_button.char.className = "button-selected";
            this.selected_button.char_name.className = "character-txt-selected";
            this.selected_button.toggle_anim.className = "character-expand-selected";
        }
    }
}

customElements.define('char-element', CharacterElement);
