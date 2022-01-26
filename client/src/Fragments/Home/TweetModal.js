import styled from "styled-components";

const Modal = styled.div`
  width: 600px;
  height: 275px;
  display: ${(props) => (props.show ? "flex" : "none")};
  position: absolute;
  top: 5%;
  left: 5%;
  margin: auto 0;
  border-radius: 16px;
  z-index: 2;
  background-color: white;
  flex-direction: column;
`;

export default Modal;
