const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors')
app.use(cors())
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config()
const pool = require('./pool')
app.use(express.static('views'))
const authRouter = require('./routers/auth')
const todoRouter = require('./routers/todo')
app.use('/auth', authRouter)
app.use('/todo', todoRouter)

app.get("/todo", (req, res) => {
  res.sendfile(__dirname + '/views/todo.html');
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
