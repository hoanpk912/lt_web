import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function BookAddView(props) {
    const params = useParams();
    const [book, setBook] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [preview, setPreview] = useState();
    const [edit, setEdit] = useState(false);
    const id = params.id;
    const navigate = useNavigate();


    const onSaveClick = (e) => {

        const formData = new FormData();
        setSelectedFile(book.image);
        formData.append('file', selectedFile);
        formData.append('title', book.title);
        formData.append('author', book.author);
        formData.append('description', book.description);
        formData.append('date', book.date);
        formData.append('pages', book.pages);
        formData.append('category', book.category);
        console.log(book);
        fetch(`http://localhost:8080/book/save/${id}`, {
            method: "PUT",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        navigate("/books");
    };
    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setBook({ ...book, image: e.target.files[0].name });
        setIsFilePicked(true);
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setPreview(objectUrl);

    };
    
    useEffect(() => {
        // var sessionc = sessionStorage.getItem("role");
        // console.log(sessionc);
        // if(sessionc == null) {
        //     navigate("/login");
        // }
        fetch(`http://localhost:8080/book/${id}`)
        .then((response) => response.json())
        .then((data) => setBook(data))
        .catch((err) => console.log(err))
    }, []);

    return (
        <div style={{ padding: "100px", textAlign: "center" }}>
            <form onSubmit={onSaveClick}>
                <div class="row">
                    <h1>{id < 0 ? "new book" : `book ${id}`}</h1>
                    <div class="col-5 mx-4">
                        <div class="row">
                            <div class="col-6">
                                Title: {" "}
                                <input type="text" name="title" class="form-control" 
                                    value={book.title} required disabled = {!edit && "disabled"}
                                    onChange={(e) => setBook({ ...book, title: e.target.value })}></input>
                            </div>
                            <div class="col-6">
                                Author: {" "}
                                <input type="text" name="author" class="form-control" 
                                    value={book.author} required disabled = {!edit && "disabled"}
                                    onChange={(e) => setBook({ ...book, author: e.target.value })}></input>
                            </div>
                        </div>

                        Description: {" "}
                        <textarea name="description" class="form-control" 
                            value={book.description} disabled = {!edit && "disabled"}
                            onChange={(e) => setBook({ ...book, description: e.target.value })}></textarea>

                        <div class="row">
                            <div class="col-6">
                                Date: {" "}
                                <input type="date" name="date" class="form-control" 
                                    value={book.date} required disabled = {!edit && "disabled"}
                                    onChange={(e) => setBook({ ...book, date: e.target.value })}></input>
                            </div>
                            <div class="col-6">
                                Price: {" "}
                                <input type="number" name="pages" class="form-control" 
                                    value={book.pages} required disabled = {!edit && "disabled"}
                                    onChange={(e) => setBook({ ...book, pages: e.target.value })}></input>
                            </div>
                        </div>

                        Category: {" "}
                        <select class="form-select" name="category" required
                            disabled = {!edit && "disabled"}
                            value = {book.category}
                            onChange={(e) => setBook({ ...book, category: e.target.value})}>
                            <option value="">Select option</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-fiction">Non-Fiction</option>
                            <option value="Novels">Novels</option>
                        </select>
                    </div>
                    <div class="col-5 mx-4">
                        <input type="file" name="file" class="form-control" required
                        disabled = {!edit && "disabled"}
                        onChange={changeHandler} />
                        {isFilePicked && (
                            <div>
                                <img src={preview} alt="img" class="img-fluid img-thumbnail"></img>
                            </div>
                        )}
                        {book.image !== null && !isFilePicked ?
                            <div>
                                <img src={`/images/${book.image}`}></img>
                                <br />
                            </div>
                            : null
                        }
                    </div>
                </div>
                {!edit && <button type="button" class="btn btn-success" onClick={() => setEdit(true)}>Edit</button>}
                {edit && (<button type="submit" class="btn btn-success">Save</button>)}
            </form>
        </div>

    )
}
export default BookAddView;
