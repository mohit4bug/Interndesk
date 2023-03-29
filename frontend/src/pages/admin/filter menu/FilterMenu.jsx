import "./FilterMenu.scss"
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import { motion } from "framer-motion"
import { useState } from "react";

const course = [
    "BCA",
    "MCA",
    "BTECH",
    "MTECH",
    "BBA",
    "MBA",
]

const FilterMenu = ({ open, setParams }) => {



    const [filters, setFilters] = useState({
        currentLookingFor: "",
        firstPreference: "",
        secondPreference: "",
        registrationNumber: "",
        email: "",
        currentLocation: "",
        name: "",
    })
    const onFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const onFilterSubmit = (e) => {
        e.preventDefault();
        setParams(filters);
        // console.log(filters);
    }




    return (
        <form className="filter-menu" style={{ right: `${open ? "0" : "-400"}px` }} onSubmit={onFilterSubmit}>
            <div className="filter-top">
                <h1 className="menu-heading">Edit filters</h1>
                <span className="reset-filter" onClick={() => setFilters({})}>
                    <RotateLeftIcon fontSize="small" />
                </span>
            </div>
            <div className="filter-bottom">
                {/* Looking for section */}
                <div className="filter-section">
                    <h1 className="filter-heading">Looking for</h1>
                    <div className="filter-content">
                        <div className="single-filter-content">
                            <input type="radio" name="currentLookingFor" value="Internships" id="i" onChange={onFilterChange} />
                            <label htmlFor="i">Internships</label>
                        </div>
                        <div className="single-filter-content">
                            <input type="radio" name="currentLookingFor" value="Jobs" id="j" onChange={onFilterChange} />
                            <label htmlFor="j">Jobs</label>
                        </div>
                    </div>
                </div>
                {/* Preffered locations section */}
                <div className="filter-section">
                    <h1 className="filter-heading">User Interests</h1>
                    <div className="filter-content-locations">
                        <input className="preferred-locations-input" name="firstPreference" type="text" placeholder="1st Preference" onChange={onFilterChange} />
                        <input className="preferred-locations-input" name="secondPreference" type="text" placeholder="2nd Preference" onChange={onFilterChange} />
                    </div>
                </div>
                <div className="filter-section">
                    <h1 className="filter-heading">Details</h1>
                    <div className="filter-content-status">
                        <div className="filter-content-locations">
                            <input className="preferred-locations-input" name="registrationNumber"
                                type="text" placeholder="Registration number" onChange={onFilterChange} />
                            <input className="preferred-locations-input" name="email" type="email"
                                placeholder="Email" onChange={onFilterChange} />
                            <input className="preferred-locations-input" name="name" type="text"
                                placeholder="First name" onChange={onFilterChange} />
                            <input className="preferred-locations-input" name="currentLocation" type="text"
                                placeholder="CurrentLocation" onChange={onFilterChange} />
                        </div>
                    </div>
                </div>
            </div>
            <motion.button className="bg-colored" whileTap={{ scale: 0.8 }}>Search
                <ZoomInRoundedIcon fontSize="small" />
            </motion.button>
        </form>
    )
}

export default FilterMenu