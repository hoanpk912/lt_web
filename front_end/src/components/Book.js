import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import ReactStars from './ReactStarts';

const Book = (props) => {
  const { book } = props;
  const [productrate, setProductrate] = useState();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  // console.log(cartItems);
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x.id === book.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // const formData = new FormData();
    // formData.append('username', username);
    // formData.append('password', passord);
    console.log(item.id);
    fetch(`http://localhost:8080/book/${item.id}`, {
      method: "GET",
      // body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...item, quantity },
        });
      })
      .catch((err) => {
        console.log(err);
      });

  };
  useEffect(() => {

    fetch(`http://localhost:8080/rate/${book.id}`)
      .then((response) => response.json())
      .then((data) => setProductrate(data))
      .catch();
  }, []);
  if (book.image == null) book.image = "logo192.png";
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`/images/${book.image}`} height="280px" />
      <Card.Body>
        <Card.Title><Link to={`/product/${book.id}`}>{book.title}</Link></Card.Title>
        <Card.Text >
          <ReactStars
            edit={false}
            value={productrate}
            size={24} />
        </Card.Text>
        <Card.Text>
          {book.pages}$
        </Card.Text>
        <Button variant="primary" onClick={() => addToCartHandler(book)}>Add to cart</Button>
      </Card.Body>
    </Card>

  )
}

export default Book;