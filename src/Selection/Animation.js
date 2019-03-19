function Animation(container, before, file_name, loader)
{
    var n = document.createElement("button");
    var name = file_name.replace(/^.*[\\\/]/, '').replace(".fbx", '');
    var t = document.createTextNode(name);
    var mat_manager = new MaterialManager(); //TODO: Make it public-
    
    var loader_helper = loader;
    
    this.anim;
    this.config;
    this.anim_clip;

    Object.defineProperty(this, "mat_manager", {
        get : function() { return mat_manager; },
        set : function(val)  { mat_manager=val; }
    });

    n.className = "char_list_element";
    n.appendChild(t);
    container.insertBefore(n, before);


    if( require('fs').existsSync("./src/data/"+name+"_config.json") )
        this.config = JSON.parse(require('fs').readFileSync("./src/data/"+name+"_config.json", 'utf8'));
    else
    {
        this.config = {
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
    }

    var that = this;
    n.onclick = function(){
        if(loader_helper.cur_anim)
            loader_helper.cur_anim.mat_manager.delete_elements();
            
        loader_helper.cur_anim = that;
        loader_helper.load_loaded(that);            
        loader_helper.loadAnimConfig();
    }

    // var json = JSON.stringify( config );
    // require("fs").writeFile("./src/data/"+name+"_config.json", json, 'utf8', function(err) {
    //     console.log(err);
    // });
}