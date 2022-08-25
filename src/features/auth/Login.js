import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ user, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      if (!error?.originalStatus) {
        setErrorMessage("No Server Response");
      } else if (error.originalStatus === 400) {
        setErrorMessage("Missing Username or Password");
      } else if (error.originalStatus === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login Failed");
      }
      errorRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errorRef}
        className={errorMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>

      <h1>Employee Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );

  return content;
};

export default Login;
