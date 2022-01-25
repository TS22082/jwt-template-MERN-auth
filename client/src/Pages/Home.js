import React, { useContext, useEffect, useState, useCallback } from "react";
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

  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData.user, history]);

  const getPosts = async () => {
    const posts = await Axios.get("/posts/all", {
      headers: { "x-auth-token": userData.token },
    });
    setTweets(posts.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const autoUpdateList = useCallback(() => {
    getPosts();
  }, [tweets, getPosts]);

  const openPostModal = () => {
    setPostModalShow(true);
  };

  const deleteTweet = async (postId) => {
    try {
      await Axios.delete(`/posts/${postId}`, {
        headers: { "x-auth-token": userData.token },
      }).then((res) => {
        if (res.status === 200) {
          alert("deleted successfully");
          autoUpdateList();
        }
        // will need else condition if cant delete
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeLayout>
      <Aside show={postModalShow} openPostModal={openPostModal}></Aside>

      <FeedContainer>
        <h1>Twitter Feed</h1>
        <TweetModal
          show={postModalShow}
          setShow={setPostModalShow}
          autoUpdateList={autoUpdateList}
        ></TweetModal>

        {tweets.map((tweet, i) => (
          <div key={i}>
            <h3>{tweet.text}</h3>
            {tweet.authorId === userData.user.id && (
              <button onClick={() => deleteTweet(tweet._id)}>delete</button>
            )}
          </div>
        ))}
      </FeedContainer>
      <div>Whats happening/Messages</div>
    </HomeLayout>
  );
};

export default Home;
