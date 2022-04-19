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

export const Navigation = () => {
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
        <Container className="container-fluid">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
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
