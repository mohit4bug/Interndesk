const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    try {
        const token = req.cookies.poornima
        if (!token) return res.status(400).json({
            message: "No token provided",
            success: false
        })

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return res.status(404).json({
                message: "Unauthorized",
                success: false
            })
            req.user = payload
        })

        next()

    } catch (error) {
        res.status(404).json({
            message: "Unauthorized",
            success: false
        })
    }
}

module.exports = { verify }