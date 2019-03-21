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
        var json = JSON.stringify( that.char_elements, null, 3 );
        require("fs").writeFile( "./src/data/project.pr", json, 'utf8', function(err) {
            console.log(err);
        });
        

        var clip = new THREE.AnimationClip.toJSON(that.char_elements[0].anim_manager.anim_list[0].anim_clip);
        
        var ob = JSON.stringify( clip, null, 3 );
        require("fs").writeFile( "./src/data/obj-clip.pr", ob , 'utf8', function(err) {
            console.log(err);
        });

        var ob_clip = JSON.stringify( that.char_elements[0].anim_manager.anim_list[0].anim.toJSON(), null, 3 );
        require("fs").writeFile( "./src/data/obj.pr", ob_clip , 'utf8', function(err) {
            console.log(err);
        });

    }

    var load_btn = document.getElementById("load_btn");    

    load_btn.onclick = function(){
        var char = that.addChar();
        
        var file = require('fs').readFileSync("./src/data/project.pr", 'utf8', function(err) {
            console.log(err);
        });
        var j = JSON.parse( file );
        console.log(j[0].name);
        char.setName(j[0].name);

        //FIXME: create .pr file for object and animtion using the toJSON from the object and clip
        //      Doing it another way(how i'm currently doing it) may cause problems
        // var jsuri = j[0].anim_manager.anim_list[0].anim;
        // jsuri = encodeURIComponent(file);
        // console.log(jsuri);

        var n_anim = new Animation(char.anim_manager.anim_container, 
                                   char.anim_manager.add_anim_btn, 'file_name', char.anim_manager.loader_helper);

        char.anim_manager.anim_list.push(n_anim);
    
        if(char.anim_manager.loader_helper.cur_anim)
            char.anim_manager.loader_helper.cur_anim.mat_manager.delete_elements();

        var f2 = require('fs').readFileSync("./src/data/obj.pr", 'utf8', function(err) {
            console.log(err);
        });

        var jay = JSON.parse(f2);
        var u = encodeURI('./src/data/obj.pr');
        jay = j[0].anim_manager.anim_list[0].anim;
        console.log(jay);
        //u = JSON.parse(f2);

        // FIXME: Must give literal file to be readed, otherwise loading wont work
        char.anim_manager.loader_helper.cur_anim = n_anim;
        // char.anim_manager.loader_helper.js_loader.load( './src/data/obj.pr', char.anim_manager.loader_helper.true_load);
        var object = char.anim_manager.loader_helper.js_loader.parse( jay, char.anim_manager.loader_helper.true_load);

    }
}

CharacterManager.prototype.addChar = function() {
    var nchar = new Character(this.viewer, this.load_helper);
    var sel = this.selectChar.bind(this, nchar);
    
    this.char_elements.push(nchar);
    nchar.initCharacter();
    nchar.char.onclick = sel;

    return nchar;
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
