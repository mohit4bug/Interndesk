import React, { useState } from 'react'
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import { makeRequest } from '../axios'


const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;
`
const Form = styled.form`
    border: 1px solid lightgray;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 30px;
    width: 500px;

    @media (max-width:510px) {
        width: 100%;
        height: 100%;
        border: none;
    }
`
const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
`
const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 100%;
`
const Label = styled.label`
    font-size: 15px;
    font-weight: 500;
`
const Input = styled.input`
    border: 1px solid lightgray;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding-left: 10px;
    font-weight: 500;
    transition: all 0.2s cubic-bezier(0,0,0,0);
    outline: 1px solid transparent;
    

    &:hover , &:focus{
        border: 1px solid #321fdb;
        outline: 1px solid #321fdb;
    }
`
const Button = styled.button`
    height: 40px;
    width: 100%;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    background: #321fdb;
    border: none;
    outline: none;
    font-size: 16px;
    cursor: pointer;
`
const P = styled.p`
    font-weight: 500;
    font-size: 15px;
`







const Register = () => {

  const navigate = useNavigate();

  // Inputs 
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    registrationNumber: '',
  })
  const [loading, setLoading] = useState(false);

  // Handling changes
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  // Handle submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await makeRequest.post("/auth/register", inputs);
      toast.success(res.data.message)

      if (res.data) {
        setTimeout(() => {
          navigate("/", { state: { email: inputs.email, password: inputs.password } });
        }, 3000);
      }


    } catch (error) {
      toast.error(error.response.data.message)
    }

    setLoading(false);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FlexDiv>
          <InputDiv>
            <Label htmlFor='registrationNumber'>Registration Number</Label>
            <Input
              autoComplete='off'
              onChange={handleChange}
              id='registrationNumber'
              name='registrationNumber'
              type="text"
              placeholder='2021PUSCEXXX10190'
              required />
          </InputDiv>
        </FlexDiv>
        <FlexDiv>
          <InputDiv>
            <Label htmlFor='eduEmail'>Email</Label>
            <Input
              autoComplete='off'
              onChange={handleChange}
              id='eduEmail'
              name='email'
              type="email"
              placeholder='RegNo@poornima.edu.in'
              required />
          </InputDiv>
        </FlexDiv>
        <InputDiv>
          <Label htmlFor='password'>Password</Label>
          <Input
            autoComplete='off'
            onChange={handleChange}
            id='password'
            name="password"
            type="password"
            placeholder='Must be atleast 8 characters'
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            title='Minimum eight characters, at least one letter, one number and one special character'
          />
        </InputDiv>
        <InputDiv>
          <Button type='submit' disabled={loading}>{loading ? "Loading..." : "Sign up"}</Button>
        </InputDiv>
        <P>Already registerd? <Link to="/ ">Login</Link></P>
      </Form>
      <Toaster />
    </Container>
  )
}
export default Register