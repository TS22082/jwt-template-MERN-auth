import React, { useContext } from "react";
import AsideMenu from "../../Fragments/Home/AsideMenu";
import AsideButton from "../../Fragments/Home/AsideButton";
import TweetButton from "../../Fragments/Buttons/TweetButton";
import AsideDivWrapButton from "./AsideDivWrapButton";
import { FaTwitter } from "react-icons/fa";
import TweetButtonContainer from "./TweetButtonContainer";
import styled from "styled-components";
import UserContext from "../../Context/UserContext";
import { useHistory } from "react-router-dom";

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
`;

const Aside = (props) => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
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
          <StyledLink href="/">
            <h2>Home</h2>
          </StyledLink>
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
        <AsideButton onClick={() => history.push(`/user/${userData.user.id}`)}>
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
