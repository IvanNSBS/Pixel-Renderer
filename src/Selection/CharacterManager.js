
class Character {
    constructor(view, l_helper) {
        this.char = document.createElement("div");
        this.toggle_anim = document.createElement("button");
        this.char_name = document.createElement("input");
        this.anim_manager;
        this.char_container = document.getElementById("char-container");
        
        var viewer = view;
        var loader = l_helper;
        var name = "New Character";

        Object.defineProperty(this, "viewer", {
            get : function() { return viewer; },
            set : function(val)  { viewer=val; }
        });


        Object.defineProperty(this, "loader", {
            get : function() { return loader; },
            set : function(val)  { loader=val; }
        });
    }


    initCharacter() {
        var i = this.char_container.childNodes.length;
        this.char = document.createElement("div");
        this.char.id = "char_" + i;
        this.char.className = "button-default";

        var char_container = document.createElement("div");
        char_container.id = "char_cont_" + i;


        this.char_container.appendChild(char_container);


        //Input Node
        //TODO: OnLoseFocus (or smth like that)
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

        //Toggle Show Anim
        this.toggle_anim = document.createElement("button");
        this.toggle_anim.className = "character-expand-default";
        this.toggle_anim.id = "show_anim_" + i;

        var exp_txt = document.createTextNode("v");
        this.toggle_anim.appendChild(exp_txt);

        this.char.appendChild(this.toggle_anim);
        this.char.appendChild(this.char_name);

        char_container.appendChild(this.char);
        this.anim_manager = new AnimManager(char_container, this.viewer, this.loader);


        var func = this.toggleAnimList.bind(this);
        this.toggle_anim.addEventListener("click", func, false);
    }


    toggleAnimList() {
        if (this.toggle_anim.childNodes[0].nodeValue === ">") {
            this.toggle_anim.childNodes[0].nodeValue = "v";
            this.anim_manager.anim_container.style.height = 'auto';

            var endHeight = getComputedStyle(this.anim_manager.anim_container).height; //max height
            this.anim_manager.anim_container.style.height = '0px';//go back to 0
            this.anim_manager.anim_container.style.transition = 'height 300ms ease-in-out';
            this.anim_manager.anim_container.offsetHeight;
            this.anim_manager.anim_container.style.height = endHeight;

            this.anim_manager.anim_container.addEventListener('transitionend', function transitionEnd(event) {
                if (event.propertyName == 'height') {
                    this.style.transition = ''
                    this.style.height = 'auto'
                    this.removeEventListener('transitionend', transitionEnd, false)
                }
            }, false)

        }
        else {
            this.toggle_anim.childNodes[0].nodeValue = ">";

            this.anim_manager.anim_container.style.height = getComputedStyle(this.anim_manager.anim_container).height;
            this.anim_manager.anim_container.style.transition = 'height 300ms ease-in-out';
            this.anim_manager.anim_container.offsetHeight;
            this.anim_manager.anim_container.style.height = '0px';
        }
    }
}


class CharacterManager {
    constructor(view) {
        //TODO: Fix clicking on toggle show character list changing selection
        //      to the clicked character

        this.char_elements = [];

        this.add_char_btn = document.getElementById("add_char_btn");
        this.save_btn = document.getElementById("save");

        this.selected_char = null;

        var viewer = view;

        var load_helper = new LoaderHelper(viewer);

        function addChar() {
            var nchar = new Character(viewer, load_helper);
            var sel = this.selectChar.bind(this, nchar);
            
            this.char_elements.push(nchar);
            nchar.initCharacter();
            nchar.char.onclick = sel;
        }

        var self = addChar.bind(this);

        var that = this;
        this.save_btn.onclick = function(){
            for(var i = 0; i < that.char_elements.length; i++)
            {
                var json = JSON.stringify( that.char_elements[i] );
                require("fs").writeFile( "./src/data/"+that.char_elements[i].char_name.id + ".json", json, 'utf8', function(err) {
                    console.log(err);
                });
            }
        }
        this.add_char_btn.addEventListener("click", self, false);
    }
    
    selectChar(char) {

        if (this.selected_char === null) {
            this.selected_char = char;

            this.selected_char.char.className = "button-selected";
            this.selected_char.char_name.className = "character-txt-selected";
            this.selected_char.toggle_anim.className = "character-expand-selected";
        }
        else if( this.selected_char !== null && char !== this.selected_char)
        {
            this.selected_char.char.className = "button-default";
            this.selected_char.char_name.className = "character-txt-default";
            this.selected_char.toggle_anim.className = "character-expand-default";

            this.selected_char = char;

            this.selected_char.char.className = "button-selected";
            this.selected_char.char_name.className = "character-txt-selected";
            this.selected_char.toggle_anim.className = "character-expand-selected";
        }
    }
}
