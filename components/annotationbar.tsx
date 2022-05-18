import AnnotationCard from "./annotationcard";
import { ICard, IFile } from "../types";
import { GrAdd } from "react-icons/gr";
import { useState } from "react";
import { AiOutlineRightCircle, AiOutlineLeftCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { calculateObjectSize } from "bson";
import { time } from "console";
import { raycasting, removecolor, sphere } from "./stlviewer";
import {
  controls,
  scene,
  theline,
  loader,
  Skull,
  Stlviewer,
} from "./stlviewer";
import { Sprite } from "three";

type AnnotationBarProps = {
  file: IFile;
  setAnnoClick: Function;
  annoClick: boolean;
  setSelectedTooth: Function;
  annoSwiped: boolean;
  SetAnnoSwiped: Function;
  selectedTooth: String;
};

export default function AnnotationBar({
  file,
  setAnnoClick,
  annoClick,
  setSelectedTooth,
  annoSwiped,
  SetAnnoSwiped,
  selectedTooth,
}: AnnotationBarProps) {
  const [cards, setCards] = useState<any>(file.cards);

  const deleteCard = (cardID: number) => {
    setCards(cards.filter((card) => card._id != cardID));
    file.card_ids = file.card_ids.filter((IDs) => Object(cardID) != IDs);
    file.time = new Date().toLocaleString();
    fetch("/api/update_file", {
      method: "POST",
      body: JSON.stringify({ file }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteAnnoCard = () => {
    if (file.selected) {
      removecolor(file);
    }
    file.selected = null;
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
  };

  const newCard = () => {
    setSelectedTooth("");
    const new_card: ICard = {
      _id: uuidv4(),
      title: "",
      text: "",
      new: true,
    };
    deleteAnnoCard();
    file.selected = new_card;

    //call raycaster function
    raycasting({ file });

    file.time = new Date().toLocaleString();
    file.card_ids.push(new_card._id);
    setCards([...cards, new_card]);
    fetch("/api/update_file", {
      method: "POST",
      body: JSON.stringify({ file }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const onSwipe = () => {
    SetAnnoSwiped(!annoSwiped);
  };

  return (
    <div className="flex items-center">
      {!annoSwiped ? (
        <div
          className="border-black bg-gray-100 border flex flex-col items-center overflow-y-auto overflow-x-auto"
          style={{
            height: "calc(100vh - 48px)",
            width: "70%",
          }}
        >
          <div className="relative min-w-full" style={{ width: "100%" }}>
            <div className="flex pl-4 border-b-2 border-gray-400">
              <div className="xxlarge">Annotaties</div>
              <div className="absolute right-0 top-4">
                <button onClick={newCard}>
                  <GrAdd className="text-xl mx-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
          <div className="divide-y-2" style={{ width: "100%" }}>
            {cards.map((card, index) => {
              return (
                <AnnotationCard
                  key={card._id}
                  card={card}
                  deleteCard={deleteCard}
                  file={file}
                  setAnnoClick={setAnnoClick}
                  annoClick={annoClick}
                  setSelectedTooth={setSelectedTooth}
                  selectedTooth={selectedTooth}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="w-1/8 border-black border rounded-r-[5rem] flex flex-col items-center"
          style={{ height: "calc(100vh - 48px)" }}
        ></div>
      )}
      <button className="flex items-center text-4xl" onClick={onSwipe}>
        {!annoSwiped ? <AiOutlineLeftCircle /> : <AiOutlineRightCircle />}
      </button>
    </div>
  );
}
