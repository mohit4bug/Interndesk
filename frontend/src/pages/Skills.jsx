import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { skillsArray } from "../assets/Skills";
import { CButton } from "@coreui/react";
import { useCookies } from "react-cookie";
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
  gap: 20px;
  @media screen and (max-width: 610px) {
    width: 100%;
    border: none;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 16px;
`;

const Skills = () => {

  const [cookies] = useCookies([]);
  const token = cookies.auth



  const [skills, setSkills] = useState([]);

  const handleChange = (e) => {
    setSkills(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await makeRequest.post("/details/skills", { skills: skills });
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.messgage)
    }
  };

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <FormHeading>Skills</FormHeading>
        <Label>Add your skills</Label>
        <Select
          className="dropdown"
          placeholder="Select your skills"
          value={skillsArray.filter((obj) => skills.includes(obj.value))}
          options={skillsArray}
          onChange={handleChange}
          isMulti
          isClearable
        />
        <CButton color="primary" type="submit">
          Save
        </CButton>
      </Form>
      <Toaster />
    </Page>
  );
};

export default Skills;
