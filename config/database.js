require("dotenv").config();
const mongoose = require('mongoose')


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOCOMPASS_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connection Succeeded');
}).catch((err) => {
    console.log('Error in DB connection' + err);
})


