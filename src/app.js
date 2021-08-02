
const getCode = require("./utils/geoCode");
let forCast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const port = 3000;

let pubDirPath = path.join(__dirname, "../public");

app.use(express.static(pubDirPath))

app.set("view engine", "hbs");

let viewPath = path.join(__dirname, "../templates/views")
app.set("views", viewPath);

let partialPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
    res.render("index", { name: "Nikhil" });
})

app.get("/about", (req, res) => {
    res.render("about", { name: "Nikhil" });
})
app.get("/help", (req, res) => {
    res.render("help", { name: "Nikhil" });
})
app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send("Error: Please provide some Address")
    }
    getCode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error });
        }

        forCast(latitude, longitude, (error, data) => {

            if (error) {
                return res.send({ error });
            }
            res.send({
                data, location
            })

        })
    })

    // res.send({
    //     name: "Nikhil",
    //     Address: req.query.address
    // })
})

app.get("*", (req, res) => {
    res.send(`<h1> Error 404</h1>`)
})

app.get("/about/*", (req, res) => {
    res.send(`<h1> Error 404</h1>`)
})


// app.get()

// app.get("/weather", (req, res) => {
//     res.send(`<h1> Hello World</h1>`);
//     // console.log(req)
// })
// app.get("", (req, res) => {
//     res.send("Home page");
//     // console.log(req)
// })
app.listen(port, () => {
    console.log("Server Started at " + port);
})

