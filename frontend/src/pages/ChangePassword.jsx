import { CButton, CFormInput } from '@coreui/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import {toast,Toaster} from "react-hot-toast"

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


const ChangePassword = () => {

    const [inputs, setInputs] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    return (
        <Page>
            <Form>
                <FormHeading>Change your password</FormHeading>
                <InputDiv>
                    <Label>Old password</Label>
                    <CFormInput
                        type="password"
                        name='oldPassword'
                        id="1"
                        autoComplete='off'
                        required
                        onChange={handleChange}
                    />
                </InputDiv>
                <InputDiv>
                    <Label>New password</Label>
                    <CFormInput
                        type="password"
                        name='password'
                        id="2"
                        autoComplete='off'
                        required
                        onChange={handleChange}
                    />
                </InputDiv>
                <InputDiv>
                    <Label>Retype password</Label>
                    <CFormInput
                        type="password"
                        name='confirmPassword'
                        id="3"
                        autoComplete='off'
                        required
                        onChange={handleChange}
                    />
                </InputDiv>
                <CButton color="primary" type='submit'>Update</CButton>
            </Form>
        </Page>
    )
}

export default ChangePassword