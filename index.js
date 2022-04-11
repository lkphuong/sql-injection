const express = require("express");
const app = express();
const port = 3000;
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config()
const pool = require('./pool')

const authRouter = require('./routers/auth')
const todoRouter = require('./routers/todo')
app.use('/auth', authRouter)
app.use('/todo', todoRouter)


// app.get("/", (req, res) => {
//    pool.query('SELECT * FROM users ', (error, results) => {
//     if (error) {
//       throw error
//     }
//     res.status(200).json(results.rows)
//   })
// });

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
