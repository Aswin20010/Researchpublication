import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import rpms from "../images/rpms.jpg";
import { Link } from "react-router-dom";
import journal from "../images/journal.jpg";
import { UserCard } from "react-ui-cards";
import conference from "../images/conference.jpg";
import {
  HeadContainer,
  BodyContainer,
  Button,
  CardContainer,
  Heading,
} from "./SearchInterNational";
const Header = styled.h1`
  background-color: white;
  display: flex;
  justify-content: center;
`;
export const Admin = () => {
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
            <Button onClick={logoutHandler}>Logout</Button>
          </HeadContainer>
          <BodyContainer>
            <Header>
              <Heading className="my-5">
                Welcome to the Research Publication Management System (RPMS) at the SSN
                Campus, Chennai!
              </Heading>
            </Header>
            <p className="mx-5">
            Our interface has been created for the easy access of various 
            conferences and journals published by the students and professors of SSN College of Engineering,
            Chennai.Our interface helps you to pick the right publications by making use of the query options 
            and filters available in this site.
            </p>
            <CardContainer>
              <Link to="/admin/search">
                <UserCard
                  float
                  header={journal}
                  name='Search'
                  positionName='Journals are periodical publications that relate to a certain academic discipline. 
                  They contain a number of articles under a particular discipline. '
                />
              </Link>
              <Link to="/admin/insert">
                <UserCard
                  float
                  header={conference}
                  name='Insertion'
                  positionName='A conference is a place where research articles are presented by scholars, researchers, experts, 
                  and professionals after carrying out research studies.'
                />
              </Link>
            </CardContainer>
          </BodyContainer>
        </>
      )}
    </div>
  );
};
