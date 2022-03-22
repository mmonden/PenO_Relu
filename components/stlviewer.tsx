import { useRef, useEffect, useState } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { InstancedInterleavedBuffer } from "three";

import { IFile, ICard } from "../types";
import { text } from "stream/consumers";
import { Sprite } from "three";
import { makeTextSprite } from "./makeTextSprite";

type FileCardProps = {
  file: IFile;
};


let camera, scene, canvas, controls, renderer, followLight, light

export default function Stlviewer({ file }: FileCardProps) {
  const threeContainerRef = useRef(null);

  useEffect(() => {

    init()

    //add Container to renderer
    threeContainerRef.current.appendChild(renderer.domElement);

    //dunno what this do @aline @thomas
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    // Skull material
    const materialSkull = new THREE.MeshPhongMaterial({
      color: 0xd3d3d3,
      opacity: 1.0,
      transparent: true,
    });

    // Mandible material
    const materialMandible = new THREE.MeshPhongMaterial({
      color: 0xd3d3d3,
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

    var materials = new Array();
    for (var x = 1; x < 7; x++) {
      for (var y = 1; y < 7; y++) {
        const materialTooth = new THREE.MeshPhongMaterial({
          color: 0xd3d3d3,
          opacity: 1.0,
          transparent: true,
        });
        materials.push(materialTooth)
      }
    }

    for (var x = 1; x < 5; x++) {
      for (var y = 1; y < 7; y++) {
        let filename = "Tooth_".concat(x.toString()).concat(y.toString())

        loader.load(
          "http://localhost:3000/" + filename + ".stl",
          function (geometry) {

            let toothNr = parseInt(filename.split('_').pop())
            let a = Math.floor(toothNr / 10)
            let b = toothNr % 10
            console.log(a, b)

            const mesh = new THREE.Mesh(geometry, materials[(a - 1) * 6 + (b - 1)]);
            scene.add(mesh);
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }

    loader.load(
      "http://localhost:3000/Mandible.stl",
      function (geometry) {
        const mesh = new THREE.Mesh(geometry, materialMandible);
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

    document.addEventListener("dblclick", function (event) {
      if (file.selected) {
        var title = file.selected.title;
        var text = file.selected.text;
        scene.children = scene.children.filter(
          (child) => !(child instanceof Sprite)
        );

        //start code for textlabel
        var tekstlabel = makeTextSprite(title, {
          fontsize: 50,
          borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
          backgroundColor: { r: 0, g: 0, b: 150, a: 0.8 },
        });
        tekstlabel.position.set(endpoint[0] + 5, endpoint[1], endpoint[2]); //Define sprite's anchor point
        scene.add(tekstlabel);
        //end code for text label
      }
    });

    document.addEventListener("mousedown", function (event) {
      startX = event.pageX;
      startY = event.pageY;
    });

    // Begin code mouseclick
    const mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();

    document.addEventListener("mouseup", function (event) {
      const diffX = Math.abs(event.pageX - startX);
      const diffY = Math.abs(event.pageY - startY);

      if (diffX < delta && diffY < delta) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Begin raycaster
        if (file.selected && !file.selected.clicked) {
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(scene.children);
          for (var i = 0; i < intersects.length; i++) {
            if (intersects[i].object instanceof THREE.Mesh)
              //@ts-ignore
              intersects[i].object.material.color.set(0xff0000);
            console.log(intersects[i].point);
            file.selected.position = intersects[i].point;
            file.selected.clicked = true;
          }

          for (var i = 0; i < scene.children.length; i++) {
            if (scene.children[i] instanceof THREE.Mesh) {
              // console.log("Child", i, scene.children[i])
              // console.log("Intersect", j, intersects[j].object)
              if (typeof intersects[0] !== 'undefined' && scene.children[i] == intersects[0].object) {
                // @ts-ignore
                (scene.children[i] as THREE.Mesh).material.color.set(0x00ff00)
              } else {
                // @ts-ignore
                (scene.children[i] as THREE.Mesh).material.color.set(0xd3d3d3)
              }
            }
          }
        }
        // End raycaster
      }
      // End code mouseclick
    });
    loader.load(
      "http://localhost:3000/Skull.stl",
      function (geometry) {
        const mesh = new THREE.Mesh(geometry, materialSkull);
        scene.add(mesh);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(scene.children)

    /// Begin click vs drag v2
    // const delta = 2;
    // let startX;
    // let startY;

    // document.addEventListener('mousedown', function (event) {
    //   startX = event.pageX;
    //   startY = event.pageY;
    // });

    // document.addEventListener('mouseup', function (event) {
    //   const diffX = Math.abs(event.pageX - startX);
    //   const diffY = Math.abs(event.pageY - startY);

    //   if (diffX < delta && diffY < delta) {
    //     console.log("click!")
    //   } else {
    //     console.log("drag")
    //   }
    // });
    /// End end vs drag v2
    animate();
  });

  return <div ref={threeContainerRef} />;
}

function init(){
  //creating scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  //light
  followLight = new THREE.DirectionalLight(0xffffff, 1.0);
  followLight.position.set(20, 100, 10);
  followLight.target.position.set(0, 0, 0);
  followLight.castShadow = true;
  scene.add(followLight);

  light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  //CAMERA
  camera = new THREE.PerspectiveCamera(
    90, //field of view, number of vertical degrees it is seen --> lower : objects are closer <-> higher : objects are farther
    window.innerWidth / window.innerHeight,
    0.1, //distance from camera object starts to appear
    1000 //distance from camera objects stops appearing
  );

  camera.position.set(0, -3, 3); // Set position like this
  //camera.rotation.set(0, 100, 0);
  //camera.lookAt(new THREE.Vector3(5, 100, -57.33));
  camera.updateProjectionMatrix();

  //RENDERER
  renderer = new THREE.WebGLRenderer();
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);

  //CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);
  //controls = new FlyControls( camera, renderer.domElement );
  //controls = new TrackballControls( camera, renderer.domElement );
 //controls = new PointerLockControls( camera, renderer.domElement );
  // controls.movementSpeed = 100;
  // controls.rollSpeed = Math.PI / 24;
  // controls.autoForward = false;
  // controls.dragToLook = true;
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

 //FUNCTION FOR BUTTONS IN "Tanden" TO ADAPT CAMARA PERSPECTIVE WHEN PUSHED ON
 function ChangePerspective(x,y,z) {
  camera.position.set(x, y, z); 
  camera.updateProjectionMatrix();
  //render() //moet dit erbij?
} 