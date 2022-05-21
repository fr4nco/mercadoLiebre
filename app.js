const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.listen(3030, () =>
    console.log("Levantando un servidor con Express"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/register.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"))
});