class LoaderHelper{
    constructor(view)
    {
        var manager = new THREE.LoadingManager();
        var loader = new THREE.FBXLoader(manager);
        var viewer = view;
        var true_load = load_init.bind(this);
        var cur_anim;

        Object.defineProperty(this, "loader", {
            get : function() { return loader; },
            set : function(val)  { loader=val; }
        });

        Object.defineProperty(this, "manager", {
            get : function() { return manager; },
            set : function(val)  { manager=val; }
        });

        Object.defineProperty(this, "cur_anim", {
            get : function() { return cur_anim; },
            set : function(val)  { cur_anim=val; }
        });

        Object.defineProperty(this, "true_load", {
            get : function() { return true_load; },
            set : function(val)  { true_load=val; }
        });

        Object.defineProperty(this, "viewer", {
            get : function() { return viewer; },
            set : function(val)  { viewer=val; }
        });

        manager.onLoad = function ( ) {
            viewer.cur_anim = viewer.scene.children[viewer.scene.children.length-1];
            cur_anim.anim = viewer.cur_anim;
            
            cur_anim.mat_manager.init_manager();
            
            //viewer.cur_anim.visible = false;

            var slider = document.getElementById("slider");
            var sl_label = document.getElementById("sliderlabel");
            viewer.ratio = slider.value = cur_anim.config.res_pct; 
            sl_label.innerHTML = Number((slider.value*100).toFixed(1)) + "%";
            slider.addEventListener("input", function(){
                viewer.ratio = cur_anim.config.res_pct = slider.value; 
                sl_label.innerHTML = Number((slider.value*100).toFixed(1)) + "%";
                /*slider.change();*/
            });

            var dx = document.getElementById("dx");
            var dy = document.getElementById("dy");
            var dz = document.getElementById("dz");
            dx.value = viewer.cur_anim.position.x = cur_anim.config.loc_x;
            dy.value = viewer.cur_anim.position.y = cur_anim.config.loc_y;
            dz.value = viewer.cur_anim.position.z = cur_anim.config.loc_z;

            dx.addEventListener("input", function(){ viewer.cur_anim.position.x = cur_anim.config.loc_x = dx.value; });       
            dy.addEventListener("input", function(){ viewer.cur_anim.position.y = cur_anim.config.loc_y = dy.value; });       
            dz.addEventListener("input", function(){ viewer.cur_anim.position.z = cur_anim.config.loc_z = dz.value; });       

            var rx = document.getElementById("rx");
            var ry = document.getElementById("ry");
            var rz = document.getElementById("rz");
            rx.value = viewer.cur_anim.rotation.x = cur_anim.config.rot_x;
            ry.value = viewer.cur_anim.rotation.y = cur_anim.config.rot_y;
            rz.value = viewer.cur_anim.rotation.z = cur_anim.config.rot_z;

            rx.addEventListener("input", function(){ viewer.cur_anim.rotation.x = cur_anim.config.rot_x = rx.value; });       
            ry.addEventListener("input", function(){ viewer.cur_anim.rotation.y = cur_anim.config.rot_y = ry.value; });       
            rz.addEventListener("input", function(){ viewer.cur_anim.rotation.z = cur_anim.config.rot_z = rz.value; }); 

            
            var sx = document.getElementById("sx");
            var sy = document.getElementById("sy");
            var sz = document.getElementById("sz");
            sx.value = viewer.cur_anim.scale.x = cur_anim.config.scale_x;
            sy.value = viewer.cur_anim.scale.y = cur_anim.config.scale_y;
            sz.value = viewer.cur_anim.scale.z = cur_anim.config.scale_z;

            sx.addEventListener("input", function(){ viewer.cur_anim.scale.x = cur_anim.config.scale_x = sx.value; });       
            sy.addEventListener("input", function(){ viewer.cur_anim.scale.y = cur_anim.config.scale_y = sy.value; });       
            sz.addEventListener("input", function(){ viewer.cur_anim.scale.z = cur_anim.config.scale_z = sz.value; }); 

            var sample = document.getElementById("f-sampling");
            sample.value = viewer.sampling = cur_anim.config.f_sampling;
            sample.addEventListener("input", function(){ viewer.sampling = cur_anim.config.f_sampling = sample.value; }); 
            
            //needs to be evaluated on the manager load
            var p_rate = document.getElementById("p-rate");
            p_rate.value = viewer.mixer.timeScale = cur_anim.config.p_rate;
            p_rate.addEventListener("input", function(){ viewer.mixer.timeScale = cur_anim.config.p_rate = p_rate.value;})
            
            
            var pcamx = document.getElementById("pcamx");
            var pcamy = document.getElementById("pcamy");
            var pcamz = document.getElementById("pcamz");
            pcamx.value = viewer.camera.position.x = cur_anim.config.cam_x;
            pcamy.value = viewer.camera.position.y = cur_anim.config.cam_y;
            pcamz.value = viewer.camera.position.z = cur_anim.config.cam_z;

            pcamx.addEventListener("input", function(){ viewer.camera.position.x = cur_anim.config.cam_x = pcamx.value; });       
            pcamy.addEventListener("input", function(){ viewer.camera.position.y = cur_anim.config.cam_y = pcamy.value; });       
            pcamz.addEventListener("input", function(){ viewer.camera.position.z = cur_anim.config.cam_z = pcamz.value; });       

            var rcamx = document.getElementById("rcamx");
            var rcamy = document.getElementById("rcamy");
            var rcamz = document.getElementById("rcamz");
            rcamx.value = viewer.camera.rotation.x = cur_anim.config.c_rot_x;
            rcamy.value = viewer.camera.rotation.y = cur_anim.config.c_rot_y;
            rcamz.value = viewer.camera.rotation.z = cur_anim.config.c_rot_z;
            
            rcamx.addEventListener("input", function(){ viewer.camera.rotation.x = cur_anim.config.c_rot_x = rcamx.value; });       
            rcamy.addEventListener("input", function(){ viewer.camera.rotation.y = cur_anim.config.c_rot_y = rcamy.value; });       
            rcamz.addEventListener("input", function(){ viewer.camera.rotation.z = cur_anim.config.c_rot_z = rcamz.value; });


            var f_size = document.getElementById("f-size");
            f_size.value = viewer.frustum_size = cur_anim.config.fr_size;
            viewer.camera.left = viewer.aspect*viewer.frustum_size/(-2*viewer.ar_x_size);
            viewer.camera.right = viewer.aspect*viewer.frustum_size/(2*viewer.ar_x_size); 
            viewer.camera.top = viewer.frustum_size/(2*viewer.ar_y_size);
            viewer.camera.bottom = viewer.frustum_size/(-2*viewer.ar_y_size);
            f_size.addEventListener("input", function(){ 
                viewer.frustum_size = cur_anim.config.fr_size = f_size.value; 
                viewer.camera.left = viewer.aspect*viewer.frustum_size/(-2*viewer.ar_x_size);
                viewer.camera.right = viewer.aspect*viewer.frustum_size/(2*viewer.ar_x_size); 
                viewer.camera.top = viewer.frustum_size/(2*viewer.ar_y_size);
                viewer.camera.bottom = viewer.frustum_size/(-2*viewer.ar_y_size);
                viewer.camera.updateProjectionMatrix();
            });

            var czoom = document.getElementById("camzoom");
            czoom.value = viewer.camera.zoom = parseFloat(cur_anim.config.zoom);
            czoom.addEventListener("input", function(){ 
                viewer.camera.zoom = cur_anim.config.zoom = parseFloat(czoom.value); 
                viewer.camera.updateProjectionMatrix(); 
            });

            var nplane = document.getElementById("nplane");
            nplane.value = viewer.camera.near = parseFloat(cur_anim.config.near);
            nplane.addEventListener("input", function(){ 
                viewer.camera.near = cur_anim.config.near = parseFloat(nplane.value); 
                viewer.camera.updateProjectionMatrix(); 
            });

            var fplane = document.getElementById("fplane");
            fplane.value = viewer.camera.far = parseFloat(cur_anim.config.far);
            fplane.addEventListener("input", function(){ 
                viewer.camera.far = cur_anim.config.far = parseFloat(fplane.value); 
                viewer.camera.updateProjectionMatrix(); 
            });

            var ar_x = document.getElementById("ar-x");
            ar_x.value = viewer.ar_x_size = parseFloat(cur_anim.config.ar_x_mult);
            viewer.camera.left = viewer.aspect*viewer.frustum_size/(-2*viewer.ar_x_size);
            viewer.camera.right = viewer.aspect*viewer.frustum_size/(2*viewer.ar_x_size); 
            ar_x.addEventListener("input", function(){ 
                viewer.ar_x_size = cur_anim.config.ar_x_mult = ar_x.value;

                viewer.camera.left = viewer.aspect*viewer.frustum_size/(-2*viewer.ar_x_size);
                viewer.camera.right = viewer.aspect*viewer.frustum_size/(2*viewer.ar_x_size); 

                viewer.camera.updateProjectionMatrix();
            });

            var ar_y = document.getElementById("ar-y");
            ar_y.value = viewer.ar_y_size = parseFloat(cur_anim.config.ar_y_mult);
            viewer.camera.top = viewer.frustum_size/(2*viewer.ar_y_size);
            viewer.camera.bottom = viewer.frustum_size/(-2*viewer.ar_y_size); 
            ar_y.addEventListener("input", function(){ 
                viewer.ar_y_size = cur_anim.config.ar_y_mult = ar_y.value;

                viewer.camera.top = viewer.frustum_size/(2*viewer.ar_y_size);
                viewer.camera.bottom = viewer.frustum_size/(-2*viewer.ar_y_size); 

                viewer.camera.updateProjectionMatrix();
            });

            viewer.camera.updateProjectionMatrix();
            
            console.log( 'Loading complete!');

            return viewer.cur_anim;
        };

        function load_init( anim ) {
            viewer.mixer = new THREE.AnimationMixer( anim );

            if(viewer.cur_anim)
                viewer.scene.remove(viewer.cur_anim);
    
            cur_anim.anim = anim;
            viewer.cur_anim = cur_anim.anim;

            var that = this;
            anim.name = "animation_name";

            var mat_dict = {};

            anim.traverse( function ( child ) {
                if ( child.isMesh ) {

                    //anim.mat_manager.mat_list
                    const oldMat = child.material;
                    
                    if(oldMat.length == undefined)//only one material in the mesh
                    {
                        if(!mat_dict[oldMat.name])
                        {
                            child.material = new THREE.MeshBasicMaterial( {  
                                color: oldMat.color,
                                skinning: true,
                                name: oldMat.name,
                                side: THREE.DoubleSide,
                            } ); 

                            mat_dict[oldMat.name] = child.material;
                            cur_anim.mat_manager.mat_list.push(child.material);
                        }
                        else
                            child.material = mat_dict[oldMat.name];
                    }
                    else//multiple materials
                    {
                        for(var i = 0; i < oldMat.length; i++)
                        {
                            if(!mat_dict[oldMat[i].name])
                            {
                                child.material[i] = new THREE.MeshBasicMaterial( {  
                                color: oldMat[i].color,
                                skinning: true,
                                name: oldMat[i].name,
                                side: THREE.DoubleSide,
                                } );

                                mat_dict[oldMat[i].name] = child.material[i];
                                cur_anim.mat_manager.mat_list.push(child.material[i]);
                            }
                            else
                                child.material[i] = mat_dict[oldMat[i].name];
                        }
                    }
                }
            } );
            
            var action = viewer.mixer.clipAction( anim.animations[ 0 ] );
            action.play();

            viewer.scene.add( cur_anim.anim );
        } 
    }    

