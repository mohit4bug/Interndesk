import { CButton } from '@coreui/react'
import React from 'react'
import { toast, Toaster } from "react-hot-toast"


import styled from 'styled-components'

const Page = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const Heading = styled.h1`
    font-weight: 400;
`

const Verify = () => {


    return (
        <Page>
            <Heading>Please verify your email</Heading>
            <CButton color="primary" disabled>Resend verification</CButton>
            <Toaster />
        </Page>
    )
}

export default Verify