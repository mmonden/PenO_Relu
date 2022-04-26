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

let camera, scene, controls, renderer, followLight, light, theline, theline1;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms || 100));
}

export async function raycasting({ file }: FileCardProps) {
  let changed = new Boolean();
  changed = false;

  /// Begin click vs drag v2
  const delta = 2;
  let startX;
  let startY;

  // Begin code mouseclick
  document.addEventListener("mousedown", handlemousdown);

  function handlemousdown(event) {
    startX = event.pageX;
    startY = event.pageY;
  }

  const mouse = new THREE.Vector2();
  var raycaster = new THREE.Raycaster();

  document.addEventListener("mouseup", handlemouseup);

  function handlemouseup(event) {
    const diffX = Math.abs(event.pageX - startX);
    const diffY = Math.abs(event.pageY - startY);

    if (diffX < delta && diffY < delta) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Begin raycaster
      if (file.selected) {
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        for (var i = 0; i < intersects.length; i++) {
          if (intersects[i].object instanceof THREE.Mesh && !changed) {
            //@ts-ignore
            intersects[i].object.material.color.set(0xff0000);
            file.selected.position = intersects[i].point.clone();
            file.selected.endPosition = intersects[i].point.setLength(100);
            changed = true;
          }
        }

        //code for coloring the selected mesh
        /*for (var i = 0; i < scene.children.length; i++) {
          if (scene.children[i] instanceof THREE.Mesh) {
            if (
              typeof intersects[0] !== "undefined" &&
              scene.children[i] == intersects[0].object
            ) {
              // @ts-ignore
              (scene.children[i] as THREE.Mesh).material.color.set(0x00ff00);
            } else {
              // @ts-ignore
              (scene.children[i] as THREE.Mesh).material.color.set(0xd3d3d3);
            }
          }
        }*/
      }
      // End raycaster
    }
  }
  // End code mouseclick

  while (!changed) {
    await sleep(100);
  }

  document.removeEventListener("mousedown", handlemousdown); //clean up listeners when raycaster has finished
  document.removeEventListener("mouseup", handlemouseup);
  fetch("/api/update_file", {
    //update in database
    method: "POST",
    body: JSON.stringify({ file }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function Stlviewer({ file }: FileCardProps) {
  const threeContainerRef = useRef(null);

  useEffect(() => {
    init();

    var startingpoint1 = [0,0,0]
    var endpoint1 = [20,0,0]

    //start of code for drawing theline
    const material1 = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x000000),
      linewidth: 1,
    });

    const points1 = [];
    points1.push(startingpoint1);
    points1.push(endpoint1);
    const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
    theline1 = new THREE.Line(geometry1, material1);
    scene.add(theline1);


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
        materials.push(materialTooth);
      }
    }

    for (var x = 1; x < 5; x++) {
      for (var y = 1; y < 7; y++) {
        let filename = "Tooth_".concat(x.toString()).concat(y.toString());

        loader.load(
          "https://annosend.blob.core.windows.net/stl-files/" +
            filename +
            ".stl",
          function (geometry) {
            let toothNr = parseInt(filename.split("_").pop());
            let a = Math.floor(toothNr / 10);
            let b = toothNr % 10;

            const mesh = new THREE.Mesh(
              geometry,
              materials[(a - 1) * 6 + (b - 1)]
            );
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
      "https://annosend.blob.core.windows.net/stl-files/Mandible.stl",
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

    document.addEventListener("dblclick", function (event) {
      if (file.selected) {
        var title = file.selected.title;
        scene.children = scene.children.filter(
          (child) => !(child instanceof Sprite)
        );
        if (theline) {
          scene.remove(theline);
        }

        //variabeles for determining the postion of the text label and corresponding line
        var startingpoint = file.selected.position; //get startingpoint out of selected card
        var endpoint = file.selected.endPosition; //to be calculated

        //start of code for drawing theline
        const material = new THREE.LineBasicMaterial({
          color: new THREE.Color(0x000000),
          linewidth: 1,
        });

        const points = [];
        if (startingpoint && endpoint) {
          points.push(startingpoint);
          points.push(endpoint);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          theline = new THREE.Line(geometry, material);
          scene.add(theline);
          //end of code for drawing theline

          //start code for textlabel
          var tekstlabel = makeTextSprite(title, {
            fontsize: 50,
            borderColor: { r: 0, g: 0, b: 0, a: 1.0 },
            backgroundColor: { r: 169, g: 169, b: 169, a: 1.0 },
          });
          tekstlabel.position.set(endpoint.x + 5, endpoint.y, endpoint.z); //Define sprite's anchor point
          scene.add(tekstlabel);
          //end code for text label
        }
      }
    });

    // loader.load(
    //   "https://annosend.blob.core.windows.net/stl-files/Skull.stl",
    //   function (geometry) {
    //     const mesh = new THREE.Mesh(geometry, materialSkull);
    //     scene.add(mesh);
    //   },
    //   (xhr) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    animate();
  });

  return <div ref={threeContainerRef} />;
}

function init() {
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

  camera.position.set(-1.2, -33.8, -57.33); // Set position like this
  //camera.rotation.set(0, 100, 0);
  requestAnimationFrame(render);
  camera.updateProjectionMatrix();

  //RENDERER
  renderer = new THREE.WebGLRenderer();
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);

  //CONTROLS
  controls = new OrbitControls(camera, renderer.domElement);
  controls.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: 'ArrowUp', // up arrow
    RIGHT: 'ArrowRight', // right arrow
    BOTTOM: 'ArrowDown' // down arrow
  }
  controls.update();

}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  followLight.position.copy(camera.position);

  //camera.lookAt(new THREE.Vector3(5, 0, -57.33));

  renderer.render(scene, camera);
}

//FUNCTION FOR BUTTONS IN "Tanden" TO ADAPT CAMARA PERSPECTIVE WHEN PUSHED ON
function ChangePerspective(x, y, z) {
  camera.position.set(x, y, z);
  camera.updateProjectionMatrix();
  render();
}
