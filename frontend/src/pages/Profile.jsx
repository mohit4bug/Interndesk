import styled from "styled-components"
import "./Profile.scss";
import { makeRequest } from "../axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast"

const Container = styled.section`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
    padding: 50px 10px;
`
const DetailsContainer = styled.div`
    border-radius: 10px;
    height: auto;
    width: 600px;
    overflow: hidden;
    @media (max-width: 610px) {
        width: 95%;
    }
`
const Top = styled.div`
    height: 50px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
`
const DetailHeading = styled.h4``
const Bottom = styled.div`
    min-height: ${props => props.height};
    width: 100%;
    border-radius: 15px;
    background-color: #ececec;
    border: 1px solid #bbbbbb;
`

const Profile = () => {

    const [open, setOpen] = useState(false);

    const [userData, setsUserData] = useState()
    const [skills, setSkills] = useState([])
    const { id } = useParams();

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const changePasswordFunc = async () => {
        try {
            const res = await makeRequest.put("/user/password", {
                oldPassword: oldPassword,
                newPassword: newPassword
            })
            toast.success(res.data.message)
            window.location.reload();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await makeRequest.get(`/user/${id}`);
                setsUserData(res.data.user)
                setSkills(res.data.user.skills?.skills)
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        fetchUser();
    }, [])


    return (
        <Container>
            <DetailsContainer>
                <Top><DetailHeading>Profile</DetailHeading></Top>
                <Bottom height="300px">
                    <div className="profile">
                        <div className="left">
                            <img className="profileImg" src={`http://localhost:8000/public/${userData?.personalDetails?.profileImage}`} />
                            <button>Remove</button>
                        </div>
                        <div className="right">
                            <input type="text" className="readable" defaultValue={userData?.registrationNumber} name="registrationNumber" readOnly />
                            {/* flex */}
                            <div className="flexDiv">
                                <input type="text" className="readable" defaultValue={userData?.personalDetails?.firstName} name="firstName" readOnly placeholder="First name" />
                                <input type="text" className="readable" defaultValue={userData?.personalDetails?.lastName} name="lastName" readOnly placeholder="Last name" />
                            </div>
                            <input type="text" className="readable" name="address" readOnly defaultValue={userData?.personalDetails?.currentLocation} placeholder="Current city" />
                            <input type="text" className="readable" name="mobile" readOnly defaultValue={userData?.personalDetails?.mobile} placeholder="Mobile" />
                        </div>
                    </div>
                </Bottom>
            </DetailsContainer>
            <DetailsContainer>
                <Top><DetailHeading>Account</DetailHeading></Top>
                <Bottom height="300px">
                    <div className="account">
                        <div className="accountItem">
                            <div className="left">
                                <label htmlFor="email">Email</label>
                                <p>{userData?.email}</p>
                            </div>
                            <div className="right">
                                <button disabled>Change</button>
                            </div>
                        </div>
                        <div className="accountItem">
                            <div className="left">
                                <label htmlFor="email">Password</label>
                                {
                                    open ? <div className="passwordChangeDiv">
                                        <input placeholder="Current Password" type="password" onChange={(e) => setOldPassword(e.target.value)} />
                                        <input placeholder="New Password" type="password" onChange={(e) => setNewPassword(e.target.value)} />
                                    </div> : <p>******</p>
                                }

                            </div>
                            <div className="right">
                                <button onClick={() => setOpen(!open)}>{open ? "Cancel" : "Change"}</button>
                            </div>
                        </div>
                        <div className="accountItem">
                            <div className="left">
                                <label htmlFor="email">Active Status</label>
                                <p>Active</p>
                            </div>
                            <div className="right">
                                <button disabled>Change</button>
                            </div>
                        </div>
                        {
                            open && <button className="saveBtn" onClick={changePasswordFunc}>Save</button>
                        }

                    </div>
                </Bottom>
            </DetailsContainer>
            <DetailsContainer>
                <Top><DetailHeading>Skills</DetailHeading></Top>
                <Bottom height="150px">
                    <div className="skills">
                        {
                            skills.length > 0 ? skills?.map((s, index) => (
                                <div className="skill" key={index}>{s}</div>
                            )) : <div>Note: Your skills will be visible after you fill them.</div>
                        }
                    </div>
                </Bottom>
            </DetailsContainer>
            <Toaster />
        </Container>
    )
}

export default Profile
