const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Poornima"
}).then(() => console.log(`DB: ${process.env.MONGO_URL}`))
    .catch((e) => console.log("Error connecting " + e.message))