import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import BuildIcon from '@mui/icons-material/Build';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import styled from "styled-components"
import { CTooltip } from '@coreui/react';

const TrackerContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    overflow: scroll;
    padding-top: 50px;
    
    @media only screen and (max-width: 450px) {
        justify-content:flex-start;
        padding: 0px 20px;
        padding-top:50px;
    }
`
const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-width: 100px;
`
const Logo = styled.span`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: white;
    background: #321fdb;
    cursor: pointer;
`





const Tracker = () => {


    return (
        <TrackerContainer>
            {/* 1 */}
            <Item>
                <CTooltip
                    content="Preferences"
                    placement="bottom"
                >
                    <Link to="/preferences">
                        <Logo>
                            <TuneRoundedIcon />
                        </Logo>
                    </Link>
                </CTooltip>
            </Item>
            {/* 2 */}


            <Item>
                <CTooltip
                    content="Personal"
                    placement="bottom"
                >

                    <Link to="/personal">
                        <Logo>
                            <PersonIcon />
                        </Logo>
                    </Link>
                </CTooltip>
            </Item>
            {/* 3 */}
            <Item>
                <CTooltip
                    content="Education"
                    placement="bottom"
                >
                    <Link to="/education">
                        <Logo>
                            <SchoolIcon />
                        </Logo>
                    </Link>
                </CTooltip>
            </Item>
            {/* 4 */}
            <Item>
                <CTooltip
                    content="Skills"
                    placement="bottom"
                >
                    <Link to="/skills">
                        <Logo>
                            <BuildIcon />
                        </Logo>
                    </Link>
                </CTooltip>
            </Item>
            {/* 5 */}
            <Item>
                <CTooltip
                    content="Work samples"
                    placement="bottom"
                >
                    <Link to="/samples">
                        <Logo>
                            <ImportContactsRoundedIcon />
                        </Logo>
                    </Link>
                </CTooltip>
            </Item>

        </TrackerContainer>
    )
}

export default Tracker