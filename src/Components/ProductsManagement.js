import React, { useState } from 'react';
import { Table, Button, Modal, Form, Col, Row } from 'react-bootstrap';

const ProductsManagement = () => {
  const initialProducts = [
    { id: 1, name: 'Product 1', category: 'Category A', price: 10, stock: 20 },
    { id: 2, name: 'Product 2', category: 'Category B', price: 20, stock: 15 },
    { id: 3, name: 'Product 3', category: 'Category A', price: 15, stock: 30 },
    { id: 4, name: 'Product 4', category: 'Category 1', price: 15, stock: 850 },
    { id: 5, name: 'Product 5', category: 'Category 1', price: 45, stock: 750 },
    { id: 6, name: 'Product 6', category: 'Category 2', price: 68, stock: 450 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' });
  const [editingProductId, setEditingProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewProduct({ name: '', category: '', price: '', stock: '' });
    setEditingProductId(null);
  };

  const handleModalShow = () => setShowModal(true);

  const addProduct = () => {
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { id, ...newProduct }]);
    handleModalClose();
  };

  const editProduct = () => {
    setProducts(products.map(product => (product.id === editingProductId ? newProduct : product)));
    handleModalClose();
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleEditClick = (productId) => {
    const productToEdit = products.find(product => product.id === productId);
    setEditingProductId(productId);
    setNewProduct({ ...productToEdit });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2>Products Management</h2>
      <Row className="mb-3">
        <Col xs={12} sm={6}>
          <Button variant="primary" onClick={handleModalShow} className="mb-3">Add Product</Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{`$${product.price}`}</td>
              <td>{product.stock}</td>
              <td>
                <Button variant="info" onClick={() => handleEditClick(product.id)} className="me-sm-2">Edit</Button>
                <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProductId ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name" value={newProduct.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter category" name="category" value={newProduct.category} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter price" name="price" value={newProduct.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="productStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" placeholder="Enter stock" name="stock" value={newProduct.stock} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
          <Button variant="primary" onClick={editingProductId ? editProduct : addProduct}>{editingProductId ? 'Save' : 'Add'}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsManagement;
