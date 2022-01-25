import React from "react";
import styled from "styled-components";

const FeedContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow-y: scroll;
  border-right: 0.5px solid #eff3f4;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default FeedContainer;
