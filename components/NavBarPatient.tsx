import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import SelectInput from "@mui/material/Select/SelectInput";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IFile, ICard, IPatient } from "../types";
import { Typeahead } from "react-bootstrap-typeahead";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { AiOutlineClose, AiOutlineQuestionCircle } from "react-icons/ai";
import YoutubePopUp from "./youtubePopUp";
import Modal from "react-modal";
import { ARButton } from "./ARbutton"
import { renderer } from "./stlviewer";
// import '@google/model-viewer'
// import {
//   ARImage,
//   ModelViewer,
//   ARButton,
//   ARCarousel,
//   ARLink,
// } from '@real2u/react-ar-components'


type FileListProps = {
  files_input: IFile[];
  patients_input: IPatient[];
  file: IFile;
  resetSTL: Function;
};

// const buttonAR = ARButton.createButton(renderer)

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const Navigation = ({
  files_input,
  patients_input,
  file,
  resetSTL,
}: FileListProps) => {
  const selectedPatient = patients_input.filter((patient) =>
    patient.file_ids.includes(file._id)
  )[0];
  const [files, setFiles] = useState(
    files_input.filter((fileFromPatient) =>
      selectedPatient.file_ids.includes(fileFromPatient._id)
    )
  );

  const [youtubeClick, setYoutubeClick] = useState(false);

  let patientsNames = [];
  patients_input.map((patient) => {
    patientsNames.push(patient.name);
  });

  return (
    <div className="min-w-screen">
      <Navbar
        className="bg-gray-400 h-12 flex space-x-4 min-w-full"
        expand="lg"
      >
        <Container className="container-fluid min-w-full">
          <div className="pl-2 pr-4 pt-2">
            <Image
              src={require("./images/relu-logo-small.png")}
              className=""
              alt="Logo"
              width={120}
              height={50}
            />
          </div>
          <Navbar.Brand
            onClick={() => (document.location.href = "http://localhost:3000/")}
          >
            <button>Home</button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto space-x-4">
              <NavDropdown title={selectedPatient.name} id="basic-nav-dropdown">
                {files.map((file, index) => {
                  return (
                    <NavDropdown.Item key={index} href={`/view/${file._id}`}>
                      {file.title}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <button onClick={() => resetSTL()}>ClearView</button>
            </Nav>
            <Nav className="flex right-0">
              <div className="flex items-center">
                <AiOutlineQuestionCircle
                  size={28}
                  onClick={() => setYoutubeClick(true)}
                />
              </div>
              <Nav.Link
                onClick={() =>
                  signOut({ callbackUrl: "http://relu-ano.vercel.app" })
                }
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal isOpen={youtubeClick} style={customStyles}>
        <div className="relative">
          <div className="absolute -right-4 -top-4">
            <AiOutlineClose onClick={() => setYoutubeClick(false)} />
          </div>
          <div>{youtubeClick ? <YoutubePopUp timeStamp={"22"} /> : false}</div>
        </div>
      </Modal>
    </div>
  );
};
