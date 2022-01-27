import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import HomeLayout from "../Fragments/Home/HomeLayout";
import Aside from "../Components/Home/Aside";
import FeedContainer from "../Fragments/Home/FeedContainer";
import TweetModal from "../Components/Home/TweetModal";
import Axios from "axios";
import TweetContainer from "../Fragments/Home/TweetContainer";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [postModalShow, setPostModalShow] = useState(false);
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData.user, history]);

  const getPosts = async () => {
    let temp = [];
    const posts = await Axios.get("/posts/all", {
      headers: { "x-auth-token": userData.token },
    }).then(async (res) => {
      for (let i = 0; i < res.data.length; i++) {
        const currentTweet = res.data[i];
        await Axios.get(`/users/posts`, {
          authorId: currentTweet.authorId,
        }).then((res) => {
          currentTweet.displayName = res.data.displayName;
          temp.push(currentTweet);
        });
      }
    });
    setTweets(temp);
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

  return (
    <HomeLayout>
      <Aside show={postModalShow} openPostModal={openPostModal}></Aside>

      <FeedContainer>
        <div>
          <h3 style={{ margin: "10px" }}>Home</h3>
        </div>
        <TweetModal
          show={postModalShow}
          setShow={setPostModalShow}
          autoUpdateList={autoUpdateList}
        ></TweetModal>

        {tweets.map((tweet, i) => (
          <TweetContainer
            key={i}
            onClick={() => history.push(`/post/${tweet._id}`)}
          >
            <div style={{ display: "flex" }}>
              <CgProfile size="50px" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ height: "90%" }}></div>
                  <div
                    style={{
                      display: "flex",
                      margin: "0 10px",
                    }}
                  >
                    <p style={{ margin: "0", fontWeight: "bold" }}>
                      {tweet.displayName}
                    </p>
                    <p style={{ margin: "0", color: "#536471" }}>
                      @{tweet.displayName}
                    </p>
                  </div>
                </div>
                <p style={{ padding: "10px", margin: "0" }}>{tweet.text}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FaRegComment />
                  <FaRetweet />
                  <BsHeart />
                  <FiUpload />
                </div>
              </div>
            </div>
          </TweetContainer>
        ))}
      </FeedContainer>
      <div style={{ margin: "15px" }}>Whats happening/Messages</div>
    </HomeLayout>
  );
};

export default Home;
