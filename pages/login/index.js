import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, selectUser } from "../../store/User/slice";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = () => {
    dispatch(
      authenticateUser({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  return (
    <div>
      <input ref={usernameRef} type="text" placeholder="login"></input>
      <input ref={passwordRef} type="password" placeholder="****"></input>
      <button onClick={handleLogin} title="login" />
    </div>
  );
};

export default Login;
