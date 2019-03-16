class AnimManager {
    constructor(el, view, loader) {

        var viewer = view;
        var loader_helper = loader;

        var anim_container = document.createElement("div");
        Object.defineProperty(this, "anim_container", {
            get : function() { return anim_container; },
            set : function(val)  { anim_container=val; }
        });

        var add_anim_btn = document.createElement("button");
        Object.defineProperty(this, "add_anim_btn", {
            get : function() { return add_anim_btn; },
            set : function(val)  { add_anim_btn=val; }
        });
        this.parent = el;
        this.anims = [];

        anim_container.id = "anim_cont_";// + i;
        anim_container.className = "character_list";

        add_anim_btn.id = "add_anim_btn_";// + i.toString();
        add_anim_btn.className = "char_list_element";

        var tsname = document.createTextNode("+ Add anim");

        add_anim_btn.appendChild(tsname);

        anim_container.appendChild(add_anim_btn);

        var trigger = document.createElement('input');
        trigger.setAttribute("type", "file");
        trigger.setAttribute("accept", ".fbx");
        trigger.setAttribute("multiple", false);
        trigger.onchange = function(){ select_anim(trigger.files[0].path)};
        this.parent.appendChild(anim_container);
        
        //console.log(viewer);

        function add_anim()
        {
            trigger.click();
        }

        var that = this;
        function select_anim(file_name)
        {
            //console.log(file_name)
            var n_anim;
            var f = require('fs');
            var yaml = require('js-yaml');
            var n_anim;
            if (f.existsSync("./src/data/file.pr")) {
                var l = yaml.load(f.readFileSync("./src/data/file.pr", 'utf8'));
                console.log(l[0].anim_manager.anims[0].anim.animations[0]);
                //var u = JSON.stringify(l, null, 2);
                
                n_anim = new Animation(anim_container, add_anim_btn, file_name, loader_helper );
                n_anim.anim = l[0].anim_manager.anims[0].anim;
                that.anims.push(n_anim);
                
                if(loader_helper.cur_anim)
                    loader_helper.cur_anim.mat_manager.delete_elements();

                loader_helper.cur_anim = n_anim

                loader_helper.viewer.scene.remove(loader_helper.viewer.cur_anim);
                loader_helper.viewer.mixer = new THREE.AnimationMixer( n_anim.anim );
                var action = loader_helper.viewer.mixer.clipAction( loader_helper.viewer.mixer.rootObject.animations[ 0 ] );
                action.play();
                
                loader_helper.cur_anim.anim = n_anim.anim;
                loader_helper.viewer.cur_anim = n_anim.anim;
                n_anim.mat_manager.init_manager();
        
                this.viewer.scene.add(n_anim.anim);
                loader_helper.loadAnimConfig();
                //console.log(this.char_elements);
                // for(var i = 0; i < this.char_elements.length; i++)
                // {
                //     this.char_elements[i].initCharacter();
                // }
            }
            else
            {
                n_anim = new Animation(anim_container, add_anim_btn, file_name, loader_helper);
                that.anims.push(n_anim);

                if(loader_helper.cur_anim)
                    loader_helper.cur_anim.mat_manager.delete_elements();

                loader_helper.cur_anim = n_anim;
                loader_helper.loader.load( file_name, loader_helper.true_load);
            }
            //that.anims.push(n_anim);

        }
        //var load = viewer.loader.load( 'Resources/Anims/Running.fbx', viewer.true_load);
        add_anim_btn.addEventListener("click", add_anim,  false);
        //add_anim_btn.onclick = viewer.loader.load( 'Resources/Anims/Running.fbx', viewer.true_load);
    }

}