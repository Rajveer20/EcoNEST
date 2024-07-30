const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
const getRooms = require("./routes/GetRooms");
const auth = require('./middleware/auth');
const {login, getsession, logout, gettoken} = require('./routes/Login');
const mongoDB = require("./db")();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json()); // Parse JSON bodies

//Public Routes
app.use(cors({origin: 'http://localhost:5173', // Update with your frontend URL
credentials: true,
optionsSuccessStatus: 200}))
app.use('/api', require('./routes/CreateUser'))
app.use('/api', require('./routes/GetRooms'))
app.use('/api', require('./routes/Login'))

//Private Routes
app.use('/api',require('./routes/CreateRoom'))





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
