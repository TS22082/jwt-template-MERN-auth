import React from "react";
import AsideMenu from "../../Fragments/Home/AsideMenu";
import AsideButton from "../../Fragments/Home/AsideButton";
import TweetButton from "../../Fragments/Buttons/TweetButton";
import AsideDivWrapButton from "./AsideDivWrapButton";
import { FaTwitter } from "react-icons/fa";
import TweetButtonContainer from "./TweetButtonContainer";

const Aside = (props) => {
  return (
    <AsideMenu>
      <AsideDivWrapButton>
        <AsideButton>
          <h1>
            <FaTwitter color="#2e9bf0" />
          </h1>
        </AsideButton>
      </AsideDivWrapButton>
      <AsideDivWrapButton>
        <AsideButton>
          <h2>Home</h2>
        </AsideButton>
      </AsideDivWrapButton>
      <AsideDivWrapButton>
        <AsideButton>
          <h2>Explore</h2>
        </AsideButton>
      </AsideDivWrapButton>
      <AsideDivWrapButton>
        <AsideButton>
          <h2>Notifications</h2>
        </AsideButton>
      </AsideDivWrapButton>
      <AsideDivWrapButton>
        <AsideButton>
          <h2>Profile</h2>
        </AsideButton>
      </AsideDivWrapButton>
      <TweetButtonContainer>
        <TweetButton onClick={() => props.openPostModal()}>Tweet</TweetButton>
      </TweetButtonContainer>
    </AsideMenu>
  );
};

export default Aside;
