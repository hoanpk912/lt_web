import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
// import { Store } from "../Store";

const Login = (props) => {
    // React States
    const [errorMessages, setErrorMessages] = useState();
    const [username, setUsername] = useState("");
    const [password, setPasword] = useState("");
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;


    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch("http://localhost:8080/login", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                ctxDispatch({ type: 'USER_SIGNIN', payload: data });
                localStorage.setItem('userInfo', JSON.stringify(data));
                console.log(userInfo);
                setErrorMessages();
                navigate("/products");

            })
            .catch((err) => {
                console.log(err);
                setErrorMessages("username or password is not correct");
            });

        e.preventDefault();

    };
    useEffect(() => {
        if (userInfo) {
          navigate("/products");
        }
      }, [navigate, userInfo]);
    return (
        <div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="username" required className="form-control"
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="password" required className="form-control"
                            onChange={(e) => setPasword(e.target.value)} />
                    </div>
                    {errorMessages}
                    <div className="button-container">
                        <input type="submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;