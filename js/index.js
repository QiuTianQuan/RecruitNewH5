 var images = new Array()

 function preLoadImg() {
     for (i = 0; i < preLoadImg.arguments.length; i++) {
         images[i] = new Image()
         images[i].src = preLoadImg.arguments[i]
     }
 }
 preLoadImg(
     "imgs/bgimg.jpg",
     "imgs/bg2.png",
     "imgs/wordbox.png",
     "imgs/bg3.jpg",
     "imgs/mask2.png",
     "imgs/box.png",
     "imgs/bg1.jpg",
     "imgs/xiaochengxu.jpg",
     "imgs/ufo.png",
     "imgs/bgimg2.jpg"
 )
 starshoot();

 var video = document.getElementById('video');
 var music = document.getElementById('music');
 var play = document.querySelector(".play");
 var stop = document.querySelector(".stop");
 video.controls = false;
 video.muted = true;
 music.muted = false;
 document.addEventListener('DOMContentLoaded', function() {
     document.addEventListener("WeixinJSBridgeReady", function() {         
         video.play();
         music.play();
     }, false);

 });

 setTimeout(function() {
     document.querySelector(".start").style.display = "block";
 }, 7000);

document.querySelector(".joinus").addEventListener('touchstart', function() {
     document.querySelector(".backto").style.display = "block";
    document.querySelector(".xiaochengxu").style.display = "block";
 });

document.querySelector(".backto").addEventListener('touchstart', function() {
    document.querySelector(".xiaochengxu").style.display = "none";
    document.querySelector(".backto").style.display = "none";
 });

