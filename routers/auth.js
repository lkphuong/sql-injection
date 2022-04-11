const router = require("express").Router();
const pool = require("../pool");

router.post("/login", (req, res) => {
  const data = { ...req.body };
  pool.query(
    `select * from users where username = '${data.username}' and password = '${data.password}' limit 1`,
    (error, results) => {
      if (error) {
        throw error;
      }
      // res.status(200).json(results);
      if (results.rowCount > 0) {
        return res
          .status(200)
          .send({ message: "Đăng nhập thành công", data: {
            id: results.rows[0].id,
            username: results.rows[0].username
          } });
      }
      res.status(400).send({ message: "Sai tài khoản hoặc mật khẩu" });
    }
  );
});

router.post("/register", (req, res) => {
  const data = { ...req.body };
  pool.query(
    `insert into users (username, password) values ('${data.username}', '${data.password}')`,
    (error, results) => {
      if(error) {
        res.status(400).send({message: error})
      }
      res.status(201).send({message: "Đăng kí thành công"})
    }
  )
});

router.get("/profile", (req, res) => {
  const data = { ...req.query };
  pool.query(
    `select * from users where username = '${data.username}' and id = '${data.id}' limit 1`,
    (error, results) => {
      if (error) {
        throw error;
      }
      // res.status(200).json(results);
      if (results.rowCount > 0) {
        return res
          .status(200)
          .send({ message: "Thành công", data: results.rows});
      }
      res.status(400).send({ message: "Không có quyền xem" });
    }
  );
})

module.exports = router;