    loadAnimConfig(){

        //Character loading
        var dx = document.getElementById("dx");
        var dy = document.getElementById("dy");
        var dz = document.getElementById("dz");
        console.log(this.cur_anim.config.loc_x);
        dx.value = this.cur_anim.config.loc_x;
        dy.value = this.cur_anim.config.loc_y;
        dz.value = this.cur_anim.config.loc_z;


        var rx = document.getElementById("rx");
        var ry = document.getElementById("ry");
        var rz = document.getElementById("rz");
        rx.value = this.cur_anim.config.rot_x;
        ry.value = this.cur_anim.config.rot_y;
        rz.value = this.cur_anim.config.rot_z;

        var sx = document.getElementById("sx");
        var sy = document.getElementById("sy");
        var sz = document.getElementById("sz");
        sx.value = this.cur_anim.config.scale_x;
        sy.value = this.cur_anim.config.scale_y;
        sz.value = this.cur_anim.config.scale_z;

        //Rendering loading
        var slider = document.getElementById("slider");
        var sl_label = document.getElementById("sliderlabel");
        this.viewer.ratio = slider.value = this.cur_anim.config.res_pct; 
        sl_label.innerHTML = Number((this.cur_anim.config.res_pct*100).toFixed(1)) + "%";

        var sample = document.getElementById("f-sampling");
        this.viewer.sampling = sample.value = this.cur_anim.config.f_sampling;
        
        var p_rate = document.getElementById("p-rate");
        this.viewer.mixer.timeScale = p_rate.value = this.cur_anim.config.p_rate;


        //Camera loading
        var pcamx = document.getElementById("pcamx");
        var pcamy = document.getElementById("pcamy");
        var pcamz = document.getElementById("pcamz");
        this.viewer.camera.position.x = pcamx.value = this.cur_anim.config.cam_x;
        this.viewer.camera.position.y = pcamy.value = this.cur_anim.config.cam_y;
        this.viewer.camera.position.z = pcamz.value = this.cur_anim.config.cam_z;

        var rcamx = document.getElementById("rcamx");
        var rcamy = document.getElementById("rcamy");
        var rcamz = document.getElementById("rcamz");
        this.viewer.camera.rotation.x = rcamx.value = this.cur_anim.config.c_rot_x;
        this.viewer.camera.rotation.y = rcamy.value = this.cur_anim.config.c_rot_y;
        this.viewer.camera.rotation.z = rcamz.value = this.cur_anim.config.c_rot_z;

        var f_size = document.getElementById("f-size");
        this.viewer.frustum_size = f_size.value = this.cur_anim.config.fr_size; 

        var nplane = document.getElementById("nplane");
        this.viewer.camera.near = nplane.value = parseFloat(this.cur_anim.config.near); 

        var fplane = document.getElementById("fplane");
        this.viewer.camera.far = fplane.value = parseFloat(this.cur_anim.config.far); 
        
        var czoom = document.getElementById("camzoom");
        this.viewer.camera.zoom = czoom.value = parseFloat(this.cur_anim.config.zoom); 

        var ar_x = document.getElementById("ar-x");
        this.viewer.ar_x_size = ar_x.value = this.cur_anim.config.ar_x_mult;

        var ar_y = document.getElementById("ar-y");
        this.viewer.ar_y_size = ar_y.value = this.cur_anim.config.ar_y_mult;

        this.viewer.camera.left = this.viewer.aspect*this.viewer.frustum_size/(-2*this.viewer.ar_x_size);
        this.viewer.camera.right = this.viewer.aspect*this.viewer.frustum_size/(2*this.viewer.ar_x_size); 
        this.viewer.camera.top = this.viewer.frustum_size/(2*this.viewer.ar_y_size);
        this.viewer.camera.bottom = this.viewer.frustum_size/(-2*this.viewer.ar_y_size);

        this.viewer.camera.updateProjectionMatrix();
    }

    load_loaded(anim)
    {
        this.viewer.scene.remove(this.viewer.cur_anim);
        this.viewer.mixer = new THREE.AnimationMixer( anim.anim );
        var action = this.viewer.mixer.clipAction( anim.anim.animations[ 0 ] );
        action.play();
        
        this.cur_anim.anim = anim.anim;
        this.viewer.cur_anim = anim.anim;
        anim.mat_manager.init_manager();

        this.viewer.scene.add(anim.anim);
    }
}
