import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import firebase from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserCard } from "react-ui-cards";
import rpms from "../images/rpms.jpg";
import author from "../images/author.jpg";
import years from "../images/years.jpg";
import desig from "../images/desig.jpg";
import titles from "../images/titles.jpg";
import { Card, Tag } from "antd";
export const Button = styled.button`
  margin-left: auto;
  margin-right: 3vw;
  background-color: #cc2b5e;
  color: white;
  border-radius: 5px;
  padding: 15px;
`;
export const Label = styled.label`
  font-weight: bold;
  margin: auto;
  display: flex;
  justify-content: center;
`;
export const Buttons = styled.button`
  background-color: #337ab7;
  color: white;
  border-radius: 5px;
  padding: 7px;
  display: flex;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const BodyContainer = styled.h1`
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-top: 5vh;
  min-width: auto;
  background-color: white;
  padding-bottom: 10vh;
  padding-top: 10vh;
`;

export const HeadContainer = styled.h1`
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-top: 5vh;
  min-width: auto;
  background-color: white;
  display: flex;
  align-items: center;
`;

export const Heading = styled.h1`
  font-weight: bold;
  font-size: 40px;
  font-family: Arial, Helvetica, sans-serif;
`;

export const CardContainer = styled.div`
  margin-top: 10vh;
  display: flex;
  justify-content: center;
`;
export const Heading1 = styled.h1`
  font-weight: bold;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
