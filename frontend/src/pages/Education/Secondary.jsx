import {
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CFormInput,
} from "@coreui/react";
import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { streams } from "../../assets/Streams";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import { makeRequest } from "../../axios";

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
const Secondary = () => {




  // {
  //     "stream": "Science",
  //     "schoolName": "ABC School",
  //     "percentage": 95.6,
  //     "medium": "English",
  //     "board": "CBSE",
  //     "marksheetImage": "https://example.com/marksheet.png"
  // }

  // 12th configuration
  const [inputs10th, setInputs10th] = useState({
    schoolName: "",
    percentage: "",
    medium: "",
    board: "",
    marksheetImage: "",
  });
  const handleChange10th = (e) => {
    setInputs10th({ ...inputs10th, [e.target.name]: e.target.value });
  };

  const handleStream12th = (e) => {
    setInputs10th({ ...inputs10th, stream: e.value });
  };
  const handleImage12th = (event) => {
    setInputs10th({ ...inputs10th, marksheetImage: event.target.files[0] });
  };

  const handleSecondaryChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("stream", inputs10th?.stream);
    formData.append("schoolName", inputs10th?.schoolName);
    formData.append("percentage", inputs10th?.percentage);
    formData.append("medium", inputs10th?.medium);
    formData.append("board", inputs10th?.board);
    formData.append("marksheetImage", inputs10th?.marksheetImage);

    try {
      const url = "/details/edu/secondary"
      const res = await makeRequest.post(url, formData);
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <CAccordionItem itemKey={3}>
      <CAccordionHeader>Add senior secondary (XII)</CAccordionHeader>
      <CAccordionBody>
        <FormInner onSubmit={handleSecondaryChange}>
          <InputRow>
            <InputDiv>
              <Label>School name</Label>
              <CFormInput
                type="text"
                name="schoolName"
                id="exampleFormControlInput1"
                placeholder="xyz public school"
                autoComplete="off"
                onChange={handleChange10th}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Percentage</Label>
              <CFormInput
                type="number"
                step="0.01"
                name="percentage"
                id="exampleFormControlInput1"
                placeholder="Your percentage"
                autoComplete="off"
                onChange={handleChange10th}
              />
            </InputDiv>
            <InputDiv>
              <Label>Medium</Label>
              <CFormInput
                type="text"
                name="medium"
                id="exampleFormControlInput1"
                placeholder="E.g Hindi,English"
                autoComplete="off"
                onChange={handleChange10th}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Board</Label>
              <CFormInput
                type="text"
                name="board"
                id="exampleFormControlInput1"
                placeholder="E.g RBSE,CBSE"
                autoComplete="off"
                onChange={handleChange10th}
              />
            </InputDiv>
            <InputDiv>
              <Label>12th Marksheet</Label>
              <CFormInput
                type="file"
                name="marksheetImage"
                id="exampleFormControlInput1"
                autoComplete="off"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImage12th}
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
  );
};

export default Secondary;
