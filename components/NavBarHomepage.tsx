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
import { IFile, ICard, IPatient } from "../types";

type NavBarHomeProps = {
  patients: IPatient[];
  changePatient: Function;
};

export default function NavBarHome({
  patients,
  changePatient,
}: NavBarHomeProps) {
  const [inputName, setInputName] = useState([]);
  let patientsNames = [];
  patients.map((patient) => {
    patientsNames.push(patient.name);
  });

  console.log(inputName);
  const handleClick = () => {
    const patient = patients.filter((patient) => patient.name == inputName[0]);
    changePatient(patient[0]);
  };
  return (
    <div>
      <Navbar className="bg-gray-200 h-12 flex space-x-4" expand="lg">
        <div className="pl-4"></div>
        <Image
          src={require("./images/relu-logo-small.png")}
          className=""
          alt="Logo"
          width={120}
          height={50}
        />
        <Container className="container-fluid">
          <Nav className="flex right-0">
            <Form className="d-flex">
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                options={patientsNames}
                //onInputChange={(event) => setInputName()}
                selected={inputName}
              />
              <Button variant="outline-success" onClick={handleClick}>
                Search
              </Button>
            </Form>
          </Nav>
          <Nav className="flex right-0">
            <Nav.Link
              onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
