import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar,Nav } from 'react-bootstrap';
const Navbar1 = () => {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">CertificateIssueWeb</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
      <Nav.Link href="/signup">SignUp</Nav.Link>
      <Nav.Link href="issuepage">IssuePage</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        
    );
};

export default Navbar1;