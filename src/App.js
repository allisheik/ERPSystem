// App.js
import React from 'react';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Dashboard from './Components/Dashboard';
import ProductsManagement from './Components/ProductsManagement';
import OrdersManagement from './Components/OrdersManagement';
import Footer from './Components/Footer'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar bg="dark" variant="dark" expand="md" className="custom-navbar">
          <Container>
            <Navbar.Brand as={Link} to="/" className="navbar-brand">ERP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav>
                <Nav.Link as={Link} to="/" className="nav-link">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/products" className="nav-link">Products Management</Nav.Link>
                <Nav.Link as={Link} to="/orders" className="nav-link">Orders Management</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="content-container">
          <Routes>
            <Route path="/products" element={<ProductsManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Container>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
