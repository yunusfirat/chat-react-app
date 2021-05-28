import express from "express";
import Data from "./data.js";
// const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
app.use("/list", (req, res) => {
    if (Data.length >= 0) {
        res.status(200).json(Data.map((element) => element.name));
    } else {
        res.status(404);
    }
});
app.use("/list/:name", (req, res) => {
    const found = Data.some((element) => element.name === parseInt(req.params.name));
    if (found) {
        res.json(Data.filter((element) => element.name === parseInt(req.params.name)));
    } else {
        res.status(400).json({ msg: `No member with the name of ${req.params.name}` });
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));