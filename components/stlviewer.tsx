import { useState, useRef, useEffect } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";
//T: import * as dat from 'dat.gui'
//npm i three.meshline

//npm i --save three-css2drender
//import { CSS2DRenderer, CSS2DObject } from "three-css2drender";

//import { MeshText2D, textAlign } from "three-text2d";
//npm i three-text2d

export default function Stlviewer() {
  const threeContainerRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x52586e);

    //light
    let followLight = new THREE.DirectionalLight(0xffffff, 1.0);
    followLight.position.set(20, 100, 10);
    followLight.target.position.set(0, 0, 0);
    followLight.castShadow = true;
    scene.add(followLight);

    let light = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(light);

    //T: const pointLight2 = new THREE.PointLight(0xff0000, 0.1)
   //T:  pointLight2.position.set(1,1,1)
    //T: pointLight2.intensity = 1
   //T:  scene.add(pointLight2)

    //T: const gui = new dat.GUI()
    //T: gui.add(pointLight2.position,'y')


    //CAMERA
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
      0.1, 1000);

    camera.position.set(0, -3, 3); // Set position like this
    camera.lookAt(new THREE.Vector3(0, -3, 3)); // Set look at coordinate like this

    //RENDERER
    const renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      //metalness: 0.25,  //gives errors and works without
      //roughness: 0.1,
      opacity: 1.0,
      transparent: true,
      //transmission: 0.99,
      //clearcoat: 1.0,
      //clearcoatRoughness: 0.25,
    });

    //start of code for lines

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
    //console.log(points.flat());
    const linematerial = new MeshLineMaterial({
      color: new THREE.Color(0x000000),
      lineWidth: 0.3,
    });
    const mesh = new THREE.Mesh(line, linematerial);
    scene.add(mesh);
    //end of code for lines

    //begin of code for text

    // init CSS2DRenderer
    // const labelRenderer = new CSS2DRenderer();
    // labelRenderer.setSize(window.innerWidth, window.innerHeight);
    // labelRenderer.domElement.style.position = "absolute";
    // labelRenderer.domElement.style.top = "0";
    // labelRenderer.domElement.style.pointerEvents = "none";
    // document.getElementById("container").appendChild(labelRenderer.domElement);

    // add label object
    // var text = document.createElement("div");
    // text.className = "label";
    // text.textContent = "Test";

    // var label = new CSS2DObject(text);
    // label.position.copy();
    // object.add(label);
    //end of code for text

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

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

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
  }, [threeContainerRef]);

  return (
    <div>
      <div ref={threeContainerRef} />
    </div>
  );
}
