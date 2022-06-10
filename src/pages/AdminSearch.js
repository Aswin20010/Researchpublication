import React, { useEffect, useState } from "react";
import { doc, getFirestore, getDocFromCache } from "firebase/firestore";
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
import { PieChart } from "react-minimal-pie-chart";
import { getDatabase, ref, child, get } from "firebase/database";
import Font from "react-font";
const PieChartContainer = styled.div`
  width: 350px;
  height: 350px;
`;
// 0
// 1 => author
// 2 => year
// 3 => designation
// 4 => title
export const AdminSearch = () => {
  const dbRef = ref(getDatabase());
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
  useEffect(()=>{
    console.log(data)
  },[data])
  const defaultLabelStyle = {
    fontSize: "10px",
    fontFamily: "sans-serif",
    fontColor: "black",
  };
  const shiftSize = 7;
  const nameFn = async () => {
    const records = [];
    const db = getFirestore();
    const q = query(collection(db, "User"), where("UserName", "==", name));
    const userSnapshot = await getDocs(q);
    userSnapshot.forEach(async (doc) => {
      const userId = doc.id;
      const q1 = query(
        collection(db, "Conference"),
        where("AuthorName", "==", name)
      );
      const conferenceSnapshot = await getDocs(q1);
      conferenceSnapshot.forEach(async (ConferenceItem) => {
        records.push({
          id: ConferenceItem.id,
          value: ConferenceItem.data(),
        });
      });
      const q2 = query(
        collection(db, "Journal"),
        where("AuthorName", "==", name)
      );
        const journalSnapshot = await getDocs(q2);
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
      collection(db, "Conference"),
      where("Year", "==", year)
    );
    const dataSnapshot = await getDocs(q);
    const records = [];
    dataSnapshot.forEach(async (item) => {
      const rec = {
        id: item.id,
        value: item.data(),
      };
      records.push(rec);
    });
    const q1 = query(
      collection(db, "Journal"),
      where("Year", "==", year)
    );
    const dataSnapshot1 = await getDocs(q1);
    dataSnapshot1.forEach((item) => {
      const datas = data;
      const rec = {
        id: item.id,
        researchType: "journal",
        value: item.data(),
      };
      records.push(rec);
    });
    setData(records);
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
        where("AuthorName", "==", name)
      );
      const conferenceSnapshot = await getDocs(q1);
      conferenceSnapshot.forEach(async (ConferenceItem) => {
        records.push({
          id: ConferenceItem.id,
          value: ConferenceItem.data(),
        });
      });
      const q2 = query(
        collection(db, "Journal"),
        where("AuthorName", "==", name)
      );
        const journalSnapshot = await getDocs(q2);
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
      collection(db, "Conference"),
      where("Title", "==", title)
    );
    const dataSnapshot = await getDocs(q);
    const records = [];
    dataSnapshot.forEach(async (item) => {
      const rec = {
        id: item.id,
        value: item.data(),
      };
      records.push(rec);
    });
    const q1 = query(
      collection(db, "Journal"),
      where("Title", "==", title)
    );
    const dataSnapshot1 = await getDocs(q1);
    dataSnapshot1.forEach((item) => {
      const datas = data;
      const rec = {
        id: item.id,
        value: item.data(),
      };
      records.push(rec);
    });
    setData(records);
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
                      <>
                        {data.filter(
                          (item) => item.value.ConferenceType == "national" || item.value.ConferenceType == 'international'
                        ).length > 0 ? (
                          <table className="  p-4 ml-10">
                            <tbody className=" p-4">
                              {data
                                .filter(
                                  (item) =>{ console.log('data',data); return item.value.ConferenceType == "national" || item.value.ConferenceType == 'international'}
                                ) 
                                .map((item) => {
                                  return (
                                    <Font family='Kufam'>
                                    <tr className="font-bold text-lg">
                                      <td className= "p-1">
                                        {item.value.Title} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.ConferenceName} ,
                                      </td>
                                      <td className= "p-1">
                                        {item.value.ShortName} ,
                                      </td>
                                      <td className= "p-1">
                                        {item.value.ConferenceType} ,
                                      </td>
                                      <td className= "p-1">
                                        {item.value.Organizer} ,
                                      </td>
                                      <td className= "p-1">
                                        {item.value.Year} ,
                                      </td>
                                      <td className= "p-1">
                                        {item.value.Pages} ,
                                      </td>
                                      <td className= "p-1">
                                        {item.value.Citations} ,
                                      </td>
                                      <td className= "p-1">
                                        {item.value.AuthorName} 
                                      </td>
                                    </tr>
                                    </Font>
                                  );
                                })}
                            </tbody>
                          </table>
                        ) : null}
                        {data.filter((item) => item.value.JournalType == "normal" || item.value.JournalType == 'scopus' || item.value.JournalType == 'thomson')
                          .length > 0 ? (
                          <table className="p-4 ml-10 mt-10">
                            <tbody className= "p-1">
                              {data
                                .filter(
                                  (item) => item.value.JournalType == "normal" || item.value.JournalType == 'scopus' || item.value.JournalType == 'thomson'
                                )
                                .map((item) => {
                                  return (
                                    <Font family='Kufam'>
                                    <tr className="font-bold text-lg">
                                      <td className= "p-1">
                                        {item.value.Title} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.JournalName} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.JournalType} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.Year} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.Citations} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.ImpactFactor} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.Issues} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.Volume} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.Pages} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.SciRating} , 
                                      </td>
                                      <td className= "p-1">
                                        {item.value.AuthorName}  
                                      </td>
                                    </tr>
                                    </Font>
                                  );
                                })}
                            </tbody>
                          </table>
                        ) : null}
                        <PieChartContainer className="mt-2 m-auto">
                          <PieChart
                            data={[
                              {
                                title: "Journal",
                                value: data.filter(
                                  (item) => item.researchType == "journal"
                                ).length,
                                color: "#cc2b5e",
                              },
                              {
                                title: "Conference",
                                value: data.filter(
                                  (item) => item.researchType == "conference"
                                ).length,
                                color: "#753a88",
                              },
                            ]}
                            radius={PieChart.defaultProps.radius - shiftSize}
                            segmentsShift={(index) =>
                              index === 0 ? shiftSize : 0.5
                            }
                            label={({ dataEntry }) =>
                              ((dataEntry.value / data.length) * 100).toFixed(
                                0
                              ) + "%"
                            }
                            labelStyle={{
                              ...defaultLabelStyle,
                              color: "white",
                            }}
                          />
                        </PieChartContainer>
                        <PieChartContainer className="mt-2 m-auto">
                          <PieChart
                            data={[
                              {
                                title: "National",
                                value: data.filter(
                                  (item) =>
                                    item.value.ConferenceType == "national"
                                ).length,
                                color: "#42275a",
                              },
                              {
                                title: "InterNational",
                                value: data.filter(
                                  (item) =>
                                    item.value.ConferenceType == "international"
                                ).length,
                                color: "#734b6d",
                              },
                            ]}
                            radius={PieChart.defaultProps.radius - shiftSize}
                            segmentsShift={(index) =>
                              index === 0 ? shiftSize : 0.5
                            }
                            label={({ dataEntry }) =>
                              (
                                (dataEntry.value /
                                  data.filter(
                                    (item) => item.researchType == "conference"
                                  ).length) *
                                100
                              ).toFixed(0) + "%"
                            }
                            labelStyle={{
                              ...defaultLabelStyle,
                              color: "white",
                            }}
                          />
                        </PieChartContainer>
                        <PieChartContainer className="mt-2 m-auto">
                          <PieChart
                            data={[
                              {
                                title: "Normal",
                                value: data.filter(
                                  (item) => item.value.JournalType == "normal"
                                ).length,
                                color: "#020024",
                              },
                              {
                                title: "Scopus",
                                value: data.filter(
                                  (item) => item.value.JournalType == "scopus"
                                ).length,
                                color: "#092d79",
                              },
                              {
                                title: "Thomson",
                                value: data.filter(
                                  (item) => item.value.JournalType == "thomson"
                                ).length,
                                color: "#00d4ff",
                              },
                            ]}
                            radius={PieChart.defaultProps.radius - shiftSize}
                            segmentsShift={(index) =>
                              index === 0 ? shiftSize : 0.5
                            }
                            label={({ dataEntry }) =>
                              (
                                (dataEntry.value /
                                  data.filter(
                                    (item) => item.researchType == "journal"
                                  ).length) *
                                100
                              ).toFixed(0) + "%"
                            }
                            labelStyle={{
                              ...defaultLabelStyle,
                              color: "white",
                            }}
                          />
                        </PieChartContainer>
                      </>
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
                          <>
                            {data.filter(
                                  (item) =>{ console.log('data',data); return item.value.ConferenceType == "national" || item.value.ConferenceType == 'international'}
                            ).length > 0 ? (
                              <table>
                                <tbody className="p-1">
                                  {data
                                    .filter(
                                      (item) =>{ console.log('data',data); return item.value.ConferenceType == "national" || item.value.ConferenceType == 'international'}
                                    )
                                    .map((item) => {
                                      return (
                                        <Font family='Kufam'>
                                        <tr className="font-bold text-lg">
                                          <td className= "p-1">
                                            {item.value.Title} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.ConferenceName} ,
                                          </td>
                                          <td className= "p-1">
                                            {item.value.ShortName} ,
                                          </td>
                                          <td className= "p-1">
                                            {item.value.ConferenceType} ,
                                          </td>
                                          <td className= "p-1">
                                            {item.value.Organizer} ,
                                          </td>
                                          <td className= "p-1">
                                            {item.value.Year} ,
                                          </td>
                                          <td className= "p-1">
                                            {item.value.Pages} ,
                                          </td>
                                          <td className= "p-1">
                                            {item.value.Citations} ,
                                          </td>
                                          <td className= "p-1">
                                            {item.value.AuthorName} 
                                          </td>
                                        </tr>
                                        </Font>
                                      );
                                    })}
                                </tbody>
                              </table>
                            ) : null}
                            {data.filter(
                                  (item) => item.value.JournalType == "normal" || item.value.JournalType == 'scopus' || item.value.JournalType == 'thomson'
                            ).length > 0 ? (
                              <table className="  p-4 ml-10 mt-10">
                                <tbody className="  p-4">
                                  {data
                                    .filter(
                                      (item) => item.researchType == "journal"
                                    )
                                    .map((item) => {
                                      return (
                                        <Font family='Kufam'>
                                        <tr className="font-bold text-lg">
                                          <td className= "p-1">
                                            {item.value.Title} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.JournalName} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.JournalType} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.Year} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.Citations} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.ImpactFactor} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.Issues} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.Volume} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.Pages} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.SciRating} , 
                                          </td>
                                          <td className= "p-1">
                                            {item.value.AuthorName}  
                                          </td>
                                        </tr>
                                        </Font>
                                      );
                                    })}
                                </tbody>
                              </table>
                            ) : null}
                            <PieChartContainer className="mt-2 m-auto">
                              <PieChart
                                data={[
                                  {
                                    title: "Journal",
                                    value: data.filter(
                                      (item) => item.researchType == "journal"
                                    ).length,
                                    color: "#cc2b5e",
                                  },
                                  {
                                    title: "Conference",
                                    value: data.filter(
                                      (item) =>
                                        item.researchType == "conference"
                                    ).length,
                                    color: "#753a88",
                                  },
                                ]}
                                radius={
                                  PieChart.defaultProps.radius - shiftSize
                                }
                                segmentsShift={(index) =>
                                  index === 0 ? shiftSize : 0.5
                                }
                                label={({ dataEntry }) =>
                                  (
                                    (dataEntry.value / data.length) *
                                    100
                                  ).toFixed(0) + "%"
                                }
                                labelStyle={{
                                  ...defaultLabelStyle,
                                  color: "white",
                                }}
                              />
                            </PieChartContainer>
                            <PieChartContainer className="mt-2 m-auto">
                              <PieChart
                                data={[
                                  {
                                    title: "National",
                                    value: data.filter(
                                      (item) =>
                                        item.value.ConferenceType == "national"
                                    ).length,
                                    color: "#42275a",
                                  },
                                  {
                                    title: "InterNational",
                                    value: data.filter(
                                      (item) =>
                                        item.value.ConferenceType ==
                                        "international"
                                    ).length,
                                    color: "#734b6d",
                                  },
                                ]}
                                radius={
                                  PieChart.defaultProps.radius - shiftSize
                                }
                                segmentsShift={(index) =>
                                  index === 0 ? shiftSize : 0.5
                                }
                                label={({ dataEntry }) =>
                                  (
                                    (dataEntry.value /
                                      data.filter(
                                        (item) =>
                                          item.researchType == "conference"
                                      ).length) *
                                    100
                                  ).toFixed(0) + "%"
                                }
                                labelStyle={{
                                  ...defaultLabelStyle,
                                  color: "white",
                                }}
                              />
                            </PieChartContainer>
                            <PieChartContainer className="mt-2 m-auto">
                              <PieChart
                                data={[
                                  {
                                    title: "Normal",
                                    value: data.filter(
                                      (item) =>
                                        item.value.JournalType == "normal"
                                    ).length,
                                    color: "#020024",
                                  },
                                  {
                                    title: "Scopus",
                                    value: data.filter(
                                      (item) =>
                                        item.value.JournalType == "scopus"
                                    ).length,
                                    color: "#092d79",
                                  },
                                  {
                                    title: "Thomson",
                                    value: data.filter(
                                      (item) =>
                                        item.value.JournalType == "thomson"
                                    ).length,
                                    color: "#00d4ff",
                                  },
                                ]}
                                radius={
                                  PieChart.defaultProps.radius - shiftSize
                                }
                                segmentsShift={(index) =>
                                  index === 0 ? shiftSize : 0.5
                                }
                                label={({ dataEntry }) =>
                                  (
                                    (dataEntry.value /
                                      data.filter(
                                        (item) => item.researchType == "journal"
                                      ).length) *
                                    100
                                  ).toFixed(0) + "%"
                                }
                                labelStyle={{
                                  ...defaultLabelStyle,
                                  color: "white",
                                }}
                              />
                            </PieChartContainer>
                          </>
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
                              value={name}
                              onChange={(e) => {
                                setDesignation(e.target.value);
                              }}
                            />
                            <Buttons onClick={DesigFn}>Search</Buttons>
                            {data.length > 0 ? (
                              <>
                                {data.filter(
                                  (item) =>{ console.log('data',data); return item.value.ConferenceType == "national" || item.value.ConferenceType == 'international'}
                                ).length > 0 ? (
                                  <table className="  p-1 ml-10">
                                    <tbody className="  p-1">
                                      {data
                                        .filter(
                                          (item) =>item.value.ConferenceType == "national" || item.value.ConferenceType == 'international'
                                        )
                                        .map((item) => {
                                          return (
                                            <Font family='Kufam'>
                                            <tr className="font-bold text-lg">
                                              <td className= "p-1">
                                                {item.value.Title} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.ConferenceName} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.ShortName} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.ConferenceType} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Organizer} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Year} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Pages} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Citations} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.AuthorName} 
                                              </td>
                                            </tr>
                                            </Font>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                ) : null}
                                {data.filter(
                                  (item) => item.value.JournalType == "normal" || item.value.JournalType == 'scopus' || item.value.JournalType == 'thomson'
                                ).length > 0 ? (
                                  <table className="  p-1 ml-10 mt-10">
                                    <tbody className="  p-1">
                                      {data
                                        .filter(
                                          (item) => item.value.JournalType == "normal" || item.value.JournalType == 'scopus' || item.value.JournalType == 'thomson'
                                        )
                                        .map((item) => {
                                          return (
                                            <Font family='Kufam'>
                                            <tr className="font-bold text-lg">
                                              <td className= "p-1">
                                                {item.value.Title} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.JournalName} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.JournalType} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Year} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Citations} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.ImpactFactor} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Issues} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Volume} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Pages} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.SciRating} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.AuthorName}  
                                              </td>
                                            </tr>
                                            </Font>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                ) : null}
                                <PieChartContainer className="mt-2 m-auto">
                                  <PieChart
                                    data={[
                                      {
                                        title: "Journal",
                                        value: data.filter(
                                          (item) =>
                                            item.researchType == "journal"
                                        ).length,
                                        color: "#cc2b5e",
                                      },
                                      {
                                        title: "Conference",
                                        value: data.filter(
                                          (item) =>
                                            item.researchType == "conference"
                                        ).length,
                                        color: "#753a88",
                                      },
                                    ]}
                                    radius={
                                      PieChart.defaultProps.radius - shiftSize
                                    }
                                    segmentsShift={(index) =>
                                      index === 0 ? shiftSize : 0.5
                                    }
                                    label={({ dataEntry }) =>
                                      (
                                        (dataEntry.value / data.length) *
                                        100
                                      ).toFixed(0) + "%"
                                    }
                                    labelStyle={{
                                      ...defaultLabelStyle,
                                      color: "white",
                                    }}
                                  />
                                </PieChartContainer>
                                <PieChartContainer className="mt-2 m-auto">
                                  <PieChart
                                    data={[
                                      {
                                        title: "National",
                                        value: data.filter(
                                          (item) =>
                                            item.value.ConferenceType ==
                                            "national"
                                        ).length,
                                        color: "#42275a",
                                      },
                                      {
                                        title: "InterNational",
                                        value: data.filter(
                                          (item) =>
                                            item.value.ConferenceType ==
                                            "international"
                                        ).length,
                                        color: "#734b6d",
                                      },
                                    ]}
                                    radius={
                                      PieChart.defaultProps.radius - shiftSize
                                    }
                                    segmentsShift={(index) =>
                                      index === 0 ? shiftSize : 0.5
                                    }
                                    label={({ dataEntry }) =>
                                      (
                                        (dataEntry.value /
                                          data.filter(
                                            (item) =>
                                              item.researchType == "conference"
                                          ).length) *
                                        100
                                      ).toFixed(0) + "%"
                                    }
                                    labelStyle={{
                                      ...defaultLabelStyle,
                                      color: "white",
                                    }}
                                  />
                                </PieChartContainer>
                                <PieChartContainer className="mt-2 m-auto">
                                  <PieChart
                                    data={[
                                      {
                                        title: "Normal",
                                        value: data.filter(
                                          (item) =>
                                            item.value.JournalType == "normal"
                                        ).length,
                                        color: "#020024",
                                      },
                                      {
                                        title: "Scopus",
                                        value: data.filter(
                                          (item) =>
                                            item.value.JournalType == "scopus"
                                        ).length,
                                        color: "#092d79",
                                      },
                                      {
                                        title: "Thomson",
                                        value: data.filter(
                                          (item) =>
                                            item.value.JournalType == "thomson"
                                        ).length,
                                        color: "#00d4ff",
                                      },
                                    ]}
                                    radius={
                                      PieChart.defaultProps.radius - shiftSize
                                    }
                                    segmentsShift={(index) =>
                                      index === 0 ? shiftSize : 0.5
                                    }
                                    label={({ dataEntry }) =>
                                      (
                                        (dataEntry.value /
                                          data.filter(
                                            (item) =>
                                              item.researchType == "journal"
                                          ).length) *
                                        100
                                      ).toFixed(0) + "%"
                                    }
                                    labelStyle={{
                                      ...defaultLabelStyle,
                                      color: "white",
                                    }}
                                  />
                                </PieChartContainer>
                              </>
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
                              value={name}
                              onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                            />
                            <Buttons onClick={TitleFn}>Search</Buttons>
                            {data.length > 0 ? (
                              <>
                                {data.filter(
                                          (item) =>item.value.ConferenceType == "national" || item.value.ConferenceType == 'international'
                                ).length > 0 ? (
                                  <table className="  p-1 ml-10">
                                    <tbody className="  p-4">
                                      {data
                                        .filter(
                                          (item) =>item.value.ConferenceType == "national" || item.value.ConferenceType == 'international'
                                        )
                                        .map((item) => {
                                          return (
                                            <Font family='Kufam'>
                                            <tr className="font-bold text-lg">
                                              <td className= "p-1">
                                                {item.value.Title} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.ConferenceName} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.ShortName} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.ConferenceType} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Organizer} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Year} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Pages} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Citations} ,
                                              </td>
                                              <td className= "p-1">
                                                {item.value.AuthorName} 
                                              </td>
                                            </tr>
                                            </Font>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                ) : null}
                                {data.filter(
                                  (item) => item.value.JournalType == "normal" || item.value.JournalType == 'scopus' || item.value.JournalType == 'thomson'
                                ).length > 0 ? (
                                  <table className="  p-1 ml-10 mt-10">
                                    <tbody className="  p-1">
                                      {data
                                        .filter(
                                          (item) => item.value.JournalType == "normal" || item.value.JournalType == 'scopus' || item.value.JournalType == 'thomson'
                                        )
                                        .map((item) => {
                                          return (
                                            <Font family='Kufam'>
                                            <tr className="font-bold text-lg">
                                              <td className= "p-1">
                                                {item.value.Title} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.JournalName} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.JournalType} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Year} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Citations} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.ImpactFactor} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Issues} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Volume} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.Pages} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.SciRating} , 
                                              </td>
                                              <td className= "p-1">
                                                {item.value.AuthorName}  
                                              </td>
                                            </tr>
                                            </Font>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                ) : null}
                                <PieChartContainer className="mt-2 m-auto">
                                  <PieChart
                                    data={[
                                      {
                                        title: "Journal",
                                        value: data.filter(
                                          (item) =>
                                            item.researchType == "journal"
                                        ).length,
                                        color: "#cc2b5e",
                                      },
                                      {
                                        title: "Conference",
                                        value: data.filter(
                                          (item) =>
                                            item.researchType == "conference"
                                        ).length,
                                        color: "#753a88",
                                      },
                                    ]}
                                    radius={
                                      PieChart.defaultProps.radius - shiftSize
                                    }
                                    segmentsShift={(index) =>
                                      index === 0 ? shiftSize : 0.5
                                    }
                                    label={({ dataEntry }) =>
                                      (
                                        (dataEntry.value / data.length) *
                                        100
                                      ).toFixed(0) + "%"
                                    }
                                    labelStyle={{
                                      ...defaultLabelStyle,
                                      color: "white",
                                    }}
                                  />
                                </PieChartContainer>
                                <PieChartContainer className="mt-2 m-auto">
                                  <PieChart
                                    data={[
                                      {
                                        title: "National",
                                        value: data.filter(
                                          (item) =>
                                            item.value.ConferenceType ==
                                            "national"
                                        ).length,
                                        color: "#42275a",
                                      },
                                      {
                                        title: "InterNational",
                                        value: data.filter(
                                          (item) =>
                                            item.value.ConferenceType ==
                                            "international"
                                        ).length,
                                        color: "#734b6d",
                                      },
                                    ]}
                                    radius={
                                      PieChart.defaultProps.radius - shiftSize
                                    }
                                    segmentsShift={(index) =>
                                      index === 0 ? shiftSize : 0.5
                                    }
                                    label={({ dataEntry }) =>
                                      (
                                        (dataEntry.value /
                                          data.filter(
                                            (item) =>
                                              item.researchType == "conference"
                                          ).length) *
                                        100
                                      ).toFixed(0) + "%"
                                    }
                                    labelStyle={{
                                      ...defaultLabelStyle,
                                      color: "white",
                                    }}
                                  />
                                </PieChartContainer>
                                <PieChartContainer className="mt-2 m-auto">
                                  <PieChart
                                    data={[
                                      {
                                        title: "Normal",
                                        value: data.filter(
                                          (item) =>
                                            item.value.JournalType == "normal"
                                        ).length,
                                        color: "#020024",
                                      },
                                      {
                                        title: "Scopus",
                                        value: data.filter(
                                          (item) =>
                                            item.value.JournalType == "scopus"
                                        ).length,
                                        color: "#092d79",
                                      },
                                      {
                                        title: "Thomson",
                                        value: data.filter(
                                          (item) =>
                                            item.value.JournalType == "thomson"
                                        ).length,
                                        color: "#00d4ff",
                                      },
                                    ]}
                                    radius={
                                      PieChart.defaultProps.radius - shiftSize
                                    }
                                    segmentsShift={(index) =>
                                      index === 0 ? shiftSize : 0.5
                                    }
                                    label={({ dataEntry }) =>
                                      (
                                        (dataEntry.value /
                                          data.filter(
                                            (item) =>
                                              item.researchType == "journal"
                                          ).length) *
                                        100
                                      ).toFixed(0) + "%"
                                    }
                                    labelStyle={{
                                      ...defaultLabelStyle,
                                      color: "white",
                                    }}
                                  />
                                </PieChartContainer>
                              </>
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
