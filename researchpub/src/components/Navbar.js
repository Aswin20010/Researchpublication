import React from "react";
import styled from "styled-components";

const ListItem = styled.li`
background-color:  #004e92;
color: white;
padding: 15px;
display:inline;
margin-right: 4vw;
`
export const Navbar = () => {
  console.log("fhb")
  return (
    <>
      <ul>
        <ListItem>Journals</ListItem>
        <ListItem>Conference</ListItem>
      </ul>
    </>
  );
};

