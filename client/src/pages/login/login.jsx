import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const action = login? 'login':'register';
    // setLogin(!login);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`https://booking-app-ubyc.onrender.com/api/auth/${action}`, credentials);
    //   console.log("details", res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick}  className="lButton">
          {login? "Login": "Register"}
        </button>
        {!login && (
                        <div>
                            Already a member?
                            <button onClick={() => setLogin(true)}>Login here</button>
                        </div>
                    )}
                    {login &&(
                         <div>
                         Don't have an account?
                         <button onClick={() => setLogin(false)}>Register</button>
                     </div>
                    )
                    }
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;