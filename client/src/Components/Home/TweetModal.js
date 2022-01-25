import React, { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import TweetModalContainer from "../../Fragments/Home/TweetModalContainer";
import Modal from "../../Fragments/Home/TweetModal";
import Axios from "axios";
import AuthButton from "../../Fragments/Buttons/AuthButton";

const TweetModal = (props) => {
  const [tweet, setTweet] = useState("");
  const { userData } = useContext(UserContext);

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

  return (
    <TweetModalContainer show={props.show}>
      <Modal show={props.show}>
        <h3>What's Happening?</h3>
        <form onSubmit={(e) => onSubmitTweet(e)}>
          <input type="text" value={tweet} onChange={onChange} />
          <AuthButton type="submit">Submit</AuthButton>
        </form>
      </Modal>
    </TweetModalContainer>
  );
};

export default TweetModal;
