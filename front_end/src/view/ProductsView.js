import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Book from '../components/Book';



const ProductsView = () => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {

    fetch("http://localhost:8080/books")
        .then((response) => {return response.json()})
        .then((data) => {setBooks(data)})
        .catch((err) => console.log(err));
  }, [books]
  );
  
  return (
    
    <div className='main'>
      
    {/* <Helmet>
        <title>Amazona</title>
      </Helmet> */}
      <h1 className='product-title'>Featured Products</h1>
      {/* {loading && <div>load</div>} */}
      <div className="products">
        {(
          <Row>
            {books.map((book) => (
              <Col key={book.id} sm={6} md={4} lg={3} className="mb-2">
                <Book book={book}></Book>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
    
  )
}

export default ProductsView;