const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");


dotenv.config({ path: "./env/.env" });
const app = express();
const PORT = process.env.PORT || 3000;


app.use('/public', express.static('public'))
app.use(cors({ origin: "http://localhost:5173", credentials: true, methods: ["PUT", "GET", "POST", "DELETE", "PATCH"] }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth.route"))
app.use("/details", require("./routes/details.route"))
app.use("/user", require("./routes/user.route"))
app.use("/admin", require("./routes/admin.route"))


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
require("./db/mongo");