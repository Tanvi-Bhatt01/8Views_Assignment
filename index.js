if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Consult = require("./models/consult.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const port = 8080;

const dbUrl = process.env.ATLAS_URL;

async function main() {
    await mongoose.connect(dbUrl);
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);

const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 1000,
        maxAge:7 * 24 * 60 * 1000
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    next();
});

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});



app.get("/", async (req, res) => {
    res.render("index.ejs");
})

app.post("/", async (req, res) => {
    const newConsult = new Consult(req.body.consult);
    await newConsult.save();
    req.flash("success","Your details are Saved");
    res.redirect("/");
})

app.get("/testing", async (req, res) => {
    let sampleData = new Consult({
        name: "Demo",
        phone: 123456789,
        email: "Demo@gmail.com",
        location: "Banjara Hills",
        message: "Want to consult doctor"
    });

    await sampleData.save();
    console.log("SampleData is saved");
    res.send("Successful");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

