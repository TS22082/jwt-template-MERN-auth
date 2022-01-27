import React, { useContext, useEffect, useState, useCallback } from "react";
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
  const [user, setUser] = useState({});
  const [tweet, setTweet] = useState({});
  const [userTweets, setUserTweets] = useState([]);
  const [postModalShow, setPostModalShow] = useState(false);
  const { userData } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData.user, history]);

  const getUser = async () => {
    const user = await Axios.get(`/users/`, {
      headers: { "x-auth-token": userData.token },
    });
    setUser(user.data);
    const userPosts = await Axios.get(`/posts/${userData.user.id}`, {
      headers: { "x-auth-token": userData.token },
    });
    setUserTweets(userPosts.data);
    console.log(userPosts);
  };

  const getPost = async (id) => {
    const post = await Axios.get(`/posts/one/${id}`, {
      headers: { "x-auth-token": userData.token },
    });
    setTweet(post.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const updateOneTweet = useCallback(() => {
    getPost();
  }, [tweet, getPost]);

  const autoUpdateList = useCallback(() => {
    getUser();
  }, [getUser]);

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
          <h3 style={{ margin: "10px 0px" }}>Profile</h3>
        </div>
        <TweetModal
          show={postModalShow}
          setShow={setPostModalShow}
          editing={editing}
          setEditing={setEditing}
          tweet={tweet}
          autoUpdateList={autoUpdateList}
          updateOneTweet={updateOneTweet}
        ></TweetModal>
        {user && (
          <div>
            <h3>{user.displayName}'s Tweets</h3>
          </div>
        )}
        {userTweets.length &&
          userTweets.map((userTweet, i) => (
            <TweetContainer key={i}>
              <div style={{ display: "flex" }}>
                <div style={{ height: "90%" }}>
                  <CgProfile size="50px" />
                </div>
                <p style={{ padding: "10px", margin: "0" }}>{userTweet.text}</p>
              </div>
              {userTweet.authorId === userData.user.id && (
                <div>
                  <button onClick={() => deleteTweet(userTweet._id)}>
                    delete
                  </button>
                  <button
                    onClick={() => {
                      setEditing(true);
                      setPostModalShow(true);
                      getPost(userTweet._id);
                    }}
                  >
                    edit
                  </button>
                </div>
              )}
            </TweetContainer>
          ))}
      </FeedContainer>
      <div style={{ margin: "15px" }}>Whats happening/Messages</div>
    </HomeLayout>
  );
};

export default SinglePost;
