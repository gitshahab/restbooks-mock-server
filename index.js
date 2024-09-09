import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

const router = jsonServer.router("./data/db.json");

const middlewares = jsonServer.defaults()

const rules = auth.rewriter({
    orders: 660,
    users: 600
});

server.use(rules);
server.use(auth);
server.use(middlewares);

server.use("/api", router);
server.db = router.db;

server.listen(8000);