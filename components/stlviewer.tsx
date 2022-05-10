import { useRef, useEffect, useState } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { AxesHelper, InstancedInterleavedBuffer, XRHandJoint } from "three";

import { IFile, ICard } from "../types";
import { text } from "stream/consumers";
import { Sprite } from "three";
import { makeTextSprite } from "./makeTextSprite";
// import { SpriteText2D, textAlign } from 'three-text2d'
import CameraControls from "../camera-controls";
import React from "react";
import { Loader } from "react-bootstrap-typeahead";

CameraControls.install({ THREE: THREE });

const loader = new STLLoader();

// Mandible material
const materialMandible = new THREE.MeshPhongMaterial({
  color: 0xd3d3d3,
  opacity: 1.0,
  transparent: true,
});

let dictPositions,
  clock,
  camera,
  scene,
  controls,
  renderer,
  followLight,
  light,
  skull = [],
  first = [],
  sphere,
  theline;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms || 100));
}

export function removecolor(file) {
  for (var j = 0; j < scene.children.length; j++) {
    if (
      file.selected &&
      scene.children[j].name == file.selected.intersect &&
      scene.children[j].material &&
      scene.children[j].material.type == "MeshPhongMaterial"
    ) {
      scene.children[j].material.color.set(0xffffff);
    }
  }
}
export function addcolor(file) {
  for (var j = 0; j < scene.children.length; j++) {
    if (
      file.selected &&
      scene.children[j].name == file.selected.intersect &&
      scene.children[j].material &&
      scene.children[j].material.type == "MeshPhongMaterial"
    ) {
      scene.children[j].material.color.set(0xff0000);
    }
  }
}

export function onDblClick(file: IFile) {
  if (file.selected) {
    var title = file.selected.title;
    scene.children = scene.children.filter(
      (child) => !(child instanceof Sprite)
    );
    if (theline) {
      scene.remove(theline);
      if (scene.getObjectByProperty("name", "sphere") != undefined) {
        const object = scene.getObjectByProperty("name", "sphere");
        object.geometry.dispose();
        object.material.dispose();
        scene.remove(object);
      }
    }

    //variabeles for determining the postion of the text label and corresponding line
    var startingpoint = file.selected.position; //get startingpoint out of selected card
    var endpoint = file.selected.endPosition; //to be calculated
    //start of code for drawing theline
    const linematerial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x000000),
      linewidth: 1,
    });

    const points = [];
    if (startingpoint && endpoint) {
      points.push(startingpoint);
      points.push(endpoint);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      theline = new THREE.Line(geometry, linematerial);
      scene.add(theline);
      //end of code for drawing theline

      //start code for textlabel
      var tekstlabel = makeTextSprite(title, {}, false, 1);

      const geo = new THREE.SphereGeometry(0.5, 32, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const sphere = new THREE.Mesh(geo, material);
      sphere.position.set(startingpoint.x, startingpoint.y, startingpoint.z);
      sphere.name = "sphere";
      scene.add(sphere);
      // var tekstlabel = new SpriteText2D("SPRITE", { align: textAlign.center,  font: '40px Arial', fillStyle: '#000000' , antialias: false })
      tekstlabel.position.set(endpoint.x, endpoint.y, endpoint.z); //Define sprite's anchor point
      scene.add(tekstlabel);
      //end code for text label
    }
  }
}

type raycastingProps = {
  file: IFile;
};

