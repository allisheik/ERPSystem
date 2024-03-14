import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBoxes, FaClipboardList, FaUsers, FaTruck } from 'react-icons/fa'; 
import Chart from 'chart.js/auto'; 
import './Dashboard.css'; 

function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  // Dummy data for products and orders
  const productsData = [
    { id: 1, name: 'Product 1', category: 'Category 1', price: 10, stockQuantity: 100 },
    { id: 2, name: 'Product 2', category: 'Category 2', price: 20, stockQuantity: 200 },
    { id: 3, name: 'Product 3', category: 'Category 1', price: 30, stockQuantity: 50 },
    { id: 4, name: 'Product 4', category: 'Category 1', price: 15, stockQuantity: 850 },
    { id: 5, name: 'Product 5', category: 'Category 1', price: 45, stockQuantity: 750 },
    { id: 6, name: 'Product 6', category: 'Category 2', price: 68, stockQuantity: 450 },

  ];

  const ordersData = [
    { id: 1, orderId: 'ORD001', customerName: 'John Doe', orderDate: new Date(), status: 'Pending' },
    { id: 2, orderId: 'ORD002', customerName: 'Jane Smith', orderDate: new Date(), status: 'Shipped' },
    { id: 3, orderId: 'ORD003', customerName: 'Alice Johnson', orderDate: new Date(), status: 'Delivered' },
    { id: 4, orderId: 'ORD004', customerName: 'Mvr Singh', orderDate: new Date(), status: 'Delivered' },
    { id: 5, orderId: 'ORD004', customerName: 'Joseph', orderDate: new Date(), status: 'Delivered' },
    { id: 6, orderId: 'ORD006', customerName: 'Stalin Chandra', orderDate: new Date(), status: 'Pending' },

  ];

  useEffect(() => {
    setProductsCount(productsData.length);

    setOrdersCount(ordersData.length);

    renderBarPlots();
  }, []);

  const renderBarPlots = () => {
    if (window.productsChart instanceof Chart) {
      window.productsChart.destroy();
    }
  
    if (window.ordersChart instanceof Chart) {
      window.ordersChart.destroy();
    }
  
    const productsChartCanvas = document.getElementById('productsChart');
    const ordersChartCanvas = document.getElementById('ordersChart');
  
    const productsLabels = productsData.map(product => product.name);
    const productsStockQuantities = productsData.map(product => product.stockQuantity);
  
    const ordersLabels = ordersData.map(order => order.orderId);
    const ordersStatusCounts = {
      Pending: ordersData.filter(order => order.status === 'Pending').length,
      Shipped: ordersData.filter(order => order.status === 'Shipped').length,
      Delivered: ordersData.filter(order => order.status === 'Delivered').length,
    };
  
    window.productsChart = new Chart(productsChartCanvas, {
      type: 'bar',
      data: {
        labels: productsLabels,
        datasets: [{
          label: 'Stock Quantity',
          data: productsStockQuantities,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  
    window.ordersChart = new Chart(ordersChartCanvas, {
      type: 'bar',
      data: {
        labels: Object.keys(ordersStatusCounts),
        datasets: [{
          label: 'Orders Count',
          data: Object.values(ordersStatusCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(75, 192, 192, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <Container>
      <h2 className="mt-3">Dashboard</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>Products Stock Quantity</Card.Title>
              <canvas id="productsChart" width="400" height="200"></canvas>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>Orders Status Distribution</Card.Title>
              <canvas id="ordersChart" width="400" height="200"></canvas>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4 p-3">
      <Card.Title>Quick Links</Card.Title>
        <Row className="g-4 justify-content-center">
          <Col md={3} className="text-center">
            <Link to="/products" className="quick-link text-decoration-none">
              <FaBoxes className="quick-link-icon mb-2" size={48} style={{ color: '#FF5733' }} />
              <div style={{ color: 'black' }}>Products</div>
            </Link>
          </Col>
          <Col md={3} className="text-center">
            <Link to="/orders" className="quick-link text-decoration-none">
              <FaClipboardList className="quick-link-icon mb-2" size={48} style={{ color: '#FFC300' }} />
              <div style={{ color: 'black' }}>Orders</div>
            </Link>
          </Col>
          <Col md={3} className="text-center">
            <Link to="/" className="quick-link text-decoration-none">
              <FaUsers className="quick-link-icon mb-2" size={48} style={{ color: '#33FF99' }} />
              <div style={{ color: 'black' }}>Customers</div>
            </Link>
          </Col>
          <Col md={3} className="text-center">
            <Link to="/" className="quick-link text-decoration-none">
              <FaTruck className="quick-link-icon mb-2" size={48} style={{ color: '#3399FF' }} />
              <div style={{ color: 'black' }}>Suppliers </div>
            </Link>
          </Col>
        </Row>
      </Card>
      <br></br>
    </Container>

  );
}

export default Dashboard;
