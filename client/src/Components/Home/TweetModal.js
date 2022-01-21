import React from "react";
import TweetModalContainer from "../../Fragments/Home/TweetModalContainer";

const TweetModal = (props) => {
  return (
    <TweetModalContainer show={props.show}>
      <h3>What's Happening?</h3>
      <form action="">
        <input type="text" />
      </form>
    </TweetModalContainer>
  );
};

export default TweetModal;
