const Student = require("../models/student.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const register = async (req, res) => {

    if (!req.body.email || !req.body.password || !req.body.registrationNumber) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields',
        });
    }


    const { email, password, registrationNumber } = req.body;
    try {
        const isExists = await Student.findOne({ email });
        if (isExists) {

            return res.status(409).json({
                success: false,
                message: 'Student with this email already exists',
            });
        }
        const isExistsWithRegistraionNumber = await Student.findOne({ registrationNumber });
        if (isExistsWithRegistraionNumber) {
            return res.status(409).json({
                success: false,
                message: 'Student with this registration number already exists',
            });
        }

        const salt = 10;
        const hash = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            email,
            password: hash,
            registrationNumber,
        });


        await newStudent.save();

        const token = jwt.sign({
            email: newStudent.email
        }, process.env.JWT_SECRET_EMAIL, {
            expiresIn: "30m"
        });


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'next.tsx@gmail.com',
                pass: process.env.MAIL_SECRET
            }
        });
        const mailOptions = {
            from: 'next.tsx@gmail.com',
            to: newStudent.email,
            subject: 'Please verify your email address!',
            text: `Click this link to verify your email address! 
            <a href="http://localhost:8000/auth/verify/${token}">Click here</a>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong try again!',
                });
            } else {
                return res.status(201).json({
                    success: true,
                    message: 'Check your email to verify!',
                });
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error occurred',
        });
    }
};
const login = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields',
        });
    }

    const { email } = req.body;

    try {
        const isUser = await Student.findOne({ email });
        if (!isUser) {
            return res.status(401).json({ message: 'User not found!', success: false });
        }

        // check if verified
        if (!isUser.verified) {
            return res.status(401).json({ message: 'Please verify your email!', success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, isUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials', success: false });
        }

        const payload = { id: isUser._id, role: isUser.role };
        const { password, personalDetails, educationalDetails, skills, workSamples
            , ...others } = isUser._doc

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10d' }, (err, token) => {
            if (err) throw err;
            res.status(201).cookie('poornima', token, {
                maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
            }).json({
                messsage: "User logged in successfully",
                success: true,
                user: others
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error occurred',
        });
    }
};
const logout = async (req, res) => {
    try {
        res.clearCookie('poornima').json({
            success: true,
            message: 'User logged out successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error occurred',
        });
    }
};
const authenticateUser = async (req, res) => {
    const userId = req?.user?.id;
    if (!userId) {
        return res.status(401).json({ isAuthenticated: false });
    }
    const user = await Student.findById(userId)
    if (!user) {
        return res.status(401).json({ isAuthenticated: false });
    }
    return res.status(201).json({ isAuthenticated: true, role: user.role });

}
const verifyEmail = async (req, res) => {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_EMAIL);
    const { iat, exp, email } = decoded;

    if (iat > exp) {
        return res.status(404).send("Token expired!");
    }

    const student = await Student.findOneAndUpdate({ email: email }, {
        $set: {
            verified: true
        }
    });
    return res.status(201).redirect("http://localhost:5173/");



}


module.exports = { register, login, logout, authenticateUser, verifyEmail };



