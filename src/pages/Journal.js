import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserCard } from "react-ui-cards";
import rpms from "../images/rpms.jpg";
import norm from "../images/norm.jpg";
import scopus from "../images/scopus.jpg";
import thomson from "../images/thomson.jpg";

import {
  HeadContainer,
  BodyContainer,
  Button,
  CardContainer,
  Heading,
} from "./SearchInterNational";

export const Journal = () => {
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
              <Link to="/user/journal/search/normal">
                <UserCard float header={norm} name="Normal" positionName="" />
              </Link>
              <Link to="/user/journal/search/scopus">
                <UserCard float header={scopus} name="Scopus" positionName="" />
              </Link>
              <Link to="/user/journal/search/thomson">
                <UserCard
                  float
                  header={thomson}
                  name="Thomson Reuter"
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
