import express from "express";
import cookieParser from "cookie-parser";
import ejsLayouts from "express-ejs-layouts";
import path from "path";

import { connectToDB } from "./config/db.js";
import EmployeeRouter from "./src/employee/employee.router.js";
import ReviewRouter from "./src/review/review.router.js";
import { adminAuth, auth } from "./middlewares/auth.js";

const server = express();
server.use(express.json());
server.use(express.urlencoded());
server.use(cookieParser());

server.set("view engine","ejs");
server.set("views", path.join(path.resolve(),"src","views"));

server.use(ejsLayouts);
server.use(express.static("src/views"));
server.use('/assets',express.static('assets'));

// routes
server.get("/",(req,res) => {
    res.redirect("/employee/login");
});

server.use("/employee",EmployeeRouter);
server.use("/reviews",auth,ReviewRouter);

server.listen(process.env.PORT, () => {
    connectToDB();
    console.log(`Server is up and running on port ${process.env.PORT}`)
})
