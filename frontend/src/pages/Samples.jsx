import { CButton, CFormInput } from '@coreui/react'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
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
const Label = styled.label`
    font-weight: 500;
    font-size: 16px;
`



const Samples = () => {

  const [inputs, setInputs] = useState({
    blog: "",
    github: "",
    linkedIn: "",
  })



  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await makeRequest.post("/details/worksamples", {
        blog: inputs.blog,
        github: inputs.github,
        linkedIn: inputs.linkedIn,
      })
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <FormHeading>Work samples</FormHeading>
        <InputDiv>
          <Label>Blog link</Label>
          <CFormInput
            type="url"
            name='blog'
            id="exampleFormControlInput1"
            placeholder='http://myblog.com'
            autoComplete='off'
            required
            onChange={handleChange}
          />
        </InputDiv>
        <InputDiv>
          <Label>Github profle</Label>
          <CFormInput
            type="url"
            name='github'
            id="exampleFormControlInput1"
            placeholder='http://github.com/my_profile'
            autoComplete='off'
            required
            onChange={handleChange}
          />
        </InputDiv>
        <InputDiv>
          <Label>Linked profile</Label>
          <CFormInput
            type="url"
            name='linkedIn'
            id="exampleFormControlInput1"
            placeholder='https://linkedin.com/in/my_profile'
            autoComplete='off'
            required
            onChange={handleChange}
          />
        </InputDiv>
        <CButton color="primary" type='submit'>Save</CButton>
      </Form>
      <Toaster />
    </Page>
  )
}

export default Samples