import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import HomeLayout from "../Fragments/Home/HomeLayout";
import Aside from "../Components/Home/Aside";
import FeedContainer from "../Fragments/Home/FeedContainer";
import TweetModal from "../Components/Home/TweetModal";
import Axios from "axios";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [postModalShow, setPostModalShow] = useState(false);
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const getPosts = async () => {
    const posts = await Axios.get("/posts/all", {
      headers: { "x-auth-token": userData.token },
    });
    setTweets(posts.data);
  };

  useEffect(() => {
    getPosts();
  }, [tweets]);

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
        <TweetModal
          show={postModalShow}
          setShow={setPostModalShow}
        ></TweetModal>

        {tweets.map((tweet, i) => (
          <div key={i}>
            <h3>{tweet.text}</h3>
          </div>
        ))}
      </FeedContainer>
      <div>Whats happening/Messages</div>
    </HomeLayout>
  );
};

export default Home;
