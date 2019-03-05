class Renderer
{
    constructor(){
        
        var container = document.getElementById("renderer")
        var scene;
        var scr_x_size = parseFloat(getComputedStyle(container).width);
        var scr_y_size = parseFloat(getComputedStyle(container).height);
        
        var ar_x_size = 1;
        var ar_y_size = 1;
        var aspect = scr_x_size/scr_y_size;
        
        var manager = new THREE.LoadingManager();
        var loader = new THREE.FBXLoader(manager);

        var frustum_size = 1300;
        var object = null;
        var ratio = 1;

        //getter (and setter) example 2
        Object.defineProperty(this, "scr_x_size", {
            get : function() { return scr_x_size; },
            set : function(val)  { scr_x_size=val; }
        });

        Object.defineProperty(this, "loader", {
            get : function() { return loader; },
            set : function(val)  { loader=val; }
        });

        Object.defineProperty(this, "manager", {
            get : function() { return manager; },
            set : function(val)  { manager=val; }
        });

        Object.defineProperty(this, "object", {
            get : function() { return object; },
            set : function(val)  { object=val; }
        });

        Object.defineProperty(this, "true_load", {
            get : function() { return true_load; },
            set : function(val)  { true_load=val; }
        });


        window.addEventListener( 'resize', onWindowResize, false );

        var camera, scene, renderer, light;
        var clock = new THREE.Clock();
        var sampling = 30;
        var mixer;
        
        init();
        animate();

        function load_init( object ) {
            mixer = new THREE.AnimationMixer( object );
            object.name = "animation_name";
            object.traverse( function ( child ) {
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
            
            //object.position.z -= 200;
            object.position.y -= 250;
            var action = mixer.clipAction( object.animations[ 0 ] );
            action.play();
            scene.add( object );
        } 
        
        var true_load = load_init.bind(this);

        function init() {
            camera = new THREE.OrthographicCamera(  ar_x_size*aspect*frustum_size/-2, 
                                                    ar_x_size*aspect*frustum_size/2, 
                                                    ar_y_size*frustum_size/2, 
                                                    ar_y_size*frustum_size/-2, 
                                                    0.001, 1000);
            
            //camera.position.x += 150;
            camera.position.z += 300;
            scene = new THREE.Scene();
            //scene.background = new THREE.Color( 0xf5f5f5 );

            light = new THREE.DirectionalLight( 0xffffff );
            
            //scene.add( helper );
            scene.add( light );

            // model

            manager.onLoad = function ( ) {

                object = scene.children[scene.children.length-1];
                console.log(object.name);
                console.log(document.getElementsByName("animation_name"));
                //object.visible = false;

                var slider = document.getElementById("slider");
                var sl_label = document.getElementById("sliderlabel");
                slider.addEventListener("input", function(){
                    ratio=slider.value; 
                    sl_label.innerHTML = Number((slider.value*100).toFixed(1)) + "%";
                    /*slider.change();*/
                });

                var dx = document.getElementById("dx");
                dx.value = object.position.x;
                var dy = document.getElementById("dy");
                dy.value = object.position.y;
                var dz = document.getElementById("dz");
                dz.value = object.position.z;

                dx.addEventListener("input", function(){ object.position.x = dx.value; });       
                dy.addEventListener("input", function(){ object.position.y = dy.value; });       
                dz.addEventListener("input", function(){ object.position.z = dz.value; });       

                var rx = document.getElementById("rx");
                rx.value = object.rotation.x;
                var ry = document.getElementById("ry");
                ry.value = object.rotation.y;
                var rz = document.getElementById("rz");
                rz.value = object.rotation.z;

                rx.addEventListener("input", function(){ object.rotation.x = rx.value; });       
                ry.addEventListener("input", function(){ object.rotation.y = ry.value; });       
                rz.addEventListener("input", function(){ object.rotation.z = rz.value; }); 

                
                var sx = document.getElementById("sx");
                sx.value = object.scale.x;
                var sy = document.getElementById("sy");
                sy.value = object.scale.y;
                var sz = document.getElementById("sz");
                sz.value = object.scale.z;

                sx.addEventListener("input", function(){ object.scale.x = sx.value; });       
                sy.addEventListener("input", function(){ object.scale.y = sy.value; });       
                sz.addEventListener("input", function(){ object.scale.z = sz.value; }); 

                var sample = document.getElementById("f-sampling");
                sample.value = sampling;
                sample.addEventListener("input", function(){ sampling = sample.value; }); 
                
                var p_rate = document.getElementById("p-rate");
                p_rate.value = mixer.timeScale;
                p_rate.addEventListener("input", function(){ mixer.timeScale = p_rate.value;})
                
                
                var pcamx = document.getElementById("pcamx");
                pcamx.value = camera.position.x;
                var pcamy = document.getElementById("pcamy");
                pcamy.value = camera.position.y;
                var pcamz = document.getElementById("pcamz");
                pcamz.value = camera.position.z;

                pcamx.addEventListener("input", function(){ camera.position.x = pcamx.value; });       
                pcamy.addEventListener("input", function(){ camera.position.y = pcamy.value; });       
                pcamz.addEventListener("input", function(){ camera.position.z = pcamz.value; });       

                var rcamx = document.getElementById("rcamx");
                rcamx.value = camera.rotation.x;
                var rcamy = document.getElementById("rcamy");
                rcamy.value = camera.rotation.y;
                var rcamz = document.getElementById("rcamz");
                rcamz.value = camera.rotation.z;

                rcamx.addEventListener("input", function(){ camera.rotation.x = rcamx.value; });       
                rcamy.addEventListener("input", function(){ camera.rotation.y = rcamy.value; });       
                rcamz.addEventListener("input", function(){ camera.rotation.z = rcamz.value; });


                var f_size = document.getElementById("f-size");
                f_size.value = frustum_size;
                f_size.addEventListener("input", function(){ 
                    frustum_size = f_size.value; 
                    camera.left = ar_x_size*aspect*frustum_size/-2;
                    camera.right = ar_x_size*aspect*frustum_size/2; 
                    camera.top = ar_y_size*frustum_size/2;
                    camera.bottom = ar_y_size*frustum_size/-2;
                    camera.updateProjectionMatrix();
                });

                var nplane = document.getElementById("nplane");
                nplane.value = camera.near;
                nplane.addEventListener("input", function(){ 
                    camera.near = parseFloat(nplane.value); 
                    camera.updateProjectionMatrix(); 
                });

                var fplane = document.getElementById("fplane");
                fplane.value = camera.far;
                fplane.addEventListener("input", function(){ 
                    camera.far = parseFloat(fplane.value); 
                    camera.updateProjectionMatrix(); 
                });
                
                var czoom = document.getElementById("camzoom");
                czoom.value = camera.zoom;
                czoom.addEventListener("input", function(){ 
                    camera.zoom = parseFloat(czoom.value); 
                    camera.updateProjectionMatrix(); 
                });

                var ar_x = document.getElementById("ar-x");
                ar_x.value = ar_x_size;
                ar_x.addEventListener("input", function(){ 
                    ar_x_size = ar_x.value;

                    camera.left = aspect*frustum_size/(-2*ar_x_size);
                    camera.right = aspect*frustum_size/(2*ar_x_size); 

                    camera.updateProjectionMatrix();
                });

                var ar_y = document.getElementById("ar-y");
                ar_y.value = ar_y_size;
                ar_y.addEventListener("input", function(){ 
                    ar_y_size = ar_y.value;

                    camera.top = frustum_size/(2*ar_y_size);
                    camera.bottom = frustum_size/(-2*ar_y_size); 

                    camera.updateProjectionMatrix();
                });
                console.log( 'Loading complete!');
            };

            //loader.load( 'Resources/Anims/Running.fbx', true_load);

            
            renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
            renderer.setSize( scr_x_size, scr_y_size );
            //renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );
            window.addEventListener( 'resize', onWindowResize, false );
        }
        
        
        function onWindowResize() {
            scr_x_size = parseFloat(getComputedStyle(container).width);
            scr_y_size = parseFloat(getComputedStyle(container).height);

            camera.updateProjectionMatrix();
            renderer.setSize( scr_x_size, scr_y_size);
        }
        

        function animate() {

            setTimeout(function() {
                requestAnimationFrame(animate);
                
                var delta = sampling > 0 ? clock.getDelta() : 0;
                if ( mixer ) 
                        mixer.update( delta );
                
                renderer.setPixelRatio(ratio);
                renderer.setClearColor(0x000000, 0);
                renderer.render( scene, camera );
    
            }, 1000/sampling);
            
        }
    }


}