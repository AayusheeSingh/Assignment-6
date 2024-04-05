import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from "react-bootstrap"; 
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom, tokenAtom } from "../store";
import { addToHistory } from "@/lib/userData"; 
import { readToken, removeToken } from "@/lib/authenticate"; 

const MainNav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false); 
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 
  const token = readToken();

  
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const searchField = e.target.search.value;
    const queryString = `title=true&q=${searchField}`;
    // await addToHistory(queryString);
    setSearchHistory(await addToHistory(queryString)); 
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
  };
  
  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  };

  const collapseNavbar = () => setIsExpanded(false); 
  return (
    <>
      <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-primary" onToggle={() => setIsExpanded(!isExpanded)}>
        <Container>
          <Navbar.Brand>Aayushee Singh</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><a className="nav-link" onClick={collapseNavbar}>Home</a></Link>
              {token && <Link href="/search" passHref legacyBehavior><a className="nav-link" onClick={collapseNavbar}>Advanced Search</a></Link>}
            </Nav>
            
            {token && (
              <Form onSubmit={handleSearchSubmit} className="d-flex">
                <FormControl type="text" name="search" placeholder="Search" className="mr-2" />
                <Button type="submit" variant="outline-light">Search</Button>
              </Form>
            )}
           
            <Nav>
              {token ? (
                <NavDropdown title={token.userName} id="nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior><a className="dropdown-item" onClick={collapseNavbar}>Favourites</a></Link>
                  <NavDropdown.Divider />
                  <Link href="/history" passHref legacyBehavior><a className="dropdown-item" onClick={collapseNavbar}>Search History</a></Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav>
                  <Link href="/register" passHref legacyBehavior><a className="nav-link" onClick={collapseNavbar}>Register</a></Link>
                  <Link href="/login" passHref legacyBehavior><a className="nav-link" onClick={collapseNavbar}>Login</a></Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
