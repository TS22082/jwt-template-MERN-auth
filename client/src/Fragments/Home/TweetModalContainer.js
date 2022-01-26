import styled from "styled-components";

const TweetModalContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  position: absolute;
  top: 0;
  margin: auto 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
`;

export default TweetModalContainer;
