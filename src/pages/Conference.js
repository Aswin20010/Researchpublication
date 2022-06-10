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

export const Conference = () => {
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
              <Link to="/user/conference/search/national">
                <UserCard
                  float
                  header={ntl}
                  name="National"
                  positionName="In National Conference the topic covered mostly related to the national level 
                  and the participants and the organizing members from the country itself."
                />
              </Link>
              <Link to="/user/conference/search/international">
                <UserCard
                  float
                  header={intl}
                  name="International"
                  positionName="In an International conference the participant may be from inside the country and 
                  outside the country. The organizing people may be across the globe in both the case the publication 
                  of the paper may in the Journals."
                />
              </Link>
            </CardContainer>
          </BodyContainer>
        </>
      )}
    </div>
  );
};
