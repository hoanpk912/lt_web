import React, { useContext } from 'react'
import { useReducer } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MesseageBox';
import { Store } from '../Store';

const CartView = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo, cart: { cartItems },
    } = state;
    const updateCartHandler = async (item, quantity) => {
        console.log(item);
        fetch(`http://localhost:8080/book/${item.id}`)
        .then((response) => response.json())
        .then((data) => {
            ctxDispatch({
                type: 'CART_ADD_ITEM',
                payload: { ...item, quantity },
            });
        })
        .catch((err) => console.log(err));
    };
    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const checkoutHandler = () => {
        
        fetch(`http://localhost:8080/cart/add`, {
            method: "POST",
            body: JSON.stringify(cartItems),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        navigate("/books");
    };
    const formData = new FormData();
    // formData.append('book', cartItems);
    formData.append('user', userInfo.id);
    console.log(formData);
    console.log();
    return (
        <div style={{ padding: "100px" }}>
            <title>Shopping Cart</title>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.id}>
                                    <Row className="align-items-center">
                                        <Col md={4}>
                                            <img
                                                width="150"
                                                height="150"
                                                src={`/images/${item.image}`}
                                                alt={item.title}
                                                className="img-fluid rounded img-thumbnail"
                                            ></img>{' '}
                                            <Link to={`/product/${item.id}`}>{item.title}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button
                                                onClick={() =>
                                                    updateCartHandler(item, item.quantity - 1)
                                                }
                                                variant="light"
                                                disabled={item.quantity === 1}
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </Button>{' '}
                                            <span>{item.quantity}</span>{' '}
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    updateCartHandler(item, item.quantity + 1)
                                                }
                                                disabled={item.quantity === item.countInStock}
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>
                                        </Col>
                                        <Col md={3}>${item.pages}</Col>
                                        <Col md={2}>
                                            <Button
                                                onClick={() => removeItemHandler(item)}
                                                variant="light"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) : $
                                        {cartItems.reduce((a, c) => a + c.pages * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={checkoutHandler}
                                            disabled={cartItems.length === 0}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartView;