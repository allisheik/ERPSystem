import React, { useState } from 'react';
import { Button, Table, Modal, Form, Col, Row } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function OrdersManagement() {
  const initialOrders = [
    { id: 1, orderId: 'ORD001', customerName: 'John Doe', orderDate: new Date(2024, 2, 12), status: 'Pending' },
    { id: 2, orderId: 'ORD002', customerName: 'Jane Smith', orderDate: new Date(2024, 2, 13), status: 'Shipped' },
    { id: 3, orderId: 'ORD003', customerName: 'Alice Johnson', orderDate: new Date(2024, 2, 14), status: 'Delivered' },
    { id: 4, orderId: 'ORD004', customerName: 'Mvr Singh', orderDate: new Date(), status: 'Delivered' },
    { id: 5, orderId: 'ORD004', customerName: 'Joseph', orderDate: new Date(), status: 'Delivered' },
    { id: 6, orderId: 'ORD006', customerName: 'Stalin Chandra', orderDate: new Date(), status: 'Pending' },

  ];

  const [orders, setOrders] = useState(initialOrders);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');

  const viewOrdersForDate = (date) => {
    setSelectedDate(date);
  };

  const ordersForSelectedDate = orders.filter(order => order.orderDate.toDateString() === selectedDate.toDateString());

  const handleOrderDetailClick = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id ? { ...order, status: orderStatus } : order
    );
    setOrders(updatedOrders);
    setShowOrderModal(false);
  };

  const handleDeleteOrder = (orderId) => {
    const filteredOrders = orders.filter(order => order.id !== orderId);
    setOrders(filteredOrders);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Orders Management</h2>
      <Row>
        <Col xs={12} md={6}>
          <h3>Calendar View</h3>
          <Calendar onChange={viewOrdersForDate} value={selectedDate} />
        </Col>
        <Col xs={12} md={6}>
          <div>
            <h3>Orders for {selectedDate.toDateString()}</h3>
            {ordersForSelectedDate.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersForSelectedDate.map(order => (
                    <tr key={order.id}>
                      <td>{order.orderId}</td>
                      <td>{order.customerName}</td>
                      <td>{order.orderDate.toLocaleDateString()}</td>
                      <td>{order.status}</td>
                      <td>
                        <div>
                          <Button variant="info" onClick={() => handleOrderDetailClick(order)} className="me-2">Details</Button>
                          <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No orders for {selectedDate.toDateString()}</p>
            )}
          </div>
          <div>
            <h3>All Orders</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.orderId}</td>
                    <td>{order.customerName}</td>
                    <td>{order.orderDate.toLocaleDateString()}</td>
                    <td>{order.status}</td>
                    <td>
                      <div>
                        <Button variant="info" onClick={() => handleOrderDetailClick(order)} className="me-2">Details</Button>
                        <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Modal show={showOrderModal} onHide={handleCloseOrderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Order ID:</strong> {selectedOrder?.orderId}</p>
          <p><strong>Customer Name:</strong> {selectedOrder?.customerName}</p>
          <p><strong>Order Date:</strong> {selectedOrder?.orderDate.toLocaleDateString()}</p>
          <p>
            <strong>Status:</strong>
            <Form.Control as="select" value={orderStatus} onChange={handleStatusChange}>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </Form.Control>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOrderModal}>Close</Button>
          <Button variant="primary" onClick={handleUpdateStatus}>Update Status</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrdersManagement;
