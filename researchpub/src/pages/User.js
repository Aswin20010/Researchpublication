import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import rpms from "../images/rpms.jpg";
import { Link } from "react-router-dom";
import journal from "../images/journal.jpg";
import { UserCard } from "react-ui-cards";
import conference from "../images/conference.jpg";
import ooad from "../images/ooad.jpeg";
import hod from "../images/hod.jpeg";
import ip from "../images/ip.jpg";
const CardContainer = styled.div`
  margin-top: 10vh;
  display: flex;
  justify-content: center;
`;
const HeadContainer = styled.h1`
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-top: 5vh;
  min-width: auto;
  background-color: white;
  display: flex;
  align-items: center;
`;
const Header = styled.h1`
  background-color: white;
  display: flex;
  justify-content: center;
`;
const BodyContainer = styled.h1`
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-top: 5vh;
  min-width: auto;
  background-color: white;
`;
const Button = styled.button`
  margin-left: auto;
  margin-right: 3vw;
  background-color: #cc2b5e;
  color: white;
  border-radius: 5px;
  padding: 15px;
`;
const Heading = styled.h1`
  font-weight: bold;
  font-size: 20px;
`;

export const User = () => {
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
              <Link to="/user/journal">
                <UserCard
                  float
                  header={journal}
                  name='Journals'
                  positionName='Journals are periodical publications that relate to a certain academic discipline. 
                  They contain a number of articles under a particular discipline. '
                />
              </Link>
              <Link to="/user/conference">
                <UserCard
                  float
                  header={conference}
                  name='Conference'
                  positionName='A conference is a place where research articles are presented by scholars, researchers, experts, 
                  and professionals after carrying out research studies.'
                />
              </Link>
            </CardContainer>
            <CardContainer>
              <span className="mx-10">
                <a target="_blank" href="https://www.ssn.edu.in/staff-members/dr-r-priyadharsini/">
                <UserCard
                  float
                  header={ooad}
                  avatar={ooad}
                  name='R Priyadharshini'
                  positionName='SSN College Of Engineering'
                />
                </a>
                </span>
                <span className="mx-10">
                <a target="_blank" href="https://www.ssn.edu.in/staff-members/dr-t-t-mirnalinee/">
                <UserCard
                  float
                  header={hod}
                  avatar={hod}
                  name='Dr. T.T. Mirnalinee'
                  positionName='SSN College Of Engineering'
                />
                </a>
                </span>
                <span className="mx-10">
                <a target="_blank" href="https://www.ssn.edu.in/staff-members/dr-k-vallidevi/">
                <UserCard
                  float
                  header={ip}
                  avatar={ip}
                  name='Journals'
                  positionName='SSN College Of Engineering'
                />
                </a>
                </span>
            </CardContainer>
          </BodyContainer>
        </>
      )}
    </div>
  );
};
