import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function AdminBooksView(props) {
    // const onViewClick
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [session, setSession] = useState();

    
    const handleDelete = (id) => {
        if (window.confirm("delete")) {
            fetch("http://localhost:8080/book/delete/" + id, {
                method: "DELETE",
            })
            .then((response) => response.json())
            .catch((err) => {console.log(err); window.alert("khóa ngoại không thể xóa")})
        }
    }
    // const checkRole = () => {
    //     var sessionc = sessionStorage.getItem("role");
    //     console.log(sessionc);
    //     if(sessionc == null)
    //         navigate("/login")
    // }


    useEffect(() => {
        // checkRole();
        fetch("http://localhost:8080/books")
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((err) => console.log(err));
    }, [books]);

    return (
        <div className="main" style={{ padding: "100px" }}>
            <h2 className="text-center">Books List</h2>
            <div className="row">
                <div>
                    <button className="btn btn-primary"
                        onClick={() =>{navigate(`/addBook`)}}
                    >
                        Add Book
                    </button>
                </div>

            </div>
            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Bookcode</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td><Link onClick={() => {window.location.href = `/product/${book.id}`;}}>{book.title}</Link></td>
                                <td>{book.author}</td>
                                <td>{book.description}</td>
                                <td>{book.date}</td>
                                <td>{book.pages}$</td>
                                <td>{book.category}</td>
                                <td><img src={"/images/"+book.image} width={50} height={50} /></td> 
                                

                                <td>
                                    <button className="btn btn-primary" onClick={() => {navigate(`/book/${book.id}`)}}>View</button>
                                    <button className="btn btn-danger" onClick={() => {;handleDelete(`${book.id}`)}}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminBooksView;