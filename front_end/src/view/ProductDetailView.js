import React from 'react'
import { Badge, FloatingLabel, ListGroup } from 'react-bootstrap';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactStars from '../components/ReactStarts';
import MessageBox from '../components/MesseageBox';
import { Store } from '../Store';


const ProductDetailView = (props) => {
    const params = useParams();
    const id = params.id;
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([])
    const [rate, setRate] = useState();
    const [productrate, setProductrate] = useState()
    const [comment, setComment] = useState();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo,cart: { cartItems }, } = state;
    
    const submitHandler = (e) => {
        const user_id = userInfo.id;
        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('star', rate);
        formData.append('user', user_id);
        fetch(`http://localhost:8080/review/add/${id}`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
                // localStorage.setItem('userInfo', JSON.stringify(data));
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const addToCartHandler = async (item) => {
        // const existItem = cartItems.find((x) => x.id === product.id);
        // const quantity = existItem ? existItem.quantity + 1 : 1;
        // console.log(item.id);
        // fetch(`http://localhost:8080/book/${item.id}`, {
        //   method: "GET"
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     // console.log(data);
        //     ctxDispatch({
        //       type: 'CART_ADD_ITEM',
        //       payload: { ...item, quantity },
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
    
      };

    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:8080/review/${id}`)
            .then((response) => response.json())
            .then((data) => setReviews(data))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:8080/rate/${id}`)
            .then((response) => response.json())
            .then((data) => setProductrate(data))
            .catch();
    }, []);
    // console.log(reviews);
    if (product.image == null) product.image = "logo192.png";
    return (
        <div style={{ padding: "100px" }}>

            <Row>
                <Col md={6}>
                    <img
                        className="img-large"
                        src={`/images/${product.image}`}
                        alt={product.title}
                    ></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>

                            <title>{product.title}</title>

                            <h1>{product.title}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <ReactStars
                                edit={false}
                                value={productrate}
                                size={24}
                            ></ReactStars>
                        </ListGroup.Item>
                        <ListGroup.Item>Pirce : ${product.pages}</ListGroup.Item>
                        <ListGroup.Item>Date : {product.date}</ListGroup.Item>
                        <ListGroup.Item>Author : {product.author}</ListGroup.Item>
                        <ListGroup.Item>Category : {product.category}</ListGroup.Item>
                        {/* <ListGroup.Item>
                            <Row xs={1} md={2} className="g-2">
                                {[product.image, ...product.images].map((x) => (
                                    <Col key={x}>
                                        <Card>
                                            <Button
                                                className="thumbnail"
                                                type="button"
                                                variant="light"
                                                // onClick={() => setSelectedImage(x)}
                                            >
                                                <Card.Img variant="top" src={x} alt="product" />
                                            </Button>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </ListGroup.Item> */}
                        <ListGroup.Item>
                            Description:
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.pages}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                        <Badge bg="success">In Stock</Badge>
                                            {/* {product.length > 0 ? (
                                                <Badge bg="success">In Stock</Badge>
                                            ) : (
                                                <Badge bg="danger">Unavailable</Badge>
                                            )} */}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {/* {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button
                                                // onClick={addToCartHandler} 
                                                variant="primary">
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )} */}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="my-3">
                <h2>Reviews</h2>
                <div className="mb-3">
                    {reviews.length === 0 && (
                        <MessageBox>There is no review</MessageBox>
                    )}
                </div>
                <ListGroup>
                    {reviews.map((review) => (
                        <ListGroup.Item key={review.id}>
                            <h5>{review.user}</h5>
                            <ReactStars value={review.star}
                                edit={false}
                                size={18}></ReactStars>
                            {/* <p>{review.date}</p> */}
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))
                    }
                </ListGroup>
                <div className="my-3">
                    {userInfo ? (
                        <form
                            onSubmit={submitHandler}
                        >
                            <h2>Write a customer review</h2>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <ReactStars
                                    half={false}
                                    size={24}
                                    onChange={(newRate) => { setRate(newRate)}}
                                ></ReactStars>
                            </Form.Group>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Comments"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    // value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </FloatingLabel>

                            <div className="mb-3">
                                <Button type="submit" disabled={!(comment && rate)}>
                                    Submit
                                </Button>
                                {/* <Button disabled={loadingCreateReview} type="submit">
                                    Submit
                                </Button> */}
                                {/* {loadingCreateReview && <LoadingBox></LoadingBox>} */}
                            </div>
                        </form>
                    ) : (
                        <h1></h1>
                    )}
                </div>
            </div>
        </div>
    )
};
export default ProductDetailView;
