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
            var n_anim = new Animation(anim_container, add_anim_btn, file_name, loader_helper);
            that.anims.push(n_anim);

            if(loader_helper.cur_anim)
                loader_helper.cur_anim.mat_manager.delete_elements();

            loader_helper.cur_anim = n_anim;
            loader_helper.loader.load( file_name, loader_helper.true_load);
        }
        //var load = viewer.loader.load( 'Resources/Anims/Running.fbx', viewer.true_load);
        add_anim_btn.addEventListener("click", add_anim,  false);
        //add_anim_btn.onclick = viewer.loader.load( 'Resources/Anims/Running.fbx', viewer.true_load);
    }

}