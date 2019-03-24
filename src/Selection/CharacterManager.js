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
        

        // var clip =that.char_elements[0].anim_manager.anim_list[0].anim_clip;

        // var ob = JSON.stringify( clip, null, 3 );
        // console.log(clip);
        // require("fs").writeFile( "./src/data/obj-clip.pr", ob , 'utf8', function(err) {
        //     console.log(err);
        // });

        // var ob_clip = JSON.stringify( that.char_elements[0].anim_manager.anim_list[0].anim.toJSON(), null, 3 );
        // require("fs").writeFile( "./src/data/obj.pr", ob_clip , 'utf8', function(err) {
        //     console.log(err);
        // });

        var exporter = new THREE.GLTFExporter();

        var options = {
            trs: false,
            onlyVisible: true,
            truncateDrawRange: true,
            binary: false,
            forceIndices: false,
            forcePowerOfTwoTextures: false
        };

        exporter.parse( that.char_elements[0].anim_manager.anim_list[0].anim, function(gltf){
            var stringfied = JSON.stringify(gltf, null, 2);

            require("fs").writeFile( "./src/data/scene.gltf", stringfied, 'utf8', function(err) {
                console.log(err);
            });     
            console.log(stringfied);
        }, options );

    }

    var load_btn = document.getElementById("load_btn");    

    load_btn.onclick = function(){
        var char = that.addChar();
        
        var file = require('fs').readFileSync("./src/data/project.pr", 'utf8', function(err) {
            console.log(err);
        });
        var j = JSON.parse( file );
        char.setName(j[0].name);

        var n_anim = new Animation(char.anim_manager.anim_container, 
                                   char.anim_manager.add_anim_btn, 'file_name', char.anim_manager.loader_helper);

        char.anim_manager.anim_list.push(n_anim);
    
        // if(char.anim_manager.loader_helper.cur_anim)
        //     char.anim_manager.loader_helper.cur_anim.mat_manager.delete_elements();

        // var jay = j[0].anim_manager.anim_list[0].anim;

        char.anim_manager.loader_helper.cur_anim = n_anim;

        // var object = char.anim_manager.loader_helper.js_loader.parse( jay, char.anim_manager.loader_helper.true_load);

        char.anim_manager.loader_helper.js_loader.load("./src/data/sphere.gltf", function ( gltf ) {
            console.log(gltf);
        });
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
