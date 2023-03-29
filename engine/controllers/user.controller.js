const bcrypt = require("bcrypt")
const Student = require("../models/student.model")

const fetchUser = async (req, res) => {
    const userId = req.params.userId;
    const { id, role } = req.user;

    if (id !== userId && role !== 'admin') {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const user = await Student.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const changePassword = async (req, res) => {
    const { id } = req.user;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    try {

        if (oldPassword === newPassword) {
            return res.status(400).json({ success: false, message: 'New password must be different from old password!' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" })
        }

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Please fill both fields to verify!' });
        }

        const user = await Student.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isValid = await bcrypt.compare(oldPassword, user.password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Old password is not correct' });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        await user.save();
        res.status(200).json({ success: true, message: "Password updated succesfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {
    fetchUser,
    changePassword
}