import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
const HeadContainer = styled.h1`
  color: white;
`;
const Button = styled.button`
  color:white;
  background-color: blue;
  padding: 10px;
`;
export const User = () => {
  const [back, setBack] = useState(false);
  return (
    <>
      {back ? (
        <Redirect push to="/" />
      ) : (
        <>
          <HeadContainer>Hello This is User PAGE</HeadContainer>
          <Button
            onClick={() => {
              localStorage.setItem("@logged", 0);
              setBack(true);
            }}
          >
            Logout
          </Button>
        </>
      )}
    </>
  );
};
