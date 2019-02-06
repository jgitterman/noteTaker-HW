const router = require("express").Router();
const connection = require("../../db/connection");

router.get("/", function (req, res) {
  connection.query("SELECT * FROM notes", function (err, dbNotes) {
    if (err) throw err

    res.json(dbNotes)
  })
});

router.post("/", function (req, res) {
  connection.query("INSERT INTO notes SET ?", [req.body], function(err, result) {
    if (err) throw err

    console.log(req.body)
    res.json(result)
  })
});

router.put("/:id", function (req, res) {
  connection.query("UPDATE notes SET ? WHERE id = ?", [req.body, req.params.id], function (err, result) {
    if (err) throw err

    res.json(result)
  })
});

router.delete("/:id", function (req, res) {
  connection.query("DELETE From notes WHERE id = ?", req.params.id, function (err, dbNotes) {
    if (err) throw err

    res.json(dbNotes)
  })
});

module.exports = router;