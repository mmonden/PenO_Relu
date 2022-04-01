import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import SelectInput from "@mui/material/Select/SelectInput";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IFile, ICard } from "../types";

type FileListProps = {
  files_input: IFile[];
};

export const Navigation = ({ files_input }: FileListProps) => {
  const [files, setFiles] = useState(files_input);
  // const [title, setTitle] = files.map((item, index) => useState(item.title));

  return (
    <div>
      <Navbar className="bg-gray-400 h-12 flex space-x-4" expand="lg">
        <div className="pl-4"></div>
        <Image
          src={require("./images/relu-logo-small.png")}
          className=""
          alt="Logo"
          width={120}
          height={50}
        />
        <Container>
          <Navbar.Brand
            onClick={() => (document.location.href = "http://localhost:3000")}
          >
            <button>Home</button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() =>
                  signOut({ callbackUrl: "http://localhost:3000" })
                }
              >
                Logout
              </Nav.Link>
              <NavDropdown title="Patients" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">names</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Navbar.Text>
              Signed in as: <a className="underline">Rob Windey</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
