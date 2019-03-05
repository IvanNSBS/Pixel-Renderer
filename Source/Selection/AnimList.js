class AnimList {
    constructor(el, view) {

        // var ph_names = ["walk", "run", "idle", "wallclimb", "jump",
        //     "ladderclimb", "attack1", "attack2", "cast1",
        //     "castcomplete", "newcast", "rapier1"]
        //var ph_names = [];
        var viewer = view;
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

        function select_anim(file_name)
        {
            console.log(file_name)
            viewer.loader.load( file_name, viewer.true_load);


            var n = document.createElement("button");
            n.className = "char_list_element";
            var txt = file_name.replace(/^.*[\\\/]/, '').replace(".fbx", '');
            var t = document.createTextNode(txt);
            n.appendChild(t);
            
            anim_container.insertBefore(n, add_anim_btn);
            //console.log(obj);
        }
        //var load = viewer.loader.load( 'Resources/Anims/Running.fbx', viewer.true_load);
        add_anim_btn.addEventListener("click", add_anim,  false);
        //add_anim_btn.onclick = viewer.loader.load( 'Resources/Anims/Running.fbx', viewer.true_load);
    }

}

AnimList.prototype.getAnimContainer = function () {
    return anim_container;
}

//window.onload = function(){ console.log("JUST LOADED ANIMATION LIST");}