import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserContext from "../Context/UserContext";
import HomeLayout from "../Fragments/Home/HomeLayout";
import Aside from "../Components/Home/Aside";
import FeedContainer from "../Fragments/Home/FeedContainer";
import TweetModal from "../Components/Home/TweetModal";
import Axios from "axios";
import TweetContainer from "../Fragments/Home/TweetContainer";
import { CgProfile } from "react-icons/cg";

const SinglePost = () => {
  const [tweet, setTweet] = useState({});
  const [postModalShow, setPostModalShow] = useState(false);
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData.user, history]);

  const getPost = async () => {
    const post = await Axios.get(`/posts/one/${params.postId}`, {
      headers: { "x-auth-token": userData.token },
    });
    setTweet(post.data);
  };

  useEffect(() => {
    getPost();
  }, []);

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
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeLayout>
      <Aside show={postModalShow} openPostModal={openPostModal}></Aside>

      <FeedContainer>
        <div>
          <h3 style={{ margin: "10px 0px" }}>Single Post</h3>
        </div>
        <TweetModal
          show={postModalShow}
          setShow={setPostModalShow}
        ></TweetModal>
        {tweet._id && (
          <TweetContainer>
            <div style={{ display: "flex" }}>
              <div style={{ height: "90%" }}>
                <CgProfile size="50px" />
              </div>
              <p style={{ padding: "10px", margin: "0" }}>{tweet.text}</p>
            </div>
            {tweet.authorId === userData.user.id && (
              <button onClick={() => deleteTweet(tweet._id)}>delete</button>
            )}
          </TweetContainer>
        )}
      </FeedContainer>
      <div style={{ margin: "15px" }}>Whats happening/Messages</div>
    </HomeLayout>
  );
};

export default SinglePost;
