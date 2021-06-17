import React, { useEffect, useState } from "react";
import { getUserByName } from "../../components/Authentication/Api";
import { getPostsByUserIds } from "../../components/Post/Api";

function Profile(props) {
  const { author } = props.location.state;

  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData) {
      getPostsByUserIds(setPosts, userData.userId);
    }
  }, [setPosts, userData]);

  useEffect(() => {
    getUserByName(author, setUserData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserData]);

  return (
    <div>
      <h1>User Profile</h1>
      <h2>Author: {author}</h2>
    </div>
  );
}
export default Profile;
