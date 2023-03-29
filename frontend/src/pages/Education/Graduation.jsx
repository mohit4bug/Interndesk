import { CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CFormCheck } from '@coreui/react';
import { useState } from 'react';
import styled from "styled-components"
import Select from "react-select";
import { Year } from '../../assets/Years';
import CourseArr from '../../assets/Course';
import { specialization } from '../../assets/Specialization';
import { department } from '../../assets/Department';
import { Scale } from "../../assets/ScaleArray";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast"
import { makeRequest } from '../../axios';


const FormInner = styled.form`
  padding: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 15px;
  @media screen and (max-width: 670px) {
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
const InputRow = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 16px;
`;

const Graduation = () => {
  const [cookies] = useCookies([]);
  const token = cookies.auth



  const [gradInputs, setGradInputs] = useState({
    graduationStatus: "",
    startYear: "",
    endYear: "",
    course: "",
    department: "",
    specialization: "",
    performanceScale: "",
  });


  const handleGradEduStatus = (e) => {
    setGradInputs({ ...gradInputs, graduationStatus: e.value });
  };
  const handleGradStartYear = (e) => {
    setGradInputs({ ...gradInputs, startYear: e.value });
  };
  const handleGradEndYear = (e) => {
    setGradInputs({ ...gradInputs, endYear: e.value });
  };
  const course = (e) => {
    setGradInputs({ ...gradInputs, course: e.value });
  };
  const handledepartment = (e) => {
    setGradInputs({ ...gradInputs, department: e.value });
  };
  const handlespecialization = (e) => {
    setGradInputs({ ...gradInputs, specialization: e.value });
  };
  const handleperformanceScale = (e) => {
    setGradInputs({ ...gradInputs, performanceScale: e.value });
  };


  const HandleGraduationSubmit = async e => {
    e.preventDefault();

    const url = "/details/edu/graduation"

    try {
      const res = await makeRequest.post(url, gradInputs)
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  const GraduationStatusArr = [
    { value: "Completed", label: "Completed" },
    { value: "Pursuing", label: "Pursuing" },
  ]

  return (
    <CAccordionItem itemKey={1}>
      <CAccordionHeader>Graduation</CAccordionHeader>
      <CAccordionBody>
        <FormInner onSubmit={HandleGraduationSubmit}>
          <FieldHeading>Graduation status</FieldHeading>
          <Select
            onChange={handleGradEduStatus}
            placeholder="Status"
            options={GraduationStatusArr}
          />
          <InputRow>
            <InputDiv>
              <Label>Start year</Label>
              <Select
                onChange={handleGradStartYear}
                placeholder="Year"
                options={Year}
              />
            </InputDiv>
            <InputDiv>
              <Label>End year</Label>
              <Select
                onChange={handleGradEndYear}
                placeholder="Year"
                options={Year}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Course</Label>
              <Select
                onChange={course}
                placeholder="E.g BCA"
                options={CourseArr}
              />
            </InputDiv>

            <InputDiv>
              <Label>Specialization</Label>
              <Select
                onChange={handlespecialization}
                placeholder="Specialization"
                options={specialization}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Department</Label>
              <Select
                onChange={handledepartment}
                placeholder="E.g FCE"
                options={department}
              />
            </InputDiv>
            <InputDiv>
              <Label>Performance scale</Label>
              <Select
                onChange={handleperformanceScale}
                placeholder="E.g BCA"
                options={Scale}
              />
            </InputDiv>
          </InputRow>
          <CButton color="primary" type="submit">
            Save
          </CButton>
        </FormInner>
      </CAccordionBody>
      <Toaster />
    </CAccordionItem>
  )
}

export default Graduation