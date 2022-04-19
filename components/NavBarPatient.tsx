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
  console.log(files);

  return (
    <div className="min-w-screen">
      <Navbar className="bg-gray-400 h-12 flex space-x-4" expand="lg">
        <div className="pl-4"></div>
        <Image
          src={require("./images/relu-logo-small.png")}
          className=""
          alt="Logo"
          width={120}
          height={50}
        />
        <Container className="container-fluid">
          <Navbar.Brand
            onClick={() => (document.location.href = "http://localhost:3000")}
          >
            <button>Home</button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Patients" id="basic-nav-dropdown">
                {files.map((item, index) => {
                  return (
                    <NavDropdown.Item key={index} href="#action/3.1">
                      {item.title}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
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
