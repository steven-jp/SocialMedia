import React from "react";
import Posts from "../Posts/Posts";
import { useState, useEffect } from "react";
import { isLoggedIn } from "../../components/Authentication/Api";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    isLoggedIn(setUserData);
  }, [setUserData]);
  return (
    <>
      <h1>Home !!!!</h1>
      {userData ? <Posts ids={userData.friends} /> : null}
    </>
  );
};

export default Home;
