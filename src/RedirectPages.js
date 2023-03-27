import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";
import { Outlet, useLocation, Navigate } from "react-router-dom";

function RedirectPages(props) {
  const location = useLocation();
  const user = window.name;
  return (
    <>
      <LoadingBar />
      <div className="ppp">
        {props.loading ? (
          <Navigate
            to="/login"
            replace
            state={{ from: location, user: user }}
          />
        ) : (
          <>
            <Outlet />
          </>
        )}
      </div>
    </>
  );
}
const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(RedirectPages);
