import { CButton, CFormCheck } from "@coreui/react";
import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Interests } from "../assets/Interests";
import { cities } from "../assets/Cities";
import { toast, Toaster } from "react-hot-toast"
import { makeRequest } from "../axios";

const Page = styled.div`
  padding: 50px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;
const FormHeading = styled.h1`
  font-weight: 600;
  font-size: 35px;
  text-transform: capitalize;
`;
const Form = styled.form`
  padding: 30px;
  border: 1px solid lightgray;
  width: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 10px;
  @media screen and (max-width: 610px) {
    width: 100%;
    border: none;
  }
`;
const FieldHeading = styled.p`
  font-weight: 500;
  font-size: 16px;
`;
const RadioContainer = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid lightgray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
`;
const SmallInfo = styled.p`
  color: gray;
  font-size: 12px;
`;





const Preferences = () => {

  const [currentLookingFor, setcurrentLookingFor] = useState(""); // OK
  const [preferredLocations, setPreferredLocations] = useState([]); // OK
  const [types, setTypes] = useState(""); // OK


  const [firstPreference, setFirstPreference] = useState("");
  const [secondPreference, setSecondPreference] = useState("");
  const [thirdPreference, setThirdPreference] = useState("");




  const handleChangeLocations = (e) => {
    setPreferredLocations(Array.isArray(e) ? e.map((x) => x.value) : []);
  };


  // Handing submit
  const handleSubmit = async (e) => {
    e.preventDefault();


    const inputs = {
      currentLookingFor: currentLookingFor,
      types: types,
      interests: {
        firstPreference: firstPreference,
        secondPreference: secondPreference,
        thirdPreference: thirdPreference
      },
      preferredLocations: preferredLocations,
    }

    try {
      const res = await makeRequest.post("details/preferences", inputs);
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  const lookingFor = [
    {
      value: "Internships",
      label: "Internships",
    },
    {
      value: "Jobs",
      label: "Jobs",
    }
  ]
  const workTypeArr = [
    {
      value: "In-office",
      label: "In-office",
    },
    {
      value: "Remote",
      label: "Remote",
    }
  ]

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <FormHeading>Preferences</FormHeading>
        <FieldHeading>Currently looking for</FieldHeading>
        <Select
          onChange={(e) => setcurrentLookingFor(e.value)}
          placeholder="Looking for?"
          options={lookingFor}
        />
        <hr />
        <FieldHeading>Type of {currentLookingFor}</FieldHeading>
        <Select
          onChange={(e) => setTypes(e.value)}
          placeholder="Select Your type ?"
          options={workTypeArr}
        />
        <hr />
        <FieldHeading>Fields of interest</FieldHeading>
        <Select
          onChange={(e) => setFirstPreference(e.value)}
          placeholder="Select your 1st preference"
          options={Interests}
        />
        <Select
          onChange={(e) => setSecondPreference(e.value)}
          placeholder="Select your 2nd preference"
          options={Interests}
        />
        <Select
          onChange={(e) => setThirdPreference(e.value)}
          placeholder="Select your 3rd preference"
          options={Interests}
        />
        <hr />
        <FieldHeading>Prefered location</FieldHeading>
        <Select
          className="dropdown"
          placeholder="Choose prefered locations"
          value={cities.filter((obj) => preferredLocations.includes(obj.value))} // set selected values
          options={cities}
          onChange={handleChangeLocations}
          isMulti
          isClearable
        />
        <SmallInfo>
          (Leave this blank if you do not have any preference)
        </SmallInfo>
        <CButton color="primary" type="submit">
          Save
        </CButton>
      </Form>
      <Toaster />
    </Page>
  );
};

export default Preferences;
