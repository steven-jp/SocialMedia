import React, { useEffect, useState } from "react";
import { getUserByName } from "../../components/Authentication/Api";
import Posts from "../../views/Posts/Posts";
import { Button } from "@material-ui/core";
import { updateUserById } from "../../components/Authentication/Api";

function Profile(props) {
  const { author } = props.location.state;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserByName(author, setUserData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserData]);

  function updateUser(e) {
    // setUserData({ ...userData, friends });
    updateUserById(userData.userId, { friend: author });
  }
  console.log(userData);
  return (
    <div>
      <h1>User Profile</h1>
      <h2>Author: {author}</h2>
      {userData ? <Posts ids={userData.userId} /> : null}
      <Button type="friends" variant="contained" onClick={updateUser}>
        Add friend
      </Button>
    </div>
  );
}
export default Profile;
