import React, { useEffect, useState } from "react";
import {
  deleteFriend,
  getUserByName,
} from "../../components/Authentication/Api";
import Posts from "../../views/Posts/Posts";
import { Button } from "@material-ui/core";
import { addFriend } from "../../components/Authentication/Api";
import { isLoggedIn } from "../../components/Authentication/Api";

function Profile(props) {
  const { author } = props.match.params;
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [userAdded, setUserAdded] = useState(false);

  useEffect(() => {
    getUserByName(author, setProfileData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setProfileData]);

  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);

  //check if the logged in user already has current profile added.
  useEffect(() => {
    if (userData && profileData && userData.friends) {
      console.log("here");
      setUserAdded(userData.friends.includes(profileData.userId));
    }
  }, [userData, profileData]);

  console.log(userData);
  function updateUser(e) {
    if (userData && profileData) {
      //if the current user already has the profile added, allow deletion.
      if (userAdded) {
        deleteFriend(userData.userId, { friend: profileData.userId });
      } else {
        addFriend(userData.userId, { friend: profileData.userId });
      }
    }
  }

  return (
    <div>
      <h1>User Profile</h1>
      <h2>Author: {author}</h2>
      {profileData ? <Posts ids={profileData.userId} /> : null}
      <Button type="friends" variant="contained" onClick={updateUser}>
        {userAdded ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
}
export default Profile;
