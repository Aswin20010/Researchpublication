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
import {
  HeadContainer,
  BodyContainer,
  Button,
  Buttons,
  Heading1,
  CardContainer,
  Heading,
} from "./SearchInterNational";
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
        collection(db, "Journal"),
        where("Author", "==", userId),
        where("JournalType", "==", "normal")
      );
        const journalSnapshot = await getDocs(q1);
        journalSnapshot.forEach(async (JournalItem) => {
          records.push({
            id: JournalItem.id,
            value: JournalItem.data(),
          });
        });
        setData(records);
    });
  };
  const yearFn = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "JournalInfo"),
      where("JournalYear", "==", year),
      where("JournalType", "==", "normal")
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
    let userDocs;
    const fn = async () => {
      const snapshot = await firebase.firestore().collection("User").get();
      userDocs = snapshot.docs.reduce(
        (cur, doc) => [...cur, { label: doc.data().UserName, value: doc.id }],
        []
      );
      setUserDoc(userDocs);
    };
    const db = getFirestore();
    const q = query(collection(db, "User"), where("Designation", "==", designation));
    const userSnapshot = await getDocs(q);
    userSnapshot.forEach(async (doc) => {
      const userId = doc.id;
      const q1 = query(
        collection(db, "Journal"),
        where("Author", "==", userId),
        where("JournalType", "==", "normal")
      );
        const journalSnapshot = await getDocs(q1);
        journalSnapshot.forEach(async (JournalItem) => {
          records.push({
            id: JournalItem.id,
            value: JournalItem.data(),
          });
        });
        setData(records);
    });
  };

  const TitleFn = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "Journal"),
      where("Title", "==", title),
      where("JournalType", "==", "normal")
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
                      <table className="  p-4 m-auto mt-10">
                        <thead className="  p-4">
                        <th className="  p-4">Title</th>
                          <th className="  p-4">Journal Name</th>
                          <th className="  p-4">Journal Type</th>
                          <th className="  p-4">Citations</th>
                          <th className="  p-4">Impact Factor</th>
                          <th className="  p-4">Issues</th>
                          <th className="  p-4">Volume</th>
                          <th className="  p-4">Pages</th>
                          <th className="  p-4">Sci Rating</th>
                          <th className="  p-4">Author</th>
                        </thead>
                        <tbody className="  p-4">
                          {data.map((item) => {
                            console.log("data: ", data);
                            console.log("item: ", item);
                            return (
                              <tr className=" ">
                                <td className="  p-4">
                                  {item.value.Title}
                                </td>
                                <td className="  p-4">
                                  {item.value.JournalName}
                                </td>
                                <td className="  p-4">
                                  {item.value.JournalType}
                                </td>
                                <td className="  p-4">
                                  {item.value.Citations}
                                </td>
                                <td className="  p-4">
                                  {item.value.ImpactFactor}
                                </td>
                                <td className="  p-4">
                                  {item.value.Issues}
                                </td>
                                <td className="  p-4">
                                  {item.value.Volume}
                                </td>
                                <td className="  p-4">
                                  {item.value.Pages}
                                </td>
                                <td className="  p-4">
                                  {item.value.SciRating}
                                </td>
                                <td className="  p-4">
                                  {name}
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
                          <table className="  p-4 m-auto mt-10">
                            <thead className="  p-4">
                              <th className="  p-4">Journal Name</th>
                              <th className="  p-4">Journal Type</th>
                              <th className="  p-4">Year Of Publish</th>
                              <th className="  p-4">Pages</th>
                            </thead>
                            <tbody className="  p-4">
                              {data.map((item) => {
                                console.log("data: ", data);
                                console.log("item: ", item);
                                return (
                                  <tr className=" ">
                                    <td className="  p-4">
                                      {item.value.JournalName}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.JournalType}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.JournalYear}
                                    </td>
                                    <td className="  p-4">
                                      {item.value.Pages}
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
                              <table className="  p-4 m-auto mt-10">
                        <thead className="  p-4">
                        <th className="  p-4">Title</th>
                          <th className="  p-4">Journal Name</th>
                          <th className="  p-4">Journal Type</th>
                          <th className="  p-4">Citations</th>
                          <th className="  p-4">Impact Factor</th>
                          <th className="  p-4">Issues</th>
                          <th className="  p-4">Volume</th>
                          <th className="  p-4">Pages</th>
                          <th className="  p-4">Sci Rating</th>
                          <th className="  p-4">Author</th>
                        </thead>
                                <tbody className="  p-4">
                                  {data.map((item) => {
                                    console.log("data: ", data);
                                    console.log("item: ", item);
                                    return (
                                        <tr className=" ">
                                        <td className="  p-4">
                                          {item.value.Title}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.JournalName}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.JournalType}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Citations}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.ImpactFactor}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Issues}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Volume}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.Pages}
                                        </td>
                                        <td className="  p-4">
                                          {item.value.SciRating}
                                        </td>
                                        <td className="  p-4">
                                          {name}
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
                              <table className="  p-4 m-auto mt-10">
                                <thead className="  p-4">
                        <th className="  p-4">Title</th>
                          <th className="  p-4">Journal Name</th>
                          <th className="  p-4">Journal Type</th>
                          <th className="  p-4">Citations</th>
                          <th className="  p-4">Impact Factor</th>
                          <th className="  p-4">Issues</th>
                          <th className="  p-4">Volume</th>
                          <th className="  p-4">Pages</th>
                          <th className="  p-4">Sci Rating</th>
                          <th className="  p-4">Author</th>
                                </thead>
                                <tbody className="  p-4">
                                  {data.map((item) => {
                                    console.log("data: ", data);
                                    console.log("item: ", item);
                                    return (
                                <tr className=" ">
                                <td className="  p-4">
                                  {item.value.Title}
                                </td>
                                <td className="  p-4">
                                  {item.value.JournalName}
                                </td>
                                <td className="  p-4">
                                  {item.value.JournalType}
                                </td>
                                <td className="  p-4">
                                  {item.value.Citations}
                                </td>
                                <td className="  p-4">
                                  {item.value.ImpactFactor}
                                </td>
                                <td className="  p-4">
                                  {item.value.Issues}
                                </td>
                                <td className="  p-4">
                                  {item.value.Volume}
                                </td>
                                <td className="  p-4">
                                  {item.value.Pages}
                                </td>
                                <td className="  p-4">
                                  {item.value.SciRating}
                                </td>
                                <td className="  p-4">
                                  {name}
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
