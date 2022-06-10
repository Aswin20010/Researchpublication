import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserCard } from "react-ui-cards";
import rpms from "../images/rpms.jpg";
import intl from "../images/intl.jpg";
import ntl from "../images/ntl.jpg";

import {
  HeadContainer,
  BodyContainer,
  Button,
  CardContainer,
  Heading,
} from "./SearchInterNational";

export const Insert = () => {
  const [back, setBack] = useState(false);
  const logoutHandler = () => {
    localStorage.setItem("@logged", 0);
    setBack(true);
  };
  return (
    <div className="m-0 p-0">
      {back ? (
        <Redirect push to="/" />
      ) : (
        <>
          <HeadContainer>
            <img
              className="mx-10 my-5"
              src={rpms}
              alt="logo"
              height={50}
              width={100}
            />
            <Heading className="mx-10 my-5">
              RESEARCH PUBLICATION MANAGEMENT SYSTEM
            </Heading>
            <Button onClick={logoutHandler}>Logout</Button>
          </HeadContainer>
          <BodyContainer>
            <CardContainer>
              <Link to="/admin/insert/newuser">
                <UserCard float header={ntl} name="New User" positionName="" />
              </Link>
              <Link to="/admin/insert/olduser">
                <UserCard
                  float
                  header={intl}
                  name="Existing User"
                  positionName=""
                />
              </Link>
            </CardContainer>
          </BodyContainer>
        </>
      )}
    </div>
  );
};
