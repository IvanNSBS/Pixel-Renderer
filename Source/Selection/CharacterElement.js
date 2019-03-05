
class Character {
    constructor(char_, view) {
        
        this.char = document.createElement("div");
        this.col_anim = document.createElement("button");
        this.anim_list = null;
        this.char_name = document.createElement("input");

        this.char_list = char_;

        var viewer = view;

        Object.defineProperty(this, "viewer", {
            get : function() { return viewer; },
            set : function(val)  { viewer=val; }
        });
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

        this.col_anim = document.createElement("button");
        this.col_anim.className = "character-expand-default";
        this.col_anim.id = "show_anim_" + i;
        //this.col_anim.onclick = this.click_expand.bind(this.col_anim);

        var exp_txt = document.createTextNode("v");
        this.col_anim.appendChild(exp_txt);

        this.char.appendChild(this.col_anim);
        this.char.appendChild(this.char_name);

        char_container.appendChild(this.char);
        this.anim_list = new AnimList(char_container, this.viewer);


        var func = this.click_expand.bind(this);
        this.col_anim.addEventListener("click", func, false);
        //console.log(this.col_anim);
    }


    click_expand() {
        if (this.col_anim.childNodes[0].nodeValue === ">") {
            this.col_anim.childNodes[0].nodeValue = "v";
            this.anim_list.getAnimContainer().style.height = 'auto';

            var endHeight = getComputedStyle(this.anim_list.getAnimContainer()).height; //max height
            this.anim_list.getAnimContainer().style.height = '0px';//go back to 0
            this.anim_list.getAnimContainer().style.transition = 'height 300ms ease-in-out';
            this.anim_list.getAnimContainer().offsetHeight;
            this.anim_list.getAnimContainer().style.height = endHeight;

            this.anim_list.getAnimContainer().addEventListener('transitionend', function transitionEnd(event) {
                if (event.propertyName == 'height') {
                    this.style.transition = ''
                    this.style.height = 'auto'
                    this.removeEventListener('transitionend', transitionEnd, false)
                }
            }, false)

        }
        else {
            this.col_anim.childNodes[0].nodeValue = ">";

            this.anim_list.getAnimContainer().style.height = getComputedStyle(this.anim_list.getAnimContainer()).height;
            this.anim_list.getAnimContainer().style.transition = 'height 300ms ease-in-out';
            this.anim_list.getAnimContainer().offsetHeight;
            this.anim_list.getAnimContainer().style.height = '0px';
        }
    }
}


class CharacterElement {
    constructor(view) {
        //TODO: Fix clicking on toggle show character list changing selection
        //      to the clicked character

        this.char_lista = document.getElementById("character-list");
        this.char_elements = [];

        this.add_char_btn = document.getElementById("add_char_btn");

        this.selected_button = null;
        var viewer = view;
        //console.log(viewer);
        function teste() {
            var nchar = new Character(this.char_lista, viewer);
            var sel = this.select_char.bind(this, nchar);
            
            this.char_elements.push(nchar);
            nchar.createButton();
            nchar.char.onclick = sel;
        }
        var self = teste.bind(this);
        this.add_char_btn.addEventListener("click", self, false);
    }
    
    select_char(char) {

        if (this.selected_button === null) {
            this.selected_button = char;

            this.selected_button.char.className = "button-selected";
            this.selected_button.char_name.className = "character-txt-selected";
            this.selected_button.col_anim.className = "character-expand-selected";
        }
        else if( this.selected_button !== null && char !== this.selected_button)
        {
            this.selected_button.char.className = "button-default";
            this.selected_button.char_name.className = "character-txt-default";
            this.selected_button.col_anim.className = "character-expand-default";

            this.selected_button = char;

            this.selected_button.char.className = "button-selected";
            this.selected_button.char_name.className = "character-txt-selected";
            this.selected_button.col_anim.className = "character-expand-selected";
        }
    }
}
