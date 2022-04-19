import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import SelectInput from "@mui/material/Select/SelectInput";
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
import { IFile, ICard } from "../types";

export const NavBarHome = () => {
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
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
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
};
