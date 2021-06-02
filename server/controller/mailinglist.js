
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Data = require("../data.cjs");
const { v4: uuidv4 } = require("uuid");
const faker = require("faker");

export const post = (req, res) => {
    const num = uuidv4();
    const newID = req.body.id;
    const newMailingList = {
        id: typeof newID === "number" ? newID : parseInt(num) || faker.datatype.number(),
        name: req.body.name,
        members: req.body.members,
    };
    if (!newMailingList.name || !newMailingList.members) {
        return res.status(400).json({ msg: "please make sure that you have added name and members." });
    }
    Data.push(newMailingList);
    res.status(200).json(newMailingList);
    // res.redirect("/");
};

export const put = (req, res) => {
    const found = Data.some((list) => list.name === req.params.name);
    if (found) {
        const upList = req.body;
        Data.forEach((list) => {
            if (list.name === req.params.name) {
                list.name = upList.name ? upList.name : list.name;
                list.members = upList.members ? upList.members : list.members;
                res.json({ msg: "list updated", list });
            }
        });
    } else {
        res.status(400).json({ msg: `No message with the id of ${req.params.name}` });
    }
};


export const remove = (req, res) => {
    let temp;
    for (let i = 0; i < Data.length; i++) {
        if (Data[i].name === req.params.name) {
            temp = Data[i];
            Data.splice(i, 1);
        }
    }
    if (temp === undefined) {
        console.log(temp);
        res.status(404);
        res.send(`The item ${req.params.name} is not exist`);
    } else {
        res.status(200);
        res.send(`The item ${req.params.name} has been deleted`);
    }
};

export const listname = (req, res) => {
    const found = Data.some((element) => element.name === req.params.name);
    if (found) {
        res.json(Data.filter((element) => element.name === req.params.name));
    } else {
        res.status(400).json({ msg: `No member with the name of ${req.params.name}` });
    }
};

export const list = (req, res) => {
    if (Data.length >= 0) {
        res.status(200).json(Data.map((element) => element.name));
    } else {
        res.status(404);
    }
};

export const membersforname = (req, res) => {
    const username = req.params.name;

    const found = Data.some((element) => element.name === username);
    if (found) {
        res.json(Data.filter((element) => element.name === username)[0].members.join(","));
    } else {
        res.status(400).json({ msg: `No member with the name of ${username}` });
    }
};

export const  updateEmail = (req, res) => {
    const username = req.params.name;
    const email = req.params.email;

    const found = Data.some((list) => list.name === username);
    if (found) {
        const upList = req.body;
        Data.forEach((list) => {
            if (list.name === username && list.members.includes(email) )  {
                list.members = upList.members ? upList.members : list.members;
                res.json(list);
            }
        });
    } else {
        res.status(400).json({ msg: `No message with the id of ${req.params.name}` });
    }
};