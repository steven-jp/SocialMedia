import React, { useEffect, useState } from "react";
import { getUserByName } from "../../components/Authentication/Api";
import Posts from "../../views/Posts/Posts";

function Profile(props) {
  const { author } = props.location.state;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserByName(author, setUserData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserData]);

  return (
    <div>
      <h1>User Profile</h1>
      <h2>Author: {author}</h2>
      {userData ? <Posts ids={userData.userId} /> : null}
    </div>
  );
}
export default Profile;
