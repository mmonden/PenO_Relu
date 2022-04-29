import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import SelectInput from "@mui/material/Select/SelectInput";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IFile, ICard, IPatient } from "../types";

type FileListProps = {
  files_input: IFile[];
  patients_input: IPatient[];
  file: IFile;
  resetSTL: Function;
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
            onClick={() => (document.location.href = "http://localhost:3000")}
          >
            <button>Home</button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title={selectedPatient.name} id="basic-nav-dropdown">
                {files.map((file, index) => {
                  return (
                    <NavDropdown.Item key={index} href={`/view/${file._id}`}>
                      {file.title}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <button onClick={() => resetSTL()}>Reset</button>
            </Nav>
            <Nav className="flex right-0">
              <Nav.Link
                onClick={() =>
                  signOut({ callbackUrl: "http://localhost:3000" })
                }
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
