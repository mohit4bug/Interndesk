const Student = require("../models/student.model")

const fetchStudent = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
        }
        const { name, registrationNumber, email, firstPreference, secondPreference, currentLookingFor, currentLocation } = req.query;
        const query = {};

        if (name) {
            query.$or = [{ "personalDetails.firstName": { $regex: name, $options: "i" } }, { "personalDetails.lastName": { $regex: name, $options: "i" } }];
        }

        if (registrationNumber) {
            query.registrationNumber = { $regex: registrationNumber, $options: "i" };
        }

        if (email) {
            query.email = { $regex: email, $options: "i" };
        }

        if (firstPreference) {
            query["preferences.interests.firstPreference"] = { $regex: firstPreference, $options: "i" };
        }

        if (secondPreference) {
            query["preferences.interests.secondPreference"] = { $regex: secondPreference, $options: "i" };
        }

        if (currentLookingFor) {
            query["preferences.currentLookingFor"] = currentLookingFor;
        }
        if (currentLocation) {
            query["personalDetails.currentLocation"] = currentLocation;
        }


        const students = await Student.find(query);

        return res.status(200).json({ success: true, users: students });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    fetchStudent
};