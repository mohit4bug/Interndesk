import { CButton, CFormInput } from '@coreui/react'
import React, { useState } from 'react'
import styled from "styled-components"
import Select from 'react-select'
import { gender } from '../assets/Gender'
import { cities } from '../assets/Cities'
import { useCookies } from 'react-cookie';
import { toast, Toaster } from "react-hot-toast"
import { makeRequest } from '../axios'

const Page = styled.div`
  padding: 50px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items:center;
`
const FormHeading = styled.h1`
  font-weight: 600;
  font-size: 35px;
  text-transform: capitalize;
`
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
`
const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const InputRow = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`
const Label = styled.label`
    font-weight: 500;
    font-size: 16px;
`
const SmallInfo = styled.p`
  color:gray;
  font-size: 14px;
`







const Personal = () => {

  const [cookies] = useCookies([]);
  const token = cookies.auth



  // Inputs
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    profilePicture: "",
    gender: "",
    mobile: "",
    currentCity: "",
    secondCity: ""
  })


  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleProfileImage = (e) => {
    setInputs({ ...inputs, profilePicture: e.target.files[0] })
  }

  const handleGenderChange = (e) => {
    setInputs({ ...inputs, gender: e.value })
  }

  const handlecurrentCityChange = (e) => {
    setInputs({ ...inputs, currentCity: e.value })
  }
  const handleSecondCityChange = (e) => {
    setInputs({ ...inputs, secondCity: e.value })
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("firstName", inputs?.firstName);
    formdata.append("lastName", inputs?.lastName);
    formdata.append("profileImage", inputs?.profilePicture);
    formdata.append("gender", inputs?.gender);
    formdata.append("mobile", inputs?.mobile);
    formdata.append("currentLocation", inputs?.currentCity);
    formdata.append("secondLocation", inputs?.secondCity);

    try {
      const url = "/details/personal";
      const headers = { 'Content-Type': 'multipart/form-data' };
      const res = await makeRequest.post(url, formdata, { headers });
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }


  }





  return (
    <Page>
      <Form onSubmit={HandleSubmit}>
        <FormHeading>Personal details</FormHeading>
        <InputRow>
          <InputDiv>
            <Label>First name</Label>
            <CFormInput
              type="text"
              name='firstName'
              id="exampleFormControlInput1"
              placeholder="John"
              autoComplete='off'
              required
              onChange={handleChange}
            />
          </InputDiv>
          <InputDiv>
            <Label>Last name</Label>
            <CFormInput
              type="text"
              name='lastName'
              id="exampleFormControlInput1"
              placeholder="Doe"
              autoComplete='off'
              required
              onChange={handleChange}
            />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv>
            <Label>Profile image (recommended)</Label>
            <CFormInput
              type="file"
              name='profilePicture'
              id="exampleFormControlInput1"
              autoComplete='off'
              accept="image/png, image/gif, image/jpeg"
              onChange={handleProfileImage}
            />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv>
            <Label>Gender</Label>
            <Select placeholder="Select gender" options={gender} onChange={handleGenderChange} />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv style={{ flex: 2 }}>
            <Label>Mobile</Label>
            <CFormInput
              type="text"
              name='mobile'
              id="exampleFormControlInput1"
              autoComplete='off'
              placeholder='E.g 63670XXX90'
              required
              onChange={handleChange}
            />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv style={{ gap: "0px" }}>
            <Label>Current location</Label>
            <SmallInfo> Please enter the location where you currently live </SmallInfo>
            <Select placeholder="Select city" options={cities} onChange={handlecurrentCityChange} />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv style={{ gap: "0px" }}>
            <Label>Second location (Optional)</Label>
            <SmallInfo>
              If you study in one location (say Delhi) but are from a different location (say Chennai), fill this to be considered for opportunities in both</SmallInfo>
            <Select placeholder="Second city" options={cities} onChange={handleSecondCityChange} />
          </InputDiv>
        </InputRow>
        <CButton color="primary" type='submit'>Save</CButton>
      </Form>
      <Toaster />
    </Page>
  )
}

export default Personal