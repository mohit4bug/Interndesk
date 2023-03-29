const Student = require("../models/student.model")

const updatePreferences = async (req, res) => {
    const { currentLookingFor, types, interests, preferredLocations } = req.body;
    const { id } = req.user;

    try {
        const user = await Student.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!currentLookingFor || !types || !interests || !preferredLocations) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields' });
        }

        if (currentLookingFor) {
            user.preferences.currentLookingFor = currentLookingFor;
        }

        if (types) {
            user.preferences.types = types;
        }

        if (interests) {
            const { firstPreference, secondPreference, thirdPreference } = interests;
            if (firstPreference) {
                user.preferences.interests.firstPreference = firstPreference;
            }
            if (secondPreference) {
                user.preferences.interests.secondPreference = secondPreference;
            }
            if (thirdPreference) {
                user.preferences.interests.thirdPreference = thirdPreference;
            }
            if (thirdPreference || firstPreference || secondPreference) {
            }
            else {
                return res.status(400).json({ success: false, message: 'Please fill all atlease 1 interest' });
            }
        }
        if (preferredLocations.length < 1) {
            return res.status(400).json({ success: false, message: 'Please fill all atlease 1 location' });
        }
        if (preferredLocations) {
            user.preferences.preferredLocations = preferredLocations;
        }
        user.preferences.isFilled = true;

        await user.save();

        res.status(200).json({ success: true, message: 'Preferences updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
const updatePersonalDetails = async (req, res) => {
    const { firstName, lastName, gender, mobile, currentLocation, secondLocation } = req.body;
    const { id } = req.user;
    const profileImage = req.file.filename;



    try {
        const user = await Student.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!firstName || !lastName || !gender || !mobile || !currentLocation) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields' });
        }

        user.personalDetails.firstName = firstName;
        user.personalDetails.lastName = lastName;
        user.personalDetails.profileImage = profileImage;
        user.personalDetails.gender = gender;
        user.personalDetails.mobile = mobile;
        user.personalDetails.currentLocation = currentLocation;
        user.personalDetails.secondLocation = secondLocation;
        user.personalDetails.isFilled = true;

        await user.save();

        res.status(200).json({ success: true, message: 'Personal details updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
const updateWorkSamples = async (req, res) => {
    const { blog, github, linkedIn } = req.body;
    const { id } = req.user;

    try {
        const user = await Student.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!blog && !github && !linkedIn) {
            return res.status(400).json({ success: false, message: 'At least one work sample is required to update' });
        }

        if (blog) {
            user.workSamples.blog = blog;
        }

        if (github) {
            user.workSamples.github = github;
        }

        if (linkedIn) {
            user.workSamples.linkedIn = linkedIn;
        }
        user.workSamples.isFilled = true;

        await user.save();

        res.status(200).json({ success: true, message: 'Work samples updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
const updateSecondaryDetails = async (req, res) => {
    const { schoolName, percentage, medium, board } = req.body;
    const { id } = req.user;
    const marksheetImage = req.file.filename;
    try {
        const user = await Student.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!schoolName || !percentage || !medium || !board || !marksheetImage) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields' });
        }

        user.educationalDetails.secondary.schoolName = schoolName;
        user.educationalDetails.secondary.percentage = percentage;
        user.educationalDetails.secondary.medium = medium;
        user.educationalDetails.secondary.board = board;
        user.educationalDetails.secondary.marksheetImage = marksheetImage;
        user.educationalDetails.isFilled = true;

        await user.save();

        res.status(200).json({ success: true, message: 'Secondary details updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
const updateSeniorSecondaryDetails = async (req, res) => {
    const { schoolName, percentage, medium, board, stream } = req.body;
    const { id } = req.user;

    const marksheetImage = req.file.filename;
    try {
        const user = await Student.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!schoolName || !percentage || !medium || !board || !marksheetImage || !stream) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields' });
        }

        user.educationalDetails.seniorSecondary.schoolName = schoolName;
        user.educationalDetails.seniorSecondary.stream = stream;
        user.educationalDetails.seniorSecondary.percentage = percentage;
        user.educationalDetails.seniorSecondary.medium = medium;
        user.educationalDetails.seniorSecondary.board = board;
        user.educationalDetails.seniorSecondary.marksheetImage = marksheetImage;
        user.educationalDetails.isFilled = true;

        await user.save();

        res.status(200).json({ success: true, message: 'Senior secondary details updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
const updateGraduation = async (req, res) => {
    const { graduationStatus, startYear, endYear, course, specialization, department, performanceScale } = req.body;
    const { id } = req.user;

    try {
        const user = await Student.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!graduationStatus || !startYear || !endYear || !course || !specialization || !department || !performanceScale) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields' });
        }

        if (graduationStatus) {
            user.educationalDetails.graduation.graduationStatus = graduationStatus;
        }

        if (startYear) {
            user.educationalDetails.graduation.startYear = startYear;
        }

        if (endYear) {
            user.educationalDetails.graduation.endYear = endYear;
        }

        if (course) {
            user.educationalDetails.graduation.course = course;
        }

        if (specialization) {
            user.educationalDetails.graduation.specialization = specialization;
        }

        if (department) {
            user.educationalDetails.graduation.department = department;
        }

        if (performanceScale) {
            user.educationalDetails.graduation.performanceScale = performanceScale;
        }
        user.educationalDetails.isFilled = true;

        await user.save();

        res.status(200).json({ success: true, message: 'Graduation details updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
const updatePostGraduation = async (req, res) => {
    const { graduationStatus, startYear, endYear, course, specialization, department, performanceScale } = req.body;
    const { id } = req.user;

    try {
        const user = await Student.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!graduationStatus || !startYear || !endYear || !course || !specialization || !department || !performanceScale) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields' });
        }

        if (graduationStatus) {
            user.educationalDetails.postGraduation.graduationStatus = graduationStatus;
        }

        if (startYear) {
            user.educationalDetails.postGraduation.startYear = startYear;
        }

        if (endYear) {
            user.educationalDetails.postGraduation.endYear = endYear;
        }

        if (course) {
            user.educationalDetails.postGraduation.course = course;
        }

        if (specialization) {
            user.educationalDetails.postGraduation.specialization = specialization;
        }

        if (department) {
            user.educationalDetails.postGraduation.department = department;
        }

        if (performanceScale) {
            user.educationalDetails.postGraduation.performanceScale = performanceScale;
        }
        user.educationalDetails.isFilled = true;
        await user.save();

        res.status(200).json({ success: true, message: 'Post graduation details updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
const updateSkills = async (req, res) => {
    const { skills } = req.body;
    const { id } = req.user;

    try {
        const user = await Student.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!skills || skills.length < 1) {
            return res.status(400).json({ success: false, message: 'Please provide at least one skill' });
        }

        user.skills.skills = skills;
        user.skills.isFilled = true;
        await user.save();

        res.status(200).json({ success: true, message: 'Skills updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};



module.exports = {
    updatePreferences,
    updatePersonalDetails,
    updateWorkSamples,
    updateSecondaryDetails,
    updateSeniorSecondaryDetails,
    updateGraduation,
    updatePostGraduation,
    updateSkills
}