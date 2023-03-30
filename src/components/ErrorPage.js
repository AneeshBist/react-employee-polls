import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authedUser";

const ErrorPage = ({ dispatch }) => {
  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/");
  };
  return (
    <div className="error">
      <h1 className="spc-mrg" style={{ color: "red" }}>
        ERROR !!!
      </h1>

      <img
        src={`./images/error.png`}
        className="avatar-img rounded-pill"
        alt="user icons"
      />
      <div className="spc-mrg">
        <i>Bad pathway, please log in again.</i>
      </div>
      <button className="btn btn-danger" onClick={redirectToLogin}>
        To Login
      </button>
    </div>
  );
};

export default connect()(ErrorPage);
