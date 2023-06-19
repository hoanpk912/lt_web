import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductsView from './view/ProductsView';
import ProductDetailView from './view/ProductDetailView';
import CartView from './view/CartsView';
import { Navigate } from 'react-router-dom';
import Login from './view/Login';
import { Store, StoreProvider } from './Store';
import { useContext } from 'react';
import OrderView from './view/OrderView';
import SearchView from './view/SearchView';
import AdminBooksView from './view/AdminBooksView';
import BookEditView from './view/BookEditView';
import Register from './view/Register.js';
import AdminRoute from './components/AdminRoute';

function App() {
  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { fullBox, cart, userInfo } = state;
  return (

    <div className="App">
      <StoreProvider>
        <Header />
        <Routes>

          <Route path='' element={<Navigate to="products" />} />
          {/* <Route path='book/:id' element={<Book />} />
        <Route path='register' element={<Register />} />
        <Route path='addBook' element={<AddBook />} />
        <Route path='test' element={<Test />} /> */}
          <Route path='products' element={<ProductsView />} />
          <Route path='product/:id' element={<ProductDetailView />} />
          <Route path='cart' element={<CartView />} />
          <Route path='login' element={<Login />} />
          <Route path='order' element={<OrderView />} />
          <Route path='search' element={<SearchView />} />
          <Route path='books' element={<AdminRoute><AdminBooksView /></AdminRoute>} />
          <Route path='book/:id' element={<AdminRoute><BookEditView /></AdminRoute>} />
          <Route path='register' element={<Register />} />
          
        </Routes>

        {/* <Footer /> */}
      </StoreProvider>
    </div>
  );
}

export default App;
