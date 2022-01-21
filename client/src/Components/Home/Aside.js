import React from "react";
import AsideMenu from "../../Fragments/Home/AsideMenu";
import AsideButton from "../../Fragments/Home/AsideButton";
import AuthButton from "../../Fragments/Buttons/AuthButton";
import AsideDivWrapButton from "./AsideDivWrapButton";

const Aside = (props) => {
  return (
    <AsideMenu>
      <AsideDivWrapButton>
        <AsideButton>Home</AsideButton>
      </AsideDivWrapButton>
      <AsideDivWrapButton>
        <AsideButton>Explore</AsideButton>
      </AsideDivWrapButton>
      <AsideDivWrapButton>
        <AsideButton>Notifications</AsideButton>
      </AsideDivWrapButton>
      <AsideDivWrapButton>
        <AsideButton>Profile</AsideButton>
      </AsideDivWrapButton>
      <AsideDivWrapButton>
        <AuthButton onClick={() => props.openPostModal()}>Tweet</AuthButton>
      </AsideDivWrapButton>
    </AsideMenu>
  );
};

export default Aside;
