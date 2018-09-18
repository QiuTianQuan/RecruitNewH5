var fast = false;
var arrowbox = document.querySelector(".arrowbox");
var mask = document.querySelector(".mask");
var arrowpoa = 100;
arrowbox.addEventListener('touchstart', function() {
    arrowbox.style.display = "none";
    setInterval(function() {
        if (arrowpoa >= 1) {
            mask.style.opacity = arrowpoa / 100;
            arrowpoa--;
            if (arrowpoa == 1) {
                document.querySelector(".senseOne").removeChild(mask);
                document.querySelector(".wordbox").style.display = "block";
                zhiwenshow();
            }
        }
    }, 20);
});
var zhiwen = document.querySelector(".zhiwen");
var timer = null;
var zhiwenopa = 20;

function zhiwenshow() {
    setTimeout(function() {
        document.querySelector(".hand").style.display = "block";
        document.querySelector(".scanbox").style.display = "block";
    }, 14500);
}
zhiwen.addEventListener('touchstart', function() {
    document.querySelector(".scanbox").classList.remove("boxs");
    document.querySelector(".scan").style.display = "block";
    document.querySelector(".hand").className = "hand" + " " + 'movehand';
    plus();

});

function plus() {
    setInterval(function() {
        if (zhiwenopa <= 100) {
            zhiwen.style.opacity = zhiwenopa / 100;
            zhiwenopa++;
            if (zhiwenopa == 100) {
                document.querySelector(".senseOne").style.display = "none";
                document.querySelector(".senseTwo").style.display = "block";
                logleave();

            }
        }
    }, 100);
    timer = setTimeout(function() {
        plus();
    }, 500);
}

function logleave() {
    setTimeout(function() {
        document.querySelector(".mask2").style.display = "none";
        document.querySelector(".depart").style.display = "none";
        fast = true;
        document.querySelector(".people").className = "people" + " " + 'bigpeople';
    }, 33000);
}

// function big() {
//   setTimeout(function() {
//         document.querySelector(".bigbigpeople").style.display = "block";
//     }, 15000);
// }

//three.js
var vertexHeight = 10000;
var planeDefinition = 200;
var planeSize = 845000;
var totalObjects = 300000;
var frame = 0;

var container = document.createElement('div');
document.body.appendChild( container );

var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight,1, 400000)
camera.position.z = 550000;
camera.position.y =10000;
camera.lookAt( new THREE.Vector3(0,6000,0) );


var scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0x23233f, 1, 300000 );

var uniforms = 
    {
      time: { type: "f", value: 10.0 }
    };


	var material = new THREE.ShaderMaterial( {
            uniforms: uniforms,          
			vertexShader: document.getElementById( 'vertexShader' ).textContent,	
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
            wireframe: true,
    fog: false
				} );


var geometry = new THREE.Geometry();

for (i = 0; i < totalObjects; i ++) 
{ 
  var vertex = new THREE.Vector3();
  vertex.x = Math.random()*planeSize-(planeSize*.5);
  vertex.y = (Math.random()*25000);
  vertex.z = Math.random()*planeSize-(planeSize*.5);
  geometry.vertices.push( vertex );
}

var material = new THREE.ParticleBasicMaterial( { size: 150 });
var particles = new THREE.ParticleSystem( geometry, material );
	 
scene.add( particles ); 

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x151a3d);//画布颜色
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

render();

			function render() {
        requestAnimationFrame( render );
        if (fast) {
        camera.position.z -= 500;
      }else{
        camera.position.z -= 100;
      }
           uniforms.time.value = frame;
        frame += .18;
       //  dateVerts();
        renderer.render( scene, camera );
			}