import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserCard } from "react-ui-cards";
import rpms from "../images/rpms.jpg";
import intl from "../images/intl.jpg";
import ntl from "../images/ntl.jpg";

const Button = styled.button`
  margin-left: auto;
  margin-right: 3vw;
  background-color: #cc2b5e;
  color: white;
  border-radius: 5px;
  padding: 15px;
`;

const BodyContainer = styled.h1`
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-top: 5vh;
  min-width: auto;
  background-color: white;
  padding-bottom: 10vh;
  padding-top: 10vh;
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

const Heading = styled.h1`
  font-weight: bold;
  font-size: 40px;
  font-family: Arial, Helvetica, sans-serif;
`;

const CardContainer = styled.div`
  margin-top: 10vh;
  display: flex;
  justify-content: center;
`;

export const Conference = () =>{
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
                  name='National'
                  positionName='In National Conference the topic covered mostly related to the national level 
                  and the participants and the organizing members from the country itself.'
                />
              </Link>
              <Link to="/user/conference/search/international">
                <UserCard
                  float
                  header={intl}
                  name='International'
                  positionName='In an International conference the participant may be from inside the country and 
                  outside the country. The organizing people may be across the globe in both the case the publication 
                  of the paper may in the Journals.'
                />
              </Link>
            </CardContainer>
      </BodyContainer>
      </>
        )}
    </div>
    )
}