document.querySelector(".findmore").addEventListener('touchstart', function() {
    window.location.href= "https://wx.redrock.team/aboutus/mobile/";
 });

 play.addEventListener('touchstart', function() {
     play.style.display = "none";
     stop.style.display = "block";
     music.pause();
 });

 stop.addEventListener('touchstart', function() {
     play.style.display = "block";
     stop.style.display = "none";
     music.play();
 });
 document.querySelector(".start").addEventListener('touchstart', function() {
     video.play();
    document.querySelector("audio").style.display = "block";
    music.play(); 
    play.style.display = "block";
     setTimeout(function() {
         document.querySelector(".wordbox").style.display = "block";
         zhiwenshow();
     }, 4800);
     document.querySelector(".lodingppage").style.display = "none";
     document.querySelector(".senseOne").style.display = "block";
     document.querySelector(".star").style.display = "block";
 });
 var fast = false;


 var zhiwen = document.querySelector(".zhiwen");
 var timer = null;
 var zhiwenopa = 20;

 function zhiwenshow() {
     setTimeout(function() {
         document.querySelector(".hand").style.display = "block";
         document.querySelector(".scanbox").style.display = "block";
     }, 5500);
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
                 tosblack();
                 tosence3();
             }
         }
     }, 50);
 }

 function logleave() {
     setTimeout(function() {
         document.querySelector(".mask2").style.display = "none";
         document.querySelector(".depart").style.display = "none";
         fast = true;
         document.querySelector(".people").className = "people" + " " + 'bigpeople';
     }, 13500);
 }

 function tosblack() {
     setTimeout(function() {
         document.querySelector(".black").style.display = "block";
         document.querySelector("main").removeChild(document.querySelector(".star"));
     }, 14500);
 }

 function tosence3() {
     setTimeout(function() {
         document.querySelector(".sensethree").style.display = "block";
         document.querySelector(".senseTwo").style.display = "none";
         boxshow();
     }, 14600);
 }

 // document.querySelector(".sensethree").style.display = "block";
 //         document.querySelector(".senseOne").style.display = "none";
 //  boxshow();

 //three.js
 function starshoot() {
     var vertexHeight = 10000;
     var planeDefinition = 200;
     var planeSize = 945000;
     var totalObjects = 300000;
     var frame = 0;

     var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
     camera.position.z = 550000;
     camera.position.y = 10000;
     camera.lookAt(new THREE.Vector3(0, 6000, 0));


     var scene = new THREE.Scene();
     scene.fog = new THREE.Fog(0x23233f, 1, 300000);

     var uniforms = {
         time: { type: "f", value: 10.0 }
     };


     var material = new THREE.ShaderMaterial({
         uniforms: uniforms,
         vertexShader: document.getElementById('vertexShader').textContent,
         fragmentShader: document.getElementById('fragmentShader').textContent,
         wireframe: true,
         fog: false
     });


     var geometry = new THREE.CircleGeometry();

     for (i = 0; i < totalObjects; i++) {
         var vertex = new THREE.Vector3();
         vertex.x = Math.random() * planeSize - (planeSize * .5);
         vertex.y = (Math.random() * 25000);
         vertex.z = Math.random() * planeSize - (planeSize * .5);
         geometry.vertices.push(vertex);
     }

     var material = new THREE.ParticleBasicMaterial({ color:0x1f35db,size: 150 });
     var particles = new THREE.ParticleSystem(geometry, material);

     scene.add(particles);

     var renderer = new THREE.WebGLRenderer();
     renderer.setClearColor(0x151a3d); //画布颜色
     renderer.setSize(window.innerWidth, window.innerHeight);
     var star = document.querySelector(".star");
     star.appendChild(renderer.domElement);

     function onWindowResize() {

         camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();

         renderer.setSize(window.innerWidth, window.innerHeight);

     }

     render();

     function render() {
         requestAnimationFrame(render);
         if (fast) {
             camera.position.z -= 500;
         } else {
             camera.position.z -= 100;
         }
         uniforms.time.value = frame;
         frame += .18;
         //  dateVerts();
         renderer.render(scene, camera);
     }
 }

 function boxshow() {
     var targetRotation = 0;
     var targetRotationOnMouseDown = 0;

     var mouseX = 0;
     var mouseXOnMouseDown = 0;

     var windowHalfX = window.innerWidth / 2;
     var windowHalfY = window.innerHeight / 2;
     var renderer = new THREE.WebGLRenderer({ antialias: true });
     renderer = new THREE.WebGLRenderer({ alpha: true });
     renderer.setClearColor(0x000000, 0);
     renderer.setSize(window.innerWidth, window.innerHeight);
     renderer.setPixelRatio(window.devicePixelRatio);
     var departbox = document.querySelector(".departbox");
     departbox.appendChild(renderer.domElement);


     //创建场景
     var scene = new THREE.Scene();

     var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
     camera.position.set(800, 200, 800);
     camera.lookAt({ x: 0, y: 0, z: 0 });
     scene.add(camera);
     var light1 = new THREE.AmbientLight(0xffffff);
     light1.position.set(800, 200, 800);
     scene.add(light1);

     var R1 = 370;
     var R2 = 400;
     var cos18 = Math.cos(0.017453293 * 18);
     var sin18 = Math.sin(0.017453293 * 18);
     var sin36 = Math.sin(0.017453293 * 36);
     var cos36 = Math.cos(0.017453293 * 36);
     console.log(R1 * cos18)

     var vertices = [
         new THREE.Vector3(0, 650, -R1),
         new THREE.Vector3(-R1 * cos18, 650, -R1 * sin18),
         new THREE.Vector3(-R1 * sin36, 650, R1 * cos36),
         new THREE.Vector3(R1 * sin36, 650, R1 * cos36),
         new THREE.Vector3(R1 * cos18, 650, -R1 * sin18),

         new THREE.Vector3(0, 0, -R2),
         new THREE.Vector3(-R2 * cos18, 0, -R2 * sin18),
         new THREE.Vector3(-R2 * sin36, 0, R2 * cos36),
         new THREE.Vector3(R2 * sin36, 0, R2 * cos36),
         new THREE.Vector3(R2 * cos18, 0, -R2 * sin18),
     ];

     var faces = [
         new THREE.Face3(0, 1, 2),
         new THREE.Face3(0, 2, 3),
         new THREE.Face3(0, 3, 4),
         new THREE.Face3(0, 5, 6),
         new THREE.Face3(1, 0, 6),
         new THREE.Face3(1, 6, 7),
         new THREE.Face3(2, 1, 7),
         new THREE.Face3(2, 7, 8),
         new THREE.Face3(3, 2, 8),
         new THREE.Face3(3, 8, 9),
         new THREE.Face3(4, 3, 9),
         new THREE.Face3(4, 9, 5),
         new THREE.Face3(0, 4, 5),

     ];

     var geometry = new THREE.Geometry();
     geometry.vertices = vertices;
     geometry.faces = faces;
     geometry.computeFaceNormals();
     var texture = THREE.ImageUtils.loadTexture('./imgs/box.png');
     var maxAnisotropy = renderer.getMaxAnisotropy();
     texture.anisotropy = maxAnisotropy;
     texture.magFilter = THREE.NearestFilter
     texture.minFilter = THREE.NearestFilter
     var material = new THREE.MeshPhongMaterial({ map: texture });



     var chanpin = [
         new THREE.Vector2(0, .666),
         new THREE.Vector2(.5, .666),
         new THREE.Vector2(.5, 1),
         new THREE.Vector2(0, 1)
     ];

     var web = [
         new THREE.Vector2(.5, .666),
         new THREE.Vector2(1, .666),
         new THREE.Vector2(1, 1),
         new THREE.Vector2(.5, 1)
     ];

     var sre = [
         new THREE.Vector2(0, .333),
         new THREE.Vector2(.5, .333),
         new THREE.Vector2(.5, .666),
         new THREE.Vector2(0, .666)
     ];

     var mobile = [
         new THREE.Vector2(.5, .333),
         new THREE.Vector2(1, .333),
         new THREE.Vector2(1, .666),
         new THREE.Vector2(.5, .666)
     ];

     var shijue = [
         new THREE.Vector2(0, 0),
         new THREE.Vector2(.5, 0),
         new THREE.Vector2(.5, .333),
         new THREE.Vector2(0, .333)
     ];

     // 清除现有的UV映射，geometry对象的faceVertexUvs属性包含该geometry各个面的坐标映射。
     geometry.faceVertexUvs[0] = [];

     // 立方体的每个面实际上是由2个三角形组成的。所以我们必须单独映射每个三角形
     // 个面的顶点坐标的定义顺序必须遵循逆时针方向。为了映射底部三角形，我们需要使用的顶点指数0，1和3，
     // 而要映射顶部三角形，我们需要使用索引1，2，和顶点的3。

     geometry.faceVertexUvs[0][3] = [sre[3], sre[0], sre[1]];
     geometry.faceVertexUvs[0][4] = [sre[2], sre[3], sre[1]];
     geometry.faceVertexUvs[0][5] = [mobile[3], mobile[0], mobile[1]];
     geometry.faceVertexUvs[0][6] = [mobile[2], mobile[3], mobile[1]];
     geometry.faceVertexUvs[0][7] = [chanpin[3], chanpin[0], chanpin[1]];
     geometry.faceVertexUvs[0][8] = [chanpin[2], chanpin[3], chanpin[1]];
     geometry.faceVertexUvs[0][9] = [shijue[3], shijue[0], shijue[1]];
     geometry.faceVertexUvs[0][10] = [shijue[2], shijue[3], shijue[1]];
     geometry.faceVertexUvs[0][11] = [web[3], web[0], web[1]];
     geometry.faceVertexUvs[0][12] = [web[2], web[3], web[1]];

     mesh = new THREE.Mesh(geometry, material);
     mesh.material.transparent = true;
     mesh.position.y = -180;
     mesh.position.x = 20;

     scene.add(mesh);


     document.addEventListener('mousedown', onDocumentMouseDown, false);
     document.addEventListener('touchstart', onDocumentTouchStart, false);
     document.addEventListener('touchmove', onDocumentTouchMove, false);


     window.addEventListener('resize', onWindowResize, false);

     function onWindowResize() {

         windowHalfX = window.innerWidth / 2;
         windowHalfY = window.innerHeight / 2;

         camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();

         renderer.setSize(window.innerWidth, window.innerHeight);

     }

     //

     function onDocumentMouseDown(event) {

         event.preventDefault();

         document.addEventListener('mousemove', onDocumentMouseMove, false);
         document.addEventListener('mouseup', onDocumentMouseUp, false);
         document.addEventListener('mouseout', onDocumentMouseOut, false);

         mouseXOnMouseDown = event.clientX - windowHalfX;
         targetRotationOnMouseDown = targetRotation;

     }

     function onDocumentMouseMove(event) {

         mouseX = event.clientX - windowHalfX;

         targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;

     }

     function onDocumentMouseUp(event) {

         document.removeEventListener('mousemove', onDocumentMouseMove, false);
         document.removeEventListener('mouseup', onDocumentMouseUp, false);
         document.removeEventListener('mouseout', onDocumentMouseOut, false);

     }

     function onDocumentMouseOut(event) {

         document.removeEventListener('mousemove', onDocumentMouseMove, false);
         document.removeEventListener('mouseup', onDocumentMouseUp, false);
         document.removeEventListener('mouseout', onDocumentMouseOut, false);

     }

     function onDocumentTouchStart(event) {

         if (event.touches.length === 1) {

             event.preventDefault();

             mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
             targetRotationOnMouseDown = targetRotation;

         }

     }

     function onDocumentTouchMove(event) {

         if (event.touches.length === 1) {

             event.preventDefault();

             mouseX = event.touches[0].pageX - windowHalfX;
             targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;

         }

     }
     var orbitCtl = new THREE.OrbitControls(camera);
     orbitCtl.autoRotate = false;
     orbitCtl.enabled = false;

     var clock = new THREE.Clock();

     function threeStart() {
         var delta = clock.getDelta();
         orbitCtl.update(delta);

         render();
         renderer.clear();
         renderer.render(scene, camera);
         requestAnimationFrame(threeStart);
     };

     function render() {

         mesh.rotation.y += (targetRotation - mesh.rotation.y) * 0.02;

     }
     threeStart();

 }