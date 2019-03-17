function CharacterManager(view) {

    //TODO: Fix clicking on toggle show character list changing selection
    //      to the clicked character
    Object.defineProperty(this, "viewer", {
        get : function() { return viewer; },
        set : function(val)  { viewer=val; }
    });

    Object.defineProperty(this, "load_helper", {
        get : function() { return load_helper; },
        set : function(val)  { load_helper=val; }
    });

    this.char_elements = [];
    this.selected_char = null;

    var viewer = view;
    var load_helper = new LoaderHelper(viewer);

    var add_char_btn = document.getElementById("add_char_btn");
    var save_btn = document.getElementById("save");    

    var self = this.addChar.bind(this);
    add_char_btn.addEventListener("click", self, false);

    var that = this;
    save_btn.onclick = function(){
        for(var i = 0; i < that.char_elements.length; i++)
        {
            var json = JSON.stringify( that.char_elements, null, 3 );
            require("fs").writeFile( "./src/data/"+that.char_elements[i].name + ".json", json, 'utf8', function(err) {
                console.log(err);
            });
        }
    }
}

CharacterManager.prototype.addChar = function() {
    var nchar = new Character(this.viewer, this.load_helper);
    var sel = this.selectChar.bind(this, nchar);
    
    this.char_elements.push(nchar);
    nchar.initCharacter();
    nchar.char.onclick = sel;
}

CharacterManager.prototype.selectChar = function(char) {
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
