import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { Store } from "../Store";



function Header() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { fullBox, cart, userInfo } = state;
    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('cartItems');
        window.location.href = '/login';
    };
    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed="top" >
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        React Bootstrap
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />

                        <Nav className="me-auto  w-100  justify-content-end">
                            <Link to="/cart" className="nav-link">
                                Cart
                                {cart.cartItems.length > 0 && (
                                    <Badge pill bg="danger">
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </Badge>
                                )}
                            </Link>
                            {!userInfo && (
                                <Link className="nav-link" to="/login">
                                    Sign In
                                </Link>
                                
                            )}
                            {!userInfo && (
                                <Link className="nav-link" to="/register">
                                    Resgister
                                </Link>
                                
                            )}
                            {userInfo && userInfo.role === "ROLE_USER" && (
                                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                    <Link className="nav-link" to="/profile">
                                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                                    </Link>
                                    <Link className="nav-link" to="/orderhistory">
                                        <NavDropdown.Item>Order History</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Divider />
                                    <Link
                                        className="dropdown-item"
                                        to="#signout"
                                        onClick={signoutHandler}
                                    >
                                        Sign Out
                                    </Link>
                                </NavDropdown>
                            )}
                            
                            {userInfo && userInfo.role === "ROLE_ADMIN" && (
                                <NavDropdown
                                    title={<img
                                        alt=""
                                        src="/logo192.png"
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top"
                                    />}
                                    id="admin-nav-dropdown" >

                                    <Link  className="nav-link" onClick={() => {window.location.href = '/products';}}>
                                        <NavDropdown.Item>Home</NavDropdown.Item>
                                    </Link>
                                    <Link to="/books" className="nav-link" onClick={() => {window.location.href = '/books';}}>
                                        <NavDropdown.Item>Product</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Divider />
                                    <Link
                                        className="dropdown-item"
                                        to="#signout"
                                        onClick={signoutHandler}
                                    >
                                        Sign Out
                                    </Link>
                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>

                </Container>

            </Navbar>
        </div >
    );

}


export default Header;
