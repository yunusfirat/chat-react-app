import express from "express";
import Data from "./data.js";
import cors from "cors";
const app = express();


const PORT = process.env.PORT || 5000;


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors());

app.put("/lists/:name", (req,res) => {
  const found = Data.some((list) => list.name === req.params.name);
  if(found){
      const upList = req.body;
      Data.forEach((list) => {
          if(list.name === req.params.name ) {
              list.name = upList.name ? upList.name : list.name;
              list.members = upList.members ? upList.members : list.members;
              res.json({ msg: "list updated", list });
          }
      });
  }else {
      res.status(400).json({ msg: `No message with the id of ${req.params.name}` });
  }
});

app.delete("/lists/:name", function (req, res) {
  let temp;
  for (let i = 0; i < Data.length; i++){
    if (Data[i].name === req.params.name){
      temp = Data[i];
        Data.splice(i,1);
      }
    }
    if (temp === undefined){
      console.log(temp);
      res.status(404);
      res.send(`The item ${req.params.name} is not exist`);
    }else {
      res.status(200);
      res.send(`The item ${req.params.name} has been deleted`);
    }
  });

app.use("/lists/:name", (req, res) => {
    const found = Data.some((element) => element.name === req.params.name);
    if (found) {
        res.json(Data.filter((element) => element.name === req.params.name));
    } else {
        res.status(400).json({ msg: `No member with the name of ${req.params.name}` });
    }
});
app.use("/lists", (req, res) => {
    if (Data.length >= 0) {
        res.status(200).json(Data.map((element) => element.name));
    } else {
        res.status(404);
    }
});






app.listen(PORT, () => console.log(`Server started on port ${PORT}`));