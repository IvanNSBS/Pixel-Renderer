class Animation
{
    constructor(container, before, file_name, loader)
    {
        var n = document.createElement("button");
        n.className = "char_list_element";
        var txt = file_name.replace(/^.*[\\\/]/, '').replace(".fbx", '');
        var t = document.createTextNode(txt);
        n.appendChild(t);
        container.insertBefore(n, before);

        var mat_manager = new MaterialManager();
        
        var anim;
        var loader_helper = loader;

        var config = {
            //Character
            loc_x: 0.0,
            loc_y: -660.0,
            loc_z: 0.0,

            rot_x: 0.0,
            rot_y: 1.0,
            rot_z: 0.0,

            scale_x: 1.0,
            scale_y: 1.0,
            scale_z: 1.0,

            //Rendering
            res_x: 0.0,
            res_y: 0.0,
            res_pct: 0.25,

            f_sampling: 30,
            p_rate: 1.0,

            //Camera
            cam_x: 0.0,
            cam_y: 0.0,
            cam_z: 300.0,
            c_rot_x: 0.0,
            c_rot_y: 0.0,
            c_rot_z: 0.0,
            fr_size: 1300.0,
            near: 0.001,
            far: 1000.0,
            zoom: 1.0,
            ar_x_mult: 1,
            ar_y_mult: 1,
        };

        Object.defineProperty(this, "anim", {
            get : function() { return anim; },
            set : function(val)  { anim=val; }
        });

        Object.defineProperty(this, "config", {
            get : function() { return config; },
            set : function(val)  { config=val; }
        });

        Object.defineProperty(this, "mat_manager", {
            get : function() { return mat_manager; },
            set : function(val)  { mat_manager=val; }
        });

        var that = this;
        n.onclick = function(){
            if(loader_helper.cur_anim)
                loader_helper.cur_anim.mat_manager.delete_elements();
                
            loader_helper.cur_anim = that;
            loader_helper.load_loaded(that);            
            loader_helper.loadAnimConfig();
        }
    }
}