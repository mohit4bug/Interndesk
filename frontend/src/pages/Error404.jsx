import styled from "styled-components"


const Container = styled.section`
    height: 100vh;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Button = styled.button`
    height: 40px;
    width: 100px;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    background: #321fdb;
    border: none;
    outline: none;
    font-size: 16px;
    cursor: pointer;
`
const InnerContainer = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;

    @media (max-width:510px) {
        width: 95%;
        padding: 0px 25px;
        text-align: center;
    }
`
const Text = styled.p`
    font-size: 1rem;
    font-weight: 500;
`
const Li = styled.li`
    display: flex;
`

const Error404 = () => {
    return (
        <Container>
            <InnerContainer>
                <h1>Error 404, Page not found!</h1>
                <p>Contact the developer :)</p>
                <a href="https://github.com/mohit4bug">Github</a>
                <a href="https://www.linkedin.com/in/mohit4bug/">LinkedIn</a>
            </InnerContainer>
        </Container>
    )
}

export default Error404
