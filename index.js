const express = require("express");
const http = require('http');
const ejs = require("ejs");
const socketIO = require("socket.io");
const port = 2000;
const app = express();
app.set("view engine", "ejs");
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });
import { EntityId } from 'redis-om'
import { personRepository as repository } from './repository.js'
io.on("connection", socket => {
    socket.on("message", async ({ username, message }) => {
        const result = await repository.save({ username, message });
        console.log(result);
        io.emit("message", { username, message });
    })
})
app.get("/", (req, res) => {
    res.render("login");
})
app.get("/chat", (req, res) => {
    const { username } = req.query;
    res.render("chat", { username })
})


server.listen(port, () => {
    console.log(`server run on port ${port}`);
})

