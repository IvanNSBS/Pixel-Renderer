function Character (view, l_helper) {
    var char = document.createElement("div");
    var toggle_anim = document.createElement("button");
    var char_name = document.createElement("input");
    var char_container = document.getElementById("char-container");
    
    this.name = "New Character";
    this.viewer = view;
    this.loader = l_helper;
    this.anim_manager;

    Object.defineProperty(this, "char", {
        get : function() { return char; },
        set : function(val)  { char=val; }
    });

    Object.defineProperty(this, "toggle_anim", {
        get : function() { return toggle_anim; },
        set : function(val)  { toggle_anim=val; }
    });

    Object.defineProperty(this, "char_name", {
        get : function() { return char_name; },
        set : function(val)  { char_name=val; }
    });

    Object.defineProperty(this, "char_container", {
        get : function() { return char_container; },
        set : function(val)  { char_container=val; }
    });
}

Character.prototype.initCharacter = function(){
    var i = this.char_container.childNodes.length;
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

Character.prototype.toggleAnimList = function(){
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

