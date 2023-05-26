process.env.NODE_ENV = process.env.NODE_ENV || "development";

const app = require("./config/express");
const mongoose = require("./config/mongoose");
const db = mongoose();

const HOST = "localhost";
const PORT = process.env.PORT || 3201;

app.listen(PORT, ()=>
{
    console.log(`SERVER IS RUNNING ON http://${HOST}:${PORT}`);
})

