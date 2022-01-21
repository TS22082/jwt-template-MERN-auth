import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import HomeLayout from "../Fragments/Home/HomeLayout";
import Aside from "../Components/Home/Aside";
import FeedContainer from "../Fragments/Home/FeedContainer";
import TweetModal from "../Components/Home/TweetModal";

const Home = () => {
  const [postModalShow, setPostModalShow] = useState(false);
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const openPostModal = () => {
    setPostModalShow(true);
  };

  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData.user, history]);

  return (
    <HomeLayout>
      <Aside show={postModalShow} openPostModal={openPostModal}></Aside>

      <FeedContainer>
        <h1>Twitter Feed</h1>
        <TweetModal show={postModalShow}></TweetModal>
      </FeedContainer>
      <div>Whats happening/Messages</div>
    </HomeLayout>
  );
};

export default Home;
