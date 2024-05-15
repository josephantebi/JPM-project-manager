import User from "../components/User";

import "../style.css";
function UserList({ usersData }) {
  return (
    <ul>
      {usersData.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </ul>
  );
}

export default UserList;