`;
// 0
// 1 => author
// 2 => year
// 3 => designation
// 4 => title
export const Search = () => {
  const [back, setBack] = useState(false);
  const [name, setName] = useState();
  const [year, setYear] = useState();
  const [title, setTitle] = useState();
  const [designation, setDesignation] = useState();
  const [visibility, setVisibility] = useState(0);
  const [data, setData] = useState([]);
  const logoutHandler = () => {
    localStorage.setItem("@logged", 0);
    setBack(true);
  };

  const nameFn = async () => {
    const records = [];
    const db = getFirestore();
    const q = query(collection(db, "User"), where("UserName", "==", name));
    const userSnapshot = await getDocs(q);
    userSnapshot.forEach(async (doc) => {
      const userId = doc.id;
      const q1 = query(
        collection(db, "Conference"),
        where("Author", "==", userId),
        where("ConferenceType", "==", "international")
      );
      const conferenceSnapshot = await getDocs(q1);
      conferenceSnapshot.forEach(async (ConferenceItem) => {
        records.push({
          id: ConferenceItem.id,
          value: ConferenceItem.data(),
        });
      });
      setData(records);
    });
  };
  const yearFn = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "Conference"),
      where("Year", "==", year),
      where("ConferenceType", "==", "international")
    );
    const dataSnapshot = await getDocs(q);
    const records = [];
    dataSnapshot.forEach((item) => {
      const rec = {
        id: item.id,
        value: item.data(),
      };
      records.push(rec);
      setData(records);
    });
  };
  const DesigFn = async () => {
    const records = [];
    const db = getFirestore();
    const q = query(
      collection(db, "User"),
      where("Designation", "==", designation)
    );
    const userSnapshot = await getDocs(q);
    userSnapshot.forEach(async (doc) => {
      const userId = doc.id;
      const q1 = query(
        collection(db, "Conference"),
        where("Author", "==", userId),
        where("ConferenceType", "==", "international")
      );
      const conferenceSnapshot = await getDocs(q1);
      conferenceSnapshot.forEach(async (ConferenceItem) => {
        records.push({
          id: ConferenceItem.id,
          value: ConferenceItem.data(),
        });
      });
      setData(records);
    });
  };

  const TitleFn = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "Conference"),
      where("Title", "==", title),
      where("ConferenceType", "==", "international")
    );
    const dataSnapshot = await getDocs(q);
    const records = [];
    dataSnapshot.forEach((item) => {
      const rec = {
        id: item.id,
        value: item.data(),
      };
      records.push(rec);
      setData(records);
    });
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
            {visibility == 0 ? (
              <>
                <CardContainer>
                  <button
                    onClick={() => {
                      setVisibility(1);
                    }}
                  >
                    <UserCard float header={author} name="Search By Author" />
                  </button>
                  <button
                    onClick={() => {
                      setVisibility(3);
                    }}
                  >
                    <UserCard
                      float
                      header={desig}
                      name="Search By Designation"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setVisibility(2);
                    }}
                  >
                    <UserCard
                      float
                      header={years}
                      name="Search By Year Of Publish"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setVisibility(4);
                    }}
                  >
                    <UserCard float header={titles} name="Search By Title" />
                  </button>
                </CardContainer>
              </>
            ) : (
              <>
                {visibility == 1 ? (
                  <>
                    <Heading1>Search By Author</Heading1>
                    <input
                      type="text"
                      className="
              form-control
              block
              w-0.8
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-auto
              mt-4
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                      id="exampleFormControlInput1"
                      placeholder="Search by Filter..."
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <Buttons onClick={nameFn}>Search</Buttons>
                    {data.length > 0 ? (
                      <table className="  p-4 m-auto">
                        <thead className="  p-4">
                          <th className="  p-4">Title</th>
                          <th className="  p-4">Conference Name</th>
                          <th className="  p-4">Conference ShortName</th>
                          <th className="  p-4">Conference Type</th>
                          <th className="  p-4">Conference Organizer</th>
                          <th className="  p-4">Conference Year</th>
                          <th className="  p-4">Pages</th>
                          <th className="  p-4">Citations</th>
                          <th className="  p-4">Author</th>
                        </thead>
                        <tbody className="  p-4">
                          {data.map((item) => {
                            return (
                              <tr className=" ">
                                <td className="  p-4">
                                  {item.value.Title}
                                </td>
                                <td className="  p-4">
                                  {item.value.ConferenceName}
                                </td>
                                <td className="  p-4">
                                  {item.value.ShortName}
                                </td>
                                <td className="  p-4">
                                  {item.value.ConferenceType}
                                </td>
                                <td className="  p-4">
                                  {item.value.Organizer}
                                </td>
                                <td className="  p-4">
                                  {item.value.Year}
                                </td>
                                <td className="  p-4">
                                  {item.value.Pages}
                                </td>
                                <td className="  p-4">
                                  {item.value.Citations}
                                </td>
                                <td className="  p-4">
                                  {item.value.AuthorName}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : null}
                  </>
                ) : (
                  <>
                    {visibility == 2 ? (
                      <>
                        <Heading1>Search By Year</Heading1>
                        <input
                          type="text"
                          className="
              form-control
              block
              w-0.8
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-auto
              mt-4
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                          id="exampleFormControlInput2"
                          placeholder="Search by Filter..."
                          value={year}
                          onChange={(e) => {
                            setYear(e.target.value);
                          }}
                        />
                        <Buttons onClick={yearFn}>Search</Buttons>
                        {data.length > 0 ? (
                          <table className="  p-4 m-auto">
                            <thead className="  p-4">
                              <th className="  p-4">Title</th>
                              <th className="  p-4">Conference Name</th>
                              <th className="  p-4">
                                Conference ShortName
                              </th>
                              <th className="  p-4">Conference Type</th>
                              <th className="  p-4">
                                Conference Organizer
                              </th>
                              <th className="  p-4">Conference Year</th>
                              <th className="  p-4">Pages</th>
                              <th className="  p-4">Citations</th>
                              <th className="  p-4">Author</th>
                            </thead>
                            <tbody className="  p-4">
                              {data.map((item) => {
                                return (
                                  <tr className=" ">
                                    <td className="  p-4">
                                      {item.value.Title}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.ConferenceName}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.ShortName}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.ConferenceType}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.Organizer}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.Year}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.Pages}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.Citations}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.AuthorName}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {visibility == 3 ? (
                          <>
                            <Heading1>Search By Designation</Heading1>
                            <input
                              type="text"
                              className="
              form-control
              block
              w-0.8
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-auto
              mt-4
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                              id="exampleFormControlInput3"
                              placeholder="Search by Filter..."
                              value={designation}
                              onChange={(e) => {
                                setDesignation(e.target.value);
                              }}
                            />
                            <Buttons onClick={DesigFn}>Search</Buttons>
                            {data.length > 0 ? (
                              <table className="  p-4 m-auto">
                                <thead className="  p-4">
                                  <th className="  p-4">Title</th>
                                  <th className="  p-4">
                                    Conference Name
                                  </th>
                                  <th className="  p-4">
                                    Conference ShortName
                                  </th>
                                  <th className="  p-4">
                                    Conference Type
                                  </th>
                                  <th className="  p-4">
                                    Conference Organizer
                                  </th>
                                  <th className="  p-4">
                                    Conference Year
                                  </th>
                                  <th className="  p-4">Pages</th>
                                  <th className="  p-4">Citations</th>
                                  <th className="  p-4">Author</th>
                                </thead>
                                <tbody className="  p-4">
                                  {data.map((item) => {
                                    return (
                                      <tr className=" ">
                                        <td className="  p-4">
                                          {item.value.Title}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.ConferenceName}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.ShortName}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.ConferenceType}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Organizer}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Year}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Pages}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Citations}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.AuthorName}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            ) : null}
                          </>
                        ) : (
                          <>
                            <Heading1>Search By Title</Heading1>
                            <input
                              type="text"
                              className="
              form-control
              block
              w-0.8
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-auto
              mt-4
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                              id="exampleFormControlInput4"
                              placeholder="Search by Filter..."
                              value={title}
                              onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                            />
                            <Buttons onClick={TitleFn}>Search</Buttons>
                            {data.length > 0 ? (
                              <table className="  p-4 m-auto">
                                <thead className="  p-4">
                                  <th className="  p-4">Title</th>
                                  <th className="  p-4">
                                    Conference Name
                                  </th>
                                  <th className="  p-4">
                                    Conference ShortName
                                  </th>
                                  <th className="  p-4">
                                    Conference Type
                                  </th>
                                  <th className="  p-4">
                                    Conference Organizer
                                  </th>
                                  <th className="  p-4">Pages</th>
                                  <th className="  p-4">Pages</th>
                                  <th className="  p-4">Citations</th>
                                  <th className="  p-4">Author</th>
                                </thead>
                                <tbody className="  p-4">
                                  {data.map((item) => {
                                    return (
                                      <tr className=" ">
                                        <td className="  p-4">
                                          {item.value.Title}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.ConferenceName}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.ShortName}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.ConferenceType}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Organizer}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Year}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Pages}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Citations}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.AuthorName}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            ) : null}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </BodyContainer>
        </>
      )}
    </div>
  );
};