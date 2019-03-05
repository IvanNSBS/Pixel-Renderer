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

        var anim;
        var loader_helper = loader;

        var config = {
            //Character
            loc_x: 0.0,
            loc_y: 0.0,
            loc_z: 0.0,

            rot_x: 0.0,
            rot_y: 0.0,
            rot_y: 0.0,

            scale_x: 1.0,
            scale_y: 1.0,
            scale_y: 1.0,

            //Rendering
            res_x: 0.0,
            res_y: 0.0,
            res_pct: 1.0,

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
            zoom: 1.0,
            near: 0.001,
            far: 1000.0,
            ar_x_mult: 1,
            ar_y_mult: 1,
        };

        config.loc_x = 10.0;
        console.log(config.loc_x);

        Object.defineProperty(this, "anim", {
            get : function() { return anim; },
            set : function(val)  { anim=val; }
        });

        Object.defineProperty(this, "config", {
            get : function() { return config; },
            set : function(val)  { config=val; }
        });

        var that = this;
        n.onclick = function(){
            loader_helper.cur_anim = that;
            loader_helper.loadAnimConfig();
            loader_helper.true_load(anim);            
        }
    }
}