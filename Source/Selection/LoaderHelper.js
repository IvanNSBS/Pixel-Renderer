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

        manager.onLoad = function ( ) {
            viewer.cur_anim = viewer.scene.children[viewer.scene.children.length-1];
            cur_anim.anim = viewer.cur_anim;
            //console.log(document.getElementsByName("animation_name"));
            //viewer.cur_anim.visible = false;

            var slider = document.getElementById("slider");
            var sl_label = document.getElementById("sliderlabel");
            slider.addEventListener("input", function(){
                ratio=slider.value; 
                sl_label.innerHTML = Number((slider.value*100).toFixed(1)) + "%";
                /*slider.change();*/
            });

            var dx = document.getElementById("dx");
            dx.value = viewer.cur_anim.position.x;
            var dy = document.getElementById("dy");
            dy.value = viewer.cur_anim.position.y;
            var dz = document.getElementById("dz");
            dz.value = viewer.cur_anim.position.z;

            dx.addEventListener("input", function(){ viewer.cur_anim.position.x = dx.value; });       
            dy.addEventListener("input", function(){ viewer.cur_anim.position.y = dy.value; });       
            dz.addEventListener("input", function(){ viewer.cur_anim.position.z = dz.value; });       

            var rx = document.getElementById("rx");
            rx.value = viewer.cur_anim.rotation.x;
            var ry = document.getElementById("ry");
            ry.value = viewer.cur_anim.rotation.y;
            var rz = document.getElementById("rz");
            rz.value = viewer.cur_anim.rotation.z;

            rx.addEventListener("input", function(){ viewer.cur_anim.rotation.x = rx.value; });       
            ry.addEventListener("input", function(){ viewer.cur_anim.rotation.y = ry.value; });       
            rz.addEventListener("input", function(){ viewer.cur_anim.rotation.z = rz.value; }); 

            
            var sx = document.getElementById("sx");
            sx.value = viewer.cur_anim.scale.x;
            var sy = document.getElementById("sy");
            sy.value = viewer.cur_anim.scale.y;
            var sz = document.getElementById("sz");
            sz.value = viewer.cur_anim.scale.z;

            sx.addEventListener("input", function(){ viewer.cur_anim.scale.x = sx.value; });       
            sy.addEventListener("input", function(){ viewer.cur_anim.scale.y = sy.value; });       
            sz.addEventListener("input", function(){ viewer.cur_anim.scale.z = sz.value; }); 

            var sample = document.getElementById("f-sampling");
            sample.value = viewer.sampling;
            sample.addEventListener("input", function(){ viewer.sampling = sample.value; }); 
            
            //needs to be evaluated on the manager load
            var p_rate = document.getElementById("p-rate");
            p_rate.value = viewer.mixer.timeScale;
            p_rate.addEventListener("input", function(){ viewer.mixer.timeScale = p_rate.value;})
            
            
            var pcamx = document.getElementById("pcamx");
            pcamx.value = viewer.camera.position.x;
            var pcamy = document.getElementById("pcamy");
            pcamy.value = viewer.camera.position.y;
            var pcamz = document.getElementById("pcamz");
            pcamz.value = viewer.camera.position.z;

            pcamx.addEventListener("input", function(){ viewer.camera.position.x = pcamx.value; });       
            pcamy.addEventListener("input", function(){ viewer.camera.position.y = pcamy.value; });       
            pcamz.addEventListener("input", function(){ viewer.camera.position.z = pcamz.value; });       

            var rcamx = document.getElementById("rcamx");
            rcamx.value = viewer.camera.rotation.x;
            var rcamy = document.getElementById("rcamy");
            rcamy.value = viewer.camera.rotation.y;
            var rcamz = document.getElementById("rcamz");
            rcamz.value = viewer.camera.rotation.z;

            rcamx.addEventListener("input", function(){ viewer.camera.rotation.x = rcamx.value; });       
            rcamy.addEventListener("input", function(){ viewer.camera.rotation.y = rcamy.value; });       
            rcamz.addEventListener("input", function(){ viewer.camera.rotation.z = rcamz.value; });


            var f_size = document.getElementById("f-size");
            f_size.value = viewer.frustum_size;
            f_size.addEventListener("input", function(){ 
                viewer.frustum_size = f_size.value; 
                viewer.camera.left = viewer.ar_x_size*aspect*viewer.frustum_size/-2;
                viewer.camera.right = viewer.ar_x_size*aspect*viewer.frustum_size/2; 
                viewer.camera.top = viewer.ar_y_size*viewer.frustum_size/2;
                viewer.camera.bottom = viewer.ar_y_size*viewer.frustum_size/-2;
                viewer.camera.updateProjectionMatrix();
            });

            var nplane = document.getElementById("nplane");
            nplane.value = viewer.camera.near;
            nplane.addEventListener("input", function(){ 
                viewer.camera.near = parseFloat(nplane.value); 
                viewer.camera.updateProjectionMatrix(); 
            });

            var fplane = document.getElementById("fplane");
            fplane.value = viewer.camera.far;
            fplane.addEventListener("input", function(){ 
                viewer.camera.far = parseFloat(fplane.value); 
                viewer.camera.updateProjectionMatrix(); 
            });
            
            var czoom = document.getElementById("camzoom");
            czoom.value = viewer.camera.zoom;
            czoom.addEventListener("input", function(){ 
                viewer.camera.zoom = parseFloat(czoom.value); 
                viewer.camera.updateProjectionMatrix(); 
            });

            var ar_x = document.getElementById("ar-x");
            ar_x.value = viewer.ar_x_size;
            ar_x.addEventListener("input", function(){ 
                viewer.ar_x_size = ar_x.value;

                viewer.camera.left = aspect*viewer.frustum_size/(-2*viewer.ar_x_size);
                viewer.camera.right = aspect*viewer.frustum_size/(2*viewer.ar_x_size); 

                viewer.camera.updateProjectionMatrix();
            });

            var ar_y = document.getElementById("ar-y");
            ar_y.value = viewer.ar_y_size;
            ar_y.addEventListener("input", function(){ 
                viewer.ar_y_size = ar_y.value;

                viewer.camera.top = viewer.frustum_size/(2*viewer.ar_y_size);
                viewer.camera.bottom = viewer.frustum_size/(-2*viewer.ar_y_size); 

                viewer.camera.updateProjectionMatrix();
            });
            console.log( 'Loading complete!');

            return viewer.cur_anim;
        };

        function load_init( anim ) {
            viewer.mixer = new THREE.AnimationMixer( anim );
            anim.name = "animation_name";
            anim.traverse( function ( child ) {
                if ( child.isMesh ) {

                    const oldMat = child.material;

                    if(oldMat.length == undefined)//only one material in the mesh
                    {
                        child.material = new THREE.MeshBasicMaterial( {  
                        color: oldMat.color,
                        skinning: true,
                        name: oldMat.name,
                        side: THREE.DoubleSide,
                        //id: oldMat.id,
                        } );//materials are changed, but the animation wont play
                            //anymore
                    }
                    else//multiple materials
                    {
                        for(var i = 0; i < oldMat.length; i++)
                        {
                            //same setup 
                            child.material[i] = new THREE.MeshBasicMaterial( {  
                            color: oldMat[i].color,
                            skinning: true,
                            name: oldMat[i].name,
                            side: THREE.DoubleSide,
                            } );
                        }
                    }
                }
            } );
            
            //anim.position.z -= 200;
            //anim.position.y -= 250;
            var action = viewer.mixer.clipAction( anim.animations[ 0 ] );
            action.play();

            if(viewer.cur_anim)
                viewer.scene.remove(viewer.cur_anim);
        
            cur_anim.anim = anim;
            viewer.cur_anim = cur_anim.anim;

            viewer.scene.add( cur_anim.anim );
        } 
        
    }    

    load_loaded(anim)
    {
        this.viewer.scene.remove(this.viewer.cur_anim);
        this.viewer.mixer = new THREE.AnimationMixer( anim );
        var action = this.viewer.mixer.clipAction( anim.animations[ 0 ] );
        action.play();

        this.viewer.scene.add(anim);
    }
}