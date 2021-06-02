
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Lists = require("../data.cjs");
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
    Lists.push(newMailingList);
    res.status(200).json(newMailingList);
    // res.redirect("/");
};

export const put = (req, res) => {
    const found = Lists.some((list) => list.name === req.params.name);
    if (found) {
        const upList = req.body;
        Lists.forEach((list) => {
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
    for (let i = 0; i < Lists.length; i++) {
        if (Lists[i].name === req.params.name) {
            temp = Lists[i];
            Lists.splice(i, 1);
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
    const found = Lists.some((element) => element.name === req.params.name);
    if (found) {
        res.json(Lists.filter((element) => element.name === req.params.name));
    } else {
        res.status(400).json({ msg: `No member with the name of ${req.params.name}` });
    }
};

export const list = (req, res) => {
    if (Lists.length >= 0) {
        res.status(200).json(Lists.map((element) => element.name));
    } else {
        res.status(404);
    }
};

export const membersforname = (req, res) => {
    const username = req.params.name;

    const found = Lists.some((element) => element.name === username);
    if (found) {
        res.json(Lists.filter((element) => element.name === username)[0].members.join(","));
    } else {
        res.status(400).json({ msg: `No member with the name of ${username}` });
    }
};

export const updateEmail = (req, res) => {
    const username = req.params.name;
    const email = req.params.email;

    const found = Lists.some((list) => list.name === username);
    if (found) {
        const upList = req.body;
        Lists.forEach((list) => {
            if (list.name === username && list.members.includes(email)) {
                list.members = upList.members ? upList.members : list.members;
                res.json(list);
            }
        });
    } else {
        res.status(400).json({ msg: `No message with the id of ${req.params.name}` });
    }
};


export const deleteEmail = (req, res) => {
    const username = req.params.name;
    const email = req.params.email;
    let temp;
    for (let i = 0; i < Lists.length; i++) {
        if (Lists[i].name === username && Lists[i].members.includes(email)) {
            const indexof = Lists[i].members.findIndex((member) => member === email);
            temp = Lists[i].members;
            Lists[i].members.splice(indexof, 1);
        }
    } if (temp === undefined) {
        res.status(404).send(`The item ${email} is not exist`);
    } else {
        res.status(200).send(`The item ${email} has been deleted`);
    }
};