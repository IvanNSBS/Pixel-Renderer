function AnimManager(parent, view, loader) {
    var viewer = view;
    var loader_helper = loader;
    var anim_container = document.createElement("div");
    var add_anim_btn = document.createElement("button");
    var trigger = document.createElement('input');
    var container = parent;
    var tsname = document.createTextNode("+ Add anim");

    Object.defineProperty(this, "anim_container", {
        get : function() { return anim_container; },
        set : function(val)  { anim_container=val; }
    });

    Object.defineProperty(this, "add_anim_btn", {
        get : function() { return add_anim_btn; },
        set : function(val)  { add_anim_btn=val; }
    });

    Object.defineProperty(this, "loader_helper", {
        get : function() { return loader_helper; },
        set : function(val)  { loader_helper=val; }
    });

    Object.defineProperty(this, "viewer", {
        get : function() { return viewer; },
        set : function(val)  { viewer=val; }
    });
    
    Object.defineProperty(this, "trigger", {
        get : function() { return trigger; },
        set : function(val)  { trigger=val; }
    });


    anim_container.id = "anim_cont_";// + i;
    anim_container.className = "character_list";

    add_anim_btn.id = "add_anim_btn_";// + i.toString();
    add_anim_btn.className = "char_list_element";

    add_anim_btn.appendChild(tsname);

    anim_container.appendChild(add_anim_btn);

    // TODO: Add List of JSON stringified animations to the anim manager
    trigger.setAttribute("type", "file");
    trigger.setAttribute("accept", ".fbx");
    trigger.setAttribute("multiple", false);
    var that = this;
    trigger.onchange = function(){ that.select_anim(that.trigger.files[0].path); };

    container.appendChild(anim_container);

    var self = this.add_anim.bind(this);
    add_anim_btn.addEventListener("click", self,  false);
}

AnimManager.prototype.add_anim = function()
{
    this.trigger.click();
}

AnimManager.prototype.select_anim = function(file_name)
{
    var n_anim = new Animation(this.anim_container, this.add_anim_btn, file_name, this.loader_helper);
    
    if(this.loader_helper.cur_anim)
        this.loader_helper.cur_anim.mat_manager.delete_elements();

    this.loader_helper.cur_anim = n_anim;
    this.loader_helper.loader.load( file_name, this.loader_helper.true_load);
}