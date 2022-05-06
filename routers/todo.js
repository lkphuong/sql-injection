const router = require("express").Router();
const pool = require("../pool");

router.post("/createTodo", (req, res) => {
  const data = { ...req.body };
  console.log(`insert into todos (user_id, title) values ('${data.user_id}','${data.title}')`);
  pool.query(
    `insert into todos (user_id, title) values ('${data.user_id}','${data.title}')`,
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ message: "Thất bại:" });
      }
      res.status(201).send({ message: "Thành công", data: result.rows });
    }
  );
});

router.get("/getTodoById/:id", (req, res) => {
  const data = { ...req.params, ...req.body };
  console.log(
    `select * from todos where id = '${data.id}' and user_id = '${data.user_id}'`
  );
  pool.query(
    `select * from todos where id = ${data.id} and user_id = ${data.user_id}`,
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ message: "Thất bại" });
      }
      if (result.rowCount > 0) {
        return res
          .status(200)
          .send({ message: "Thành công", data: result.rows });
      }
      res.status(404).send({ message: "Không tìm thấy" });
    }
  );
});

router.post("/getMyTodos", (req, res) => {
  const data = req.body;
  console.log( `select * from todos where user_id = ${data.user_id}`)
  pool.query(
    `select * from todos where user_id = ${data.user_id}`,
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ message: "Thất bại" });
      }
      if (result.rowCount > 0) {
        return res
          .status(200)
          .send({ message: "Thành công", data: result.rows });
      }
      res.status(200).send({ message: "Thành công", data: [] });
    }
  );
});

router.put("/updateTodoById/:id", (req, res) => {
  const data = { ...req.body, ...req.params };
  console.log( `update todos set title = '${data.title}', user_id = '${data.user_id}' where id = ${data.id}`)
  pool.query(
    `update todos set title = '${data.title}', user_id = '${data.user_id}' where id = ${data.id}`,
    (error, result) => {
      if (error) {
        return res.status(400).send("Thất bại");
      }
      if (result.rowCount > 0) {
        return res.status(200).send({ message: "Cập nhật thành công" });
      }
      res.status(404).send({ message: "Không tìm thấy" });
    }
  );
});

router.delete("/deleteTodoById", (req, res) => {
    const data = {...req.params, ...req.body}
    console.log(`delete from todos where id = ${data.id} and user_id = ${data.user_id}`)
    pool.query(`delete from todos where id = ${data.id} and user_id = ${data.user_id}`,
    (error, result) => {
        if(error) {
          console.log(error)
            return res.status(400).send({message: "Thất bại"})
        }
        if(result.rowCount > 0) {
            return res.status(200).send({message: "Xóa thành công"})
        }
        res.status(404).send({message: "Không tìm thấy"})
    }
    )
})

module.exports = router;
