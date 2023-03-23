import { connect } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const LoginPage = ({ dispatch, users, questions }) => {
  let uname = useRef();
  let pwd = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let user = uname.current.value;
    let password = pwd.current.value;

    if (user && password) {
      if (users[user] && users[user].password === password) {
        dispatch(setAuthedUser(user));
        if (location.state.from.pathname !== "/") {
          let qid = location.state.from.pathname.split("/questions/").pop();
          if (
            location.state.from.pathname.startsWith("/questions/") &&
            !Object.keys(questions).includes(qid)
          ) {
            navigate("/page404");
          } else {
            navigate(location.state.from);
          }
        } else {
          navigate("/dashboard");
        }
      } else {
        setErrorMsg("Error: Invalid username & password. Please Try Again.");
      }
    } else {
      setErrorMsg("Error: Kindly provide both: username & password for login.");
    }
    uname.current.value = "";
    pwd.current.value = "";
  };

  return (
    <div className="div-login">
      <div className="mt-3 p-3 bg-light  rounded">
        <h2>Welcome to Employee Polls</h2>
      </div>
      <img src="./images/polls.jpg" alt="avatar-user" className="img-polls" />
      <br />
      <form onSubmit={handleLogin}>
        <div className="nb-3">
          <label data-testid="username" className="form-label">
            Username
          </label>
          <input
            className="form-control"
            name="usernameTxt"
            ref={uname}
            placeholder="username here ..."
            type="text"
            data-testid="txt-usr"
          />
        </div>
        <div className="nb-3">
          <label data-testid="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            name="passwordTxt"
            ref={pwd}
            placeholder="password here ..."
            type="password"
            data-testid="txt-pwd"
          />
        </div>
        <br />
        <button
          type="submit"
          data-testid="btn-login"
          className="btn btn-outline-success"
        >
          Login
        </button>
        <div className="spc-mrg" style={{ color: "red" }}>
          {errorMsg && <i>*{errorMsg}</i>}
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = ({ users, authedUser, questions }) => {
  return {
    users,
    authedUser,
    questions,
  };
};
export default connect(mapStateToProps)(LoginPage);
