import React from "react";
import styled from "styled-components";

const TweetModalContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  width: 100%;
  height: 250px;
  z-index: 2;
  border: 2px solid black;
  background-color: grey;
`;

export default TweetModalContainer;
