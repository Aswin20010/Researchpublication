import React, { useEffect, useState } from "react";
import { getFirestore, setDoc, addDoc } from "firebase/firestore";
import firebase from "../firebaseConfig";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import {
  HeadContainer,
  BodyContainer,
  Button,
  Heading,
} from "./SearchInterNational";
import styled from "styled-components";
import rpms from "../images/rpms.jpg";
import Dropdown from "react-dropdown";
import Select from "react-select";
const Label = styled.label`
  font-weight: bold;
  margin: auto;
  display: flex;
  justify-content: center;
`;
export const ExistingUser = () => {
  const db = getFirestore();
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [ResearchTitle, setResearchTitle] = useState();
  const [Pages, setPages] = useState();
  const [citations, setCitations] = useState(0);
  const [researchType, setResearchType] = useState();
  const [JournalName, setJournalName] = useState();
  const [JournalType, setJournalType] = useState();
  const [Volume, setVolume] = useState();
  const [rating, setrating] = useState();
  const [impact, setimpact] = useState();
  const [issues, setissues] = useState();
  const [OrganisedBy, setOrganisedBy] = useState();
  const [Conferencetype, setConferenceType] = useState();
  const [Conferencename, setConferenceName] = useState();
  const [shortName, setShortName] = useState();
  const [year, setyear] = useState();
  let userDocs;
  const [userDoc, setUserDoc] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fn = async () => {
      const snapshot = await firebase.firestore().collection("User").get();
      userDocs = snapshot.docs.reduce(
        (cur, doc) => [...cur, { label: doc.data().UserName, value: doc.id }],
        []
      );
      setUserDoc(userDocs);
    };
    fn();
  }, []);
  const logoutHandler = () => {
    localStorage.setItem("@logged", 0);
  };
  return (
    <>
      {userDoc.length > 0 ? (
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
            <h1 align="center" className="m-auto font-bold">
              Insert Form
            </h1>
            <br />
            <Label>Select The Author:</Label>
            <br />
            <Select
              options={userDoc}
              value={user}
              onChange={(value) => setUser(value)}
              className="w-1/3 m-auto"
            />
            <br />
            <Label>Select Research Type:</Label>
            <Select
              options={[
                {
                  label: "Journals",
                  value: "journal",
                },
                {
                  label: "Conference",
                  value: "conference",
                },
              ]}
              value={researchType}
              onChange={(value) => {
                setResearchType(value);
              }}
              className="mt-5 w-1/3 m-auto"
            />
            {researchType?.value == "journal" ? (
              <>
                <br />
                <br />
                <Label>Enter Research Title:</Label>
                <input
                  type="text"
                  value={ResearchTitle}
                  onChange={(e) => setResearchTitle(e.target.value)}
                  className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                />
                <br />
                <br />
                <Label>Enter Journal Name:</Label>
                <input
                  type="text"
                  value={JournalName}
                  onChange={(e) => setJournalName(e.target.value)}
                  className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                />
                <br />
                <br />
                <Label>Enter Year Of Publish:</Label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setyear(e.target.value)}
                  className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                />
                <br />
                <br />
                <Label>Number of Citations:</Label>
                <input
                  type="number"
                  value={citations}
                  onChange={(e) => setCitations(e.target.value)}
                  className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                />
                <br />
                <br />
                <Label>Number Of Pages:</Label>
                <input
                  type="text"
                  value={Pages}
                  onChange={(e) => setPages(e.target.value)}
                  className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                />
                <br />
                <br />
                <Label>Enter Volume Number:</Label>
                <input
                  type="text"
                  value={Volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                />
                <br />
                <br />
                <Label>Enter Number Of Issues:</Label>
                <input
                  type="text"
                  value={issues}
                  onChange={(e) => setissues(e.target.value)}
                  className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                />
                <br />
                <br />
                <Label>Enter Impact Factor:</Label>
                <input
                  type="text"
                  value={impact}
                  onChange={(e) => setimpact(e.target.value)}
                  className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                />
                <br />
                <br />
                <Label>Enter Sci Rating:</Label>
                <input
                  type="text"
                  value={rating}
                  onChange={(e) => setrating(e.target.value)}
                  className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                />
                <br />
                <br />
                <Label>Enter Journal Type:</Label>
                <Select
                  options={[
                    {
                      label: "Normal",
                      value: "normal",
                    },
                    {
                      label: "Scopus",
                      value: "scopus",
                    },
                    {
                      label: "Thomson",
                      value: "thomson",
                    },
                  ]}
                  value={JournalType}
                  onChange={(value) => setJournalType(value)}
                  className="w-1/3 m-auto mt-5"
                />
              </>
            ) : (
              <>
                {researchType?.value == "conference" ? (
                  <>
                    <br />
                    <br />
                    <Label>Enter Research Title:</Label>
                    <input
                      type="text"
                      value={ResearchTitle}
                      onChange={(e) => setResearchTitle(e.target.value)}
                      className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                    />
                    <br />
                    <br />
                    <Label>Enter Conference Name:</Label>
                    <input
                      type="text"
                      value={Conferencename}
                      onChange={(e) => setConferenceName(e.target.value)}
                      className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                    />
                    <br />
                    <br />
                    <Label>Enter Conference ShortName:</Label>
                    <input
                      type="text"
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                    />
                    <br />
                    <br />
                    <Label>Enter Conference Organiser:</Label>
                    <input
                      type="text"
                      value={OrganisedBy}
                      onChange={(e) => setOrganisedBy(e.target.value)}
                      className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                    />
                    <br />
                    <br />
                    <Label>Enter Conference Year:</Label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setyear(e.target.value)}
                      className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                    />
                    <br />
                    <br />
                    <Label>Number of Citations:</Label>
                    <input
                      type="number"
                      value={citations}
                      onChange={(e) => setCitations(e.target.value)}
                      className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                    />
                    <br />
                    <br />
                    <Label>Number Of Pages:</Label>
                    <input
                      type="text"
                      value={Pages}
                      onChange={(e) => setPages(e.target.value)}
                      className="
              form-control
              block
              w-1/3
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
              mt-5
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                    />
                    <br />
                    <br />
                    <Label>Enter Conference Type:</Label>
                    <Select
                      options={[
                        {
                          label: "International",
                          value: "international",
                        },
                        {
                          label: "National",
                          value: "national",
                        },
                      ]}
                      value={Conferencetype}
                      onChange={(value) => setConferenceType(value)}
                      className="w-1/3 m-auto mt-5"
                    />
                  </>
                ) : null}
              </>
            )}
            <button
              onClick={async () => {
                function makeid(length) {
                  var result = "";
                  var characters =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                  var charactersLength = characters.length;
                  for (var i = 0; i < length; i++) {
                    result += characters.charAt(
                      Math.floor(Math.random() * charactersLength)
                    );
                  }
                  return result;
                }

                const id = makeid(20);
                if (user) {
                  try {
                    const journaldetail = {
                      Author: user?.value,
                      AuthorName: user?.label,
                      Year: year,
                      Title: ResearchTitle,
                      Volume: Volume,
                      ImpactFactor: impact,
                      SciRating: rating,
                      JournalName: JournalName,
                      Pages: Pages,
                      Issues: issues,
                      JournalType: JournalType?.value,
                      Citations: citations,
                    };
                    const conferencedetail = {
                      Author: user?.value,
                      AuthorName: user?.label,
                      Title: ResearchTitle,
                      Year: year,
                      ConferenceName: Conferencename,
                      ShortName: shortName,
                      Organizer: OrganisedBy,
                      Citations: citations,
                      ConferenceType: Conferencetype?.value,
                      Pages: Pages,
                    };
                    const journalId = makeid(20);
                    const conferenceId = makeid(20);
                    if (researchType?.value == "journal") {
                      const respo = await setDoc(
                        doc(db, "Journal", journalId),
                        journaldetail,
                        { merge: true }
                      );
                    } else if (researchType?.value == "conference") {
                      const respo = await setDoc(
                        doc(db, "Conference", conferenceId),
                        conferencedetail,
                        { merge: true }
                      );
                      setSuccess(true);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                } else {
                  setError(true);
                  setTimeout(() => {
                    setError(false);
                  }, 2000);
                }
              }}
              className="bg-green-400 text-white rounded-sm flex mt-10 m-auto p-2"
            >
              Insert
            </button>
            {error ? (
              <p align="center" className="mt-7 text-red-500">
                Required Fields not filled
              </p>
            ) : null}
            {success ? (
              <p align="center" className="mt-7 text-green-500">
                Insertion Successful
              </p>
            ) : null}
          </BodyContainer>
        </>
      ) : null}
    </>
  );
};
