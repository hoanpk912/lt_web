import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Book from '../components/Book';



const SearchView = () => {
  const [books, setBooks] = useState([]);
  const { search } = useLocation();
  const sp = new URLSearchParams(search)
  const query = sp.get('query') || 'all';

  useEffect(() => {

    fetch(`http://localhost:8080/search?query=${query}`)
        .then((response) => {return response.json()})
        .then((data) => {setBooks(data)})
        .catch((err) => console.log(err));
  }, []
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

export default SearchView;