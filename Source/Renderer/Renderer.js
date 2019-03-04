class Renderer
{
    constructor(){
        var container = document.getElementById("renderer")
        var scene = new THREE.Scene();
        //scene.background = new THREE.Color(0xf5f5f5);

        var scr_x_size = (window.innerWidth-(window.innerWidth*0.45)-12);
        var scr_y_size = (window.innerHeight-(window.innerHeight*0.07));

        scr_x_size = parseFloat(getComputedStyle(container).width);
        scr_y_size = parseFloat(getComputedStyle(container).height);

        var aspect = scr_x_size/scr_y_size;
        var frustum_size = 1300;
        var object = null;
        var ratio = 1;
        
        // window.onload = function()
        // {
        //     var slider = document.getElementById("slider");
        //     slider.addEventListener("input", function(){ratio=slider.value; slider.change()});                     
        // }
        window.addEventListener( 'resize', onWindowResize, false );

        //container.appendChild(renderer.domElement);

        //var camera = new THREE.OrthographicCamera(aspect*frustum_size/-2, aspect*frustum_size/2, frustum_size/2, frustum_size/-2, 0.1, 100);
        
        //var container;
        var camera, scene, renderer, light;
        var clock = new THREE.Clock();
        var sampling = 30;
        var mixer;
        var box;
        init();
        animate();

        function init() {
            //document.body.appendChild( container );
            //camera = new THREE.PerspectiveCamera( 105, aspect, 0.1, 20000 );
            camera = new THREE.OrthographicCamera(aspect*frustum_size/-2, aspect*frustum_size/2, frustum_size/2, frustum_size/-2, 0.01, 700);
            camera.position.x += 150;
            camera.position.z += 100;
            //var helper = new THREE.CameraHelper(cam2);
            //camera.position.set( 900, 700, 1000 );
            scene = new THREE.Scene();
            //scene.background = new THREE.Color( 0xf5f5f5 );
            //scene.background = new THREE.Color( 0xff0000 );

            light = new THREE.DirectionalLight( 0xffffff );
            
            //scene.add( helper );
            //scene.add( light );

            var material = new THREE.LineBasicMaterial({
                color: 0x000000
            });

            var geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3( -scr_x_size, 0, 0 ),
                new THREE.Vector3( scr_x_size, 0, 0 )
            );
            var line = new THREE.Line( geometry, material );
            scene.add( line );

            geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3( scr_x_size/8, -scr_y_size, 0 ),
                new THREE.Vector3( scr_x_size/8, scr_y_size, 0 )
            );

            line.visible = false;

            var line = new THREE.Line( geometry, material );
            scene.add( line );


            // ground
            // var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
            // mesh.rotation.x = - Math.PI / 2;
            // mesh.receiveShadow = false;
            // scene.add( mesh );
            // var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
            // grid.material.opacity = 0.2;
            // grid.material.transparent = true;
            // scene.add( grid );

            // model

            var manager = new THREE.LoadingManager();
            var loader = new THREE.FBXLoader(manager);
            var objs = []

            manager.onLoad = function ( ) {
                console.log( 'Loading complete!');
                console.log(objs[0]);
                console.log(scene.children[scene.children.length-1]);
                box = new THREE.BoxHelper( objs[0], 0x000000 );
                scene.add(box);
                object = objs[0];

                var slider = document.getElementById("slider");
                slider.addEventListener("input", function(){ratio=slider.value; /*slider.change();*/});

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
            };

            function load_init( object ) {
                mixer = new THREE.AnimationMixer( object );

                //console.log("pushing to objs...");
                objs.push(object);
                //console.log(objs[0]);
               
                object.traverse( function ( child ) {
                    if ( child.isMesh ) {

                        const oldMat = child.material;
                        var newMat = new THREE.MeshBasicMaterial();

                        if(oldMat.length == undefined)//only one material in the mesh
                        {
                            //console.log(newMat.copy(oldMat));//it copies succesfuly

                            //child.material = newMat; // gives errors

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
                                //id: oldMat[i].id,
                                } );
                            }
                        }
                    }
                } );
                
                object.position.z -= 200;
                object.position.y -= 250;
                var action = mixer.clipAction( object.animations[ 0 ] );
                action.play();
                scene.add( object );
            } 

            var true_load = load_init.bind(this);
            //console.log("printing objects...");
            loader.load( 'Resources/Anims/Running.fbx', true_load);

            
            //console.log(obj);
            renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
            renderer.setSize( scr_x_size, scr_y_size );
            //renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );
            window.addEventListener( 'resize', onWindowResize, false );
        }
        
        
        function onWindowResize() {
            scr_x_size = (window.innerWidth-(window.innerWidth*0.45)-12);
            scr_y_size = (window.innerHeight-(window.innerHeight*0.07));

            scr_x_size = parseFloat(getComputedStyle(container).width);
            scr_y_size = parseFloat(getComputedStyle(container).height);

            var aspect = scr_x_size/scr_y_size;
            //camera.aspect = aspect;
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

window.onload = function()
{
    var r = new Renderer();
}