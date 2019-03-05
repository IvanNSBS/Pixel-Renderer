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
        

        var frustum_size = 1300;
        var cur_anim = null;
        var ratio = 1;

        //getter (and setter) example 2
        Object.defineProperty(this, "scr_x_size", {
            get : function() { return scr_x_size; },
            set : function(val)  { scr_x_size=val; }
        });


        Object.defineProperty(this, "cur_anim", {
            get : function() { return cur_anim; },
            set : function(val)  { cur_anim=val; }
        });

        Object.defineProperty(this, "mixer", {
            get : function() { return mixer; },
            set : function(val)  { mixer=val; }
        });

        Object.defineProperty(this, "scene", {
            get : function() { return scene; },
            set : function(val)  { scene=val; }
        });

        Object.defineProperty(this, "sampling", {
            get : function() { return sampling; },
            set : function(val)  { sampling=val; }
        });

        Object.defineProperty(this, "camera", {
            get : function() { return camera; },
            set : function(val)  { camera=val; }
        });

        Object.defineProperty(this, "frustum_size", {
            get : function() { return frustum_size; },
            set : function(val)  { frustum_size=val; }
        });

        Object.defineProperty(this, "ar_x_size", {
            get : function() { return ar_x_size; },
            set : function(val)  { ar_x_size=val; }
        });

        Object.defineProperty(this, "ar_y_size", {
            get : function() { return ar_y_size; },
            set : function(val)  { ar_y_size=val; }
        });


        window.addEventListener( 'resize', onWindowResize, false );

        var camera, scene, renderer, light;
        var clock = new THREE.Clock();
        var sampling = 30;
        var mixer;
        
        init();
        animate();

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
            
            //old load

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