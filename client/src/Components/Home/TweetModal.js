import React, { useEffect, useContext, useState, useRef } from "react";
import UserContext from "../../Context/UserContext";
import TweetModalContainer from "../../Fragments/Home/TweetModalContainer";
import Modal from "../../Fragments/Home/TweetModal";
import Axios from "axios";
import { CgProfile } from "react-icons/cg";
import TweetTextArea from "../../Fragments/Home/TweetTextArea";
import SmallTweetButton from "../../Fragments/Buttons/SmallTweetButton";

const TweetModal = (props) => {
  const [tweet, setTweet] = useState("");
  const { userData } = useContext(UserContext);
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) inputElement.current.focus();
    if (props.editing) {
      setTweet(props.tweet.text);
    }
  }, [props.show]);

  const onChange = (e) => {
    setTweet(e.target.value);
  };

  const onSubmitTweet = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(
        "/posts/",
        {
          authorId: userData.user.id,
          text: tweet,
        },
        { headers: { "x-auth-token": userData.token } }
      );
    } catch (error) {
      console.log(error);
    }
    setTweet("");
    props.setShow(false);
    props.autoUpdateList();
  };

  const editTweet = async (e, postId, newText) => {
    e.preventDefault();
    try {
      await Axios.put(
        `/posts/${postId}`,
        { text: newText },
        {
          headers: { "x-auth-token": userData.token },
        }
      ).then((res) => {
        if (res.status === 200) {
          alert("edited successfully");
        }
      });
      props.setShow(false);
      props.setEditing(false);
      props.updateOneTweet();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TweetModalContainer show={props.show}>
      <Modal show={props.show}>
        <p
          style={{
            fontSize: "20px",
            cursor: "pointer",
            margin: "12px 0px 15px 20px",
          }}
          onClick={() => props.setShow(false)}
        >
          x
        </p>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            margin: "20px 20px 10px 20px",
          }}
        >
          <div style={{ display: "flex", width: "93%" }}>
            <CgProfile size="50px" style={{ transform: "translateY(-10px)" }} />
            <form
              onSubmit={
                props.editing
                  ? (e) => editTweet(e, props.tweet._id, tweet)
                  : (e) => onSubmitTweet(e)
              }
              style={{
                width: "92%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TweetTextArea
                onChange={onChange}
                type="text"
                rows="5"
                cols="50"
                placeholder="What's happening?"
                ref={inputElement}
                value={tweet}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  borderTop: "0.5px solid #eff3f4",
                  paddingTop: "10px",
                }}
              >
                <SmallTweetButton type="submit">Tweet</SmallTweetButton>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </TweetModalContainer>
  );
};

export default TweetModal;
