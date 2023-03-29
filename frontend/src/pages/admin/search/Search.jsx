import Student from "../student/Student"
import Title from "../title/Title"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { motion } from "framer-motion"
import "./Search.scss"
import FilterMenu from "../filter menu/FilterMenu";
import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { makeRequest } from "../../../axios.jsx"
import { useNavigate } from "react-router-dom";


const Search = () => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState();
    const [users, setUsers] = useState([])




    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const res = await makeRequest.get("admin/user", {
                    params: params
                })
                setUsers(res.data.users);
            } catch (error) {
                console.error(error.response.data.message)
            }
            setLoading(false);
        }
        fetchUsers()
    }, [params])




    return (
        <>
            <div className="search">
                <div className="top">
                    <h1>Admin</h1>
                    <div className="buttons">
                        <motion.button onClick={() => setMenuOpen(!menuOpen)} className="bg-colored" whileTap={{ scale: 0.8 }}>Add filter
                            <AddRoundedIcon fontSize="small" />
                        </motion.button>
                    </div>
                </div>
                {
                    loading ? <LinearProgress /> : ""
                }
                <div className="bottom">
                    <Title />
                    {
                        users.map(user => (
                            <Student data={user} key={user._id} />
                        ))
                    }
                </div>
                <FilterMenu open={menuOpen} setParams={setParams} />
            </div>
        </>
    )
}

export default Search