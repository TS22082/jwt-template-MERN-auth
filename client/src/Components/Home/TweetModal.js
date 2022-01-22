import React, { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import TweetModalContainer from "../../Fragments/Home/TweetModalContainer";
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
      const headers = {
        "x-auth-token": userData.token,
      };
      await Axios.post(
        "/posts/",
        {
          authorId: userData.user.id,
          text: tweet,
        },
        { headers: headers }
      );
    } catch (error) {
      console.log(error);
    }
    setTweet("");
    props.setShow(false);
  };

  return (
    <TweetModalContainer show={props.show}>
      <h3>What's Happening?</h3>
      <form onSubmit={(e) => onSubmitTweet(e)}>
        <input type="text" value={tweet} onChange={onChange} />
        <AuthButton type="submit">Submit</AuthButton>
      </form>
    </TweetModalContainer>
  );
};

export default TweetModal;
