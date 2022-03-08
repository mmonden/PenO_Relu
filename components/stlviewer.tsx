import { useRef, useEffect } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshLine, MeshLineMaterial } from "three.meshline";

export default function Stlviewer() {
  const threeContainerRef = useRef(null);
  useEffect(() => {
    //creating scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    //light
    let followLight = new THREE.DirectionalLight(0xffffff, 1.0);
    followLight.position.set(20, 100, 10);
    followLight.target.position.set(0, 0, 0);
    followLight.castShadow = true;
    scene.add(followLight);

    let light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    //CAMERA
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, -3, 3); // Set position like this
    camera.lookAt(new THREE.Vector3(0, -3, 3)); // Set look at coordinate like this

    //RENDERER AND ADD TO PAGE
    const renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainerRef.current.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }
    
    //CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);

    const material = new THREE.MeshPhongMaterial({
      color: 0xecb7bf,
      opacity: 1.0,
      transparent: true,
    });

    //start of code for lines  #thomas zijn lijn op stl

    const points = [];
    const startingpoint = [25, -10, -40]; //eventually to be done by clicking the screen
    const endpoint = [60, 0, 10]; //idem
    const detail = 100;
    for (let j = 0; j < 1; j += 1 / detail) {
      points.push([
        startingpoint[0] + j * (endpoint[0] - startingpoint[0]),
        startingpoint[1] + j * (endpoint[1] - startingpoint[1]),
        startingpoint[2] + j * (endpoint[2] - startingpoint[2]),
      ]);
    }

    const line = new MeshLine();
    line.setPoints(points.flat());
    const linematerial = new MeshLineMaterial({
      color: new THREE.Color(0x000000),
      lineWidth: 0.3,
    });
    const mesh = new THREE.Mesh(line, linematerial);
    scene.add(mesh);
    //end of code for lines

    //STL file loading 
    const loader = new STLLoader();
    loader.load(
      "http://localhost:3000/Mandible.stl",
      function (geometry) {
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    /// Begin click vs drag v2
    const delta = 2;
    let startX;
    let startY;

    document.addEventListener('mousedown', function (event) {
      startX = event.pageX;
      startY = event.pageY;
    });

    document.addEventListener('mouseup', function (event) {
      const diffX = Math.abs(event.pageX - startX);
      const diffY = Math.abs(event.pageY - startY);

      if (diffX < delta && diffY < delta) {
        console.log("click!")
      } else {
        console.log("drag")
      }
    });
    /// End end vs drag v2

    // Begin code mouseclick
    const mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();
  
    document.addEventListener("mousedown", onMouseMove, false);

    function onMouseMove(event) {

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Begin raycaster
      raycaster.setFromCamera(mouse, camera);
      if (scene.children[3] instanceof THREE.Mesh)
        scene.children[3].material.color.set(0x1313);
      var intersects = raycaster.intersectObjects(scene.children);
      for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].object instanceof THREE.Mesh)
          //@ts-ignore
          intersects[i].object.material.color.set(0xff0000);
          console.log(intersects[i].point)

          /// Begin add sphere on click
          // const geometry = new THREE.SphereGeometry( 15, 32, 16 );
          // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
          // const sphere = new THREE.Mesh( geometry, material );
          // sphere.position.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z);
          // scene.add( sphere);
          /// End add sphere on click
      }
      // End raycaster
    }
    // End code mouseclick

    function animate() {

      requestAnimationFrame(animate);
      controls.update();
      render();
    }

    function render() {
      followLight.position.copy(camera.position);
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <div ref={threeContainerRef} />;
}
