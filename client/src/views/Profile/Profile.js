import React, { useEffect, useState } from "react";
import { getUserByName } from "../../components/Authentication/Api";
import Posts from "../../views/Posts/Posts";
import { Button } from "@material-ui/core";
import { updateUserById } from "../../components/Authentication/Api";
import { isLoggedIn } from "../../components/Authentication/Api";

function Profile(props) {
  const { author } = props.match.params;
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getUserByName(author, setProfileData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProfileData]);

  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);

  function updateUser(e) {
    if (userData && profileData) {
      updateUserById(userData.userId, { friend: profileData.userId });
    }
  }

  return (
    <div>
      <h1>User Profile</h1>
      <h2>Author: {author}</h2>
      {profileData ? <Posts ids={profileData.userId} /> : null}
      <Button type="friends" variant="contained" onClick={updateUser}>
        Add friend
      </Button>
    </div>
  );
}
export default Profile;
