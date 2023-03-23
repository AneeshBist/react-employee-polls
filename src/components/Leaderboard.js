import { connect } from "react-redux";
import Nav from "./Nav";

const Leaderboard = ({ scores }) => {
  return (
    <div>
      <Nav />
      <div className=" pg-title mt-3 p-2 bg-light  rounded">
        <h2>Leaderboard</h2>
      </div>
      <div className="container mt-3 lb-table">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="lb-td-users">Users</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((user, id) => (
              <tr key={id}>
                <td className="lb-td-users">
                  <img
                    src={`./images/${user.id}.png`}
                    className="lb-avatar-img rounded-pill"
                    alt="user icons"
                  />

                  <b>{user.name}</b>

                  <i>&nbsp;&nbsp;({user.id})</i>
                </td>
                <td>{Object.keys(user.answers).length}</td>
                <td>{user.questions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const scores = [];
  for (const user in users) {
    if (user !== undefined) {
      scores.push(users[user]);
    }
  }
  return {
    users,
    scores: scores.sort(
      (a, b) =>
        Object.keys(b.answers).length +
        b.questions.length -
        (Object.keys(a.answers).length + a.questions.length)
    ),
  };
};

export default connect(mapStateToProps)(Leaderboard);
