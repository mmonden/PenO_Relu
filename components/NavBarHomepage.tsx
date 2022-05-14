import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import SelectInput from "@mui/material/Select/SelectInput";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Button,
  Container,
  Dropdown,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { IFile, ICard, IPatient } from "../types";
import { AiOutlineQuestionCircle, AiOutlineClose } from "react-icons/ai";
import YoutubePopUp from "./youtubePopUp";
import Modal from "react-modal";

type NavBarHomeProps = {
  patients: IPatient[];
  changePatient: Function;
};

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

export default function NavBarHome({
  patients,
  changePatient,
}: NavBarHomeProps) {
  const [inputName, setInputName] = useState([]);
  const [youtubeClick, setYoutubeClick] = useState(false);
  let patientsNames = [];
  patients.map((patient) => {
    patientsNames.push(patient.name);
  });

  const handleClick = () => {
    const patient = patients.filter((patient) => patient.name == inputName[0]);
    changePatient(patient[0]);
  };
  return (
    <div>
      <Navbar className="bg-gray-200 h-12 flex space-x-4" expand="lg">
        <Container className="container-fluid min-w-full">
          <div className="pl-2 pr-4 pt-2">
            <Image
              src={require("./images/relu-logo-small.png")}
              className=""
              alt="Logo"
              width={70}
              height={44}
            />
          </div>
          <Nav className="me-auto space-x-4">
            <Form className="d-flex">
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                options={patientsNames}
                onChange={(event) => setInputName(event)}
                selected={inputName}
              />
              <Button variant="outline-success" onClick={handleClick}>
                Search
              </Button>
            </Form>
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
        </Container>
      </Navbar>
      <Modal isOpen={youtubeClick} style={customStyles}>
        <div className="relative">
          <div className="absolute -right-4 -top-4">
            <AiOutlineClose onClick={() => setYoutubeClick(false)} />
          </div>
          <div>{youtubeClick ? <YoutubePopUp timeStamp={"0"} /> : false}</div>
        </div>
      </Modal>
    </div>
  );
}
