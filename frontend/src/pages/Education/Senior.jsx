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
const Senior = () => {
    const [cookies] = useCookies([]);
    const token = cookies.auth;



    // {
    //     "stream": "Science",
    //     "schoolName": "ABC School",
    //     "percentage": 95.6,
    //     "medium": "English",
    //     "board": "CBSE",
    //     "marksheetImage": "https://example.com/marksheet.png"
    // }

    // 12th configuration
    const [inputs12th, setInputs12th] = useState({
        stream: "",
        schoolName: "",
        percentage: "",
        medium: "",
        board: "",
        marksheetImage: "",
    });
    const handleChange12th = (e) => {
        setInputs12th({ ...inputs12th, [e.target.name]: e.target.value });
    };

    const handleStream12th = (e) => {
        setInputs12th({ ...inputs12th, stream: e.value });
    };
    const handleImage12th = (event) => {
        setInputs12th({ ...inputs12th, marksheetImage: event.target.files[0] });
    };

    const handleSeniorSecondaryChange = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("stream", inputs12th?.stream);
        formData.append("schoolName", inputs12th?.schoolName);
        formData.append("percentage", inputs12th?.percentage);
        formData.append("medium", inputs12th?.medium);
        formData.append("board", inputs12th?.board);
        formData.append("marksheetImage", inputs12th?.marksheetImage);

        try {
            const url = "/details/edu/seniorsecondary"
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
                <FormInner onSubmit={handleSeniorSecondaryChange}>
                    <InputRow>
                        <InputDiv>
                            <Label>Stream</Label>
                            <Select
                                onChange={handleStream12th}
                                placeholder="Stream"
                                options={streams}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>School name</Label>
                            <CFormInput
                                type="text"
                                name="schoolName"
                                id="exampleFormControlInput1"
                                placeholder="xyz public school"
                                autoComplete="off"
                                onChange={handleChange12th}
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
                                onChange={handleChange12th}
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
                                onChange={handleChange12th}
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
                                onChange={handleChange12th}
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

export default Senior;
