import { useState, useRef, useEffect } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export default function Stlviewer() {
  const threeContainerRef = useRef(null);
  useEffect(() => {

    const scene = new THREE.Scene();

    scene.background = new THREE.Color( 0x52586E );

    let followLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    followLight.position.set(20, 100, 10);
    followLight.target.position.set(0, 0, 0);
    followLight.castShadow = true;
    scene.add(followLight);

    let light = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0,-3,3); // Set position like this
    camera.lookAt(new THREE.Vector3(0,-3,3)); // Set look at coordinate like this
    
    const renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth*(2/3), window.innerHeight*(2/3));
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      metalness: 0.25,
      roughness: 0.1,
      opacity: 1.0,
      transparent: true,
      transmission: 0.99,
      clearcoat: 1.0,
      clearcoatRoughness: 0.25
  })
  

    const loader = new STLLoader();
    loader.load(
      "http://localhost:3000/Skull.stl",
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
      followLight.position.copy(camera.position );
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
