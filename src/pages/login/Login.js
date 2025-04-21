import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("currentUser", username);
      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      setError(error.response.data.message || "An error occurred!");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });
      alert(response.data.message);
      setIsSignup(false); // Switch to login after signup
    } catch (error) {
      setError(error.response.data.message || "An error occurred!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-container" style={{ display: "flex", flexDirection: "column", height: "100vh", textAlign: "center" }}>
        {localStorage.getItem("loggedIn") ? (
          <>
            <h1>You have successfully logged in as {localStorage.getItem("currentUser")}!</h1>
            <b
              onClick={() => {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("currentUser");
                history.replace("/login");
              }}
              style={{ color: "#be0606", cursor: "pointer" }}
            >
              Logout
            </b>
          </>
        ) : (
          <div>
            <h2>{isSignup ? "Sign Up" : "Login"}</h2>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div style={{ color: "#be0606" }}>{error}</div>}
            <div>
              {isSignup ? (
                <button onClick={handleSignup} style={{ cursor: "pointer", backgroundColor:"#6b2869" }}>Sign Up</button>
              ) : (
                <button onClick={handleLogin} style={{ cursor: "pointer", backgroundColor:"#6b2869" }}>Login</button>
              )}
            </div>
            <div>
              <span
                style={{ cursor: "pointer", color: "#6b2869", fontSize:"18px" }}
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
