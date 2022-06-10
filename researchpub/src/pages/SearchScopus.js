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
import titles from "../images/titles.jpg"
import { Card, Tag } from "antd";
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
const Heading1 = styled.h1`
  font-weight: bold;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  text-align:center;
`;

export const Search = () => {
  const [back, setBack] = useState(false);
  const [name, setName] = useState();
  const [year, setYear] = useState();
  const [title, setTitle] = useState();
  const [designation, setDesignation] = useState();
  const [visibility, setVisibility] = useState(0);
  const [data, setData] = useState([]);
  const [searched,setSearched] = useState();
  const logoutHandler = () => {
    localStorage.setItem("@logged", 0);
    setBack(true);
  };

  const searchAuthor = async () => {
    setName(searched);
  };

  const searchYear = async () => {
    setYear(searched);
  };
  const searchDesignation = async () => {
    setDesignation(searched);
  };
  const searchTitle = async () => {
    setTitle(searched);
  };
  useEffect(()=>{
    const fn = async() =>{
    const db = getFirestore();
    const q = query(collection(db, "Users"), where("name", "==", name));
    const userSnapshot = await getDocs(q);
    const records = [];
    userSnapshot.forEach(async (doc) => {
      const userId = doc.id;
      const q1 = query(
        collection(db, "research"),
        where("author", "==", userId)
      );
      const researchSnapshot = await getDocs(q1);
      researchSnapshot.forEach(async (researchItem) => {
        const researchId = researchItem.id;
        const q2 = query(
          collection(db, "journal"),
          where("researchId", "==", researchId),
          where("type", "==", "scopus")
        );
        const journalSnapshot = await getDocs(q2);
        console.log("journal", journalSnapshot);
        journalSnapshot.forEach((journalItem) => {
          console.log(journalItem.id, " => ", journalItem.data());
          const rec = {
            id: journalItem,
            value: journalItem.data(),
          };
          records.push(rec);
          setData(records);
          setVisibility(1);
        });
      });
    });
    }
    fn();
  },[name])
  useEffect(()=>{
    const fn = async()=>{
      const db = getFirestore();
      const q = query(
        collection(db, "journal"),
        where("year", "==", year),
        where("type", "==", "scopus")
      );
      const dataSnapshot = await getDocs(q);
      const records = [];
      dataSnapshot.forEach((item) => {
        const rec = {
          id: item.id,
          value: item.data(),
        };
        records.push(rec);
      });
      setData(records);
      setVisibility(2);
    }
    fn();
  },[year])
  useEffect(()=>{
    const fn = async()=>{
      const db = getFirestore();
      const q = query(collection(db, "Users"), where("type", "==", designation));
      const userSnapshot = await getDocs(q);
      const records = [];
      userSnapshot.forEach(async (doc) => {
        const userId = doc.id;
        const q1 = query(
          collection(db, "research"),
          where("author", "==", userId)
        );
        const researchSnapshot = await getDocs(q1);
        researchSnapshot.forEach(async (researchItem) => {
          const researchId = researchItem.id;
          const q2 = query(
            collection(db, "journal"),
            where("researchId", "==", researchId),
            where("type", "==", "scopus")
          );
          const journalSnapshot = await getDocs(q2);
          console.log("journal", journalSnapshot);
          journalSnapshot.forEach((journalItem) => {
            console.log(journalItem.id, " => ", journalItem.data());
            const rec = {
              id: journalItem,
              value: journalItem.data(),
            };
            records.push(rec);
            setData(records);
            setVisibility(3);
          });
        });
      });
    }
    fn();
  },[designation])
  useEffect(()=>{
    const fn = async()=>{
      const db = getFirestore();
      const q = query(collection(db, "research"), where("title", "==", title));
      const dataSnapshot = await getDocs(q);
      const records = [];
      dataSnapshot.forEach(async (item) => {
        const researchId = item.id;
        const q1 = query(
          collection(
            db,
            "journal",
            where("researchId", "==", researchId),
            where("type", "==", "scopus")
          )
        );
        const recSnapshot = await getDocs(q1);
        recSnapshot.forEach((item) => {
          const rec = {
            id: item.id,
            value: item.data(),
          };
          records.push(rec);
        });
      });
      setData(records);
      setVisibility(4);
    }
    fn();
  },[title])

  return (
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
            <>      <input
            type="text"
            class="
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
              mx-80
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            id="exampleFormControlInput1"
            placeholder="Search by Filter..."
            value={searched} onChange={(e)=>setSearched(e.target.value)}
          />
            <CardContainer>
            
              <button onClick={searchAuthor}>
                <UserCard float header={author} name="Search By Author" />
              </button>
              <button onClick={searchDesignation}>
                <UserCard float header={desig} name="Search By Designation" />
              </button>
              <button onClick={searchYear}>
                <UserCard
                  float
                  header={years}
                  name="Search By Year Of Publish"
                />
              </button>
              <button onClick={searchTitle}>
                <UserCard float header={titles} name="Search By Title" />
              </button>
            </CardContainer>
            </>
          ) : (
            <>
              {visibility == 1 ? (
                <>
                  <Heading1>Search By Author</Heading1>
                  <table className="  p-4">
                    <thead className="  p-4">
                      <th className="  p-4">Journal Name</th>
                      <th className="  p-4">ShortName</th>
                      <th className="  p-4">Year</th>
                      <th className="  p-4">Author</th>
                    </thead>
                    <tbody className="  p-4">
                    {data.map((item)=>{
                      console.log("item: ",item);
                      return(
                        <tr className=" ">
                          <td className="  p-4">{item.value.name}</td>
                          <td className="  p-4">{item.value.shortname}</td>
                          <td className="  p-4">{item.value.year}</td>
                          <td className="  p-4"><Tag color="red">{name}</Tag></td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  {visibility == 2 ? (
                    <>
                      <Heading1>Search By Year</Heading1>
                      <table className="  p-4">
                    <thead className="  p-4">
                      <th className="  p-4">Journal Name</th>
                      <th className="  p-4">ShortName</th>
                      <th className="  p-4">Year</th>
                      <th className="  p-4">Author</th>
                    </thead>
                    <tbody className="  p-4">
                    {data.map((item)=>{
                      console.log("item: ",item);
                      return(
                        <tr className=" ">
                          <td className="  p-4">{item.value.name}</td>
                          <td className="  p-4">{item.value.shortname}</td>
                          <td className="  p-4">{item.value.year}</td>
                          <td className="  p-4"><Tag color="red">{name}</Tag></td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>
                    </>
                  ) : (
                    <>
                      {visibility == 3 ? (
                        <>
                          <Heading1>Search By Designation</Heading1>
                          <table className="  p-4">
                    <thead className="  p-4">
                      <th className="  p-4">Journal Name</th>
                      <th className="  p-4">ShortName</th>
                      <th className="  p-4">Year</th>
                      <th className="  p-4">Author</th>
                    </thead>
                    <tbody className="  p-4">
                    {data.map((item)=>{
                      console.log("item: ",item);
                      return(
                        <tr className=" ">
                          <td className="  p-4">{item.value.name}</td>
                          <td className="  p-4">{item.value.shortname}</td>
                          <td className="  p-4">{item.value.year}</td>
                          <td className="  p-4"><Tag color="red">{name}</Tag></td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>
                        </>
                      ) : (
                        <>
                          <Heading1>Search By Title</Heading1>
                          <table className="  p-4">
                    <thead className="  p-4">
                      <th className="  p-4">Journal Name</th>
                      <th className="  p-4">ShortName</th>
                      <th className="  p-4">Year</th>
                      <th className="  p-4">Author</th>
                    </thead>
                    <tbody className="  p-4">
                    {data.map((item)=>{
                      console.log("item: ",item);
                      return(
                        <tr className=" ">
                          <td className="  p-4">{item.value.name}</td>
                          <td className="  p-4">{item.value.shortname}</td>
                          <td className="  p-4">{item.value.year}</td>
                          <td className="  p-4"><Tag color="red">{name}</Tag></td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>
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
  );
};
