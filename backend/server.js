require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/database")

// Connect to the database
connectDB()





// create a route
app.get("/", (req, res) => {
    res.send("Hello World")
})







//create a server

app.listen(8080, () => {
    console.log(`Server is running on port ${8080}`)
})