export async function raycasting({ file }: raycastingProps) {
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
            file.selected.position = intersects[i].point.clone();
            file.selected.endPosition = intersects[i].point.setLength(100);
            //@ts-ignore
            file.selected.intersect = intersects[i].object.name;
            addcolor(file);
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

type skullProps = {
  select: boolean;
};

export function LoadSkull(setSkullLoaded) {
  loader.load(
    "https://annosend.blob.core.windows.net/stl-files/Skull.stl",
    function (geometry) {
      geometry.translate(0, 0, 35);
      const skullMesh = new THREE.Mesh(geometry, materialMandible);
      skullMesh.name = "SkullMesh";
      skull.push(skullMesh);
      first.push(1);
      setSkullLoaded(true);
    },
    (xhr) => {
      //Òconsole.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );
}

const Skull = React.memo(function Skull({ select }: skullProps) {
  if (select) {
    scene.add(skull[0]);
  } else {
    if (first.length == 0) {
    } else {
      if (
        scene != undefined &&
        scene.getObjectByProperty("name", "SkullMesh") != undefined
      ) {
        const object = scene.getObjectByProperty("name", "SkullMesh");
        object.geometry.dispose();
        object.material.dispose();
        scene.remove(object);
        renderer.renderLists.dispose();
      }
    }
  }
  return <div></div>;
});

type FileCardProps = {
  file: IFile;
  setSkullLoaded: Function;
};

const Stlviewer = React.memo(function Stlviewer({
  file,
  setSkullLoaded,
}: FileCardProps) {
  LoadSkull(setSkullLoaded);
  const threeContainerRef = useRef(null);
  //STL file loading
  useEffect(() => {
    Init();
    THREE.Cache.enabled = true;

    //add Container to renderer
    threeContainerRef.current.appendChild(renderer.domElement);

    //dunno what this do
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    var materials = {};
    for (var x = 1; x < 5; x++) {
      for (var y = 1; y < 9; y++) {
        let toothname = "Tooth_".concat(x.toString()).concat(y.toString());
        const materialTooth = new THREE.MeshPhongMaterial({
          color: 0xd3d3d3,
          opacity: 1.0,
          transparent: true,
        });
        materials[toothname] = materialTooth;
      }
    }
    dictPositions = {};
    for (var x = 1; x < 5; x++) {
      for (var y = 1; y < 8; y++) {
        let filename = "Tooth_".concat(x.toString()).concat(y.toString());
        loader.load(
          "https://annosend.blob.core.windows.net/stl-files/" +
            filename +
            ".stl",
          function (geometry) {
            geometry.translate(0, 0, 35);
            let toothNr = parseInt(filename.split("_").pop());
            //let a = Math.floor(toothNr / 10);
            //let b = toothNr % 10;

            const mesh = new THREE.Mesh(geometry, materials[filename]);
            scene.add(mesh);
            mesh.name = filename;
            getAbsolutePosition(mesh, dictPositions);
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          (error) => {}
        );
      }
    }

    loader.load(
      "https://annosend.blob.core.windows.net/stl-files/Mandible.stl",
      function (geometry) {
        geometry.translate(0, 0, 35);
        const mesh = new THREE.Mesh(geometry, materialMandible);
        scene.add(mesh);
        getAbsolutePosition(mesh, dictPositions);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    anim();
  });
  return <div ref={threeContainerRef} />;
});

function Init() {
  //creating scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  //light
  followLight = new THREE.DirectionalLight(0xffffff, 1.0);
  followLight.position.set(20, 100, 10);
  followLight.target.position.set(0, 0, 0);
  followLight.castShadow = true;
  scene.add(followLight);

  light = new THREE.AmbientLight(0x404040, 0.25);
  scene.add(light);

  //CAMERA
  camera = new THREE.PerspectiveCamera(
    90, //field of view, number of vertical degrees it is seen --> lower : objects are closer <-> higher : objects are farther
    window.innerWidth / window.innerHeight,
    0.1, //distance from camera object starts to appear
    1000 //distance from camera objects stops appearing
  );

  camera.position.set(0, -128, 0); // Set position like this
  //camera.rotation.set(0, 100, 0);
  requestAnimationFrame(render);
  camera.updateProjectionMatrix();
  camera.up.set(0, 0, 1);

  //RENDERER
  renderer = new THREE.WebGLRenderer();
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);

  //CONTROLS + CLOCK
  clock = new THREE.Clock();
  controls = new CameraControls(camera, renderer.domElement);
  controls.mouseButtons.left = CameraControls.ACTION.TRUCK;
  controls.mouseButtons.left = CameraControls.ACTION.TOUCH_ROTATE;
}

function anim() {
  const delta = clock.getDelta();
  const hasControlsUpdated = controls.update(delta);

  requestAnimationFrame(anim);

  if (hasControlsUpdated) {
    renderer.render(scene, camera);
  }

  render();
}

function render() {
  followLight.position.copy(camera.position);

  //camera.lookAt(new THREE.Vector3(5, 0, -57.33));

  renderer.render(scene, camera);
}

function getAbsolutePosition(mesh, dictPositions) {
  mesh.geometry.computeBoundingBox();

  var boundingBox = mesh.geometry.boundingBox;
  var position = new THREE.Vector3();

  position.subVectors(boundingBox.max, boundingBox.min);
  position.multiplyScalar(0.5);
  position.add(boundingBox.min);
  position.applyMatrix4(mesh.matrixWorld);
  dictPositions[mesh.name] = position;
}

function filter(id) {
  scene.children = scene.children.filter((child) => !(child.id == id));
}

export {
  controls,
  scene,
  theline,
  dictPositions,
  loader,
  Stlviewer,
  Skull,
  sphere,
  camera,
  renderer,
};
