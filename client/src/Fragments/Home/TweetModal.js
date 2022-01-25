import styled from "styled-components";

const Modal = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  position: absolute;
  top: 5%;
  margin: auto 0;
  width: 600px;
  height: 300px;
  border-radius: 16px;
  z-index: 2;
  background-color: white;
`;

export default Modal;
