import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Register= (props) => {
    // React States
    const [errorMessages, setErrorMessages] = useState();
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log(user);
        fetch("http://localhost:8080/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; chartset=ISO-8859-1'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data == true) {
                    navigate("/login");
                }
            })
            .catch((err) => console.log(err));
            setErrorMessages("username valiable");
            e.preventDefault();

    };

    return (
        <div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Name</label>
                        <input type="text" name="name" required className="form-control"
                            onChange={(e) => setUser({...user, name: e.target.value})} />
                    </div>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="username" required className="form-control"
                            onChange={(e) => setUser({...user, username: e.target.value})} />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="password" required className="form-control"
                            onChange={(e) => setUser({...user, password: e.target.value})} />
                    </div>
                    {errorMessages}
                    <br/>
                    <div className="button-container">
                        <input type="submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;