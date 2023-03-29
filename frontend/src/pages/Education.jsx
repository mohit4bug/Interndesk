import { CAccordion } from "@coreui/react";
import React from "react";
import styled from "styled-components";
import Graduation from "./Education/Graduation";
import PostGraduation from "./Education/PostGraduation";
import Senior from "./Education/Senior";
import Secondary from "./Education/Secondary";



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
const FormDiv = styled.div`
  width: 630px;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 10px;
  @media screen and (max-width: 670px) {
    width: 100%;
    border: none;
  }
`;



const Education = () => {
  return (
    <Page>
      <FormDiv>
        <FormHeading>Education</FormHeading>
        <CAccordion>
          <Graduation />
          <PostGraduation />
          <Senior />
          <Secondary />
        </CAccordion>
      </FormDiv>
    </Page>
  );
};

export default Education;
