const express = require("express");
require("./db");
const user = require("./user");
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello server");
});

app.post("/user-api", async (req, resp) => {
  let data = await user(req.body);
  data = await data.save();
  // resp.send(data);

  if (data) {
    resp.status(200).send(data);
  } else {
    resp.status(500).send("Record not save");
  }
});

app.get("/user-api", async (req, resp) => {
  let data = await user.find();
  if (data) {
    resp.status(200).send(data);
  } else resp.status(500).send("Data not found");
});

app.delete("/user-api/:_id", async (req, resp) => {
  let data = await user.deleteOne({ _id: req.params._id });
});

app.put("/user-api/:_id", async (req, resp) => {
  let data = await user.updateOne(
    { _id: req.params._id },
    {
      $set: req.body,
    }
  );
  resp.send(data);
});

app.listen(PORT, () => {
  console.log(`server is running at port number ${PORT}`);
});
