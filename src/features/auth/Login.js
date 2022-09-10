import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ token: userData.accessToken, user }));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (error) {
      if (!error?.originalStatus) {
        setErrorMessage("No Server Response");
      } else if (error.originalStatus === 400) {
        setErrorMessage("Missing Username or pwd");
      } else if (error.originalStatus === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login Failed");
      }
      errorRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePasswordInput = (e) => setPwd(e.target.value);

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
          value={pwd}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );

  return content;
};

export default Login;
